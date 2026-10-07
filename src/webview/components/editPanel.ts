export function getEditPanel(): string {
  return `    <!-- Panel de edición (oculto por defecto) -->
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

        <div class="plan-overlay hidden" id="plan-overlay">
          <div class="plan-card">
            <div class="plan-card-title" id="plan-title">Planificar tiempo</div>
            <p class="plan-hint">Solo planificación local; no suma a tus horas registradas en Toggl.</p>
            <input id="plan-description" class="plan-input" type="text" maxlength="255" placeholder="¿Qué vas a hacer?" />
            <input id="plan-date" class="plan-input" type="date" />
            <div class="plan-time-row">
              <input id="plan-start" class="plan-input" type="time" step="900" />
              <span>–</span>
              <input id="plan-stop" class="plan-input" type="time" step="900" />
            </div>
            <select id="plan-project" class="plan-select">
              <option value="">Sin proyecto</option>
            </select>
            <p id="plan-error" class="plan-error hidden"></p>
            <div class="plan-actions">
              <button id="plan-delete" class="plan-action danger hidden">Eliminar</button>
              <button id="plan-start-timer" class="plan-action hidden">Iniciar timer</button>
              <button id="plan-cancel" class="plan-action">Cancelar</button>
              <button id="plan-save" class="plan-action primary">Guardar</button>
            </div>
          </div>
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

`;
}
