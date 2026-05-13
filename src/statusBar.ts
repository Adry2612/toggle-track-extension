import * as vscode from 'vscode';
import { TOGGL_COLOR } from './constants';

export class StatusBarController implements vscode.Disposable {
  private readonly item: vscode.StatusBarItem;
  private interval: ReturnType<typeof setInterval> | undefined;
  private startTime: Date | undefined;
  private description = '';

  constructor() {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100,
    );
    this.item.command = 'toggl.toggleTimer';
    this.showIdle();
  }

  start(start: string, description: string): void {
    this.startTime = new Date(start);
    this.description = description || '';
    this.clearInterval();
    this.update();
    this.item.show();
    this.interval = setInterval(() => this.update(), 1000);
  }

  setDescription(description: string): void {
    this.description = description || '';
    if (this.startTime) {
      this.update();
    }
  }

  getCurrentDescription(): string {
    return this.description;
  }

  stop(): void {
    this.clearInterval();
    this.startTime = undefined;
    this.description = '';
    this.showIdle();
  }

  private update(): void {
    if (!this.startTime) { return; }
    const elapsed = Math.floor((Date.now() - this.startTime.getTime()) / 1000);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    this.item.text = `$(watch) Toggl ${hh}:${mm}:${ss}`;
    this.item.color = TOGGL_COLOR;
    const tip = new vscode.MarkdownString(
      this.description
        ? `**$(play) Timer activo**\n\n${this.description}`
        : `**$(play) Timer activo**\n\n_Sin t\u00edtulo_`,
      true,
    );
    tip.isTrusted = true;
    this.item.tooltip = tip;
  }

  private showIdle(): void {
    this.item.text = '$(watch) Toggl';
    this.item.color = undefined;
    const tip = new vscode.MarkdownString('**$(debug-pause) Sin timer activo**\n\nHaz clic para iniciar uno.', true);
    tip.isTrusted = true;
    this.item.tooltip = tip;
    this.item.show();
  }

  private clearInterval(): void {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  dispose(): void {
    this.clearInterval();
    this.item.dispose();
  }
}
