import { TOGGL_COLOR } from '../constants';

export function getSidebarStyles(): string {
  return `    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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
    .calendar-plan-btn {
      border: 1px solid var(--vscode-panel-border, #444);
      border-radius: 5px;
      padding: 4px 7px;
      background: none;
      color: var(--vscode-foreground);
      font-size: 11px;
      cursor: pointer;
      white-space: nowrap;
    }
    .calendar-plan-btn:hover { border-color: ${TOGGL_COLOR}; color: ${TOGGL_COLOR}; }
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
    .calendar-planned-event {
      border: 1px dashed var(--vscode-descriptionForeground);
      opacity: 0.88;
    }
    .calendar-planned-label {
      margin-top: 2px;
      font-size: 9px;
      color: var(--vscode-descriptionForeground);
      font-style: italic;
    }
    .calendar-planned-event .calendar-event-meta { color: #000; }
    .calendar-event.resizing {
      filter: brightness(1.12);
    }
    .calendar-event-title {
      font-size: 12px;
      line-height: 1.2;
      color: #fff;
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
    .plan-overlay {
      position: absolute; inset: 0;
      z-index: 15;
      display: flex; align-items: center; justify-content: center;
      padding: 14px;
      background: rgba(0,0,0,0.45);
    }
    .plan-card {
      width: 100%;
      padding: 14px;
      border: 1px solid var(--vscode-panel-border, #444);
      border-radius: 8px;
      background: var(--vscode-sideBar-background);
      display: flex; flex-direction: column; gap: 10px;
    }
    .plan-card-title { font-size: 14px; font-weight: 600; }
    .plan-hint { color: var(--vscode-descriptionForeground); font-size: 11px; }
    .plan-input, .plan-select {
      width: 100%;
      padding: 7px 9px;
      border: 1px solid var(--vscode-input-border, #555);
      border-radius: 5px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      font: inherit;
    }
    .plan-time-row { display: flex; align-items: center; gap: 8px; }
    .plan-time-row .plan-input { min-width: 0; }
    .plan-error { color: var(--vscode-errorForeground); font-size: 11px; }
    .plan-actions { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
    .plan-action {
      padding: 6px 9px;
      border: 1px solid var(--vscode-panel-border, #444);
      border-radius: 5px;
      background: none;
      color: var(--vscode-foreground);
      font-size: 11px;
      cursor: pointer;
    }
    .plan-action.primary { border-color: ${TOGGL_COLOR}; background: ${TOGGL_COLOR}; color: #fff; }
    .plan-action.danger { margin-right: auto; color: var(--vscode-errorForeground); }
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
`;
}
