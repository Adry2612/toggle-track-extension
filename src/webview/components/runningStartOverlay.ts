export function getRunningStartOverlay(): string {
  return `    <!-- Overlay: editar inicio del timer en curso -->
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
`;
}
