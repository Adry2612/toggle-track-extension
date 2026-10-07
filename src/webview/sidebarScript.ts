import { TOGGL_COLOR } from '../constants';

export function getSidebarScript(): string {
  return `  const vscode = acquireVsCodeApi();

  let entryId   = null;
  let startTime = null;
  let intervalId = null;
  let runningDescSyncTimeout = null;

  const loginView    = document.getElementById('login-view');
  const timerView    = document.getElementById('timer-view');
  const tokenInput   = document.getElementById('token-input');
  const loginError   = document.getElementById('login-error');
  const saveTokenBtn = document.getElementById('save-token-btn');
  const logoutBtn    = document.getElementById('logout-btn');
  const descInput    = document.getElementById('desc-input');
  const descClear    = document.getElementById('desc-clear');
  const elapsed      = document.getElementById('elapsed');
  const startBtn     = document.getElementById('start-btn');
  const stopBtn      = document.getElementById('stop-btn');
  const timerError   = document.getElementById('timer-error');
  const refreshBtn   = document.getElementById('refresh-btn');
  const entriesList  = document.getElementById('entries-list');
  const entriesListView = document.getElementById('entries-list-view');
  const entriesCalendarView = document.getElementById('entries-calendar-view');
  const entriesStatsView = document.getElementById('entries-stats-view');
  const viewListBtn = document.getElementById('view-list-btn');
  const viewCalendarBtn = document.getElementById('view-calendar-btn');
  const viewStatsBtn = document.getElementById('view-stats-btn');
  const calendarPrevDay = document.getElementById('calendar-prev-day');
  const calendarNextDay = document.getElementById('calendar-next-day');
  const calendarZoomIn = document.getElementById('calendar-zoom-in');
  const calendarZoomOut = document.getElementById('calendar-zoom-out');
  const calendarDayLabel = document.getElementById('calendar-day-label');
  const calendarTotal = document.getElementById('calendar-total');
  const calendarPlanBtn = document.getElementById('calendar-plan-btn');
  const calendarScroll = document.getElementById('calendar-scroll');
  const calendarEmptyHint = document.getElementById('calendar-empty-hint');
  const calendarGrid = document.getElementById('calendar-grid');
  const editPanel    = document.getElementById('edit-panel');
  const editClose    = document.getElementById('edit-close');
  const editDesc     = document.getElementById('edit-desc');
  const editDescClr  = document.getElementById('edit-desc-clear');
  const editStartTm  = document.getElementById('edit-start-time');
  const editStopTm   = document.getElementById('edit-stop-time');
  const editStartDate = document.getElementById('edit-start-date');
  const editDateDisp = document.getElementById('edit-date-display');
  const editDur      = document.getElementById('edit-dur');
  const editError    = document.getElementById('edit-error');
  const editDelete   = document.getElementById('edit-delete');
  const editSave     = document.getElementById('edit-save');
  const editProjectBtn  = document.getElementById('edit-project-btn');
  const editProjectLabel = document.getElementById('edit-project-label');
  const editProjectDot  = document.getElementById('edit-project-dot');
  const editTagsBtn = document.getElementById('edit-tags-btn');
  const editTagsLabel = document.getElementById('edit-tags-label');
  const projPicker   = document.getElementById('proj-picker');
  const projPickerClose = document.getElementById('proj-picker-close');
  const projSearch   = document.getElementById('proj-search');
  const projList     = document.getElementById('proj-list');
  const projCreateBtn = document.getElementById('proj-create-btn');
  const projPickerFooter = document.querySelector('.proj-picker-footer');
  const createProjectOverlay = document.getElementById('create-project-overlay');
  const createProjectName = document.getElementById('create-project-name');
  const createProjectClient = document.getElementById('create-project-client');
  const createProjectPrivate = document.getElementById('create-project-private');
  const createProjectColors = document.getElementById('create-project-colors');
  const createProjectColorTrigger = document.getElementById('create-project-color-trigger');
  const createProjectColorPreview = document.getElementById('create-project-color-preview');
  const createProjectError = document.getElementById('create-project-error');
  const createProjectCancel = document.getElementById('create-project-cancel');
  const createProjectSubmit = document.getElementById('create-project-submit');
  const tagPicker = document.getElementById('tag-picker');
  const tagPickerClose = document.getElementById('tag-picker-close');
  const tagSearch = document.getElementById('tag-search');
  const tagList = document.getElementById('tag-list');
  const tagError = document.getElementById('tag-error');
  const tagCreateBtn = document.getElementById('tag-create-btn');
  const tagPickerFooter = document.querySelector('.tag-picker-footer');
  const timerProjBtn   = document.getElementById('timer-proj-btn');
  const timerProjDot   = document.getElementById('timer-proj-dot');
  const timerProjLabel = document.getElementById('timer-proj-label');
  const timerTagsBtn   = document.getElementById('timer-tags-btn');
  const timerTagsLabel = document.getElementById('timer-tags-label');
  const statsTotalTime = document.getElementById('stats-total-time');
  const statsTotalLabel = document.getElementById('stats-total-label');
  const statsAvgTime = document.getElementById('stats-avg-time');
  const statsBars = document.getElementById('stats-bars');
  const statsYAxis = document.getElementById('stats-y-axis');
  const statsGridLines = document.getElementById('stats-grid-lines');
  const statsBarsChartWrap = document.getElementById('stats-bars-chart-wrap');
  const statsBarsViewport = document.getElementById('stats-bars-viewport');
  const statsBarsPrev = document.getElementById('stats-bars-prev');
  const statsBarsNext = document.getElementById('stats-bars-next');
  const statsDonut = document.getElementById('stats-donut');
  const statsDonutCenter = document.getElementById('stats-donut-center');
  const statsProjectList = document.getElementById('stats-project-list');
  const statsRangeTodayBtn = document.getElementById('stats-range-today');
  const statsRangeWeekBtn = document.getElementById('stats-range-week');
  const statsRangeMonthBtn = document.getElementById('stats-range-month');
  const addBtn = document.getElementById('add-btn');
  const rseOverlay = document.getElementById('rse-overlay');
  const rseDate = document.getElementById('rse-date');
  const rseTime = document.getElementById('rse-time');
  const rseCancel = document.getElementById('rse-cancel');
  const rseSave = document.getElementById('rse-save');
  const planOverlay = document.getElementById('plan-overlay');
  const planTitle = document.getElementById('plan-title');
  const planDescription = document.getElementById('plan-description');
  const planDate = document.getElementById('plan-date');
  const planStart = document.getElementById('plan-start');
  const planStop = document.getElementById('plan-stop');
  const planProject = document.getElementById('plan-project');
  const planError = document.getElementById('plan-error');
  const planDelete = document.getElementById('plan-delete');
  const planStartTimer = document.getElementById('plan-start-timer');
  const planCancel = document.getElementById('plan-cancel');
  const planSave = document.getElementById('plan-save');

  let editingEntry = null;
  let editStartDateISO = '';
  let selectedProjectId = null;
  let selectedProjectColor = null;
  let allProjects = [];
  let latestEntries = [];
  let plannedBlocks = [];
  let editingPlannedBlock = null;
  let activeHistoryView = 'list';
  let calendarDate = new Date();
  let calendarZoomMinutes = 60;
  const CALENDAR_ZOOMS = [60, 30, 15];
  const CALENDAR_EVENT_BG_ALPHA = '';
  const CALENDAR_NO_PROJECT_COLOR = '#3d3a3d';
  let createProjectColor = '#d8dbe5';
  const PROJECT_COLORS = ['#0b83d9', '#9e5bd9', '#d94182', '#e36a00', '#bf7000', '#2da608', '#06a893', '#7ddd49', '#c9806b', '#465bb3', '#990099', '#c7af14', '#566614'];
  let allTags = [];
  let selectedTagIds = [];
  let pickerMode = 'edit'; // 'edit' | 'timer'
  let timerProjectId = null;
  let timerProjectColor = null;
  let timerTagIds = [];
  let statsRange = 'week';
  const STATS_COLORS = ['#28a745', '#5b5f66', '#0b83d9', '#d94182', '#e36a00', '#9e5bd9', '#06a893'];
  const STATS_AXIS_STEPS = 4;
  let createMode = false;

  if (projPickerFooter) { projPickerFooter.style.display = 'none'; }
  if (tagPickerFooter) { tagPickerFooter.style.display = 'none'; }

  // ── Helpers ───────────────────────────────────────
  function pad(n) { return String(n).padStart(2, '0'); }

  function formatElapsed(ms) {
    const totalSecs = Math.floor(ms / 1000);
    if (totalSecs < 60) {
      return totalSecs + ' seg';
    } else if (totalSecs < 3600) {
      const m = Math.floor(totalSecs / 60);
      const s = totalSecs % 60;
      return m + ':' + pad(s) + ' min';
    } else {
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      return pad(h) + ':' + pad(m) + ':' + pad(s);
    }
  }

  function isCalendarVisible() {
    return !entriesCalendarView.classList.contains('hidden');
  }

  function startTick() {
    intervalId = setInterval(() => {
      elapsed.textContent = formatElapsed(Date.now() - startTime);
      if (entryId && startTime && isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }, 1000);
  }

  function stopTick() {
    clearInterval(intervalId);
    intervalId = null;
    elapsed.textContent = '0 seg';
    elapsed.classList.remove('running');
  }

  function setRunningUI(running) {
    startBtn.classList.toggle('hidden', running);
    stopBtn.classList.toggle('hidden', !running);
    descClear.style.display = (!running && descInput.value) ? 'block' : 'none';
    elapsed.classList.toggle('running', running);
    stopBtn.disabled = false;
    startBtn.disabled = false;
  }

  function scheduleRunningDescriptionSync() {
    if (runningDescSyncTimeout) {
      clearTimeout(runningDescSyncTimeout);
    }
    if (!entryId || !startTime) {
      return;
    }
    runningDescSyncTimeout = setTimeout(() => {
      runningDescSyncTimeout = null;
      if (!entryId || !startTime) {
        return;
      }
      vscode.postMessage({
        command: 'updateRunningDescription',
        entryId,
        description: descInput.value.trim(),
      });
    }, 5000);
  }

  function syncRunningDescriptionLocal(description) {
    if (!entryId) {
      return;
    }
    latestEntries = latestEntries.map(e => (
      Number(e.id) === Number(entryId)
        ? { ...e, description }
        : e
    ));
  }

  function syncRunningDescriptionInCalendarDom(description) {
    if (!entryId || !isCalendarVisible()) {
      return;
    }
    const normalized = String(description ?? '').trim() || 'Sin título';
    const event = calendarGrid.querySelector('.calendar-event[data-cal-id="' + entryId + '"]');
    if (!event) {
      return;
    }
    const titleNode = event.querySelector('.calendar-event-title');
    if (titleNode) {
      titleNode.textContent = normalized;
    }
  }

  function showView(hasToken) {
    loginView.style.display = hasToken ? 'none' : 'block';
    timerView.style.display = hasToken ? 'flex' : 'none';
  }

  function showTimerError(text) {
    timerError.textContent = text;
    timerError.classList.remove('hidden');
    setTimeout(() => timerError.classList.add('hidden'), 4000);
  }

  // ── Mensajes desde la extensión ───────────────────
  window.addEventListener('message', (event) => {
    const msg = event.data;
    switch (msg.command) {
      case 'init':
        showView(msg.hasToken);
        if (msg.hasToken) {
          vscode.postMessage({ command: 'loadPlannedBlocks' });
          if (msg.runningTimer) {
            entryId   = msg.runningTimer.id;
            startTime = new Date(msg.runningTimer.start).getTime();
            descInput.value = msg.runningTimer.description || '';
            descClear.style.display = descInput.value ? 'block' : 'none';
            setRunningUI(true);
            startTick();
          } else {
            setRunningUI(false);
          }
          vscode.postMessage({ command: 'loadEntries' });
          if (allProjects.length === 0) {
            vscode.postMessage({ command: 'loadProjects' });
          }
        } else if (runningDescSyncTimeout) {
          clearTimeout(runningDescSyncTimeout);
          runningDescSyncTimeout = null;
        }
        break;

      case 'tokenError':
        loginError.textContent = msg.text;
        saveTokenBtn.disabled = false;
        saveTokenBtn.textContent = 'Conectar';
        break;

      case 'tokenSaved':
        loginError.textContent = '';
        showView(true);
        setRunningUI(false);
        vscode.postMessage({ command: 'loadPlannedBlocks' });
        vscode.postMessage({ command: 'loadEntries' });
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;

      case 'timerStarted':
        entryId   = msg.entryId;
        startTime = new Date(msg.start).getTime();
        descInput.value = msg.description || '';
        descClear.style.display = descInput.value ? 'block' : 'none';
        if (Object.prototype.hasOwnProperty.call(msg, 'projectId')) {
          const project = allProjects.find(item => Number(item.id) === Number(msg.projectId));
          applyTimerProjectSelection(msg.projectId, project ? project.name : null, project ? project.color : null);
        }
        setRunningUI(true);
        startTick();
        if (isCalendarVisible()) {
          renderCalendar(latestEntries);
        }
        break;

      case 'timerStopped':
        entryId   = null;
        startTime = null;
        if (runningDescSyncTimeout) {
          clearTimeout(runningDescSyncTimeout);
          runningDescSyncTimeout = null;
        }
        stopTick();
        setRunningUI(false);
        descInput.value = '';
        descClear.style.display = 'none';
        timerProjectId = null; timerProjectColor = null; timerTagIds = [];
        applyTimerProjectSelection(null, null, null);
        applyTimerTagSelection();
        if (isCalendarVisible()) {
          renderCalendar(latestEntries);
        }
        vscode.postMessage({ command: 'loadEntries' });
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;

      case 'timerError':
        showTimerError(msg.text);
        break;

      case 'runningDescriptionUpdated':
        if (Number(msg.entryId) === Number(entryId)) {
          const desc = String(msg.description ?? '').trim();
          syncRunningDescriptionLocal(desc);
          syncRunningDescriptionInCalendarDom(desc);
          if (activeHistoryView === 'list') {
            renderEntries(latestEntries);
          }
          if (isCalendarVisible()) {
            renderCalendar(latestEntries);
          }
        }
        break;

      case 'entriesLoaded':
        latestEntries = msg.entries || [];
        renderEntries(latestEntries);
        renderCalendar(latestEntries);
        renderStats(latestEntries);
        if (allProjects.length === 0) {
          vscode.postMessage({ command: 'loadProjects' });
        }
        break;
      case 'plannedBlocksLoaded':
        plannedBlocks = Array.isArray(msg.plannedBlocks) ? msg.plannedBlocks : [];
        renderCalendar(latestEntries);
        break;
      case 'plannedBlockSaved':
        plannedBlocks = Array.isArray(msg.plannedBlocks) ? msg.plannedBlocks : plannedBlocks;
        planOverlay.classList.add('hidden');
        renderCalendar(latestEntries);
        break;
      case 'plannedBlockDeleted':
        plannedBlocks = Array.isArray(msg.plannedBlocks) ? msg.plannedBlocks : plannedBlocks;
        closePlanPanel();
        renderCalendar(latestEntries);
        break;
      case 'plannedBlockError':
        planError.textContent = msg.text || 'No se pudo guardar el bloque planificado.';
        planError.classList.remove('hidden');
        planDelete.disabled = false;
        planSave.disabled = false;
        planSave.textContent = 'Guardar';
        break;

      case 'entriesError':
        entriesList.innerHTML = '<p class="entries-empty" style="color:var(--vscode-errorForeground)">Error: ' + esc(msg.text) + '</p>';
        calendarGrid.innerHTML = '<p class="entries-empty" style="color:var(--vscode-errorForeground)">Error: ' + esc(msg.text) + '</p>';
        break;
      case 'projectsLoaded':
        allProjects = msg.projects || [];
        if (timerProjectId) {
          const timerProject = allProjects.find(project => Number(project.id) === Number(timerProjectId));
          if (timerProject) {
            applyTimerProjectSelection(timerProject.id, timerProject.name, timerProject.color);
          }
        }
        if (!planOverlay.classList.contains('hidden')) {
          fillPlanProjects(planProject.value ? Number(planProject.value) : (editingPlannedBlock ? editingPlannedBlock.project_id : null));
        }
        renderProjList(projSearch.value);
        renderEntries(latestEntries);
        renderCalendar(latestEntries);
        renderStats(latestEntries);
        break;

      case 'tagsLoaded':
        allTags = msg.tags || [];
        renderTagList(tagSearch.value);
        break;

      case 'projectCreated': {
        const project = msg.project;
        allProjects = [project, ...allProjects.filter(p => p.id !== project.id)];
        applyProjectSelection(project.id, project.name, project.color);
        createProjectOverlay.classList.add('hidden');
        projPicker.classList.add('hidden');
        renderProjList(projSearch.value);
        createProjectSubmit.disabled = false;
        createProjectSubmit.textContent = 'Crear proyecto';
        break;
      }

      case 'createProjectError':
        createProjectError.textContent = msg.text;
        createProjectSubmit.disabled = false;
        createProjectSubmit.textContent = 'Crear proyecto';
        break;

      case 'tagCreated': {
        const tag = msg.tag;
        allTags = [tag, ...allTags.filter(t => t.id !== tag.id)];
        if (pickerMode === 'timer') {
          if (!timerTagIds.includes(tag.id)) {
            timerTagIds = [...timerTagIds, tag.id];
          }
          applyTimerTagSelection();
        } else {
          if (!selectedTagIds.includes(tag.id)) {
            selectedTagIds = [...selectedTagIds, tag.id];
          }
          applyTagSelection();
        }
        tagSearch.value = '';
        tagError.textContent = '';
        renderTagList('');
        break;
      }

      case 'createTagError':
        tagError.textContent = msg.text;
        tagCreateBtn.disabled = false;
        break;

      case 'editSaved':
        editPanel.classList.add('hidden');
        createMode = false;
        vscode.postMessage({ command: 'loadEntries' });
        break;

      case 'editError':
        editError.textContent = msg.text;
        editError.classList.remove('hidden');
        editSave.disabled = false;
        editDelete.disabled = false;
        break;
    }
  });

  // ── Eventos ────────────────────────────────────────
  saveTokenBtn.addEventListener('click', () => {
    loginError.textContent = '';
    saveTokenBtn.disabled = true;
    saveTokenBtn.textContent = 'Verificando…';
    vscode.postMessage({ command: 'saveToken', token: tokenInput.value.trim() });
  });

  logoutBtn.addEventListener('click', () => {
    if (runningDescSyncTimeout) {
      clearTimeout(runningDescSyncTimeout);
      runningDescSyncTimeout = null;
    }
    stopTick();
    setRunningUI(false);
    descInput.value = '';
    vscode.postMessage({ command: 'logout' });
  });

  descInput.addEventListener('input', () => {
    descClear.style.display = descInput.value ? 'block' : 'none';
    if (entryId && startTime) {
      const currentDescription = descInput.value.trim();
      syncRunningDescriptionLocal(currentDescription);
      syncRunningDescriptionInCalendarDom(currentDescription);
      vscode.postMessage({
        command: 'setStatusBarDescription',
        description: currentDescription,
      });
      if (activeHistoryView === 'list') {
        renderEntries(latestEntries);
      }
      if (isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }
    scheduleRunningDescriptionSync();
  });

  descClear.addEventListener('click', () => {
    descInput.value = '';
    descClear.style.display = 'none';
    if (entryId && startTime) {
      syncRunningDescriptionLocal('');
      syncRunningDescriptionInCalendarDom('');
      vscode.postMessage({
        command: 'setStatusBarDescription',
        description: '',
      });
      if (activeHistoryView === 'list') {
        renderEntries(latestEntries);
      }
      if (isCalendarVisible()) {
        renderCalendar(latestEntries);
      }
    }
    scheduleRunningDescriptionSync();
    descInput.focus();
  });

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    vscode.postMessage({
      command: 'startTimer',
      description: descInput.value.trim(),
      project_id: timerProjectId,
      tag_ids: timerTagIds,
    });
  });

  stopBtn.addEventListener('click', () => {
    if (!entryId) { return; }
    stopBtn.disabled = true;
    vscode.postMessage({ command: 'stopTimer', entryId });
  });

  // ── Panel de edición ───────────────────────────────
  function toDateInput(iso) {
    if (!iso) { return ''; }
    const d = new Date(iso);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function fmtDateDisplay(dateStr) {
    // dateStr = YYYY-MM-DD
    if (!dateStr) { return ''; }
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) { return 'Hoy'; }
    if (d.toDateString() === yesterday.toDateString()) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function toTimeInput(iso) {
    if (!iso) { return ''; }
    const d = new Date(iso);
    return d.toTimeString().slice(0, 5); // HH:MM
  }

  function buildISO(baseDateStr, timeStr) {
    // baseDateStr = YYYY-MM-DD, timeStr = HH:MM
    return new Date(baseDateStr + 'T' + timeStr + ':00').toISOString();
  }

  function updateEditDur() {
    const s = editStartTm.value;
    const e = editStopTm.value;
    if (!s || !e) { editDur.textContent = '—'; return; }
    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) { mins += 24 * 60; }
    const h = Math.floor(mins / 60);
    const mo = mins % 60;
    editDur.textContent = h > 0 ? h + ' h ' + (mo > 0 ? mo + ' min' : '') : mo + ' min';
  }

  function openEditPanel(entry) {
    editingEntry = entry;
    editStartDateISO = toDateInput(entry.start);
    editDesc.value = entry.description || '';
    editDescClr.style.display = editDesc.value ? 'block' : 'none';
    editStartTm.value  = toTimeInput(entry.start);
    editStopTm.value   = toTimeInput(entry.stop);
    editStartDate.value = editStartDateISO;
    editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
    // Proyecto
    selectedProjectId = entry.project_id ?? null;
    selectedProjectColor = entry.project_color ?? null;
    applyProjectSelection(selectedProjectId, entry.project_name ?? null, selectedProjectColor);
    selectedTagIds = Array.isArray(entry.tag_ids) ? [...entry.tag_ids] : [];
    applyTagSelection(entry.tags ?? []);
    updateEditDur();
    editError.classList.add('hidden');
    editSave.disabled = false;
    editDelete.disabled = false;
    editPanel.classList.remove('hidden');
    editDesc.focus();
    // Cargar proyectos si aún no se han cargado
    if (allProjects.length === 0) {
      vscode.postMessage({ command: 'loadProjects' });
    }
    if (allTags.length === 0) {
      vscode.postMessage({ command: 'loadTags' });
    }
  }

  editClose.addEventListener('click', () => {
    createMode = false;
    editPanel.classList.add('hidden');
    const titleEl = document.getElementById('edit-panel-title');
    if (titleEl) { titleEl.textContent = 'Editar'; }
    document.getElementById('edit-save').textContent = 'Guardar';
    document.getElementById('edit-delete').style.display = '';
  });

  // ── Picker de proyecto ───────────────────────────────
  function applyProjectSelection(id, name, color) {
    selectedProjectId = id;
    selectedProjectColor = color;
    if (id) {
      editProjectLabel.textContent = name || 'Proyecto';
      editProjectDot.style.background = color || '#999';
      editProjectBtn.classList.add('active');
    } else {
      editProjectLabel.textContent = 'Sin proyecto';
      editProjectDot.style.background = 'var(--vscode-descriptionForeground)';
      editProjectBtn.classList.remove('active');
    }
  }

  function applyTagSelection(entryTagNames) {
    const names = allTags
      .filter(tag => selectedTagIds.includes(tag.id))
      .map(tag => tag.name);
    const fallbackNames = Array.isArray(entryTagNames) ? entryTagNames : [];
    const finalNames = names.length ? names : fallbackNames;
    if (!finalNames.length) {
      editTagsLabel.textContent = 'Sin etiquetas';
      editTagsBtn.classList.remove('active');
      return;
    }
    editTagsLabel.textContent = finalNames.length <= 2 ? finalNames.join(', ') : finalNames.length + ' etiquetas';
    editTagsBtn.classList.add('active');
  }

  function applyTimerProjectSelection(id, name, color) {
    timerProjectId = id;
    timerProjectColor = color;
    if (id) {
      timerProjLabel.textContent = name || 'Proyecto';
      timerProjDot.style.background = color || '#999';
      timerProjDot.style.display = 'inline-block';
      timerProjBtn.classList.add('active');
    } else {
      timerProjLabel.textContent = 'Sin proyecto';
      timerProjDot.style.display = 'none';
      timerProjBtn.classList.remove('active');
    }
  }

  function applyTimerTagSelection() {
    const names = allTags.filter(tag => timerTagIds.includes(tag.id)).map(tag => tag.name);
    if (!names.length) {
      timerTagsLabel.textContent = '';
      timerTagsBtn.classList.remove('active');
    } else {
      timerTagsLabel.textContent = names.length <= 2 ? names.join(', ') : names.length + ' etiquetas';
      timerTagsBtn.classList.add('active');
    }
  }

  function renderProjList(query) {
    const q = (query || '').toLowerCase();
    const filtered = allProjects.filter(p => p.name.toLowerCase().includes(q));
    const activeId = pickerMode === 'timer' ? timerProjectId : selectedProjectId;

    // Agrupar por cliente
    const clientMap = {};
    for (const p of filtered) {
      const key = p.client_name || '__none__';
      if (!clientMap[key]) { clientMap[key] = []; }
      clientMap[key].push(p);
    }

    let html = '<div class="proj-none" id="proj-select-none">'
      + '<span class="proj-none-dot"></span>'
      + 'Sin proyecto'
      + (activeId === null ? ' <span style="margin-left:auto;color:${TOGGL_COLOR};font-weight:700">&#10003;</span>' : '')
      + '</div>';

    const noClient = clientMap['__none__'] || [];
    delete clientMap['__none__'];

    if (noClient.length) {
      html += '<div class="proj-client-label">Sin cliente</div>';
      html += noClient.map(p => projItemHtml(p, activeId)).join('');
    }

    for (const [client, projs] of Object.entries(clientMap)) {
      html += '<div class="proj-client-label">' + esc(client) + '</div>';
      html += projs.map(p => projItemHtml(p, activeId)).join('');
    }

    if (!filtered.length) {
      html = '<p class="entries-empty">No se encontraron proyectos.</p>';
    }

    projList.innerHTML = html;

    const createWrap = document.createElement('div');
    createWrap.className = 'proj-create-inline';
    createWrap.appendChild(projCreateBtn);
    projList.appendChild(createWrap);

    projList.querySelector('#proj-select-none')?.addEventListener('click', () => {
      if (pickerMode === 'timer') { applyTimerProjectSelection(null, null, null); }
      else { applyProjectSelection(null, null, null); }
      projPicker.classList.add('hidden');
    });
    projList.querySelectorAll('.proj-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.getAttribute('data-proj-id'));
        const p = allProjects.find(x => x.id === id);
        if (p) {
          if (pickerMode === 'timer') { applyTimerProjectSelection(p.id, p.name, p.color); }
          else { applyProjectSelection(p.id, p.name, p.color); }
        }
        projPicker.classList.add('hidden');
      });
    });
  }

  function projItemHtml(p, activeId) {
    const check = (activeId === p.id)
      ? '<span class="proj-item-check">&#10003;</span>' : '';
    return '<div class="proj-item" data-proj-id="' + p.id + '">'
      + '<div class="proj-item-left">'
      +   '<span class="proj-item-dot" style="background:' + esc(p.color) + '"></span>'
      +   esc(p.name)
      + '</div>'
      + check
      + '</div>';
  }

  function renderTagList(query) {
    const q = (query || '').trim().toLowerCase();
    const filtered = allTags.filter(tag => tag.name.toLowerCase().includes(q));
    tagCreateBtn.textContent = q ? '+ Crear etiqueta "' + query.trim() + '"' : '+ Crear una etiqueta';
    tagCreateBtn.disabled = !q || allTags.some(tag => tag.name.toLowerCase() === q);
    const activeTagIds = pickerMode === 'timer' ? timerTagIds : selectedTagIds;

    if (!filtered.length) {
      tagList.innerHTML = '<p class="entries-empty">No se encontraron etiquetas.</p>';
    } else {
      tagList.innerHTML = filtered.map(tag => {
        const selected = activeTagIds.includes(tag.id);
        return '<div class="tag-item' + (selected ? ' selected' : '') + '" data-tag-id="' + tag.id + '">'
          + '<span class="tag-checkbox">' + (selected ? '&#10003;' : '') + '</span>'
          + '<span class="tag-name">' + esc(tag.name) + '</span>'
          + '</div>';
      }).join('');
    }

    const createWrap = document.createElement('div');
    createWrap.className = 'tag-create-inline';
    createWrap.appendChild(tagCreateBtn);
    tagList.appendChild(createWrap);

    tagList.querySelectorAll('.tag-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.getAttribute('data-tag-id'));
        if (pickerMode === 'timer') {
          if (timerTagIds.includes(id)) { timerTagIds = timerTagIds.filter(t => t !== id); }
          else { timerTagIds = [...timerTagIds, id]; }
          applyTimerTagSelection();
        } else {
          if (selectedTagIds.includes(id)) { selectedTagIds = selectedTagIds.filter(tagId => tagId !== id); }
          else { selectedTagIds = [...selectedTagIds, id]; }
          applyTagSelection();
        }
        renderTagList(tagSearch.value);
      });
    });
  }

  function syncCreateProjectState() {
    const hasName = Boolean(createProjectName.value.trim());
    createProjectSubmit.disabled = !hasName;
    createProjectColorPreview.style.background = createProjectColor;
  }

  function renderCreateProjectColors() {
    createProjectColors.innerHTML = PROJECT_COLORS.map(color =>
      '<button class="create-project-color-option' + (color === createProjectColor ? ' selected' : '') + '"'
      + ' data-color="' + color + '" style="background:' + color + '" title="' + color + '"></button>'
    ).join('');
    createProjectColors.querySelectorAll('.create-project-color-option').forEach(btn => {
      btn.addEventListener('click', () => {
        createProjectColor = btn.getAttribute('data-color') || '#d8dbe5';
        renderCreateProjectColors();
        syncCreateProjectState();
      });
    });
  }

  function openCreateProjectModal() {
    createProjectName.value = '';
    createProjectClient.selectedIndex = 0;
    createProjectPrivate.checked = false;
    createProjectColor = '#d8dbe5';
    createProjectError.textContent = '';
    createProjectSubmit.textContent = 'Crear proyecto';
    renderCreateProjectColors();
    syncCreateProjectState();
    createProjectOverlay.classList.remove('hidden');
    createProjectName.focus();
  }

  function closeCreateProjectModal() {
    createProjectOverlay.classList.add('hidden');
    createProjectError.textContent = '';
    createProjectSubmit.disabled = false;
    createProjectSubmit.textContent = 'Crear proyecto';
  }

  editProjectBtn.addEventListener('click', () => {
    pickerMode = 'edit';
    projSearch.value = '';
    renderProjList('');
    projPicker.classList.remove('hidden');
    projSearch.focus();
  });

  projPickerClose.addEventListener('click', () => projPicker.classList.add('hidden'));

  projSearch.addEventListener('input', () => renderProjList(projSearch.value));
  projCreateBtn.addEventListener('click', () => openCreateProjectModal());
  createProjectColorTrigger.addEventListener('click', () => {
    const nextIndex = (PROJECT_COLORS.indexOf(createProjectColor) + 1) % PROJECT_COLORS.length;
    createProjectColor = PROJECT_COLORS[nextIndex];
    renderCreateProjectColors();
    syncCreateProjectState();
  });
  createProjectName.addEventListener('input', () => {
    createProjectError.textContent = '';
    syncCreateProjectState();
  });
  createProjectCancel.addEventListener('click', () => closeCreateProjectModal());
  createProjectOverlay.addEventListener('click', (ev) => {
    if (ev.target === createProjectOverlay) {
      closeCreateProjectModal();
    }
  });
  createProjectSubmit.addEventListener('click', () => {
    const name = createProjectName.value.trim();
    if (!name) {
      createProjectError.textContent = 'Escribe un nombre para el proyecto.';
      syncCreateProjectState();
      return;
    }
    createProjectError.textContent = '';
    createProjectSubmit.disabled = true;
    createProjectSubmit.textContent = 'Creando…';
    vscode.postMessage({
      command: 'createProject',
      name,
      color: createProjectColor,
      isPrivate: createProjectPrivate.checked,
    });
  });

  editTagsBtn.addEventListener('click', () => {
    pickerMode = 'edit';
    tagError.textContent = '';
    tagSearch.value = '';
    renderTagList('');
    tagPicker.classList.remove('hidden');
    tagSearch.focus();
    if (allTags.length === 0) {
      vscode.postMessage({ command: 'loadTags' });
    }
  });

  timerProjBtn.addEventListener('click', () => {
    pickerMode = 'timer';
    projSearch.value = '';
    renderProjList('');
    projPicker.classList.remove('hidden');
    projSearch.focus();
    if (allProjects.length === 0) { vscode.postMessage({ command: 'loadProjects' }); }
  });

  timerTagsBtn.addEventListener('click', () => {
    pickerMode = 'timer';
    tagError.textContent = '';
    tagSearch.value = '';
    renderTagList('');
    tagPicker.classList.remove('hidden');
    tagSearch.focus();
    if (allTags.length === 0) { vscode.postMessage({ command: 'loadTags' }); }
  });

  tagPickerClose.addEventListener('click', () => tagPicker.classList.add('hidden'));
  tagSearch.addEventListener('input', () => {
    tagError.textContent = '';
    renderTagList(tagSearch.value);
  });
  tagCreateBtn.addEventListener('click', () => {
    const name = tagSearch.value.trim();
    if (!name) { return; }
    tagError.textContent = '';
    tagCreateBtn.disabled = true;
    vscode.postMessage({ command: 'createTag', name });
  });

  // Input date nativo abre el picker al hacer clic en el icono de calendario
  editStartDate.addEventListener('change', () => {
    editStartDateISO = editStartDate.value; // YYYY-MM-DD
    editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
  });

  editDesc.addEventListener('input', () => {
    editDescClr.style.display = editDesc.value ? 'block' : 'none';
  });
  editDescClr.addEventListener('click', () => {
    editDesc.value = ''; editDescClr.style.display = 'none'; editDesc.focus();
  });

  editStartTm.addEventListener('input', updateEditDur);
  editStopTm.addEventListener('input', updateEditDur);

  editSave.addEventListener('click', () => {
    editSave.disabled = true;
    editError.classList.add('hidden');
    const startISO = buildISO(editStartDateISO, editStartTm.value);
    if (createMode) {
      const stopISO = buildISO(editStartDateISO, editStopTm.value);
      vscode.postMessage({
        command: 'createManualEntry',
        description: editDesc.value.trim() || 'Sin título',
        start: startISO,
        stop: stopISO,
        project_id: selectedProjectId ?? null,
        tag_ids: selectedTagIds,
        tags: selectedTagIds.map(id => { const t = allTags.find(x => x.id === id); return t ? t.name : null; }).filter(n => n !== null),
      });
      return;
    }
    if (!editingEntry) { editSave.disabled = false; return; }
    const stopDateISO = editingEntry.stop
      ? toDateInput(editingEntry.stop)
      : editStartDateISO;
    const stopISO  = buildISO(stopDateISO, editStopTm.value);
    vscode.postMessage({
      command: 'updateEntry',
      id: editingEntry.id,
      description: editDesc.value.trim() || 'Sin título',
      start: startISO,
      stop: stopISO,
      project_id: selectedProjectId ?? null,
      tag_ids: selectedTagIds,
      tags: selectedTagIds.map(id => { const t = allTags.find(x => x.id === id); return t ? t.name : null; }).filter(n => n !== null),
    });
  });

  editDelete.addEventListener('click', () => {
    if (!editingEntry) { return; }
    editDelete.disabled = true;
    editError.classList.add('hidden');
    vscode.postMessage({ command: 'deleteEntry', id: editingEntry.id });
  });

  // ── Entrada manual (ícono +) ────────────────────────
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      createMode = true;
      const titleEl = document.getElementById('edit-panel-title');
      if (titleEl) { titleEl.textContent = 'Nuevo registro'; }
      document.getElementById('edit-save').textContent = 'Crear';
      document.getElementById('edit-delete').style.display = 'none';
      editingEntry = null;
      editDesc.value = '';
      editDescClr.style.display = 'none';
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3600000);
      editStartDateISO = toDateInput(now.toISOString());
      editStartTm.value = toTimeInput(oneHourAgo.toISOString());
      editStopTm.value  = toTimeInput(now.toISOString());
      editStartDate.value = editStartDateISO;
      editDateDisp.textContent = fmtDateDisplay(editStartDateISO);
      selectedProjectId = null; selectedProjectColor = null;
      applyProjectSelection(null, null, null);
      selectedTagIds = [];
      applyTagSelection([]);
      updateEditDur();
      editError.classList.add('hidden');
      editSave.disabled = false;
      editDelete.disabled = false;
      editPanel.classList.remove('hidden');
      editDesc.focus();
      if (allProjects.length === 0) { vscode.postMessage({ command: 'loadProjects' }); }
      if (allTags.length === 0) { vscode.postMessage({ command: 'loadTags' }); }
    });
  }

  // ── Editar inicio del timer en curso ─────────────────
  elapsed.addEventListener('click', () => {
    if (!startTime || !entryId) { return; }
    const local = new Date(startTime - new Date().getTimezoneOffset() * 60000).toISOString();
    rseDate.value = local.slice(0, 10);
    rseTime.value = local.slice(11, 16);
    rseOverlay.classList.remove('hidden');
  });

  rseCancel.addEventListener('click', () => rseOverlay.classList.add('hidden'));
  rseOverlay.addEventListener('click', (ev) => {
    if (ev.target === rseOverlay) { rseOverlay.classList.add('hidden'); }
  });
  rseSave.addEventListener('click', () => {
    if (!rseDate.value || !rseTime.value || !entryId) { rseOverlay.classList.add('hidden'); return; }
    const localDateTime = rseDate.value + 'T' + rseTime.value + ':00';
    const parsed = new Date(localDateTime);
    if (Number.isNaN(parsed.getTime())) { return; }
    const newStartIso = parsed.toISOString();
    startTime = parsed.getTime();
    rseOverlay.classList.add('hidden');
    vscode.postMessage({ command: 'updateRunningStart', entryId, start: newStartIso });
  });

  // ── Historial ──────────────────────────────────────────
  function fmtDuration(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return h > 0 ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s);
  }

  function dayKey(iso) {
    return new Date(iso).toDateString();
  }

  function dayLabel(iso) {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) { return 'Hoy'; }
    if (d.toDateString() === yesterday.toDateString()) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function fmtTime(iso) {
    return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  function fmtDayTotal(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) { return h + ' h ' + (m > 0 ? m + ' min' : ''); }
    return m + ' min';
  }

  function calendarDayStart(d) {
    const s = new Date(d);
    s.setHours(0, 0, 0, 0);
    return s;
  }

  function calendarDayEnd(d) {
    const e = calendarDayStart(d);
    e.setDate(e.getDate() + 1);
    return e;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  function setHistoryView(view) {
    activeHistoryView = view;
    const isList = view === 'list';
    const isCalendar = view === 'calendar';
    const isStats = view === 'stats';
    entriesListView.classList.toggle('hidden', !isList);
    entriesCalendarView.classList.toggle('hidden', !isCalendar);
    entriesCalendarView.classList.toggle('visible', isCalendar);
    entriesStatsView.classList.toggle('hidden', !isStats);
    viewListBtn.classList.toggle('active', isList);
    viewCalendarBtn.classList.toggle('active', isCalendar);
    viewStatsBtn.classList.toggle('active', isStats);
    if (isCalendar) {
      renderCalendar(latestEntries);
      if (allProjects.length === 0) {
        vscode.postMessage({ command: 'loadProjects' });
      }
    }
    if (isStats) {
      renderStats(latestEntries);
    }
  }

  function fmtHms(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  function weekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function monthStart(date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function dayStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function computeOverlapSecs(entry, start, end) {
    const entryStart = new Date(entry.start);
    const entryStop = entry.stop
      ? new Date(entry.stop)
      : new Date(entryStart.getTime() + (entry.duration * 1000));
    const clippedStart = entryStart > start ? entryStart : start;
    const clippedEnd = entryStop < end ? entryStop : end;
    return Math.max(0, Math.round((clippedEnd.getTime() - clippedStart.getTime()) / 1000));
  }

  function getStatsRangeConfig(range) {
    const now = new Date();
    if (range === 'today') {
      const start = dayStart(now);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const bins = Array.from({ length: 24 }, (_, hour) => {
        const s = new Date(start);
        s.setHours(hour, 0, 0, 0);
        const e = new Date(s);
        e.setHours(hour + 1, 0, 0, 0);
        return {
          start: s,
          end: e,
          label: hour % 3 === 0 ? pad(hour) : '',
        };
      });
      return { start, end, bins, totalLabel: 'Total hoy' };
    }

    if (range === 'month') {
      const start = monthStart(now);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const dayCount = Math.round((end.getTime() - start.getTime()) / 86400000);
      const bins = Array.from({ length: dayCount }, (_, idx) => {
        const s = new Date(start);
        s.setDate(start.getDate() + idx);
        const e = new Date(s);
        e.setDate(e.getDate() + 1);
        const dayNum = s.getDate();
        const showLabel = dayNum === 1 || dayNum % 5 === 0 || idx === dayCount - 1;
        return {
          start: s,
          end: e,
          label: showLabel ? String(dayNum) : '',
        };
      });
      return { start, end, bins, totalLabel: 'Total mes' };
    }

    const start = weekStart(now);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const bins = Array.from({ length: 7 }, (_, idx) => {
      const s = new Date(start);
      s.setDate(start.getDate() + idx);
      const e = new Date(s);
      e.setDate(e.getDate() + 1);
      return {
        start: s,
        end: e,
        label: s.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' }),
      };
    });
    return { start, end, bins, totalLabel: 'Total semana' };
  }

  function setStatsRange(nextRange) {
    statsRange = nextRange;
    statsRangeTodayBtn.classList.toggle('active', nextRange === 'today');
    statsRangeWeekBtn.classList.toggle('active', nextRange === 'week');
    statsRangeMonthBtn.classList.toggle('active', nextRange === 'month');
    if (statsBarsViewport) {
      statsBarsViewport.scrollLeft = 0;
    }
    renderStats(latestEntries);
  }

  function updateStatsScrollButtons() {
    if (!statsBarsViewport || !statsBarsPrev || !statsBarsNext) { return; }
    const maxScroll = Math.max(0, statsBarsViewport.scrollWidth - statsBarsViewport.clientWidth);
    statsBarsPrev.disabled = statsBarsViewport.scrollLeft <= 1;
    statsBarsNext.disabled = statsBarsViewport.scrollLeft >= (maxScroll - 1);
  }

  function renderStats(entries) {
    if (!statsBars || !statsProjectList || !statsDonut || !statsDonutCenter || !statsYAxis || !statsGridLines || !statsBarsChartWrap) { return; }

    const { start, end, bins, totalLabel } = getStatsRangeConfig(statsRange);
    const rangeEntries = (entries || []).filter(e => {
      const es = new Date(e.start);
      const ee = e.stop ? new Date(e.stop) : new Date(es.getTime() + (e.duration * 1000));
      return ee > start && es < end;
    });

    if (statsTotalLabel) { statsTotalLabel.textContent = totalLabel; }

    const secsByDay = bins.map(bin => {
      return rangeEntries.reduce((acc, e) => acc + computeOverlapSecs(e, bin.start, bin.end), 0);
    });

    const totalSecs = secsByDay.reduce((a, b) => a + b, 0);
    const avgSecs = Math.round(totalSecs / Math.max(1, bins.length));
    statsTotalTime.textContent = fmtHms(totalSecs);
    statsAvgTime.textContent = fmtDurationCompact(avgSecs);

    const maxDay = Math.max(1, ...secsByDay);

    const axisTicks = [];
    const gridLines = [];
    for (let i = 0; i <= STATS_AXIS_STEPS; i += 1) {
      const ratio = i / STATS_AXIS_STEPS;
      const secs = Math.round(maxDay * (1 - ratio));
      const top = ratio * 100;
      axisTicks.push('<div class="stats-y-tick" style="top:' + top + '%">' + fmtDurationCompact(secs) + '</div>');
      gridLines.push('<div class="stats-grid-line" style="top:' + top + '%"></div>');
    }
    statsYAxis.innerHTML = axisTicks.join('');
    statsGridLines.innerHTML = gridLines.join('');

    statsBars.innerHTML = bins.map((bin, idx) => {
      const secs = secsByDay[idx];
      const hPct = (secs / maxDay) * 100;
      const renderedHeight = secs > 0 ? Math.max(2, hPct) : 0;
      const barHeightPx = (renderedHeight / 100) * 120;
      const valueLabel = secs > 0 ? fmtDurationCompact(secs) : '';
      const axisLabel = bin.label ? esc(bin.label) : '&nbsp;';
      return '<div class="stats-bar-col">'
        + '<div class="stats-bar-wrap">'
        +   '<div class="stats-bar-value" style="bottom:' + (barHeightPx + 4) + 'px" title="' + esc(valueLabel) + '">' + esc(valueLabel) + '</div>'
        +   '<div class="stats-bar" style="height:' + renderedHeight + '%"></div>'
        + '</div>'
        + '<div class="stats-bar-day">' + axisLabel + '</div>'
        + '</div>';
    }).join('');

    const projectMap = new Map();
    for (const e of rangeEntries) {
      const key = e.project_id ?? 'none';
      const overlapSecs = computeOverlapSecs(e, start, end);
      if (overlapSecs > 0) {
        projectMap.set(key, (projectMap.get(key) || 0) + overlapSecs);
      }
    }
    const projectRows = Array.from(projectMap.entries())
      .map(([key, secs]) => {
        const proj = allProjects.find(p => String(p.id) === String(key));
        return {
          key,
          secs,
          name: proj ? proj.name : 'Sin proyecto',
          color: proj ? (proj.color || STATS_COLORS[0]) : STATS_COLORS[1],
        };
      })
      .sort((a, b) => b.secs - a.secs);

    if (!projectRows.length) {
      statsProjectList.innerHTML = '<p class="stats-empty">Sin datos para este rango.</p>';
      statsDonut.style.background = 'conic-gradient(' + '${TOGGL_COLOR}' + ' 0% 100%)';
      statsDonutCenter.textContent = '0:00';
      return;
    }

    let accPct = 0;
    const slices = projectRows.map(row => {
      const pct = totalSecs > 0 ? (row.secs / totalSecs) * 100 : 0;
      const startPct = accPct;
      accPct += pct;
      return row.color + ' ' + startPct.toFixed(2) + '% ' + accPct.toFixed(2) + '%';
    });
    statsDonut.style.background = 'conic-gradient(' + slices.join(', ') + ')';
    statsDonutCenter.textContent = fmtDurationCompact(totalSecs);

    statsProjectList.innerHTML = projectRows.map(row => {
      return '<div class="stats-project-row">'
        + '<div class="stats-project-left">'
        +   '<span class="stats-project-dot" style="background:' + esc(row.color) + '"></span>'
        +   '<span class="stats-project-name">' + esc(row.name) + '</span>'
        + '</div>'
        + '<span class="stats-project-time">' + fmtDurationCompact(row.secs) + '</span>'
        + '</div>';
    }).join('');

    updateStatsScrollButtons();
  }

  function fmtCalendarLabel(d) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (isSameDay(d, today)) { return 'Hoy'; }
    if (isSameDay(d, yesterday)) { return 'Ayer'; }
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function fmtDurationCompact(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? h + ':' + pad(m) : '0:' + pad(m);
  }

  function fmtDurationFull(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const mStr = m + 'm ' + pad(s) + 's';
    return h > 0 ? h + 'h ' + mStr : mStr;
  }

  function colorWithAlpha(color, alphaHex) {
    if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      return color + alphaHex;
    }
    if (/^#[0-9a-fA-F]{3}$/.test(color)) {
      const r = color[1];
      const g = color[2];
      const b = color[3];
      return '#' + r + r + g + g + b + b + alphaHex;
    }
    return 'color-mix(in srgb, ' + color + ' 35%, transparent)';
  }

  function localDateValue(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function localTimeValue(date) {
    return pad(date.getHours()) + ':' + pad(date.getMinutes());
  }

  function fillPlanProjects(selectedId) {
    planProject.innerHTML = '<option value="">Sin proyecto</option>' + allProjects.map(project =>
      '<option value="' + project.id + '">' + esc(project.name) + '</option>'
    ).join('');
    planProject.value = selectedId == null ? '' : String(selectedId);
  }

  function openPlanPanel(block) {
    editingPlannedBlock = block || null;
    planTitle.textContent = block ? 'Editar planificación' : 'Planificar tiempo';
    planDescription.value = block ? block.description : '';
    const start = block ? new Date(block.start) : new Date(calendarDate);
    if (!block) {
      start.setHours(9, 0, 0, 0);
    }
    const stop = block ? new Date(block.stop) : new Date(start.getTime() + 60 * 60000);
    planDate.value = localDateValue(start);
    planStart.value = localTimeValue(start);
    planStop.value = localTimeValue(stop);
    fillPlanProjects(block ? block.project_id : null);
    planError.textContent = '';
    planError.classList.add('hidden');
    planDelete.classList.toggle('hidden', !block);
    planStartTimer.classList.toggle('hidden', !block);
    planSave.disabled = false;
    planSave.textContent = 'Guardar';
    planOverlay.classList.remove('hidden');
    planDescription.focus();
  }

  function closePlanPanel() {
    planOverlay.classList.add('hidden');
    editingPlannedBlock = null;
  }

  function submitPlan() {
    const description = planDescription.value.trim();
    const start = new Date(planDate.value + 'T' + planStart.value);
    const stop = new Date(planDate.value + 'T' + planStop.value);
    if (!description || !planDate.value || !planStart.value || !planStop.value || !Number.isFinite(start.getTime()) || !Number.isFinite(stop.getTime()) || stop <= start) {
      planError.textContent = 'Indica una tarea y un intervalo horario válido.';
      planError.classList.remove('hidden');
      return;
    }
    planSave.disabled = true;
    planSave.textContent = 'Guardando…';
    vscode.postMessage({
      command: 'savePlannedBlock',
      id: editingPlannedBlock ? editingPlannedBlock.id : undefined,
      description,
      start: start.toISOString(),
      stop: stop.toISOString(),
      project_id: planProject.value ? Number(planProject.value) : null,
    });
  }

  function renderCalendar(entries) {
    const pxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const start = calendarDayStart(calendarDate);
    const end = calendarDayEnd(calendarDate);
    calendarDayLabel.textContent = fmtCalendarLabel(start);

    const baseEntries = (entries || []).filter(e => !(entryId && Number(e.id) === Number(entryId)));
    const dayEntriesSource = [...baseEntries];
    if (entryId && startTime) {
      const runningStart = new Date(startTime);
      const runningStop = new Date();
      if (runningStop > start && runningStart < end) {
        const runningTagNames = allTags
          .filter(tag => timerTagIds.includes(tag.id))
          .map(tag => tag.name);
        dayEntriesSource.unshift({
          id: entryId,
          description: descInput.value.trim() || 'Sin título',
          start: runningStart.toISOString(),
          stop: null,
          duration: Math.max(1, Math.round((runningStop.getTime() - runningStart.getTime()) / 1000)),
          project_id: timerProjectId,
          tag_ids: timerTagIds,
          tags: runningTagNames,
          is_running: true,
        });
      }
    }

    const dayEntries = dayEntriesSource.filter(e => {
      const entryStart = new Date(e.start);
      const entryStop = e.stop
        ? new Date(e.stop)
        : ((entryId && Number(e.id) === Number(entryId)) ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      return entryStop > start && entryStart < end;
    });

    const dayTotal = dayEntries.reduce((acc, e) => {
      const entryStart = new Date(e.start);
      const entryStop = e.stop
        ? new Date(e.stop)
        : ((entryId && Number(e.id) === Number(entryId)) ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      const clippedStart = entryStart > start ? entryStart : start;
      const clippedStop = entryStop < end ? entryStop : end;
      const secs = Math.max(0, Math.round((clippedStop.getTime() - clippedStart.getTime()) / 1000));
      return acc + secs;
    }, 0);
    calendarTotal.textContent = fmtDurationCompact(dayTotal);

    let slotsHtml = '';
    const slotHeight = calendarZoomMinutes * pxPerMinute;
    for (let mins = 0; mins < 24 * 60; mins += calendarZoomMinutes) {
      const hour = Math.floor(mins / 60);
      const minute = mins % 60;
      const showHourLabel = minute === 0;
      const slotLabel = pad(hour) + ':' + pad(minute);
      const minuteClass = minute === 0 ? ' full' : (minute === 30 ? ' half' : ' quarter');
      const altClass = (Math.floor(mins / calendarZoomMinutes) % 2 === 1) ? ' alt' : '';
      slotsHtml += '<div class="calendar-slot-row' + altClass + (showHourLabel ? ' hour' : '') + '" style="height:' + slotHeight + 'px">'
        + '<span class="calendar-hour-label' + minuteClass + '">' + slotLabel + '</span>'
        + '</div>';
    }
    const totalPx = 24 * 60 * pxPerMinute;

    const dayPlannedBlocks = plannedBlocks.filter(block => {
      const blockStart = new Date(block.start);
      const blockStop = new Date(block.stop);
      return Number.isFinite(blockStart.getTime()) && Number.isFinite(blockStop.getTime())
        && blockStop > start && blockStart < end;
    });
    const plannedHtml = dayPlannedBlocks.map(block => {
      const blockStart = new Date(block.start);
      const blockStop = new Date(block.stop);
      const clippedStart = blockStart > start ? blockStart : start;
      const clippedStop = blockStop < end ? blockStop : end;
      const top = Math.max(0, ((clippedStart.getTime() - start.getTime()) / 60000) * pxPerMinute);
      const height = Math.max(12, ((clippedStop.getTime() - clippedStart.getTime()) / 60000) * pxPerMinute);
      const proj = allProjects.find(project => Number(project.id) === Number(block.project_id));
      const color = proj && proj.color ? proj.color : CALENDAR_NO_PROJECT_COLOR;
      const projectHtml = proj
        ? '<div class="calendar-event-proj" style="color:' + color + '">' + esc(proj.name) + '</div>'
        : '';
      return '<div class="calendar-event calendar-planned-event" data-plan-id="' + esc(block.id) + '" title="Tiempo planificado" style="top:' + top + 'px;height:' + height + 'px;border-left-color:' + color + ';background-color:' + colorWithAlpha(color, '30') + '">'
        + '<div class="calendar-event-title">' + esc(block.description) + '</div>'
        + projectHtml
        + '<div class="calendar-planned-label">Planificado</div>'
        + '<div class="calendar-event-meta">' + esc(fmtDurationFull(Math.round((clippedStop.getTime() - clippedStart.getTime()) / 1000))) + '</div>'
        + '</div>';
    }).join('');

    const eventsHtml = dayEntries.map(e => {
      const entryStart = new Date(e.start);
      const isRunning = Boolean(e.is_running) || (entryId && Number(e.id) === Number(entryId) && !e.stop);
      const entryStop = e.stop
        ? new Date(e.stop)
        : (isRunning ? new Date() : new Date(new Date(e.start).getTime() + (e.duration * 1000)));
      const clippedStart = entryStart > start ? entryStart : start;
      const clippedStop = entryStop < end ? entryStop : end;
      const minsFromStart = (clippedStart.getTime() - start.getTime()) / 60000;
      const minsDuration = Math.max(calendarZoomMinutes / 2, (clippedStop.getTime() - clippedStart.getTime()) / 60000);
      const top = Math.max(0, minsFromStart * pxPerMinute);
      const height = Math.max(12, minsDuration * pxPerMinute);
      const proj = allProjects.find(p => p.id === e.project_id);
      const color = (proj && proj.color) ? proj.color : CALENDAR_NO_PROJECT_COLOR;
      const bgColor = isRunning ? colorWithAlpha(color, '2e') : color + CALENDAR_EVENT_BG_ALPHA;
      const title = esc(e.description || 'Sin título');
      const durSecs = Math.max(0, Math.round((clippedStop.getTime() - clippedStart.getTime()) / 1000));
      const meta = isRunning
        ? esc(formatElapsed(durSecs * 1000))
        : esc(fmtDurationFull(durSecs));
      const projName = proj ? esc(proj.name) : '';
      const tagsStr = (e.tags && e.tags.length) ? e.tags.map(t => esc(t)).join(', ') : '';
      const projHtml = projName ? '<div class="calendar-event-proj" style="color:' + color + '">' + projName + '</div>' : '';
      const tagsHtml = tagsStr ? '<div class="calendar-event-tags">' + tagsStr + '</div>' : '';
      const isFullInDay = entryStart >= start && entryStop <= end;
      const resizable = (isFullInDay && !isRunning) ? '1' : '0';
      const handles = (isFullInDay && !isRunning)
        ? '<div class="calendar-resize-handle top" data-resize="start"></div><div class="calendar-resize-handle bottom" data-resize="end"></div>'
        : '';
      return '<div class="calendar-event' + (isRunning ? ' running' : '') + '" data-cal-id="' + e.id + '" data-cal-running="' + (isRunning ? '1' : '0') + '" data-resizable="' + resizable + '" data-duration="' + e.duration + '" style="top:' + top + 'px;height:' + height + 'px;border-left-color:' + color + ';background-color:' + bgColor + ';cursor:' + (isRunning ? 'default' : 'pointer') + '">'
        + handles
        + '<div class="calendar-event-title">' + title + '</div>'
        + projHtml
        + tagsHtml
        + '<div class="calendar-event-meta">' + meta + '</div>'
        + '</div>';
    }).join('');

    calendarGrid.style.minHeight = totalPx + 'px';
    calendarGrid.innerHTML = slotsHtml + '<div class="calendar-events-layer">' + plannedHtml + eventsHtml + '</div>';
    if (calendarEmptyHint) {
      calendarEmptyHint.classList.toggle('hidden', dayEntries.length !== 0 || dayPlannedBlocks.length !== 0);
      calendarEmptyHint.textContent = 'No hay imputaciones ni tiempo planificado para este día.';
    }
    calendarGrid.querySelectorAll('.calendar-planned-event').forEach(el => {
      el.addEventListener('click', () => {
        const block = plannedBlocks.find(item => item.id === el.getAttribute('data-plan-id'));
        if (block) { openPlanPanel(block); }
      });
    });
    calendarGrid.querySelectorAll('.calendar-event').forEach(el => {
      let didResize = false;
      const isResizable = el.getAttribute('data-resizable') === '1';

      const syncResize = (edge, deltaY, startTop, startHeight, slotPx, maxTop) => {
        const minHeight = Math.max(12, slotPx);
        if (edge === 'end') {
          let newHeight = startHeight + deltaY;
          newHeight = Math.max(minHeight, newHeight);
          newHeight = Math.min(newHeight, (24 * 60 * pxPerMinute) - startTop);
          newHeight = Math.round(newHeight / slotPx) * slotPx;
          el.style.height = newHeight + 'px';
          return;
        }

        let newTop = startTop + deltaY;
        let newHeight = startHeight - deltaY;
        newTop = Math.max(0, Math.min(maxTop, newTop));
        newHeight = Math.max(minHeight, newHeight);
        newTop = Math.round(newTop / slotPx) * slotPx;
        newHeight = Math.round(newHeight / slotPx) * slotPx;
        if (newTop + newHeight > 24 * 60 * pxPerMinute) {
          newHeight = (24 * 60 * pxPerMinute) - newTop;
        }
        el.style.top = newTop + 'px';
        el.style.height = Math.max(minHeight, newHeight) + 'px';
      };

      el.querySelectorAll('.calendar-resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (ev) => {
          if (!isResizable || ev.button !== 0) { return; }
          ev.stopPropagation();
          ev.preventDefault();
          didResize = false;
          el.classList.add('resizing');
          const edge = handle.getAttribute('data-resize');
          const startY = ev.clientY;
          const startTop = parseFloat(el.style.top || '0');
          const startHeight = parseFloat(el.style.height || '12');
          const slotPx = calendarZoomMinutes * pxPerMinute;
          const maxTop = Math.max(0, totalPx - startHeight);

          const onMove = (moveEv) => {
            const delta = moveEv.clientY - startY;
            if (Math.abs(delta) > 2) { didResize = true; }
            syncResize(edge, delta, startTop, startHeight, slotPx, maxTop);
          };

          const onUp = () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            el.classList.remove('resizing');
            if (!didResize) { return; }

            const id = Number(el.getAttribute('data-cal-id'));
            const entry = latestEntries.find(x => x.id === id);
            if (!entry) { return; }

            const newTop = parseFloat(el.style.top || '0');
            const newHeight = parseFloat(el.style.height || '12');
            const minutesFromStart = Math.round(newTop / pxPerMinute);
            const durationMinutes = Math.max(1, Math.round(newHeight / pxPerMinute));
            const newStartDate = new Date(start.getTime() + minutesFromStart * 60000);
            const newStopDate = new Date(newStartDate.getTime() + durationMinutes * 60000);

            const tagIds = Array.isArray(entry.tag_ids) ? entry.tag_ids : [];
            const tagNames = Array.isArray(entry.tags) ? entry.tags : [];
            vscode.postMessage({
              command: 'updateEntry',
              id: entry.id,
              description: entry.description || 'Sin título',
              start: newStartDate.toISOString(),
              stop: newStopDate.toISOString(),
              project_id: entry.project_id ?? null,
              tag_ids: tagIds,
              tags: tagNames,
            });
          };

          window.addEventListener('mousemove', onMove);
          window.addEventListener('mouseup', onUp);
        });
      });

      el.addEventListener('click', () => {
        if (didResize) { didResize = false; return; }
        if (el.getAttribute('data-cal-running') === '1') { return; }
        const id = Number(el.getAttribute('data-cal-id'));
        const entry = latestEntries.find(x => x.id === id);
        if (entry) { openEditPanel(entry); }
      });
    });
  }

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function renderEntries(entries) {
    if (!entries || entries.length === 0) {
      entriesList.innerHTML = '<p class="entries-empty">No hay imputaciones recientes.</p>';
      return;
    }

    // Agrupar por día
    const groups = [];
    const keyMap = {};
    for (const e of entries) {
      const k = dayKey(e.start);
      if (!keyMap[k]) {
        keyMap[k] = { label: dayLabel(e.start), total: 0, entries: [] };
        groups.push(keyMap[k]);
      }
      keyMap[k].total += e.duration;
      keyMap[k].entries.push(e);
    }

    entriesList.innerHTML = groups.map((g, i) =>
      '<div class="day-group">'
      + '<div class="day-header" data-group="' + i + '">'
      + '<div class="day-header-left">'
      +   '<span class="day-chevron">&#9660;</span>'
      +   '<span class="day-label">' + esc(g.label) + '</span>'
      + '</div>'
      + '<span class="day-total">' + fmtDayTotal(g.total) + '</span>'
      + '</div>'
      + '<div class="day-entries" data-entries="' + i + '">'
      + g.entries.map(e => {
        const proj = allProjects.find(p => p.id === e.project_id);
        const projColor = (proj && proj.color) ? proj.color : '${TOGGL_COLOR}';
        const projName = proj ? esc(proj.name) : esc(e.project_name || '');
        const tagsStr = (e.tags && e.tags.length) ? e.tags.map(t => esc(t)).join(', ') : '';
        const projectLineHtml = projName
          ? '<div class="entry-project-line"><span class="entry-project-dot" style="background:' + projColor + '"></span><span class="entry-project" style="color:' + projColor + '">' + projName + '</span></div>'
          : '<div class="entry-project-line"><span class="entry-project empty">+ Add project</span></div>';
        const tagsLineHtml = tagsStr ? '<div class="entry-tags-line">&#128278; ' + tagsStr + '</div>' : '';
        return '<div class="entry-item" data-id="' + e.id + '" style="cursor:pointer">'
        + '<div class="entry-info">'
        +   '<div class="entry-desc' + (e.description ? '' : ' empty') + '">' + esc(e.description || 'Sin título') + '</div>'
        +   projectLineHtml
        +   tagsLineHtml
        +   '<div class="entry-meta">' + fmtTime(e.start) + '</div>'
        + '</div>'
        + '<span class="entry-duration">' + fmtDuration(e.duration) + '</span>'
        + '<button class="entry-replay" data-replay-id="' + e.id + '" title="Continuar" tabindex="-1">'
        +   '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
        + '</button>'
        + '</div>';
      }).join('')
      + '</div>'
      + '</div>'
    ).join('');

    // Toggle colapsar/expandir
    entriesList.querySelectorAll('.day-header').forEach(header => {
      header.addEventListener('click', () => {
        const idx = header.getAttribute('data-group');
        const body = entriesList.querySelector('[data-entries="' + idx + '"]');
        const chevron = header.querySelector('.day-chevron');
        const collapsed = body.style.display === 'none';
        body.style.display = collapsed ? '' : 'none';
        chevron.classList.toggle('collapsed', !collapsed);
      });
    });

    // Abrir edición al clic en una entrada
    entriesList.querySelectorAll('.entry-item').forEach(el => {
      const id = Number(el.getAttribute('data-id'));
      el.addEventListener('click', (ev) => {
        if (ev.target.closest('.entry-replay')) { return; }
        const entry = entries.find(e => e.id === id);
        if (entry) { openEditPanel(entry); }
      });
    });

    // Boton replay: iniciar nuevo timer con la misma descripcion
    entriesList.querySelectorAll('.entry-replay').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const id = Number(btn.getAttribute('data-replay-id'));
        const entry = entries.find(e => e.id === id);
        if (!entry) { return; }
        vscode.postMessage({ command: 'startTimer', description: entry.description || '' });
      });
    });
  }

  viewListBtn.addEventListener('click', () => setHistoryView('list'));
  viewCalendarBtn.addEventListener('click', () => setHistoryView('calendar'));
  viewStatsBtn.addEventListener('click', () => setHistoryView('stats'));
  statsRangeTodayBtn.addEventListener('click', () => setStatsRange('today'));
  statsRangeWeekBtn.addEventListener('click', () => setStatsRange('week'));
  statsRangeMonthBtn.addEventListener('click', () => setStatsRange('month'));
  statsBarsPrev.addEventListener('click', () => {
    statsBarsViewport.scrollBy({ left: -220, behavior: 'smooth' });
  });
  statsBarsNext.addEventListener('click', () => {
    statsBarsViewport.scrollBy({ left: 220, behavior: 'smooth' });
  });
  statsBarsViewport.addEventListener('scroll', updateStatsScrollButtons);
  window.addEventListener('resize', updateStatsScrollButtons);

  function zoomCalendarKeepingScroll(nextZoom) {
    if (!calendarScroll || nextZoom === calendarZoomMinutes) { return; }

    const beforePxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const anchorMinutes = (calendarScroll.scrollTop + (calendarScroll.clientHeight / 2)) / beforePxPerMinute;

    calendarZoomMinutes = nextZoom;
    renderCalendar(latestEntries);

    const afterPxPerMinute = 0.8 * (60 / calendarZoomMinutes);
    const nextScrollTop = Math.max(0, (anchorMinutes * afterPxPerMinute) - (calendarScroll.clientHeight / 2));
    calendarScroll.scrollTop = nextScrollTop;
  }

  calendarPrevDay.addEventListener('click', () => {
    calendarDate.setDate(calendarDate.getDate() - 1);
    renderCalendar(latestEntries);
  });
  calendarNextDay.addEventListener('click', () => {
    calendarDate.setDate(calendarDate.getDate() + 1);
    renderCalendar(latestEntries);
  });
  calendarPlanBtn.addEventListener('click', () => openPlanPanel(null));
  planCancel.addEventListener('click', closePlanPanel);
  planOverlay.addEventListener('click', (event) => {
    if (event.target === planOverlay) { closePlanPanel(); }
  });
  planSave.addEventListener('click', submitPlan);
  planDelete.addEventListener('click', () => {
    if (!editingPlannedBlock) { return; }
    planDelete.disabled = true;
    vscode.postMessage({ command: 'deletePlannedBlock', id: editingPlannedBlock.id });
  });
  planStartTimer.addEventListener('click', () => {
    if (!editingPlannedBlock) { return; }
    vscode.postMessage({
      command: 'startTimer',
      description: editingPlannedBlock.description,
      project_id: editingPlannedBlock.project_id,
    });
    closePlanPanel();
  });
  calendarZoomIn.addEventListener('click', () => {
    const idx = CALENDAR_ZOOMS.indexOf(calendarZoomMinutes);
    const nextZoom = CALENDAR_ZOOMS[Math.min(CALENDAR_ZOOMS.length - 1, idx + 1)];
    zoomCalendarKeepingScroll(nextZoom);
  });
  calendarZoomOut.addEventListener('click', () => {
    const idx = CALENDAR_ZOOMS.indexOf(calendarZoomMinutes);
    const nextZoom = CALENDAR_ZOOMS[Math.max(0, idx - 1)];
    zoomCalendarKeepingScroll(nextZoom);
  });

  refreshBtn.addEventListener('click', () => {
    entriesList.innerHTML = '<p class="entries-empty">Cargando…</p>';
    calendarGrid.innerHTML = '<p class="entries-empty">Cargando…</p>';
    statsBars.innerHTML = '<p class="stats-empty">Cargando…</p>';
    vscode.postMessage({ command: 'loadEntries' });
  });

  vscode.postMessage({ command: 'ready' });`;
}
