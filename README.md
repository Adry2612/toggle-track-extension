# Toggl Track Extension

Extensión para controlar Toggl Track sin salir de VS Code: iniciar y parar temporizadores, editar imputaciones y consultar historial en vista de lista, calendario y estadísticas.

## Instalación

1. Instala la extensión desde VS Code.
2. Abre la barra lateral y entra en la vista **Toggl**.
3. Pega tu API Token de Toggl y pulsa **Conectar**.

Puedes obtener tu token en:

- https://track.toggl.com/profile

## Primera configuración

Al conectarte, la extensión:

1. Valida tu token con Toggl.
2. Carga tu timer en curso (si existe).
3. Muestra controles de timer y el historial reciente.

## Qué puedes hacer

### Timer en vivo

- Iniciar y detener timer.
- Cambiar el título mientras corre.
- Asignar proyecto y etiquetas.
- Editar la hora de inicio del timer activo.
- Crear registro manual con el botón `+`.

### Barra de estado

- Muestra el estado del timer y el tiempo transcurrido.
- Clic sobre la barra de estado para iniciar/parar rápidamente.
- Tooltip con el título del timer activo.

Nota: VS Code no permite iconos SVG personalizados en el status bar; ahí se usan codicons.

### Historial

- **Lista**: últimas imputaciones agrupadas por día.
- **Calendario**: vista horaria detallada, incluido timer activo en tiempo real.
- **Estadísticas**: tiempo por día y distribución por proyecto.

## Comandos disponibles

- `toggl.openPanel`
- `toggl.openSidebarPanel`
- `toggl.toggleTimer`

## Solución de problemas

### No conecta con Toggl

1. Verifica que el token sea válido.
2. Revisa conexión a Internet.
3. Cierra sesión y vuelve a conectar.

### No ves cambios de UI o iconos

1. Ejecuta `Developer: Reload Window` en VS Code.
2. Si estás en modo desarrollo de extensión, reinicia el Extension Development Host.

## Privacidad

La extensión utiliza tu API Token únicamente para comunicarte con Toggl Track y no requiere servicios externos adicionales.
