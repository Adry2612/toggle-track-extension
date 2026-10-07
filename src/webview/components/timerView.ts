import { getEditPanel } from './editPanel';
import { getHistorySection } from './historySection';
import { getProjectPicker } from './projectPicker';
import { getRunningStartOverlay } from './runningStartOverlay';
import { getTagPicker } from './tagPicker';
import { getTimerShell } from './timerShell';

export function getTimerView(): string {
  return `${getTimerShell()}${getHistorySection()}${getProjectPicker()}${getTagPicker()}${getEditPanel()}${getRunningStartOverlay()}  </div>

`;
}
