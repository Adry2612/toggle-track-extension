export function getHistorySection(): string {
  return `    <!-- Historial -->
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
          <div class="calendar-nav">
            <button id="calendar-plan-btn" class="calendar-plan-btn">+ Planificar</button>
            <span id="calendar-total" class="calendar-total">0:00</span>
          </div>
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

`;
}
