export function getProjectPicker(): string {
  return `    <!-- Picker de proyecto (oculto por defecto) -->
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

`;
}
