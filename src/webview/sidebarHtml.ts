import { getLoginView } from './components/loginView';
import { getTimerView } from './components/timerView';
import { getSidebarScript } from './sidebarScript';
import { getSidebarStyles } from './sidebarStyles';

export function getSidebarHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
${getSidebarStyles()}  </style>
</head>
<body>

${getLoginView()}${getTimerView()}<script>
${getSidebarScript()}
</script>
</body>
</html>`;
}
