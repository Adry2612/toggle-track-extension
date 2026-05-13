import { TOGGL_COLOR } from '../constants';

export function getSidebarHtml(): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body { height: 100%; overflow: hidden; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--vscode-sideBar-background);
      color: var(--vscode-foreground);
      font-size: 13px;
    }

    .hidden { display: none !important; }

    /* ── Login ───────────────────────────────────────── */
    #login-view { padding: 24px 16px; }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }
    .logo-dot { width: 26px; height: 26px; background: ${TOGGL_COLOR}; border-radius: 50%; }
    .logo-text { font-size: 17px; font-weight: 700; color: ${TOGGL_COLOR}; }

    .login-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
      text-transform: uppercase; color: var(--vscode-descriptionForeground);
      margin-bottom: 6px;
    }
    .token-input {
      width: 100%; padding: 9px 11px;
      border: 1px solid var(--vscode-input-border, #555);
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none; margin-bottom: 6px;
    }
    .token-input:focus { border-color: ${TOGGL_COLOR}; }
    .error-msg { font-size: 11px; color: ${TOGGL_COLOR}; min-height: 16px; margin-bottom: 10px; }
    .btn-primary {
      width: 100%; padding: 10px;
      background: ${TOGGL_COLOR}; color: #fff;
      border: none; border-radius: 6px;
      font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .btn-primary:hover { background: #c42e24; }
    .btn-primary:disabled { opacity: 0.5; cursor: default; }
    .login-hint { margin-top: 14px; font-size: 11px; color: var(--vscode-descriptionForeground); line-height: 1.5; }
    .login-hint a { color: ${TOGGL_COLOR}; text-decoration: none; }

    /* ── Timer view ──────────────────────────────────── */
    #timer-view { display: none; flex-direction: column; height: 100%; overflow: hidden; }
    .history-section { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }
    #entries-calendar-view { display: none; flex-direction: column; flex: 1; min-height: 0; }
    #entries-calendar-view.calendar-view.visible { display: flex; }

    /* Header barra roja */
    .t-header {
      background: ${TOGGL_COLOR};
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .t-header-logo { font-size: 13px; font-weight: 700; color: #fff; }
    .t-logout {
      background: none; border: 1px solid rgba(255,255,255,0.45);
      border-radius: 4px; color: #fff; font-size: 11px;
      padding: 2px 7px; cursor: pointer;
    }
    .t-logout:hover { background: rgba(255,255,255,0.15); }

    /* ── Barra de timer (estilo Toggl) ───────────────── */
    .timer-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
    }

    /* Input de descripción */
    .desc-wrap { flex: 1; position: relative; min-width: 0; }
    .desc-input {
      width: 100%;
      padding: 7px 26px 7px 10px;
      border: 1px solid var(--vscode-input-border, #444);
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .desc-input:focus { border-color: ${TOGGL_COLOR}; }
    .desc-input:disabled { opacity: 0.55; }
    .desc-clear {
      position: absolute; right: 7px; top: 50%; transform: translateY(-50%);
      background: none; border: none;
      color: var(--vscode-descriptionForeground);
      font-size: 14px; cursor: pointer; line-height: 1;
      display: none;
    }
    .desc-clear:hover { color: var(--vscode-foreground); }

    /* Tiempo transcurrido */
    .elapsed {
      font-size: 13px; font-variant-numeric: tabular-nums;
      color: var(--vscode-descriptionForeground);
      white-space: nowrap; flex-shrink: 0;
    }
    .elapsed.running {
      color: #fff; font-weight: 600;
      cursor: pointer;
    }
    .elapsed.running:hover { opacity: 0.75; }

    /* Botón añadir manual */
    .add-btn {
      width: 28px; height: 28px; border-radius: 50%;
      border: 2px solid var(--vscode-panel-border, #555);
      background: none; color: var(--vscode-descriptionForeground);
      font-size: 18px; line-height: 1; display: flex; align-items: center;
      justify-content: center; cursor: pointer; flex-shrink: 0;
      transition: border-color 0.15s, color 0.15s;
    }
    .add-btn:hover { border-color: ${TOGGL_COLOR}; color: ${TOGGL_COLOR}; }

    /* Overlay edición inicio del timer en curso */
    .rse-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 120;
      display: flex; align-items: center; justify-content: center;
    }
    .rse-card {
      background: var(--vscode-editorWidget-background, #1e1e1e);
      border: 1px solid var(--vscode-panel-border, #333);
      border-radius: 10px;
      padding: 18px 20px;
      min-width: 260px;
    }
    .rse-title {
      font-size: 13px; font-weight: 600;
      margin-bottom: 12px;
      color: var(--vscode-foreground);
    }
    .rse-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }
    .rse-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .rse-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: var(--vscode-descriptionForeground);
    }
    .rse-input {
      width: 100%; padding: 7px 10px;
      border: 1px solid var(--vscode-input-border, #555);
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .rse-input:focus { border-color: ${TOGGL_COLOR}; }
    .rse-actions { display: flex; gap: 8px; justify-content: flex-end; }
    .rse-cancel {
      padding: 6px 14px; border: 1px solid var(--vscode-panel-border, #555);
      border-radius: 6px; background: none;
      color: var(--vscode-descriptionForeground); font-size: 12px; cursor: pointer;
    }
    .rse-save {
      padding: 6px 14px; border: none; border-radius: 6px;
      background: ${TOGGL_COLOR}; color: #fff;
      font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .rse-save:hover { background: #c42e24; }

    /* Botón play circular (idle) */
    .play-btn {
      width: 34px; height: 34px; border-radius: 50%;
      border: 2px solid ${TOGGL_COLOR};
      background: ${TOGGL_COLOR}; color: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      transition: background 0.15s;
    }
    .play-btn svg { width: 20px; height: 20px; fill: #fff; margin-left: 2px; }

    /* Botón stop circular (running) */
    .stop-btn {
      width: 34px; height: 34px; border-radius: 50%;
      border: none; background: #d06557; color: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(224,58,46,0.45);
      transition: background 0.15s;
    }
    .stop-btn:hover { background: #c42e24; }
    .stop-btn svg { width: 18px; height: 18px; fill: #fff; }
    .stop-btn:disabled { opacity: 0.6; cursor: default; }

    /* ── Fila de meta (proyecto / tag / billable) ─── */
    .meta-row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px 10px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
    }
    .meta-btn {
      display: flex; align-items: center; gap: 4px;
      background: none; border: 1px solid var(--vscode-panel-border, #333);
      border-radius: 4px; color: var(--vscode-descriptionForeground);
      font-size: 11px; padding: 3px 7px; cursor: pointer;
    }
    .meta-btn:hover { background: var(--vscode-list-hoverBackground); }
    .meta-btn.active { border-color: ${TOGGL_COLOR}; color: ${TOGGL_COLOR}; }
    .meta-btn svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }

    /* error inline */
    .timer-error {
      font-size: 11px; color: ${TOGGL_COLOR};
      padding: 4px 12px 0;
      min-height: 16px;
    }

    /* ── Historial ───────────────────────────────────── */
    .history-section { padding-bottom: 8px; }
    .history-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 12px 4px;
    }
    .history-views {
      display: flex; align-items: center; gap: 6px;
      padding: 0 12px 8px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
      margin-bottom: 4px;
    }
    .history-view-btn {
      border: none; background: none;
      color: var(--vscode-descriptionForeground);
      font-size: 12px; cursor: pointer;
      padding: 6px 4px;
      border-bottom: 2px solid transparent;
    }
    .history-view-btn:hover { color: var(--vscode-foreground); }
    .history-view-btn.active {
      color: var(--vscode-foreground);
      border-bottom-color: ${TOGGL_COLOR};
      font-weight: 600;
    }
    .stats-view { padding: 8px 12px 12px; }
    .stats-range {
      display: inline-flex;
      border: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .stats-range-btn {
      border: none;
      background: transparent;
      color: var(--vscode-descriptionForeground);
      font-size: 11px;
      padding: 6px 10px;
      cursor: pointer;
    }
    .stats-range-btn + .stats-range-btn {
      border-left: 1px solid var(--vscode-panel-border, #2a2a2a);
    }
    .stats-range-btn.active {
      background: color-mix(in srgb, ${TOGGL_COLOR} 20%, transparent);
      color: var(--vscode-foreground);
      font-weight: 600;
    }
    .stats-summary {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 10px;
    }
    .stats-card {
      border: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-radius: 8px;
      padding: 8px;
      background: color-mix(in srgb, var(--vscode-sideBar-background) 90%, #111);
    }
    .stats-card-label {
      font-size: 10px;
      color: var(--vscode-descriptionForeground);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .stats-card-value {
      margin-top: 4px;
      font-size: 16px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .stats-section {
      border: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
    }
    .stats-section-title { font-size: 11px; font-weight: 600; margin-bottom: 8px; }
    .stats-bars-shell {
      display: grid;
      grid-template-columns: 36px 1fr;
      gap: 3px;
      align-items: start;
      position: relative;
    }
    .stats-y-axis {
      position: sticky;
      left: 0;
      z-index: 3;
      height: 128px;
      margin-top: 8px;
      padding-right: 2px;
      background: var(--vscode-sideBar-background);
      border-right: 1px solid color-mix(in srgb, var(--vscode-panel-border, #2a2a2a) 65%, transparent);
    }
    .stats-y-tick {
      position: absolute;
      left: 0;
      transform: translateY(-50%);
      font-size: 9px;
      color: var(--vscode-descriptionForeground);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .stats-bars-scroll-wrap {
      position: relative;
      display: block;
      min-width: 0;
    }
    .stats-bars-nav {
      border: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-radius: 6px;
      background: var(--vscode-sideBar-background);
      color: var(--vscode-descriptionForeground);
      width: 22px;
      height: 22px;
      line-height: 20px;
      padding: 0;
      cursor: pointer;
      position: absolute;
      top: 4px;
      z-index: 3;
    }
    #stats-bars-prev { left: 4px; }
    #stats-bars-next { right: 4px; }
    .stats-bars-nav:hover { color: var(--vscode-foreground); }
    .stats-bars-nav:disabled { opacity: 0.4; cursor: default; }
    .stats-bars-viewport {
      overflow-x: auto;
      overflow-y: hidden;
      flex: 1;
      scrollbar-width: thin;
      scroll-behavior: smooth;
      padding-bottom: 2px;
    }
    .stats-bars-chart-wrap {
      position: relative;
      min-height: 160px;
      width: max-content;
      min-width: 100%;
      border-bottom: 1px solid color-mix(in srgb, var(--vscode-panel-border, #2a2a2a) 70%, transparent);
    }
    .stats-grid-lines {
      position: absolute;
      top: 8px;
      left: 0;
      width: 100%;
      height: 120px;
      pointer-events: none;
      z-index: 0;
    }
    .stats-grid-line {
      position: absolute;
      left: 0;
      right: 0;
      border-top: 1px solid rgba(255, 255, 255, 0.22);
    }
    .stats-bars {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-end;
      gap: 8px;
      width: max-content;
      min-width: 100%;
      min-height: 160px;
      padding-top: 6px;
    }
    .stats-bar-col {
      width: 36px;
      flex: 0 0 36px;
      text-align: center;
      position: relative;
      height: 160px;
    }
    .stats-bar-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 16px;
      height: 120px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: visible;
    }
    .stats-bar {
      width: 100%;
      max-width: 28px;
      border-radius: 6px 6px 0 0;
      background: color-mix(in srgb, ${TOGGL_COLOR} 80%, #ffffff 20%);
    }
    .stats-bar-value {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      max-width: 44px;
      min-height: 12px;
      line-height: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 9px;
      color: var(--vscode-foreground);
      opacity: 0.95;
      font-weight: 600;
      pointer-events: none;
    }
    .stats-bar-day {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 12px;
      line-height: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
      color: var(--vscode-descriptionForeground);
    }
    .stats-project-layout { display: grid; grid-template-columns: 120px 1fr; gap: 10px; align-items: center; }
    .stats-donut {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: conic-gradient(${TOGGL_COLOR} 0% 100%);
      position: relative;
      margin: 0 auto;
    }
    .stats-donut::after {
      content: '';
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: var(--vscode-sideBar-background);
      position: absolute;
    }
    .stats-donut-center {
      position: relative;
      z-index: 1;
      font-size: 14px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .stats-project-list { display: flex; flex-direction: column; gap: 6px; }
    .stats-project-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; }
    .stats-project-left { display: flex; align-items: center; gap: 6px; min-width: 0; }
    .stats-project-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .stats-project-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stats-project-time { color: var(--vscode-descriptionForeground); font-variant-numeric: tabular-nums; }
    .stats-empty { font-size: 11px; color: var(--vscode-descriptionForeground); }
    .history-title {
      font-size: 10px; font-weight: 600; letter-spacing: 0.6px;
      text-transform: uppercase; color: var(--vscode-descriptionForeground);
    }
    .refresh-btn {
      background: none; border: none;
      color: var(--vscode-descriptionForeground);
      cursor: pointer; padding: 2px; border-radius: 3px;
      display: flex; align-items: center;
    }
    .refresh-btn:hover { color: var(--vscode-foreground); }

    .day-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 12px 4px;
      border-top: 1px solid var(--vscode-panel-border, #2a2a2a);
      margin-top: 4px;
      cursor: pointer;
      user-select: none;
    }
    .day-header:first-child { border-top: none; margin-top: 0; }
    .day-group {
      margin-top: 10px;
      border-top: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-bottom: 1px solid color-mix(in srgb, var(--vscode-panel-border, #2a2a2a) 65%, transparent);
      background: color-mix(in srgb, var(--vscode-sideBar-background) 90%, #120a1e);
    }
    .day-group:first-child { margin-top: 0; }
    .day-header:hover { background: var(--vscode-list-hoverBackground); }
    .day-header-left { display: flex; align-items: center; gap: 5px; }
    .day-chevron {
      font-size: 10px; color: var(--vscode-descriptionForeground);
      transition: transform 0.15s;
      display: inline-block;
    }
    .day-chevron.collapsed { transform: rotate(-90deg); }
    .day-label { font-size: 11px; font-weight: 600; color: var(--vscode-foreground); }
    .day-total { font-size: 11px; font-variant-numeric: tabular-nums; font-weight: 600; color: ${TOGGL_COLOR}; }
    .day-entries { overflow: hidden; }

    .entry-item {
      display: flex; align-items: center; gap: 8px;
      padding: 5px 12px; cursor: default;
      transition: background 0.1s;
    }
    .entry-item:hover { background: var(--vscode-list-hoverBackground); }
    .entry-item:hover .entry-replay { opacity: 1; }
    .entry-replay {
      opacity: 0; flex-shrink: 0;
      background: none; border: none; padding: 3px;
      color: var(--vscode-descriptionForeground);
      cursor: pointer; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.1s, color 0.15s;
    }
    .entry-replay:hover { color: ${TOGGL_COLOR}; }
    .entry-replay svg { width: 14px; height: 14px; fill: currentColor; }
    .entry-info { flex: 1; min-width: 0; }
    .entry-desc { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .entry-desc.empty { color: var(--vscode-descriptionForeground); font-style: italic; }
    .entry-project-line {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
      min-width: 0;
    }
    .entry-project-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .entry-project {
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .entry-project.empty {
      color: var(--vscode-descriptionForeground) !important;
      font-weight: 500;
    }
    .entry-tags-line {
      margin-top: 1px;
      font-size: 9px;
      color: var(--vscode-descriptionForeground);
      opacity: 0.72;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .entry-meta { font-size: 10px; color: var(--vscode-descriptionForeground); margin-top: 1px; }
    .entry-duration { font-size: 11px; font-variant-numeric: tabular-nums; color: var(--vscode-descriptionForeground); flex-shrink: 0; }
    .entries-empty { font-size: 12px; color: var(--vscode-descriptionForeground); padding: 8px 12px; }

    /* ── Vista calendario ───────────────────────────── */
    .calendar-view { padding: 0 0 8px; position: relative; }
    .calendar-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 12px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
      margin-bottom: 6px;
    }
    .calendar-nav { display: flex; align-items: center; gap: 8px; }
    .calendar-nav-btn {
      border: none; background: none;
      color: var(--vscode-foreground);
      font-size: 18px; line-height: 1;
      cursor: pointer; padding: 2px 4px;
      border-radius: 4px;
    }
    .calendar-nav-btn:hover { background: var(--vscode-list-hoverBackground); }
    .calendar-day-label {
      font-size: 13px; font-weight: 600;
      min-width: 120px;
    }
    .calendar-total {
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      font-variant-numeric: tabular-nums;
    }
    .calendar-scroll {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      position: relative;
      padding: 0 8px 0 0;
    }
    .calendar-grid {
      position: relative;
      min-height: 1152px;
      margin-left: 10px;
      padding-left: 48px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.55);
    }
    .calendar-slot-row {
      border-top: 1px solid rgba(255, 255, 255, 0.35);
      position: relative;
    }
    .calendar-slot-row.alt {
      background: rgba(255, 255, 255, 0.04);
    }
    .calendar-slot-row.hour {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }
    .calendar-hour-label {
      position: absolute;
      left: -44px;
      top: -8px;
      width: 40px;
      text-align: right;
      font-size: 10px;
      color: var(--vscode-descriptionForeground);
      font-variant-numeric: tabular-nums;
    }
    .calendar-hour-label.full {
      color: var(--vscode-foreground);
      font-weight: 600;
    }
    .calendar-hour-label.half {
      color: color-mix(in srgb, var(--vscode-foreground) 70%, var(--vscode-descriptionForeground));
      font-weight: 500;
    }
    .calendar-hour-label.quarter {
      color: var(--vscode-descriptionForeground);
      opacity: 0.7;
      font-size: 9px;
    }
    .calendar-events-layer {
      position: absolute;
      top: 0;
      left: 48px;
      right: 8px;
      bottom: 0;
      pointer-events: none;
    }
    .calendar-empty-hint {
      margin: 8px 12px 0;
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      text-align: left;
    }
    .calendar-event {
      position: absolute;
      left: 0;
      right: 0;
      border-radius: 6px;
      padding: 6px 8px;
      border-left: 4px solid transparent;
      pointer-events: auto;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .calendar-event:hover { filter: brightness(1.08); }
    .calendar-event.running {
      box-shadow: 0 0 0 1px color-mix(in srgb, #fff 30%, transparent);
      background-image:
        repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.10) 0 2px, rgba(255, 255, 255, 0.02) 2px 8px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.22) 0 2px, rgba(0, 0, 0, 0.06) 2px 8px);
    }
    .calendar-event.resizing {
      filter: brightness(1.12);
    }
    .calendar-event-title {
      font-size: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .calendar-event-meta {
      font-size: 10px;
      margin-top: auto;
      padding-top: 2px;
      color: #fff;
      font-variant-numeric: tabular-nums;
    }
    .calendar-event-proj {
      font-size: 10px;
      font-weight: 600;
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .calendar-event-tags {
      font-size: 10px;
      margin-top: 1px;
      color: var(--vscode-descriptionForeground);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .calendar-resize-handle {
      position: absolute;
      left: 0;
      right: 0;
      height: 6px;
      z-index: 2;
      pointer-events: auto;
      background: transparent;
    }
    .calendar-resize-handle.top {
      top: 0;
      cursor: ns-resize;
    }
    .calendar-resize-handle.bottom {
      bottom: 0;
      cursor: ns-resize;
    }
    .calendar-zoom-controls {
      position: absolute;
      right: 8px;
      bottom: 8px;
      z-index: 5;
      display: inline-flex;
      flex-direction: column;
      border: 1px solid var(--vscode-panel-border, #333);
      border-radius: 8px;
      overflow: hidden;
      backdrop-filter: blur(2px);
      background: var(--vscode-editorWidget-background, #1f1f1f);
    }
    .calendar-zoom-btn {
      width: 30px;
      height: 28px;
      border: none;
      background: ${TOGGL_COLOR};
      color: #fff;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
    }
    .calendar-zoom-btn + .calendar-zoom-btn {
      border-top: 1px solid color-mix(in srgb, #000 25%, ${TOGGL_COLOR});
    }
    .calendar-zoom-btn:hover { background: #a64c9b; }

    /* ── Panel de edición ────────────────────────────── */
    #timer-view { position: relative; }
    .edit-panel {
      position: absolute; inset: 0;
      background: var(--vscode-sideBar-background);
      z-index: 10;
      display: flex; flex-direction: column;
    }
    .edit-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 14px 10px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
    }
    .edit-title { font-size: 14px; font-weight: 600; }
    .edit-close {
      background: none; border: none;
      color: var(--vscode-descriptionForeground);
      font-size: 18px; cursor: pointer; line-height: 1; padding: 2px 4px;
      border-radius: 4px;
    }
    .edit-close:hover { color: var(--vscode-foreground); background: var(--vscode-list-hoverBackground); }
    .edit-body { padding: 14px; display: flex; flex-direction: column; gap: 10px; }
    .edit-desc-wrap { position: relative; }
    .edit-desc-input {
      width: 100%; padding: 8px 30px 8px 10px;
      border: 2px solid ${TOGGL_COLOR};
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .edit-desc-clear {
      position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
      background: none; border: none;
      color: var(--vscode-descriptionForeground);
      font-size: 16px; cursor: pointer; line-height: 1;
    }
    .edit-desc-clear:hover { color: var(--vscode-foreground); }

    /* Fila de meta en el editor */
    .edit-meta-row {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    }
    .edit-meta-btn {
      display: flex; align-items: center; gap: 4px;
      background: none; border: 1px solid var(--vscode-panel-border, #444);
      border-radius: 5px; color: var(--vscode-descriptionForeground);
      font-size: 11px; padding: 5px 9px; cursor: pointer; white-space: nowrap;
    }
    .edit-meta-btn:hover { background: var(--vscode-list-hoverBackground); color: var(--vscode-foreground); }
    .edit-meta-btn svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
    .edit-meta-btn.active { border-color: ${TOGGL_COLOR}; color: ${TOGGL_COLOR}; }
    .edit-project-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
      background: var(--vscode-descriptionForeground);
    }

    /* ── Picker de proyecto ────────────────────────── */
    .proj-picker {
      position: absolute; inset: 0;
      background: var(--vscode-sideBar-background);
      z-index: 20; display: flex; flex-direction: column;
    }
    .proj-picker-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px 8px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
    }
    .proj-picker-title { font-size: 13px; font-weight: 600; }
    .proj-picker-close {
      background: none; border: none; color: var(--vscode-descriptionForeground);
      font-size: 18px; cursor: pointer; padding: 2px 4px; border-radius: 4px;
    }
    .proj-picker-close:hover { color: var(--vscode-foreground); background: var(--vscode-list-hoverBackground); }
    .proj-search-wrap { padding: 8px 12px; }
    .proj-search {
      width: 100%; padding: 7px 10px;
      border: 1px solid ${TOGGL_COLOR};
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .proj-list { flex: 1; overflow-y: auto; padding-bottom: 8px; }
    .proj-none {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 14px; cursor: pointer; font-size: 13px;
      color: var(--vscode-foreground);
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
      margin-bottom: 4px;
    }
    .proj-none:hover { background: var(--vscode-list-hoverBackground); }
    .proj-none-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--vscode-descriptionForeground); flex-shrink: 0; }
    .proj-client-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.6px;
      text-transform: uppercase; color: var(--vscode-descriptionForeground);
      padding: 6px 14px 2px;
    }
    .proj-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 7px 14px; cursor: pointer; font-size: 13px;
    }
    .proj-item:hover { background: var(--vscode-list-hoverBackground); }
    .proj-item-left { display: flex; align-items: center; gap: 8px; }
    .proj-item-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .proj-item-check { color: ${TOGGL_COLOR}; font-size: 14px; font-weight: 700; }
    .proj-picker-footer {
      border-top: 1px solid var(--vscode-panel-border, #2a2a2a);
      padding: 10px 12px 12px;
    }
    .proj-create-btn {
      width: 100%;
      border: 1px dashed color-mix(in srgb, ${TOGGL_COLOR} 65%, transparent);
      background: color-mix(in srgb, ${TOGGL_COLOR} 10%, transparent);
      color: var(--vscode-foreground);
      border-radius: 8px;
      padding: 9px 10px;
      text-align: left;
      cursor: pointer;
      font-size: 12px;
    }
    .proj-create-btn:hover { background: color-mix(in srgb, ${TOGGL_COLOR} 16%, transparent); }
    .proj-create-inline { padding: 10px 12px 0; }
    .create-project-overlay {
      position: absolute; inset: 0;
      background: rgba(0, 0, 0, 0.42);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      z-index: 30;
    }
    .create-project-modal {
      width: 100%; max-width: 420px;
      background: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-panel-border, #2a2a2a);
      border-radius: 10px;
      box-shadow: 0 18px 40px rgba(0,0,0,0.35);
      padding: 14px;
    }
    .create-project-title {
      font-size: 14px; font-weight: 700;
      margin-bottom: 12px;
    }
    .create-project-field {
      display: flex; flex-direction: column; gap: 6px;
      margin-bottom: 10px;
    }
    .create-project-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.5px;
      text-transform: uppercase; color: var(--vscode-descriptionForeground);
    }
    .create-project-name-row {
      display: grid;
      grid-template-columns: 1fr 42px;
      gap: 8px;
    }
    .create-project-input, .create-project-select {
      width: 100%; padding: 9px 10px;
      border: 1px solid var(--vscode-input-border, #444);
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .create-project-input:focus, .create-project-select:focus { border-color: ${TOGGL_COLOR}; }
    .create-project-color-trigger {
      width: 42px; height: 39px;
      border-radius: 6px;
      border: 1px solid var(--vscode-input-border, #444);
      background: var(--vscode-input-background);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
    }
    .create-project-color-preview {
      width: 20px; height: 20px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.25);
    }
    .create-project-check {
      display: flex; align-items: center; gap: 8px;
      margin: 8px 0 12px;
      font-size: 12px;
    }
    .create-project-check input {
      width: 16px; height: 16px;
      accent-color: ${TOGGL_COLOR};
    }
    .create-project-colors {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }
    .create-project-color-option {
      width: 100%; aspect-ratio: 1;
      border-radius: 50%; border: 2px solid transparent;
      cursor: pointer;
      background: transparent;
    }
    .create-project-color-option.selected {
      border-color: #d8dbe5;
      box-shadow: 0 0 0 2px rgba(255,255,255,0.08);
    }
    .create-project-error {
      min-height: 16px;
      font-size: 11px;
      color: ${TOGGL_COLOR};
      margin-bottom: 8px;
    }
    .create-project-actions {
      display: flex; justify-content: flex-end; gap: 8px;
    }
    .create-project-cancel,
    .create-project-submit {
      min-width: 110px;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 12px;
      cursor: pointer;
    }
    .create-project-cancel {
      background: transparent;
      color: var(--vscode-foreground);
      border: 1px solid var(--vscode-panel-border, #555);
    }
    .create-project-submit {
      border: none;
      background: ${TOGGL_COLOR};
      color: #fff;
    }
    .create-project-submit:disabled { opacity: 0.5; cursor: default; }

    /* ── Picker de etiquetas ──────────────────────── */
    .tag-picker {
      position: absolute; inset: 0;
      background: var(--vscode-sideBar-background);
      z-index: 25; display: flex; flex-direction: column;
    }
    .tag-picker-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px 8px;
      border-bottom: 1px solid var(--vscode-panel-border, #2a2a2a);
    }
    .tag-picker-title { font-size: 13px; font-weight: 600; }
    .tag-picker-close {
      background: none; border: none; color: var(--vscode-descriptionForeground);
      font-size: 18px; cursor: pointer; padding: 2px 4px; border-radius: 4px;
    }
    .tag-picker-close:hover { color: var(--vscode-foreground); background: var(--vscode-list-hoverBackground); }
    .tag-search-wrap { padding: 8px 12px; }
    .tag-search {
      width: 100%; padding: 7px 10px;
      border: 1px solid ${TOGGL_COLOR};
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; outline: none;
    }
    .tag-list { flex: 1; overflow-y: auto; padding: 8px 0; }
    .tag-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 14px; cursor: pointer;
      font-size: 13px;
    }
    .tag-item:hover { background: var(--vscode-list-hoverBackground); }
    .tag-checkbox {
      width: 16px; height: 16px;
      border-radius: 3px;
      border: 1px solid var(--vscode-panel-border, #777);
      display: inline-flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      color: #fff;
      background: transparent;
      font-size: 11px;
    }
    .tag-item.selected .tag-checkbox {
      background: ${TOGGL_COLOR};
      border-color: ${TOGGL_COLOR};
    }
    .tag-name {
      flex: 1; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .tag-picker-footer {
      border-top: 1px solid var(--vscode-panel-border, #2a2a2a);
      padding: 10px 12px 12px;
    }
    .tag-create-btn {
      width: 100%;
      border: none;
      background: none;
      color: var(--vscode-descriptionForeground);
      text-align: left;
      padding: 0;
      cursor: pointer;
      font-size: 12px;
    }
    .tag-create-btn:hover { color: ${TOGGL_COLOR}; }
    .tag-create-btn:disabled { opacity: 0.45; cursor: default; }
    .tag-create-inline {
      padding: 8px 14px 0;
      border-top: 1px solid color-mix(in srgb, var(--vscode-panel-border, #2a2a2a) 65%, transparent);
      margin-top: 6px;
    }
    .tag-error {
      min-height: 16px;
      font-size: 11px;
      color: ${TOGGL_COLOR};
      padding: 0 12px 8px;
    }

    /* Inputs de tiempo separados */
    .edit-times-row {
      display: flex; align-items: center; gap: 8px;
    }
    .edit-time-block { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
    .edit-time-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.4px;
      text-transform: uppercase; color: var(--vscode-descriptionForeground);
    }
    .edit-time-input-wrap {
      position: relative; display: flex; align-items: center;
    }
    .edit-time-input {
      width: 100%; padding: 7px 10px;
      border: 1px solid var(--vscode-input-border, #444);
      border-radius: 6px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font-size: 13px; font-variant-numeric: tabular-nums;
      outline: none; cursor: pointer;
      -webkit-appearance: none; appearance: none;
    }
    .edit-time-input:focus { border-color: ${TOGGL_COLOR}; }
    .edit-time-input::-webkit-calendar-picker-indicator { display: none; }
    /* Icono de calendario dentro del input inicio */
    .edit-time-input-wrap .edit-time-input { padding-right: 30px; }
    .edit-cal-icon {
      position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
      pointer-events: none;
      color: var(--vscode-descriptionForeground);
      display: flex; align-items: center;
    }
    .edit-cal-icon svg { width: 13px; height: 13px; fill: currentColor; }
    #edit-start-date {
      position: absolute; right: 0; top: 0; bottom: 0; width: 34px;
      opacity: 0; cursor: pointer;
    }
    #edit-start-date::-webkit-calendar-picker-indicator {
      width: 100%; height: 100%; opacity: 0; cursor: pointer;
    }
    .edit-date-display {
      font-size: 10px; color: var(--vscode-descriptionForeground);
      min-height: 14px; line-height: 14px;
    }
    .edit-time-arrow {
      color: var(--vscode-descriptionForeground); font-size: 16px;
      flex-shrink: 0; align-self: center;
    }
    .edit-dur-row {
      display: flex; align-items: center; justify-content: flex-end;
    }
    .edit-dur {
      font-size: 12px; font-variant-numeric: tabular-nums; font-weight: 600;
      color: ${TOGGL_COLOR};
    }
    .edit-actions {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 4px;
    }
    .edit-delete {
      background: none; border: none;
      color: ${TOGGL_COLOR}; font-size: 13px; font-weight: 600;
      cursor: pointer; padding: 4px 0;
    }
    .edit-delete:hover { opacity: 0.75; }
    .edit-save {
      padding: 8px 22px; border: none; border-radius: 6px;
      background: ${TOGGL_COLOR}; color: #fff;
      font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .edit-save:hover { background: #c42e24; }
    .edit-save:disabled { opacity: 0.5; cursor: default; }
    .edit-error { font-size: 11px; color: ${TOGGL_COLOR}; min-height: 14px; }
  </style>
</head>
<body>

  <!-- ── Login ─────────────────────── -->
  <div id="login-view">
    <div class="logo">
      <div class="logo-dot"></div>
      <span class="logo-text">Toggl Track</span>
    </div>
    <p class="login-label">API Token</p>
    <input id="token-input" class="token-input" type="password" placeholder="Tu API token de Toggl" />
    <p class="error-msg" id="login-error"></p>
    <button id="save-token-btn" class="btn-primary">Conectar</button>
    <p class="login-hint">
      Encuéntralo en
      <a href="https://track.toggl.com/profile" target="_blank">track.toggl.com/profile</a>
      → API token.
    </p>
  </div>

  <!-- ── Timer ─────────────────────── -->
  <div id="timer-view">

    <!-- Header rojo -->
    <div class="t-header">
      <span class="t-header-logo">Toggl Track</span>
      <button class="t-logout" id="logout-btn">Cerrar sesión</button>
    </div>

    <!-- Barra de timer estilo Toggl -->
    <div class="timer-bar">
      <div class="desc-wrap">
        <input id="desc-input" class="desc-input" type="text"
               placeholder="¿En qué estás trabajando?" maxlength="255" />
        <button class="desc-clear" id="desc-clear" tabindex="-1">×</button>
      </div>
      <span class="elapsed" id="elapsed" title="Haz clic para editar el inicio del timer">0:00</span>
      <!-- Play (idle) -->
      <button class="play-btn" id="start-btn" title="Iniciar timer">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <!-- Stop (running, oculto por defecto) -->
      <button class="stop-btn hidden" id="stop-btn" title="Detener timer">
        <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
      </button>
      <!-- Entrada manual -->
      <button class="add-btn" id="add-btn" title="Añadir registro manual">+</button>
    </div>

    <!-- Fila de meta -->
    <div class="meta-row">
      <button class="meta-btn" id="timer-proj-btn" title="Proyecto">
        <svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
        <span class="edit-project-dot" id="timer-proj-dot" style="display:none"></span>
        <span id="timer-proj-label">Sin proyecto</span>
      </button>
      <button class="meta-btn" id="timer-tags-btn" title="Etiquetas">
        <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
        <span id="timer-tags-label"></span>
      </button>
      <button class="meta-btn" title="Facturable">
        <svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
      </button>
    </div>

    <p class="timer-error hidden" id="timer-error"></p>

    <!-- Historial -->
    <div class="history-section">
      <div class="history-header">
        <span class="history-title">Últimas imputaciones</span>
        <button class="refresh-btn" id="refresh-btn" title="Recargar">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1-1.76-4.24l-2.24 2.24H20V4l-2.35 2.35z"/>
          </svg>
        </button>
      </div>
      <div class="history-views">
        <button id="view-list-btn" class="history-view-btn active">Lista</button>
        <button id="view-calendar-btn" class="history-view-btn">Calendario</button>
        <button id="view-stats-btn" class="history-view-btn">Estadísticas</button>
      </div>
      <div id="entries-list-view">
        <div id="entries-list"><p class="entries-empty">Cargando…</p></div>
      </div>
      <div id="entries-calendar-view" class="calendar-view hidden">
        <div class="calendar-header">
          <div class="calendar-nav">
            <button id="calendar-prev-day" class="calendar-nav-btn" title="Día anterior">&#8592;</button>
            <button id="calendar-next-day" class="calendar-nav-btn" title="Día siguiente">&#8594;</button>
            <span id="calendar-day-label" class="calendar-day-label">Hoy</span>
          </div>
          <span id="calendar-total" class="calendar-total">0:00</span>
        </div>
        <div id="calendar-scroll" class="calendar-scroll">
          <div id="calendar-grid" class="calendar-grid"></div>
        </div>
        <p id="calendar-empty-hint" class="calendar-empty-hint hidden">No hay imputaciones para este día.</p>
        <div class="calendar-zoom-controls" title="Zoom del calendario">
          <button id="calendar-zoom-in" class="calendar-zoom-btn" title="Más detalle">+</button>
          <button id="calendar-zoom-out" class="calendar-zoom-btn" title="Menos detalle">&#8722;</button>
        </div>
      </div>
      <div id="entries-stats-view" class="stats-view hidden">
        <div class="stats-range">
          <button id="stats-range-today" class="stats-range-btn">Hoy</button>
          <button id="stats-range-week" class="stats-range-btn active">Semana</button>
          <button id="stats-range-month" class="stats-range-btn">Mes</button>
        </div>
        <div class="stats-summary">
          <div class="stats-card">
            <div id="stats-total-label" class="stats-card-label">Total semana</div>
            <div id="stats-total-time" class="stats-card-value">0:00:00</div>
          </div>
          <div class="stats-card">
            <div class="stats-card-label">Promedio diario</div>
            <div id="stats-avg-time" class="stats-card-value">0:00</div>
          </div>
        </div>
        <div class="stats-section">
          <div class="stats-section-title">Duración por día</div>
          <div class="stats-bars-shell">
            <div id="stats-y-axis" class="stats-y-axis"></div>
            <div class="stats-bars-scroll-wrap">
              <button id="stats-bars-prev" class="stats-bars-nav" title="Anterior">&#8249;</button>
              <div id="stats-bars-viewport" class="stats-bars-viewport">
                <div id="stats-bars-chart-wrap" class="stats-bars-chart-wrap">
                  <div id="stats-grid-lines" class="stats-grid-lines"></div>
                  <div id="stats-bars" class="stats-bars"></div>
                </div>
              </div>
              <button id="stats-bars-next" class="stats-bars-nav" title="Siguiente">&#8250;</button>
            </div>
          </div>
        </div>
        <div class="stats-section">
          <div class="stats-section-title">Distribución por proyecto</div>
          <div class="stats-project-layout">
            <div id="stats-donut" class="stats-donut">
              <span id="stats-donut-center" class="stats-donut-center">0:00</span>
            </div>
            <div id="stats-project-list" class="stats-project-list"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Picker de proyecto (oculto por defecto) -->
    <div class="proj-picker hidden" id="proj-picker">
      <div class="proj-picker-header">
        <span class="proj-picker-title">Proyecto</span>
        <button class="proj-picker-close" id="proj-picker-close">×</button>
      </div>
      <div class="proj-search-wrap">
        <input class="proj-search" id="proj-search" type="text" placeholder="Buscar proyecto…" />
      </div>
      <div class="proj-list" id="proj-list"><p class="entries-empty">Cargando…</p></div>
      <div class="proj-picker-footer">
        <button class="proj-create-btn" id="proj-create-btn">+ Crear un proyecto nuevo</button>
      </div>

      <div class="create-project-overlay hidden" id="create-project-overlay">
        <div class="create-project-modal">
          <div class="create-project-title">Crear proyecto</div>
          <div class="create-project-field">
            <span class="create-project-label">Nombre</span>
            <div class="create-project-name-row">
              <input id="create-project-name" class="create-project-input" type="text" maxlength="255" placeholder="Nombre del proyecto" />
              <button id="create-project-color-trigger" class="create-project-color-trigger" title="Color del proyecto">
                <span id="create-project-color-preview" class="create-project-color-preview"></span>
              </button>
            </div>
          </div>
          <div class="create-project-field">
            <span class="create-project-label">Cliente</span>
            <select id="create-project-client" class="create-project-select" disabled>
              <option>Sin cliente</option>
            </select>
          </div>
          <label class="create-project-check">
            <input id="create-project-private" type="checkbox" />
            <span>Proyecto privado</span>
          </label>
          <div id="create-project-colors" class="create-project-colors"></div>
          <p id="create-project-error" class="create-project-error"></p>
          <div class="create-project-actions">
            <button id="create-project-cancel" class="create-project-cancel">Cancelar</button>
            <button id="create-project-submit" class="create-project-submit" disabled>Crear proyecto</button>
          </div>
        </div>
      </div>
    </div>

    <div class="tag-picker hidden" id="tag-picker">
      <div class="tag-picker-header">
        <span class="tag-picker-title">Etiquetas</span>
        <button class="tag-picker-close" id="tag-picker-close">×</button>
      </div>
      <div class="tag-search-wrap">
        <input class="tag-search" id="tag-search" type="text" placeholder="Buscar o crear etiqueta…" />
      </div>
      <p id="tag-error" class="tag-error"></p>
      <div class="tag-list" id="tag-list"><p class="entries-empty">Cargando…</p></div>
      <div class="tag-picker-footer">
        <button class="tag-create-btn" id="tag-create-btn" disabled>+ Crear una etiqueta</button>
      </div>
    </div>

    <!-- Panel de edición (oculto por defecto) -->
    <div class="edit-panel hidden" id="edit-panel">
      <div class="edit-header">
        <span class="edit-title" id="edit-panel-title">Editar</span>
        <button class="edit-close" id="edit-close" title="Cerrar">×</button>
      </div>
      <div class="edit-body">
        <div class="edit-desc-wrap">
          <input id="edit-desc" class="edit-desc-input" type="text" maxlength="255" />
          <button class="edit-desc-clear" id="edit-desc-clear" tabindex="-1">×</button>
        </div>

        <!-- Proyecto y Tags -->
        <div class="edit-meta-row">
          <button class="edit-meta-btn" id="edit-project-btn">
            <span class="edit-project-dot" id="edit-project-dot"></span>
            <span id="edit-project-label">Sin proyecto</span>
          </button>
          <button class="edit-meta-btn" id="edit-tags-btn">
            <svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            <span id="edit-tags-label">Sin etiquetas</span>
          </button>
        </div>

        <!-- Inicio y Fin como inputs separados -->
        <div class="edit-times-row">
          <div class="edit-time-block">
            <span class="edit-time-label">Inicio</span>
            <div class="edit-time-input-wrap">
              <input type="time" id="edit-start-time" class="edit-time-input" step="60" />
              <span class="edit-cal-icon">
                <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
              </span>
              <input type="date" id="edit-start-date" title="Cambiar fecha" />
            </div>
            <span class="edit-date-display" id="edit-date-display"></span>
          </div>
          <span class="edit-time-arrow">→</span>
          <div class="edit-time-block">
            <span class="edit-time-label">Fin</span>
            <div class="edit-time-input-wrap">
              <input type="time" id="edit-stop-time" class="edit-time-input" step="60" />
            </div>
            <span class="edit-date-display">&nbsp;</span>
          </div>
        </div>
        <div class="edit-dur-row">
          <span class="edit-dur" id="edit-dur">—</span>
        </div>

        <p class="edit-error hidden" id="edit-error"></p>
        <div class="edit-actions">
          <button class="edit-delete" id="edit-delete">Eliminar</button>
          <button class="edit-save" id="edit-save">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Overlay: editar inicio del timer en curso -->
    <div class="rse-overlay hidden" id="rse-overlay">
      <div class="rse-card">
        <div class="rse-title">Inicio del timer</div>
        <div class="rse-row">
          <div class="rse-field">
            <label class="rse-label" for="rse-date">Fecha</label>
            <input type="date" id="rse-date" class="rse-input" />
          </div>
          <div class="rse-field">
            <label class="rse-label" for="rse-time">Hora</label>
            <input type="time" id="rse-time" class="rse-input" step="60" />
          </div>
        </div>
        <div class="rse-actions">
          <button class="rse-cancel" id="rse-cancel">Cancelar</button>
          <button class="rse-save" id="rse-save">Guardar</button>
        </div>
      </div>
    </div>
  </div>

<script>
  const vscode = acquireVsCodeApi();

  let entryId   = null;
  let startTime = null;
  let intervalId = null;
  let runningDescSyncTimeout = null;

  const loginView    = document.getElementById('login-view');
  const timerView    = document.getElementById('timer-view');
  const tokenInput   = document.getElementById('token-input');
  const loginError   = document.getElementById('login-error');
  const saveTokenBtn = document.getElementById('save-token-btn');
  const logoutBtn    = document.getElementById('logout-btn');
  const descInput    = document.getElementById('desc-input');
  const descClear    = document.getElementById('desc-clear');
  const elapsed      = document.getElementById('elapsed');
  const startBtn     = document.getElementById('start-btn');
  const stopBtn      = document.getElementById('stop-btn');
  const timerError   = document.getElementById('timer-error');
  const refreshBtn   = document.getElementById('refresh-btn');
  const entriesList  = document.getElementById('entries-list');
  const entriesListView = document.getElementById('entries-list-view');
  const entriesCalendarView = document.getElementById('entries-calendar-view');
  const entriesStatsView = document.getElementById('entries-stats-view');
  const viewListBtn = document.getElementById('view-list-btn');
  const viewCalendarBtn = document.getElementById('view-calendar-btn');
  const viewStatsBtn = document.getElementById('view-stats-btn');
  const calendarPrevDay = document.getElementById('calendar-prev-day');
  const calendarNextDay = document.getElementById('calendar-next-day');
  const calendarZoomIn = document.getElementById('calendar-zoom-in');
  const calendarZoomOut = document.getElementById('calendar-zoom-out');
  const calendarDayLabel = document.getElementById('calendar-day-label');
  const calendarTotal = document.getElementById('calendar-total');
  const calendarScroll = document.getElementById('calendar-scroll');
  const calendarEmptyHint = document.getElementById('calendar-empty-hint');
  const calendarGrid = document.getElementById('calendar-grid');
  const editPanel    = document.getElementById('edit-panel');
  const editClose    = document.getElementById('edit-close');
  const editDesc     = document.getElementById('edit-desc');
  const editDescClr  = document.getElementById('edit-desc-clear');
  const editStartTm  = document.getElementById('edit-start-time');
  const editStopTm   = document.getElementById('edit-stop-time');
  const editStartDate = document.getElementById('edit-start-date');
  const editDateDisp = document.getElementById('edit-date-display');
  const editDur      = document.getElementById('edit-dur');
  const editError    = document.getElementById('edit-error');
  const editDelete   = document.getElementById('edit-delete');
  const editSave     = document.getElementById('edit-save');
  const editProjectBtn  = document.getElementById('edit-project-btn');
  const editProjectLabel = document.getElementById('edit-project-label');
  const editProjectDot  = document.getElementById('edit-project-dot');
  const editTagsBtn = document.getElementById('edit-tags-btn');
  const editTagsLabel = document.getElementById('edit-tags-label');
  const projPicker   = document.getElementById('proj-picker');
  const projPickerClose = document.getElementById('proj-picker-close');
  const projSearch   = document.getElementById('proj-search');
  const projList     = document.getElementById('proj-list');
  const projCreateBtn = document.getElementById('proj-create-btn');
  const projPickerFooter = document.querySelector('.proj-picker-footer');
  const createProjectOverlay = document.getElementById('create-project-overlay');
  const createProjectName = document.getElementById('create-project-name');
  const createProjectClient = document.getElementById('create-project-client');
  const createProjectPrivate = document.getElementById('create-project-private');
  const createProjectColors = document.getElementById('create-project-colors');
  const createProjectColorTrigger = document.getElementById('create-project-color-trigger');
  const createProjectColorPreview = document.getElementById('create-project-color-preview');
  const createProjectError = document.getElementById('create-project-error');
  const createProjectCancel = document.getElementById('create-project-cancel');
  const createProjectSubmit = document.getElementById('create-project-submit');
  const tagPicker = document.getElementById('tag-picker');
  const tagPickerClose = document.getElementById('tag-picker-close');
  const tagSearch = document.getElementById('tag-search');
  const tagList = document.getElementById('tag-list');
  const tagError = document.getElementById('tag-error');
  const tagCreateBtn = document.getElementById('tag-create-btn');
  const tagPickerFooter = document.querySelector('.tag-picker-footer');
  const timerProjBtn   = document.getElementById('timer-proj-btn');
  const timerProjDot   = document.getElementById('timer-proj-dot');
  const timerProjLabel = document.getElementById('timer-proj-label');
  const timerTagsBtn   = document.getElementById('timer-tags-btn');
  const timerTagsLabel = document.getElementById('timer-tags-label');
  const statsTotalTime = document.getElementById('stats-total-time');
  const statsTotalLabel = document.getElementById('stats-total-label');
  const statsAvgTime = document.getElementById('stats-avg-time');
  const statsBars = document.getElementById('stats-bars');
  const statsYAxis = document.getElementById('stats-y-axis');
  const statsGridLines = document.getElementById('stats-grid-lines');
  const statsBarsChartWrap = document.getElementById('stats-bars-chart-wrap');
  const statsBarsViewport = document.getElementById('stats-bars-viewport');
  const statsBarsPrev = document.getElementById('stats-bars-prev');
  const statsBarsNext = document.getElementById('stats-bars-next');
  const statsDonut = document.getElementById('stats-donut');
  const statsDonutCenter = document.getElementById('stats-donut-center');
  const statsProjectList = document.getElementById('stats-project-list');
  const statsRangeTodayBtn = document.getElementById('stats-range-today');
  const statsRangeWeekBtn = document.getElementById('stats-range-week');
  const statsRangeMonthBtn = document.getElementById('stats-range-month');
  const addBtn = document.getElementById('add-btn');
  const rseOverlay = document.getElementById('rse-overlay');
  const rseDate = document.getElementById('rse-date');
  const rseTime = document.getElementById('rse-time');
  const rseCancel = document.getElementById('rse-cancel');
  const rseSave = document.getElementById('rse-save');

  let editingEntry = null;
  let editStartDateISO = '';
  let selectedProjectId = null;
  let selectedProjectColor = null;
  let allProjects = [];
  let latestEntries = [];
  let activeHistoryView = 'list';
  let calendarDate = new Date();
  let calendarZoomMinutes = 60;
  const CALENDAR_ZOOMS = [60, 30, 15];
  const CALENDAR_EVENT_BG_ALPHA = '';
  const CALENDAR_NO_PROJECT_COLOR = '#3d3a3d';
  let createProjectColor = '#d8dbe5';
  const PROJECT_COLORS = ['#0b83d9', '#9e5bd9', '#d94182', '#e36a00', '#bf7000', '#2da608', '#06a893', '#7ddd49', '#c9806b', '#465bb3', '#990099', '#c7af14', '#566614'];
  let allTags = [];
  let selectedTagIds = [];
  let pickerMode = 'edit'; // 'edit' | 'timer'
  let timerProjectId = null;
  let timerProjectColor = null;
  let timerTagIds = [];
  let statsRange = 'week';
  const STATS_COLORS = ['#28a745', '#5b5f66', '#0b83d9', '#d94182', '#e36a00', '#9e5bd9', '#06a893'];
  const STATS_AXIS_STEPS = 4;
  let createMode = false;

  if (projPickerFooter) { projPickerFooter.style.display = 'none'; }
  if (tagPickerFooter) { tagPickerFooter.style.display = 'none'; }

  // ── Helpers ───────────────────────────────────────
  function pad(n) { return String(n).padStart(2, '0'); }

  function formatElapsed(ms) {
    const totalSecs = Math.floor(ms / 1000);
    if (totalSecs < 60) {
      return totalSecs + ' seg';
    } else if (totalSecs < 3600) {
      const m = Math.floor(totalSecs / 60);
      const s = totalSecs % 60;
      return m + ':' + pad(s) + ' min';
    } else {
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      return pad(h) + ':' + pad(m) + ':' + pad(s);
    }
  }

  function isCalendarVisible() {
    return !entriesCalendarView.classList.contains('hidden');
  }

  function startTick() {
    intervalId = setInterval(() => {
      elapsed.textContent = formatElapsed(Date.now() - startTime);
      if (entryId && startTime && isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }, 1000);
  }

  function stopTick() {
    clearInterval(intervalId);
    intervalId = null;
    elapsed.textContent = '0 seg';
    elapsed.classList.remove('running');
  }

  function setRunningUI(running) {
    startBtn.classList.toggle('hidden', running);
    stopBtn.classList.toggle('hidden', !running);
    descClear.style.display = (!running && descInput.value) ? 'block' : 'none';
    elapsed.classList.toggle('running', running);
    stopBtn.disabled = false;
    startBtn.disabled = false;
  }

  function scheduleRunningDescriptionSync() {
    if (runningDescSyncTimeout) {
      clearTimeout(runningDescSyncTimeout);
    }
    if (!entryId || !startTime) {
      return;
    }
    runningDescSyncTimeout = setTimeout(() => {
      runningDescSyncTimeout = null;
      if (!entryId || !startTime) {
        return;
      }
      vscode.postMessage({
        command: 'updateRunningDescription',
        entryId,
        description: descInput.value.trim(),
      });
    }, 5000);
  }

  function syncRunningDescriptionLocal(description) {
    if (!entryId) {
      return;
    }
    latestEntries = latestEntries.map(e => (
      Number(e.id) === Number(entryId)
        ? { ...e, description }
        : e
    ));
  }

  function syncRunningDescriptionInCalendarDom(description) {
    if (!entryId || !isCalendarVisible()) {
      return;
    }
    const normalized = String(description ?? '').trim() || 'Sin título';
    const event = calendarGrid.querySelector('.calendar-event[data-cal-id="' + entryId + '"]');
    if (!event) {
      return;
    }
    const titleNode = event.querySelector('.calendar-event-title');
    if (titleNode) {
      titleNode.textContent = normalized;
    }
  }

  function showView(hasToken) {
    loginView.style.display = hasToken ? 'none' : 'block';
    timerView.style.display = hasToken ? 'flex' : 'none';
  }

  function showTimerError(text) {
    timerError.textContent = text;
    timerError.classList.remove('hidden');
    setTimeout(() => timerError.classList.add('hidden'), 4000);
  }

  // ── Mensajes desde la extensión ───────────────────
  window.addEventListener('message', (event) => {
    const msg = event.data;
    switch (msg.command) {
      case 'init':
        showView(msg.hasToken);
        if (msg.hasToken) {
          if (msg.runningTimer) {
            entryId   = msg.runningTimer.id;
            startTime = new Date(msg.runningTimer.start).getTime();
            descInput.value = msg.runningTimer.description || '';
            descClear.style.display = descInput.value ? 'block' : 'none';
            setRunningUI(true);
            startTick();
          } else {
            setRunningUI(false);
          }
          vscode.postMessage({ command: 'loadEntries' });
          if (allProjects.length === 0) {
            vscode.postMessage({ command: 'loadProjects' });
          }
        } else if (runningDescSyncTimeout) {
          clearTimeout(runningDescSyncTimeout);
          runningDescSyncTimeout = null;
        }
        break;

      case 'tokenError':
        loginError.textContent = msg.text;
        saveTokenBtn.disabled = false;
        saveTokenBtn.textContent = 'Conectar';
        break;

      case 'tokenSaved':
        loginError.textContent = '';
        showView(true);
        setRunningUI(false);
        vscode.postMessage({ command: 'loadEntries' });
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;

      case 'timerStarted':
        entryId   = msg.entryId;
        startTime = new Date(msg.start).getTime();
        descInput.value = msg.description || '';
        descClear.style.display = descInput.value ? 'block' : 'none';
        setRunningUI(true);
        startTick();
        if (isCalendarVisible()) {
          renderCalendar(latestEntries);
        }
        break;

      case 'timerStopped':
        entryId   = null;
        startTime = null;
        if (runningDescSyncTimeout) {
          clearTimeout(runningDescSyncTimeout);
          runningDescSyncTimeout = null;
        }
        stopTick();
        setRunningUI(false);
        descInput.value = '';
        descClear.style.display = 'none';
        timerProjectId = null; timerProjectColor = null; timerTagIds = [];
        applyTimerProjectSelection(null, null, null);
        applyTimerTagSelection();
        if (isCalendarVisible()) {
          renderCalendar(latestEntries);
        }
        vscode.postMessage({ command: 'loadEntries' });
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;

      case 'timerError':
        showTimerError(msg.text);
        break;

      case 'runningDescriptionUpdated':
        if (Number(msg.entryId) === Number(entryId)) {
          const desc = String(msg.description ?? '').trim();
          syncRunningDescriptionLocal(desc);
          syncRunningDescriptionInCalendarDom(desc);
          if (activeHistoryView === 'list') {
            renderEntries(latestEntries);
          }
          if (isCalendarVisible()) {
            renderCalendar(latestEntries);
          }
        }
        break;

      case 'entriesLoaded':
        latestEntries = msg.entries || [];
        renderEntries(latestEntries);
        renderCalendar(latestEntries);
        renderStats(latestEntries);
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;

      case 'entriesError':
        entriesList.innerHTML = '<p class="entries-empty" style="color:var(--vscode-errorForeground)">Error: ' + esc(msg.text) + '</p>';
        calendarGrid.innerHTML = '<p class="entries-empty" style="color:var(--vscode-errorForeground)">Error: ' + esc(msg.text) + '</p>';
        break;
      case 'projectsLoaded':
        allProjects = msg.projects || [];
        renderProjList(projSearch.value);
        renderEntries(latestEntries);
        renderCalendar(latestEntries);
        renderStats(latestEntries);
        break;

      case 'tagsLoaded':
        allTags = msg.tags || [];
        renderTagList(tagSearch.value);
        break;

      case 'projectCreated': {
        const project = msg.project;
        allProjects = [project, ...allProjects.filter(p => p.id !== project.id)];
        applyProjectSelection(project.id, project.name, project.color);
        createProjectOverlay.classList.add('hidden');
        projPicker.classList.add('hidden');
        renderProjList(projSearch.value);
        createProjectSubmit.disabled = false;
        createProjectSubmit.textContent = 'Crear proyecto';
        break;
      }

      case 'createProjectError':
        createProjectError.textContent = msg.text;
        createProjectSubmit.disabled = false;
        createProjectSubmit.textContent = 'Crear proyecto';
        break;

      case 'tagCreated': {
        const tag = msg.tag;
        allTags = [tag, ...allTags.filter(t => t.id !== tag.id)];
        if (pickerMode === 'timer') {
          if (!timerTagIds.includes(tag.id)) {
            timerTagIds = [...timerTagIds, tag.id];
          }
          applyTimerTagSelection();
        } else {
          if (!selectedTagIds.includes(tag.id)) {
            selectedTagIds = [...selectedTagIds, tag.id];
          }
          applyTagSelection();
        }
        tagSearch.value = '';
        tagError.textContent = '';
        renderTagList('');
        break;
      }

      case 'createTagError':
        tagError.textContent = msg.text;
        tagCreateBtn.disabled = false;
        break;

      case 'editSaved':
        editPanel.classList.add('hidden');
        createMode = false;
        vscode.postMessage({ command: 'loadEntries' });
        break;

      case 'editError':
        editError.textContent = msg.text;
        editError.classList.remove('hidden');
        editSave.disabled = false;
        editDelete.disabled = false;
        break;
    }
  });

  // ── Eventos ────────────────────────────────────────
  saveTokenBtn.addEventListener('click', () => {
    loginError.textContent = '';
    saveTokenBtn.disabled = true;
    saveTokenBtn.textContent = 'Verificando…';
    vscode.postMessage({ command: 'saveToken', token: tokenInput.value.trim() });
  });

  logoutBtn.addEventListener('click', () => {
    if (runningDescSyncTimeout) {
      clearTimeout(runningDescSyncTimeout);
      runningDescSyncTimeout = null;
    }
    stopTick();
    setRunningUI(false);
    descInput.value = '';
    vscode.postMessage({ command: 'logout' });
  });

  descInput.addEventListener('input', () => {
    descClear.style.display = descInput.value ? 'block' : 'none';
    if (entryId && startTime) {
      const currentDescription = descInput.value.trim();
      syncRunningDescriptionLocal(currentDescription);
      syncRunningDescriptionInCalendarDom(currentDescription);
      vscode.postMessage({
        command: 'setStatusBarDescription',
        description: currentDescription,
      });
      if (activeHistoryView === 'list') {
        renderEntries(latestEntries);
      }
      if (isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }
    scheduleRunningDescriptionSync();
  });

  descClear.addEventListener('click', () => {
    descInput.value = '';
    descClear.style.display = 'none';
    if (entryId && startTime) {
      syncRunningDescriptionLocal('');
      syncRunningDescriptionInCalendarDom('');
      vscode.postMessage({
        command: 'setStatusBarDescription',
        description: '',
      });
      if (activeHistoryView === 'list') {
        renderEntries(latestEntries);
      }
      if (isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }
    scheduleRunningDescriptionSync();
    descInput.focus();
  });

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    vscode.postMessage({
      command: 'startTimer',
      description: descInput.value.trim(),
      project_id: timerProjectId,
      tag_ids: timerTagIds,
    });
  });

  stopBtn.addEventListener('click', () => {
    if (!entryId) { return; }
    stopBtn.disabled = true;
    vscode.postMessage({ command: 'stopTimer', entryId });
  });

  // ── Panel de edición ───────────────────────────────
  function toDateInput(iso) {
    if (!iso) { return ''; }
    const d = new Date(iso);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function fmtDateDisplay(dateStr) {
    // dateStr = YYYY-MM-DD
    if (!dateStr) { return ''; }
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) { return 'Hoy'; }
    if (d.toDateString() === yesterday.toDateString()) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function toTimeInput(iso) {
    if (!iso) { return ''; }
    const d = new Date(iso);
    return d.toTimeString().slice(0, 5); // HH:MM
  }

  function buildISO(baseDateStr, timeStr) {
    // baseDateStr = YYYY-MM-DD, timeStr = HH:MM
    return new Date(baseDateStr + 'T' + timeStr + ':00').toISOString();
  }

  function updateEditDur() {
    const s = editStartTm.value;
    const e = editStopTm.value;
    if (!s || !e) { editDur.textContent = '—'; return; }
    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) { mins += 24 * 60; }
    const h = Math.floor(mins / 60);
    const mo = mins % 60;
    editDur.textContent = h > 0 ? h + ' h ' + (mo > 0 ? mo + ' min' : '') : mo + ' min';
  }

  function openEditPanel(entry) {
    editingEntry = entry;
    editStartDateISO = toDateInput(entry.start);
    editDesc.value = entry.description || '';
    editDescClr.style.display = editDesc.value ? 'block' : 'none';
    editStartTm.value  = toTimeInput(entry.start);
    editStopTm.value   = toTimeInput(entry.stop);
    editStartDate.value = editStartDateISO;
    editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
    // Proyecto
    selectedProjectId = entry.project_id ?? null;
    selectedProjectColor = entry.project_color ?? null;
    applyProjectSelection(selectedProjectId, entry.project_name ?? null, selectedProjectColor);
    selectedTagIds = Array.isArray(entry.tag_ids) ? [...entry.tag_ids] : [];
    applyTagSelection(entry.tags ?? []);
    updateEditDur();
    editError.classList.add('hidden');
    editSave.disabled = false;
    editDelete.disabled = false;
    editPanel.classList.remove('hidden');
    editDesc.focus();
    // Cargar proyectos si aún no se han cargado
    if (allProjects.length === 0) {
      vscode.postMessage({ command: 'loadProjects' });
    }
    if (allTags.length === 0) {
      vscode.postMessage({ command: 'loadTags' });
    }
  }

  editClose.addEventListener('click', () => {
    createMode = false;
    editPanel.classList.add('hidden');
    const titleEl = document.getElementById('edit-panel-title');
    if (titleEl) { titleEl.textContent = 'Editar'; }
    document.getElementById('edit-save').textContent = 'Guardar';
    document.getElementById('edit-delete').style.display = '';
  });

  // ── Picker de proyecto ───────────────────────────────
  function applyProjectSelection(id, name, color) {
    selectedProjectId = id;
    selectedProjectColor = color;
    if (id) {
      editProjectLabel.textContent = name || 'Proyecto';
      editProjectDot.style.background = color || '#999';
      editProjectBtn.classList.add('active');
    } else {
      editProjectLabel.textContent = 'Sin proyecto';
      editProjectDot.style.background = 'var(--vscode-descriptionForeground)';
      editProjectBtn.classList.remove('active');
    }
  }

  function applyTagSelection(entryTagNames) {
    const names = allTags
      .filter(tag => selectedTagIds.includes(tag.id))
      .map(tag => tag.name);
    const fallbackNames = Array.isArray(entryTagNames) ? entryTagNames : [];
    const finalNames = names.length ? names : fallbackNames;
    if (!finalNames.length) {
      editTagsLabel.textContent = 'Sin etiquetas';
      editTagsBtn.classList.remove('active');
      return;
    }
    editTagsLabel.textContent = finalNames.length <= 2 ? finalNames.join(', ') : finalNames.length + ' etiquetas';
    editTagsBtn.classList.add('active');
  }

  function applyTimerProjectSelection(id, name, color) {
    timerProjectId = id;
    timerProjectColor = color;
    if (id) {
      timerProjLabel.textContent = name || 'Proyecto';
      timerProjDot.style.background = color || '#999';
      timerProjDot.style.display = 'inline-block';
      timerProjBtn.classList.add('active');
    } else {
      timerProjLabel.textContent = 'Sin proyecto';
      timerProjDot.style.display = 'none';
      timerProjBtn.classList.remove('active');
    }
  }

  function applyTimerTagSelection() {
    const names = allTags.filter(tag => timerTagIds.includes(tag.id)).map(tag => tag.name);
    if (!names.length) {
      timerTagsLabel.textContent = '';
      timerTagsBtn.classList.remove('active');
    } else {
      timerTagsLabel.textContent = names.length <= 2 ? names.join(', ') : names.length + ' etiquetas';
      timerTagsBtn.classList.add('active');
    }
  }

  function renderProjList(query) {
    const q = (query || '').toLowerCase();
    const filtered = allProjects.filter(p => p.name.toLowerCase().includes(q));
    const activeId = pickerMode === 'timer' ? timerProjectId : selectedProjectId;

    // Agrupar por cliente
    const clientMap = {};
    for (const p of filtered) {
      const key = p.client_name || '__none__';
      if (!clientMap[key]) { clientMap[key] = []; }
      clientMap[key].push(p);
    }

    let html = '<div class="proj-none" id="proj-select-none">'
      + '<span class="proj-none-dot"></span>'
      + 'Sin proyecto'
      + (activeId === null ? ' <span style="margin-left:auto;color:${TOGGL_COLOR};font-weight:700">&#10003;</span>' : '')
      + '</div>';

    const noClient = clientMap['__none__'] || [];
    delete clientMap['__none__'];

    if (noClient.length) {
      html += '<div class="proj-client-label">Sin cliente</div>';
      html += noClient.map(p => projItemHtml(p, activeId)).join('');
    }

    for (const [client, projs] of Object.entries(clientMap)) {
      html += '<div class="proj-client-label">' + esc(client) + '</div>';
      html += projs.map(p => projItemHtml(p, activeId)).join('');
    }

    if (!filtered.length) {
      html = '<p class="entries-empty">No se encontraron proyectos.</p>';
    }

    projList.innerHTML = html;

    const createWrap = document.createElement('div');
    createWrap.className = 'proj-create-inline';
    createWrap.appendChild(projCreateBtn);
    projList.appendChild(createWrap);

    projList.querySelector('#proj-select-none')?.addEventListener('click', () => {
      if (pickerMode === 'timer') { applyTimerProjectSelection(null, null, null); }
      else { applyProjectSelection(null, null, null); }
      projPicker.classList.add('hidden');
    });
    projList.querySelectorAll('.proj-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.getAttribute('data-proj-id'));
        const p = allProjects.find(x => x.id === id);
        if (p) {
          if (pickerMode === 'timer') { applyTimerProjectSelection(p.id, p.name, p.color); }
          else { applyProjectSelection(p.id, p.name, p.color); }
        }
        projPicker.classList.add('hidden');
      });
    });
  }

  function projItemHtml(p, activeId) {
    const check = (activeId === p.id)
      ? '<span class="proj-item-check">&#10003;</span>' : '';
    return '<div class="proj-item" data-proj-id="' + p.id + '">'
      + '<div class="proj-item-left">'
      +   '<span class="proj-item-dot" style="background:' + esc(p.color) + '"></span>'
      +   esc(p.name)
      + '</div>'
      + check
      + '</div>';
  }

  function renderTagList(query) {
    const q = (query || '').trim().toLowerCase();
    const filtered = allTags.filter(tag => tag.name.toLowerCase().includes(q));
    tagCreateBtn.textContent = q ? '+ Crear etiqueta "' + query.trim() + '"' : '+ Crear una etiqueta';
    tagCreateBtn.disabled = !q || allTags.some(tag => tag.name.toLowerCase() === q);
    const activeTagIds = pickerMode === 'timer' ? timerTagIds : selectedTagIds;

    if (!filtered.length) {
      tagList.innerHTML = '<p class="entries-empty">No se encontraron etiquetas.</p>';
    } else {
      tagList.innerHTML = filtered.map(tag => {
        const selected = activeTagIds.includes(tag.id);
        return '<div class="tag-item' + (selected ? ' selected' : '') + '" data-tag-id="' + tag.id + '">'
          + '<span class="tag-checkbox">' + (selected ? '&#10003;' : '') + '</span>'
          + '<span class="tag-name">' + esc(tag.name) + '</span>'
          + '</div>';
      }).join('');
    }

    const createWrap = document.createElement('div');
    createWrap.className = 'tag-create-inline';
    createWrap.appendChild(tagCreateBtn);
    tagList.appendChild(createWrap);

    tagList.querySelectorAll('.tag-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.getAttribute('data-tag-id'));
        if (pickerMode === 'timer') {
          if (timerTagIds.includes(id)) { timerTagIds = timerTagIds.filter(t => t !== id); }
          else { timerTagIds = [...timerTagIds, id]; }
          applyTimerTagSelection();
        } else {
          if (selectedTagIds.includes(id)) { selectedTagIds = selectedTagIds.filter(tagId => tagId !== id); }
          else { selectedTagIds = [...selectedTagIds, id]; }
          applyTagSelection();
        }
        renderTagList(tagSearch.value);
      });
    });
  }

  function syncCreateProjectState() {
    const hasName = Boolean(createProjectName.value.trim());
    createProjectSubmit.disabled = !hasName;
    createProjectColorPreview.style.background = createProjectColor;
  }

  function renderCreateProjectColors() {
    createProjectColors.innerHTML = PROJECT_COLORS.map(color =>
      '<button class="create-project-color-option' + (color === createProjectColor ? ' selected' : '') + '"'
      + ' data-color="' + color + '" style="background:' + color + '" title="' + color + '"></button>'
    ).join('');
    createProjectColors.querySelectorAll('.create-project-color-option').forEach(btn => {
      btn.addEventListener('click', () => {
        createProjectColor = btn.getAttribute('data-color') || '#d8dbe5';
        renderCreateProjectColors();
        syncCreateProjectState();
      });
    });
  }

  function openCreateProjectModal() {
    createProjectName.value = '';
    createProjectClient.selectedIndex = 0;
    createProjectPrivate.checked = false;
    createProjectColor = '#d8dbe5';
    createProjectError.textContent = '';
    createProjectSubmit.textContent = 'Crear proyecto';
    renderCreateProjectColors();
    syncCreateProjectState();
    createProjectOverlay.classList.remove('hidden');
    createProjectName.focus();
  }

  function closeCreateProjectModal() {
    createProjectOverlay.classList.add('hidden');
    createProjectError.textContent = '';
    createProjectSubmit.disabled = false;
    createProjectSubmit.textContent = 'Crear proyecto';
  }

  editProjectBtn.addEventListener('click', () => {
    pickerMode = 'edit';
    projSearch.value = '';
    renderProjList('');
    projPicker.classList.remove('hidden');
    projSearch.focus();
  });

  projPickerClose.addEventListener('click', () => projPicker.classList.add('hidden'));

  projSearch.addEventListener('input', () => renderProjList(projSearch.value));
  projCreateBtn.addEventListener('click', () => openCreateProjectModal());
  createProjectColorTrigger.addEventListener('click', () => {
    const nextIndex = (PROJECT_COLORS.indexOf(createProjectColor) + 1) % PROJECT_COLORS.length;
    createProjectColor = PROJECT_COLORS[nextIndex];
    renderCreateProjectColors();
    syncCreateProjectState();
  });
  createProjectName.addEventListener('input', () => {
    createProjectError.textContent = '';
    syncCreateProjectState();
  });
  createProjectCancel.addEventListener('click', () => closeCreateProjectModal());
  createProjectOverlay.addEventListener('click', (ev) => {
    if (ev.target === createProjectOverlay) {
      closeCreateProjectModal();
    }
  });
  createProjectSubmit.addEventListener('click', () => {
    const name = createProjectName.value.trim();
    if (!name) {
      createProjectError.textContent = 'Escribe un nombre para el proyecto.';
      syncCreateProjectState();
      return;
    }
    createProjectError.textContent = '';
    createProjectSubmit.disabled = true;
    createProjectSubmit.textContent = 'Creando…';
    vscode.postMessage({
      command: 'createProject',
      name,
      color: createProjectColor,
      isPrivate: createProjectPrivate.checked,
    });
  });

  editTagsBtn.addEventListener('click', () => {
    pickerMode = 'edit';
    tagError.textContent = '';
    tagSearch.value = '';
    renderTagList('');
    tagPicker.classList.remove('hidden');
    tagSearch.focus();
    if (allTags.length === 0) {
      vscode.postMessage({ command: 'loadTags' });
    }
  });

  timerProjBtn.addEventListener('click', () => {
    pickerMode = 'timer';
    projSearch.value = '';
    renderProjList('');
    projPicker.classList.remove('hidden');
    projSearch.focus();
    if (allProjects.length === 0) { vscode.postMessage({ command: 'loadProjects' }); }
  });

  timerTagsBtn.addEventListener('click', () => {
    pickerMode = 'timer';
    tagError.textContent = '';
    tagSearch.value = '';
    renderTagList('');
    tagPicker.classList.remove('hidden');
    tagSearch.focus();
    if (allTags.length === 0) { vscode.postMessage({ command: 'loadTags' }); }
  });

  tagPickerClose.addEventListener('click', () => tagPicker.classList.add('hidden'));
  tagSearch.addEventListener('input', () => {
    tagError.textContent = '';
    renderTagList(tagSearch.value);
  });
  tagCreateBtn.addEventListener('click', () => {
    const name = tagSearch.value.trim();
    if (!name) { return; }
    tagError.textContent = '';
    tagCreateBtn.disabled = true;
    vscode.postMessage({ command: 'createTag', name });
  });

  // Input date nativo abre el picker al hacer clic en el icono de calendario
  editStartDate.addEventListener('change', () => {
    editStartDateISO = editStartDate.value; // YYYY-MM-DD
    editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
  });

  editDesc.addEventListener('input', () => {
    editDescClr.style.display = editDesc.value ? 'block' : 'none';
  });
  editDescClr.addEventListener('click', () => {
    editDesc.value = ''; editDescClr.style.display = 'none'; editDesc.focus();
  });

  editStartTm.addEventListener('input', updateEditDur);
  editStopTm.addEventListener('input', updateEditDur);

  editSave.addEventListener('click', () => {
    editSave.disabled = true;
    editError.classList.add('hidden');
    const startISO = buildISO(editStartDateISO, editStartTm.value);
    if (createMode) {
      const stopISO = buildISO(editStartDateISO, editStopTm.value);
      vscode.postMessage({
        command: 'createManualEntry',
        description: editDesc.value.trim() || 'Sin título',
        start: startISO,
        stop: stopISO,
        project_id: selectedProjectId ?? null,
        tag_ids: selectedTagIds,
        tags: selectedTagIds.map(id => { const t = allTags.find(x => x.id === id); return t ? t.name : null; }).filter(n => n !== null),
      });
      return;
    }
    if (!editingEntry) { editSave.disabled = false; return; }
    const stopDateISO = editingEntry.stop
      ? toDateInput(editingEntry.stop)
      : editStartDateISO;
    const stopISO  = buildISO(stopDateISO, editStopTm.value);
    vscode.postMessage({
      command: 'updateEntry',
      id: editingEntry.id,
      description: editDesc.value.trim() || 'Sin título',
      start: startISO,
      stop: stopISO,
      project_id: selectedProjectId ?? null,
      tag_ids: selectedTagIds,
      tags: selectedTagIds.map(id => { const t = allTags.find(x => x.id === id); return t ? t.name : null; }).filter(n => n !== null),
    });
  });

  editDelete.addEventListener('click', () => {
    if (!editingEntry) { return; }
    editDelete.disabled = true;
    editError.classList.add('hidden');
    vscode.postMessage({ command: 'deleteEntry', id: editingEntry.id });
  });

  // ── Entrada manual (ícono +) ────────────────────────
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      createMode = true;
      const titleEl = document.getElementById('edit-panel-title');
      if (titleEl) { titleEl.textContent = 'Nuevo registro'; }
      document.getElementById('edit-save').textContent = 'Crear';
      document.getElementById('edit-delete').style.display = 'none';
      editingEntry = null;
      editDesc.value = '';
      editDescClr.style.display = 'none';
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3600000);
      editStartDateISO = toDateInput(now.toISOString());
      editStartTm.value = toTimeInput(oneHourAgo.toISOString());
      editStopTm.value  = toTimeInput(now.toISOString());
      editStartDate.value = editStartDateISO;
      editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
      selectedProjectId = null; selectedProjectColor = null;
      applyProjectSelection(null, null, null);
      selectedTagIds = [];
      applyTagSelection([]);
      updateEditDur();
      editError.classList.add('hidden');
      editSave.disabled = false;
      editDelete.disabled = false;
      editPanel.classList.remove('hidden');
      editDesc.focus();
      if (allProjects.length === 0) { vscode.postMessage({ command: 'loadProjects' }); }
      if (allTags.length === 0) { vscode.postMessage({ command: 'loadTags' }); }
    });
  }

  // ── Editar inicio del timer en curso ─────────────────
  elapsed.addEventListener('click', () => {
    if (!startTime || !entryId) { return; }
    const local = new Date(startTime - new Date().getTimezoneOffset() * 60000).toISOString();
    rseDate.value = local.slice(0, 10);
    rseTime.value = local.slice(11, 16);
    rseOverlay.classList.remove('hidden');
  });

  rseCancel.addEventListener('click', () => rseOverlay.classList.add('hidden'));
  rseOverlay.addEventListener('click', (ev) => {
    if (ev.target === rseOverlay) { rseOverlay.classList.add('hidden'); }
  });
  rseSave.addEventListener('click', () => {
    if (!rseDate.value || !rseTime.value || !entryId) { rseOverlay.classList.add('hidden'); return; }
    const localDateTime = rseDate.value + 'T' + rseTime.value + ':00';
    const parsed = new Date(localDateTime);
    if (Number.isNaN(parsed.getTime())) { return; }
    const newStartIso = parsed.toISOString();
    startTime = parsed.getTime();
    rseOverlay.classList.add('hidden');
    vscode.postMessage({ command: 'updateRunningStart', entryId, start: newStartIso });
  });

  // ── Historial ──────────────────────────────────────────
  function fmtDuration(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return h > 0 ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s);
  }

  function dayKey(iso) {
    return new Date(iso).toDateString();
  }

  function dayLabel(iso) {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) { return 'Hoy'; }
    if (d.toDateString() === yesterday.toDateString()) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function fmtTime(iso) {
    return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  function fmtDayTotal(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) { return h + ' h ' + (m > 0 ? m + ' min' : ''); }
    return m + ' min';
  }

  function calendarDayStart(d) {
    const s = new Date(d);
    s.setHours(0, 0, 0, 0);
    return s;
  }

  function calendarDayEnd(d) {
    const e = calendarDayStart(d);
    e.setDate(e.getDate() + 1);
    return e;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  function setHistoryView(view) {
    activeHistoryView = view;
    const isList = view === 'list';
    const isCalendar = view === 'calendar';
    const isStats = view === 'stats';
    entriesListView.classList.toggle('hidden', !isList);
    entriesCalendarView.classList.toggle('hidden', !isCalendar);
    entriesCalendarView.classList.toggle('visible', isCalendar);
    entriesStatsView.classList.toggle('hidden', !isStats);
    viewListBtn.classList.toggle('active', isList);
    viewCalendarBtn.classList.toggle('active', isCalendar);
    viewStatsBtn.classList.toggle('active', isStats);
    if (isCalendar) {
      renderCalendar(latestEntries);
      if (allProjects.length === 0) {
        vscode.postMessage({ command: 'loadProjects' });
      }
    }
    if (isStats) {
      renderStats(latestEntries);
    }
  }

  function fmtHms(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  function weekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function monthStart(date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function dayStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function computeOverlapSecs(entry, start, end) {
    const entryStart = new Date(entry.start);
    const entryStop = entry.stop
      ? new Date(entry.stop)
      : new Date(entryStart.getTime() + (entry.duration * 1000));
    const clippedStart = entryStart > start ? entryStart : start;
    const clippedEnd = entryStop < end ? entryStop : end;
    return Math.max(0, Math.round((clippedEnd.getTime() - clippedStart.getTime()) / 1000));
  }

  function getStatsRangeConfig(range) {
    const now = new Date();
    if (range === 'today') {
      const start = dayStart(now);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const bins = Array.from({ length: 24 }, (_, hour) => {
        const s = new Date(start);
        s.setHours(hour, 0, 0, 0);
        const e = new Date(s);
        e.setHours(hour + 1, 0, 0, 0);
        return {
          start: s,
          end: e,
          label: hour % 3 === 0 ? pad(hour) : '',
        };
      });
      return { start, end, bins, totalLabel: 'Total hoy' };
    }

    if (range === 'month') {
      const start = monthStart(now);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const dayCount = Math.round((end.getTime() - start.getTime()) / 86400000);
      const bins = Array.from({ length: dayCount }, (_, idx) => {
        const s = new Date(start);
        s.setDate(start.getDate() + idx);
        const e = new Date(s);
        e.setDate(e.getDate() + 1);
        const dayNum = s.getDate();
        const showLabel = dayNum === 1 || dayNum % 5 === 0 || idx === dayCount - 1;
        return {
          start: s,
          end: e,
          label: showLabel ? String(dayNum) : '',
        };
      });
      return { start, end, bins, totalLabel: 'Total mes' };
    }

    const start = weekStart(now);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const bins = Array.from({ length: 7 }, (_, idx) => {
      const s = new Date(start);
      s.setDate(start.getDate() + idx);
      const e = new Date(s);
      e.setDate(e.getDate() + 1);
      return {
        start: s,
        end: e,
        label: s.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' }),
      };
    });
    return { start, end, bins, totalLabel: 'Total semana' };
  }

  function setStatsRange(nextRange) {
    statsRange = nextRange;
    statsRangeTodayBtn.classList.toggle('active', nextRange === 'today');
    statsRangeWeekBtn.classList.toggle('active', nextRange === 'week');
    statsRangeMonthBtn.classList.toggle('active', nextRange === 'month');
    if (statsBarsViewport) {
      statsBarsViewport.scrollLeft = 0;
    }
    renderStats(latestEntries);
  }

  function updateStatsScrollButtons() {
    if (!statsBarsViewport || !statsBarsPrev || !statsBarsNext) { return; }
    const maxScroll = Math.max(0, statsBarsViewport.scrollWidth - statsBarsViewport.clientWidth);
    statsBarsPrev.disabled = statsBarsViewport.scrollLeft <= 1;
    statsBarsNext.disabled = statsBarsViewport.scrollLeft >= (maxScroll - 1);
  }

  function renderStats(entries) {
    if (!statsBars || !statsProjectList || !statsDonut || !statsDonutCenter || !statsYAxis || !statsGridLines || !statsBarsChartWrap) { return; }

    const { start, end, bins, totalLabel } = getStatsRangeConfig(statsRange);
    const rangeEntries = (entries || []).filter(e => {
      const es = new Date(e.start);
      const ee = e.stop ? new Date(e.stop) : new Date(es.getTime() + (e.duration * 1000));
      return ee > start && es < end;
    });

    if (statsTotalLabel) { statsTotalLabel.textContent = totalLabel; }

    const secsByDay = bins.map(bin => {
      return rangeEntries.reduce((acc, e) => acc + computeOverlapSecs(e, bin.start, bin.end), 0);
    });

    const totalSecs = secsByDay.reduce((a, b) => a + b, 0);
    const avgSecs = Math.round(totalSecs / Math.max(1, bins.length));
    statsTotalTime.textContent = fmtHms(totalSecs);
    statsAvgTime.textContent = fmtDurationCompact(avgSecs);

    const maxDay = Math.max(1, ...secsByDay);

    const axisTicks = [];
    const gridLines = [];
    for (let i = 0; i <= STATS_AXIS_STEPS; i += 1) {
      const ratio = i / STATS_AXIS_STEPS;
      const secs = Math.round(maxDay * (1 - ratio));
      const top = ratio * 100;
      axisTicks.push('<div class="stats-y-tick" style="top:' + top + '%">' + fmtDurationCompact(secs) + '</div>');
      gridLines.push('<div class="stats-grid-line" style="top:' + top + '%"></div>');
    }
    statsYAxis.innerHTML = axisTicks.join('');
    statsGridLines.innerHTML = gridLines.join('');

    statsBars.innerHTML = bins.map((bin, idx) => {
      const secs = secsByDay[idx];
      const hPct = (secs / maxDay) * 100;
      const renderedHeight = secs > 0 ? Math.max(2, hPct) : 0;
      const barHeightPx = (renderedHeight / 100) * 120;
      const valueLabel = secs > 0 ? fmtDurationCompact(secs) : '';
      const axisLabel = bin.label ? esc(bin.label) : '&nbsp;';
      return '<div class="stats-bar-col">'
        + '<div class="stats-bar-wrap">'
        +   '<div class="stats-bar-value" style="bottom:' + (barHeightPx + 4) + 'px" title="' + esc(valueLabel) + '">' + esc(valueLabel) + '</div>'
        +   '<div class="stats-bar" style="height:' + renderedHeight + '%"></div>'
        + '</div>'
        + '<div class="stats-bar-day">' + axisLabel + '</div>'
        + '</div>';
    }).join('');

    const projectMap = new Map();
    for (const e of rangeEntries) {
      const key = e.project_id ?? 'none';
      const overlapSecs = computeOverlapSecs(e, start, end);
      if (overlapSecs > 0) {
        projectMap.set(key, (projectMap.get(key) || 0) + overlapSecs);
      }
    }
    const projectRows = Array.from(projectMap.entries())
      .map(([key, secs]) => {
        const proj = allProjects.find(p => String(p.id) === String(key));
        return {
          key,
          secs,
          name: proj ? proj.name : 'Sin proyecto',
          color: proj ? (proj.color || STATS_COLORS[0]) : STATS_COLORS[1],
        };
      })
      .sort((a, b) => b.secs - a.secs);

    if (!projectRows.length) {
      statsProjectList.innerHTML = '<p class="stats-empty">Sin datos para este rango.</p>';
      statsDonut.style.background = 'conic-gradient(' + '${TOGGL_COLOR}' + ' 0% 100%)';
      statsDonutCenter.textContent = '0:00';
      return;
    }

    let accPct = 0;
    const slices = projectRows.map(row => {
      const pct = totalSecs > 0 ? (row.secs / totalSecs) * 100 : 0;
      const startPct = accPct;
      accPct += pct;
      return row.color + ' ' + startPct.toFixed(2) + '% ' + accPct.toFixed(2) + '%';
    });
    statsDonut.style.background = 'conic-gradient(' + slices.join(', ') + ')';
    statsDonutCenter.textContent = fmtDurationCompact(totalSecs);

    statsProjectList.innerHTML = projectRows.map(row => {
      return '<div class="stats-project-row">'
        + '<div class="stats-project-left">'
        +   '<span class="stats-project-dot" style="background:' + esc(row.color) + '"></span>'
        +   '<span class="stats-project-name">' + esc(row.name) + '</span>'
        + '</div>'
        + '<span class="stats-project-time">' + fmtDurationCompact(row.secs) + '</span>'
        + '</div>';
    }).join('');

    updateStatsScrollButtons();
  }

  function fmtCalendarLabel(d) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (isSameDay(d, today)) { return 'Hoy'; }
    if (isSameDay(d, yesterday)) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function fmtDurationCompact(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? h + ':' + pad(m) : '0:' + pad(m);
  }

  function fmtDurationFull(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const mStr = m + 'm ' + pad(s) + 's';
    return h > 0 ? h + 'h ' + mStr : mStr;
  }

  function colorWithAlpha(color, alphaHex) {
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      return color + alphaHex;
    }
    if (/^#[0-9a-fA-F]{3}$/.test(color)) {
      const r = color[1];
      const g = color[2];
      const b = color[3];
      return '#' + r + r + g + g + b + b + alphaHex;
    }
    return 'color-mix(in srgb, ' + color + ' 35%, transparent)';
  }

  function renderCalendar(entries) {
    const pxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const start = calendarDayStart(calendarDate);
    const end = calendarDayEnd(calendarDate);
    calendarDayLabel.textContent = fmtCalendarLabel(start);

    const baseEntries = (entries || []).filter(e => !(entryId && Number(e.id) === Number(entryId)));
    const dayEntriesSource = [...baseEntries];
    if (entryId && startTime) {
      const runningStart = new Date(startTime);
      const runningStop = new Date();
      if (runningStop > start && runningStart < end) {
        const runningTagNames = allTags
          .filter(tag => timerTagIds.includes(tag.id))
          .map(tag => tag.name);
        dayEntriesSource.unshift({
          id: entryId,
          description: descInput.value.trim() || 'Sin título',
          start: runningStart.toISOString(),
          stop: null,
          duration: Math.max(1, Math.round((runningStop.getTime() - runningStart.getTime()) / 1000)),
          project_id: timerProjectId,
          tag_ids: timerTagIds,
          tags: runningTagNames,
          is_running: true,
        });
      }
    }

    const dayEntries = dayEntriesSource.filter(e => {
      const entryStart = new Date(e.start);
      const entryStop = e.stop
        ? new Date(e.stop)
        : ((entryId && Number(e.id) === Number(entryId)) ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      return entryStop > start && entryStart < end;
    });

    const dayTotal = dayEntries.reduce((acc, e) => {
      const entryStart = new Date(e.start);
      const entryStop = e.stop
        ? new Date(e.stop)
        : ((entryId && Number(e.id) === Number(entryId)) ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      const clippedStart = entryStart > start ? entryStart : start;
      const clippedStop = entryStop < end ? entryStop : end;
      const secs = Math.max(0, Math.round((clippedStop.getTime() - clippedStart.getTime()) / 1000));
      return acc + secs;
    }, 0);
    calendarTotal.textContent = fmtDurationCompact(dayTotal);

    let slotsHtml = '';
    const slotHeight = calendarZoomMinutes * pxPerMinute;
    for (let mins = 0; mins < 24 * 60; mins += calendarZoomMinutes) {
      const hour = Math.floor(mins / 60);
      const minute = mins % 60;
      const showHourLabel = minute === 0;
      const slotLabel = pad(hour) + ':' + pad(minute);
      const minuteClass = minute === 0 ? ' full' : (minute === 30 ? ' half' : ' quarter');
      const altClass = (Math.floor(mins / calendarZoomMinutes) % 2 === 1) ? ' alt' : '';
      slotsHtml += '<div class="calendar-slot-row' + altClass + (showHourLabel ? ' hour' : '') + '" style="height:' + slotHeight + 'px">'
        + '<span class="calendar-hour-label' + minuteClass + '">' + slotLabel + '</span>'
        + '</div>';
    }
    const totalPx = 24 * 60 * pxPerMinute;

    const eventsHtml = dayEntries.map(e => {
      const entryStart = new Date(e.start);
      const isRunning = Boolean(e.is_running) || (entryId && Number(e.id) === Number(entryId) && !e.stop);
      const entryStop = e.stop
        ? new Date(e.stop)
        : (isRunning ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      const clippedStart = entryStart > start ? entryStart : start;
      const clippedStop = entryStop < end ? entryStop : end;
      const minsFromStart = (clippedStart.getTime() - start.getTime()) / 60000;
      const minsDuration = Math.max(calendarZoomMinutes / 2, (clippedStop.getTime() - clippedStart.getTime()) / 60000);
      const top = Math.max(0, minsFromStart * pxPerMinute);
      const height = Math.max(12, minsDuration * pxPerMinute);
      const proj = allProjects.find(p => p.id === e.project_id);
      const color = (proj && proj.color) ? proj.color : CALENDAR_NO_PROJECT_COLOR;
      const bgColor = isRunning ? colorWithAlpha(color, '2e') : color + CALENDAR_EVENT_BG_ALPHA;
      const title = esc(e.description || 'Sin título');
      const durSecs = Math.max(0, Math.round((clippedStop.getTime() - clippedStart.getTime()) / 1000));
      const meta = isRunning
        ? esc(formatElapsed(durSecs * 1000))
        : esc(fmtDurationFull(durSecs));
      const projName = proj ? esc(proj.name) : '';
      const tagsStr = (e.tags && e.tags.length) ? e.tags.map(t => esc(t)).join(', ') : '';
      const projHtml = projName ? '<div class="calendar-event-proj" style="color:' + color + '">' + projName + '</div>' : '';
      const tagsHtml = tagsStr ? '<div class="calendar-event-tags">' + tagsStr + '</div>' : '';
      const isFullInDay = entryStart >= start && entryStop <= end;
      const resizable = (isFullInDay && !isRunning) ? '1' : '0';
      const handles = (isFullInDay && !isRunning)
        ? '<div class="calendar-resize-handle top" data-resize="start"></div><div class="calendar-resize-handle bottom" data-resize="end"></div>'
        : '';
      return '<div class="calendar-event' + (isRunning ? ' running' : '') + '" data-cal-id="' + e.id + '" data-cal-running="' + (isRunning ? '1' : '0') + '" data-resizable="' + resizable + '" data-duration="' + e.duration + '" style="top:' + top + 'px;height:' + height + 'px;border-left-color:' + color + ';background-color:' + bgColor + ';cursor:' + (isRunning ? 'default' : 'pointer') + '">'
        + handles
        + '<div class="calendar-event-title">' + title + '</div>'
        + projHtml
        + tagsHtml
        + '<div class="calendar-event-meta">' + meta + '</div>'
        + '</div>';
    }).join('');

    calendarGrid.style.minHeight = totalPx + 'px';
    calendarGrid.innerHTML = slotsHtml + '<div class="calendar-events-layer">' + eventsHtml + '</div>';
    if (calendarEmptyHint) {
      calendarEmptyHint.classList.toggle('hidden', dayEntries.length !== 0);
      calendarEmptyHint.textContent = 'No hay imputaciones para este día.';
    }
    calendarGrid.querySelectorAll('.calendar-event').forEach(el => {
      let didResize = false;
      const isResizable = el.getAttribute('data-resizable') === '1';

      const syncResize = (edge, deltaY, startTop, startHeight, slotPx, maxTop) => {
        const minHeight = Math.max(12, slotPx);
        if (edge === 'end') {
          let newHeight = startHeight + deltaY;
          newHeight = Math.max(minHeight, newHeight);
          newHeight = Math.min(newHeight, (24 * 60 * pxPerMinute) - startTop);
          newHeight = Math.round(newHeight / slotPx) * slotPx;
          el.style.height = newHeight + 'px';
          return;
        }

        let newTop = startTop + deltaY;
        let newHeight = startHeight - deltaY;
        newTop = Math.max(0, Math.min(maxTop, newTop));
        newHeight = Math.max(minHeight, newHeight);
        newTop = Math.round(newTop / slotPx) * slotPx;
        newHeight = Math.round(newHeight / slotPx) * slotPx;
        if (newTop + newHeight > 24 * 60 * pxPerMinute) {
          newHeight = (24 * 60 * pxPerMinute) - newTop;
        }
        el.style.top = newTop + 'px';
        el.style.height = Math.max(minHeight, newHeight) + 'px';
      };

      el.querySelectorAll('.calendar-resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (ev) => {
          if (!isResizable || ev.button !== 0) { return; }
          ev.stopPropagation();
          ev.preventDefault();
          didResize = false;
          el.classList.add('resizing');
          const edge = handle.getAttribute('data-resize');
          const startY = ev.clientY;
          const startTop = parseFloat(el.style.top || '0');
          const startHeight = parseFloat(el.style.height || '12');
          const slotPx = calendarZoomMinutes * pxPerMinute;
          const maxTop = Math.max(0, totalPx - startHeight);

          const onMove = (moveEv) => {
            const delta = moveEv.clientY - startY;
            if (Math.abs(delta) > 2) { didResize = true; }
            syncResize(edge, delta, startTop, startHeight, slotPx, maxTop);
          };

          const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            el.classList.remove('resizing');
            if (!didResize) { return; }

            const id = Number(el.getAttribute('data-cal-id'));
            const entry = latestEntries.find(x => x.id === id);
            if (!entry) { return; }

            const newTop = parseFloat(el.style.top || '0');
            const newHeight = parseFloat(el.style.height || '12');
            const minutesFromStart = Math.round(newTop / pxPerMinute);
            const durationMinutes = Math.max(1, Math.round(newHeight / pxPerMinute));
            const newStartDate = new Date(start.getTime() + minutesFromStart * 60000);
            const newStopDate = new Date(newStartDate.getTime() + durationMinutes * 60000);

            const tagIds = Array.isArray(entry.tag_ids) ? entry.tag_ids : [];
            const tagNames = Array.isArray(entry.tags) ? entry.tags : [];
            vscode.postMessage({
              command: 'updateEntry',
              id: entry.id,
              description: entry.description || 'Sin título',
              start: newStartDate.toISOString(),
              stop: newStopDate.toISOString(),
              project_id: entry.project_id ?? null,
              tag_ids: tagIds,
              tags: tagNames,
            });
          };

          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        });
      });

      el.addEventListener('click', () => {
        if (didResize) { didResize = false; return; }
        if (el.getAttribute('data-cal-running') === '1') { return; }
        const id = Number(el.getAttribute('data-cal-id'));
        const entry = latestEntries.find(x => x.id === id);
        if (entry) { openEditPanel(entry); }
      });
    });
  }

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function renderEntries(entries) {
    if (!entries || entries.length === 0) {
      entriesList.innerHTML = '<p class="entries-empty">No hay imputaciones recientes.</p>';
      return;
    }

    // Agrupar por día
    const groups = [];
    const keyMap = {};
    for (const e of entries) {
      const k = dayKey(e.start);
      if (!keyMap[k]) {
        keyMap[k] = { label: dayLabel(e.start), total: 0, entries: [] };
        groups.push(keyMap[k]);
      }
      keyMap[k].total += e.duration;
      keyMap[k].entries.push(e);
    }

    entriesList.innerHTML = groups.map((g, i) =>
      '<div class="day-group">'
      + '<div class="day-header" data-group="' + i + '">'
      + '<div class="day-header-left">'
      +   '<span class="day-chevron">&#9660;</span>'
      +   '<span class="day-label">' + esc(g.label) + '</span>'
      + '</div>'
      + '<span class="day-total">' + fmtDayTotal(g.total) + '</span>'
      + '</div>'
      + '<div class="day-entries" data-entries="' + i + '">'
      + g.entries.map(e => {
        const proj = allProjects.find(p => p.id === e.project_id);
        const projColor = (proj && proj.color) ? proj.color : '${TOGGL_COLOR}';
        const projName = proj ? esc(proj.name) : esc(e.project_name || '');
        const tagsStr = (e.tags && e.tags.length) ? e.tags.map(t => esc(t)).join(', ') : '';
        const projectLineHtml = projName
          ? '<div class="entry-project-line"><span class="entry-project-dot" style="background:' + projColor + '"></span><span class="entry-project" style="color:' + projColor + '">' + projName + '</span></div>'
          : '<div class="entry-project-line"><span class="entry-project empty">+ Add project</span></div>';
        const tagsLineHtml = tagsStr ? '<div class="entry-tags-line">&#128278; ' + tagsStr + '</div>' : '';
        return '<div class="entry-item" data-id="' + e.id + '" style="cursor:pointer">'
        + '<div class="entry-info">'
        +   '<div class="entry-desc' + (e.description ? '' : ' empty') + '">' + esc(e.description || 'Sin título') + '</div>'
        +   projectLineHtml
        +   tagsLineHtml
        +   '<div class="entry-meta">' + fmtTime(e.start) + '</div>'
        + '</div>'
        + '<span class="entry-duration">' + fmtDuration(e.duration) + '</span>'
        + '<button class="entry-replay" data-replay-id="' + e.id + '" title="Continuar" tabindex="-1">'
        +   '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
        + '</button>'
        + '</div>';
      }).join('')
      + '</div>'
      + '</div>'
    ).join('');

    // Toggle colapsar/expandir
    entriesList.querySelectorAll('.day-header').forEach(header => {
      header.addEventListener('click', () => {
        const idx = header.getAttribute('data-group');
        const body = entriesList.querySelector('[data-entries="' + idx + '"]');
        const chevron = header.querySelector('.day-chevron');
        const collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        chevron.classList.toggle('collapsed', !collapsed);
      });
    });

    // Abrir edición al clic en una entrada
    entriesList.querySelectorAll('.entry-item').forEach(el => {
      const id = Number(el.getAttribute('data-id'));
      el.addEventListener('click', (ev) => {
        if (ev.target.closest('.entry-replay')) { return; }
        const entry = entries.find(e => e.id === id);
        if (entry) { openEditPanel(entry); }
      });
    });

    // Boton replay: iniciar nuevo timer con la misma descripcion
    entriesList.querySelectorAll('.entry-replay').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const id = Number(btn.getAttribute('data-replay-id'));
        const entry = entries.find(e => e.id === id);
        if (!entry) { return; }
        vscode.postMessage({ command: 'startTimer', description: entry.description || '' });
      });
    });
  }

  viewListBtn.addEventListener('click', () => setHistoryView('list'));
  viewCalendarBtn.addEventListener('click', () => setHistoryView('calendar'));
  viewStatsBtn.addEventListener('click', () => setHistoryView('stats'));
  statsRangeTodayBtn.addEventListener('click', () => setStatsRange('today'));
  statsRangeWeekBtn.addEventListener('click', () => setStatsRange('week'));
  statsRangeMonthBtn.addEventListener('click', () => setStatsRange('month'));
  statsBarsPrev.addEventListener('click', () => {
    statsBarsViewport.scrollBy({ left: -220, behavior: 'smooth' });
  });
  statsBarsNext.addEventListener('click', () => {
    statsBarsViewport.scrollBy({ left: 220, behavior: 'smooth' });
  });
  statsBarsViewport.addEventListener('scroll', updateStatsScrollButtons);
  window.addEventListener('resize', updateStatsScrollButtons);

  function zoomCalendarKeepingScroll(nextZoom) {
    if (!calendarScroll || nextZoom === calendarZoomMinutes) { return; }

    const beforePxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const anchorMinutes = (calendarScroll.scrollTop + (calendarScroll.clientHeight / 2)) / beforePxPerMinute;

    calendarZoomMinutes = nextZoom;
    renderCalendar(latestEntries);

    const afterPxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const nextScrollTop = Math.max(0, (anchorMinutes * afterPxPerMinute) - (calendarScroll.clientHeight / 2));
    calendarScroll.scrollTop = nextScrollTop;
  }

  calendarPrevDay.addEventListener('click', () => {
    calendarDate.setDate(calendarDate.getDate() - 1);
    renderCalendar(latestEntries);
  });
  calendarNextDay.addEventListener('click', () => {
    calendarDate.setDate(calendarDate.getDate() + 1);
    renderCalendar(latestEntries);
  });
  calendarZoomIn.addEventListener('click', () => {
    const idx = CALENDAR_ZOOMS.indexOf(calendarZoomMinutes);
    const nextZoom = CALENDAR_ZOOMS[Math.min(CALENDAR_ZOOMS.length - 1, idx + 1)];
    zoomCalendarKeepingScroll(nextZoom);
  });
  calendarZoomOut.addEventListener('click', () => {
    const idx = CALENDAR_ZOOMS.indexOf(calendarZoomMinutes);
    const nextZoom = CALENDAR_ZOOMS[Math.max(0, idx - 1)];
    zoomCalendarKeepingScroll(nextZoom);
  });

  refreshBtn.addEventListener('click', () => {
    entriesList.innerHTML = '<p class="entries-empty">Cargando…</p>';
    calendarGrid.innerHTML = '<p class="entries-empty">Cargando…</p>';
    statsBars.innerHTML = '<p class="stats-empty">Cargando…</p>';
    vscode.postMessage({ command: 'loadEntries' });
  });

  vscode.postMessage({ command: 'ready' });
</script>
</body>
</html>`;
}
