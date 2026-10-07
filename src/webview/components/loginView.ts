export function getLoginView(): string {
  return `  <!-- ── Login ─────────────────────── -->
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

`;
}
