import * as vscode from 'vscode';
import { TogglApiClient } from './togglApi';
import { StatusBarController } from './statusBar';
import { getSidebarHtml } from './webview/sidebarHtml';

export class TogglSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'toggl-sidebar';

  private _view?: vscode.WebviewView;
  private readonly api = new TogglApiClient();

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly statusBar: StatusBarController,
  ) {}

  public async toggleTimerFromStatusBar(): Promise<void> {
    const token = await this.context.secrets.get('togglApiToken');
    if (!token) {
      void vscode.window.showInformationMessage('Conecta tu token de Toggl para usar el temporizador.');
      return;
    }

    const workspaceId = await this.api.getWorkspaceId(token);
    if (!workspaceId) {
      void vscode.window.showErrorMessage('No se pudo obtener el workspace de Toggl.');
      return;
    }

    const running = await this.api.getRunningTimer(token);
    if (running) {
      await this.api.stopTimeEntry(token, workspaceId, running.id);
      this.statusBar.stop();
      this._view?.webview.postMessage({ command: 'timerStopped' });
      return;
    }

    const entry = await this.api.startTimeEntry(token, workspaceId, {
      description: '',
    });
    this.statusBar.start(entry.start, '');
    this._view?.webview.postMessage({ command: 'timerStarted', entryId: entry.id, start: entry.start, description: '' });
  }

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };

    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'ready': {
          const token = await this.context.secrets.get('togglApiToken');
          if (!token) {
            webviewView.webview.postMessage({ command: 'init', hasToken: false });
            break;
          }
          const running = await this.api.getRunningTimer(token);
          if (running) {
            this.statusBar.start(running.start, running.description);
          } else {
            this.statusBar.stop();
          }
          webviewView.webview.postMessage({
            command: 'init',
            hasToken: true,
            runningTimer: running ?? null,
          });
          break;
        }

        case 'saveToken': {
          const raw = String(message.token ?? '').trim();
          if (!raw) {
            webviewView.webview.postMessage({ command: 'tokenError', text: 'El token no puede estar vacío.' });
            return;
          }
          try {
            const me = await this.api.validateToken(raw);
            await this.context.secrets.store('togglApiToken', raw);
            const running = await this.api.getRunningTimer(raw);
            if (running) {
              this.statusBar.start(running.start, running.description);
            } else {
              this.statusBar.stop();
            }
            webviewView.webview.postMessage({ command: 'tokenSaved', name: me.fullname ?? '' });
          } catch {
            webviewView.webview.postMessage({ command: 'tokenError', text: 'Token inválido. Comprueba y vuelve a intentarlo.' });
          }
          break;
        }

        case 'startTimer': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) {
            webviewView.webview.postMessage({ command: 'timerError', text: 'No se pudo obtener el workspace.' });
            return;
          }
          const desc = String(message.description ?? '').trim() || 'Sin título';
          try {
            const entry = await this.api.startTimeEntry(t, wid, {
              description: desc,
              projectId: message.project_id || undefined,
              tagIds: Array.isArray(message.tag_ids) && message.tag_ids.length > 0 ? message.tag_ids : undefined,
            });
            this.statusBar.start(entry.start, desc);
            webviewView.webview.postMessage({ command: 'timerStarted', entryId: entry.id, start: entry.start, description: desc });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Error al iniciar el timer.';
            webviewView.webview.postMessage({ command: 'timerError', text: msg });
          }
          break;
        }

        case 'stopTimer': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          try {
            await this.api.stopTimeEntry(t, wid, message.entryId);
            this.statusBar.stop();
            webviewView.webview.postMessage({ command: 'timerStopped' });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Error al detener el timer.';
            webviewView.webview.postMessage({ command: 'timerError', text: msg });
          }
          break;
        }

        case 'updateRunningDescription': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          const id = Number(message.entryId);
          if (!id) { return; }
          const description = String(message.description ?? '').trim();
          try {
            await this.api.updateRunningEntryDescription(t, wid, id, description);
            this.statusBar.setDescription(description);
            this._view?.webview.postMessage({ command: 'runningDescriptionUpdated', entryId: id, description });
          } catch {
            // Ignore background sync errors to avoid interrupting typing flow.
          }
          break;
        }

        case 'setStatusBarDescription': {
          const description = String(message.description ?? '').trim();
          this.statusBar.setDescription(description);
          break;
        }

        case 'updateRunningStart': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          const id = Number(message.entryId);
          const start = String(message.start ?? '');
          if (!id || !start) { return; }
          try {
            await this.api.updateRunningEntryStart(t, wid, id, start);
            this.statusBar.start(start, this.statusBar.getCurrentDescription());
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'timerError', text: msg });
          }
          break;
        }

        case 'createManualEntry': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) {
            webviewView.webview.postMessage({ command: 'editError', text: 'No se pudo obtener el workspace.' });
            return;
          }
          try {
            await this.api.createManualEntry(t, wid, {
              description: String(message.description ?? '').trim() || 'Sin título',
              start: String(message.start),
              stop: String(message.stop),
              projectId: message.project_id || undefined,
              tagIds: Array.isArray(message.tag_ids) && message.tag_ids.length > 0 ? message.tag_ids : undefined,
            });
            webviewView.webview.postMessage({ command: 'editSaved' });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'editError', text: msg });
          }
          break;
        }

        case 'updateEntry': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          const { id, description, start, stop, project_id, tag_ids, tags } = message as {
            id: number;
            description: string;
            start: string;
            stop: string;
            project_id: number | null;
            tag_ids?: number[];
            tags?: string[];
          };
          const duration = Math.round((new Date(stop).getTime() - new Date(start).getTime()) / 1000);
          try {
            await this.api.updateTimeEntry(t, wid, id, {
              description,
              start,
              stop,
              duration,
              project_id: project_id ?? null,
              tag_ids: Array.isArray(tag_ids) ? tag_ids : [],
              tags: Array.isArray(tags) ? tags : [],
            });
            webviewView.webview.postMessage({ command: 'editSaved' });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'editError', text: msg });
          }
          break;
        }

        case 'deleteEntry': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          try {
            await this.api.deleteTimeEntry(t, wid, message.id);
            webviewView.webview.postMessage({ command: 'editSaved' });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'editError', text: msg });
          }
          break;
        }

        case 'loadProjects': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          const projects = await this.api.getProjects(t, wid);
          webviewView.webview.postMessage({ command: 'projectsLoaded', projects });
          break;
        }

        case 'loadTags': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) { return; }
          const tags = await this.api.getTags(t, wid);
          webviewView.webview.postMessage({ command: 'tagsLoaded', tags });
          break;
        }

        case 'createProject': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) {
            webviewView.webview.postMessage({ command: 'createProjectError', text: 'No se pudo obtener el workspace.' });
            return;
          }
          try {
            const project = await this.api.createProject(t, wid, {
              name: String(message.name ?? '').trim(),
              color: String(message.color ?? '').trim(),
              isPrivate: Boolean(message.isPrivate),
            });
            webviewView.webview.postMessage({ command: 'projectCreated', project });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'createProjectError', text: msg });
          }
          break;
        }

        case 'createTag': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          const wid = await this.api.getWorkspaceId(t);
          if (!wid) {
            webviewView.webview.postMessage({ command: 'createTagError', text: 'No se pudo obtener el workspace.' });
            return;
          }
          try {
            const tag = await this.api.createTag(t, wid, String(message.name ?? '').trim());
            webviewView.webview.postMessage({ command: 'tagCreated', tag });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'createTagError', text: msg });
          }
          break;
        }

        case 'logout':
          await this.context.secrets.delete('togglApiToken');
          this.statusBar.stop();
          webviewView.webview.postMessage({ command: 'init', hasToken: false });
          break;

        case 'loadEntries': {
          const t = await this.context.secrets.get('togglApiToken');
          if (!t) { return; }
          try {
            const entries = await this.api.getRecentEntries(t);
            webviewView.webview.postMessage({ command: 'entriesLoaded', entries });
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            webviewView.webview.postMessage({ command: 'entriesError', text: msg });
          }
          break;
        }
      }
    });

    webviewView.webview.html = getSidebarHtml();
  }
}
