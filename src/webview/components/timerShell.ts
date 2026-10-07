export function getTimerShell(): string {
  return `  <!-- ── Timer ─────────────────────── -->
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

`;
}
