import * as vscode from 'vscode';
import { StatusBarController } from './statusBar';
import { TogglSidebarProvider } from './sidebarProvider';
import { TogglApiClient } from './togglApi';

export function activate(context: vscode.ExtensionContext): void {
  const statusBar = new StatusBarController();
  const sidebarProvider = new TogglSidebarProvider(context, statusBar);
  const api = new TogglApiClient();

  const registration = vscode.window.registerWebviewViewProvider(
    TogglSidebarProvider.viewType,
    sidebarProvider,
    { webviewOptions: { retainContextWhenHidden: true } },
  );

  const openPanelCommand = vscode.commands.registerCommand('toggl.openPanel', async () => {
    await vscode.commands.executeCommand('workbench.view.extension.toggl');
  });

  const openSidebarPanelCommand = vscode.commands.registerCommand('toggl.openSidebarPanel', async () => {
    await vscode.commands.executeCommand('workbench.view.extension.toggl');
  });

  const toggleTimerCommand = vscode.commands.registerCommand('toggl.toggleTimer', async () => {
    try {
      await sidebarProvider.toggleTimerFromStatusBar();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo alternar el temporizador.';
      void vscode.window.showErrorMessage(msg);
    }
  });

  void (async () => {
    try {
      const token = await context.secrets.get('togglApiToken');
      if (!token) {
        statusBar.stop();
        return;
      }
      const running = await api.getRunningTimer(token);
      if (running) {
        statusBar.start(running.start, running.description);
      } else {
        statusBar.stop();
      }
    } catch {
      statusBar.stop();
    }
  })();

  context.subscriptions.push(registration, openPanelCommand, openSidebarPanelCommand, toggleTimerCommand, statusBar);
}

export function deactivate(): void {}
