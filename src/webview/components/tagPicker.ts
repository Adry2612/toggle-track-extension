export function getTagPicker(): string {
  return `    <div class="tag-picker hidden" id="tag-picker">
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

`;
}
