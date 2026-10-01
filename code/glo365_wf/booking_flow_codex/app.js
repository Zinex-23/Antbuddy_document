import { branches, services, specialists, demoContacts, demoConfig, demoScenarios, demoBookings } from './data.js';

const STORAGE_KEY = 'glo365_booking_mock_state';
const DEMO_STORAGE_KEY = 'glo365_booking_mock_demo';
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

const shell = document.getElementById('chat-shell');
const feed = document.getElementById('chat-feed');
const actionBar = document.getElementById('action-bar');
const composerInput = document.getElementById('composer-input');
const sendButton = document.getElementById('send-button');
const attachButton = document.getElementById('attach-button');
const backButton = document.getElementById('back-button');
const demoToggle = document.getElementById('demo-toggle');
const demoPanel = document.getElementById('demo-panel');
const sheetOverlay = document.getElementById('sheet-overlay');
const sheetTitle = document.getElementById('sheet-title');
const sheetKicker = document.getElementById('sheet-kicker');
const sheetBody = document.getElementById('sheet-body');
const sheetCta = document.getElementById('sheet-cta');
const sheetClose = document.getElementById('sheet-close');

const defaultState = {
  demoMode: new URLSearchParams(window.location.search).get('demo') === '1',
  currentStep: 'entry',
  language: null,
  contactId: 'new',
  source: 'direct',
  campaign: 'spring_booking',
  countryId: null,
  branchId: null,
  branchSearch: 'city',
  serviceIds: [],
  specialistPreference: 'any',
  assignedSpecialistId: null,
  slotStart: null,
  slotEnd: null,
  holdId: null,
  holdExpiresAt: null,
  note: '',
  contactPhone: '',
  channel: 'whatsapp',
  otpStatus: 'idle',
  otpAttempts: 0,
  otpVerified: false,
  bookingId: null,
  bookingHistory: [],
  pendingInput: null,
  messages: [],
  lastError: null,
  scenarioId: 'new_success',
  actionButtons: [],
  sheet: {
    type: null,
    open: false,
    options: [],
    selectedValues: [],
    submitLabel: 'Done',
  },
};

let state = loadState();
let lastTick = Date.now();

function getDemoScenario() {
  const saved = localStorage.getItem(DEMO_STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { scenarioId: 'new_success', demoMode: defaultState.demoMode };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return { ...defaultState, ...JSON.parse(saved) };
    } catch {
      return { ...defaultState };
    }
  }
  return { ...defaultState };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveDemoConfig() {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ scenarioId: state.scenarioId, demoMode: state.demoMode }));
}

function setDemoMode(enabled) {
  state.demoMode = enabled;
  document.body.classList.toggle('demo-enabled', enabled);
  saveDemoConfig();
  persistState();
}

function syncDemoPanel() {
  const scenario = getDemoScenario();
  const scenarioButtons = demoScenarios
    .map((item) => `
      <button type="button" data-scenario="${item.id}" class="${item.id === scenario.scenarioId ? 'is-selected' : ''}">
        ${item.label}
      </button>
    `)
    .join('');

  const activeScenario = demoScenarios.find((item) => item.id === scenario.scenarioId) || demoScenarios[0];
  const otpCode = demoConfig.demoOtp;

  demoPanel.innerHTML = `
    <div class="demo-header">
      <h3>Demo controls</h3>
      <span class="demo-tag">${state.demoMode ? 'Live' : 'Hidden'}</span>
    </div>
    <div class="demo-list">
      ${scenarioButtons}
      <button type="button" id="reset-demo-button" class="secondary-button">Reset demo</button>
    </div>
    <div class="demo-note">
      <strong>OTP demo:</strong> <span class="otp-code">${otpCode}</span>
      <br />
      <span>${demoConfig.demoDisclaimer}</span>
    </div>
    <div class="demo-note">
      Scenario: <strong>${activeScenario.label}</strong>
    </div>
  `;

  const resetButton = document.getElementById('reset-demo-button');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      resetDemo();
    });
  }

  document.querySelectorAll('[data-scenario]').forEach((button) => {
    button.addEventListener('click', () => {
      loadScenario(button.dataset.scenario);
    });
  });
}

function pushMessage(role, text, options = {}) {
  state.messages.push({
    id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    text,
    timestamp: options.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    card: options.card || null,
  });
}

function setStep(step) {
  state.currentStep = step;
  persistState();
}

function ensureContact() {
  if (!demoContacts[state.contactId]) {
    state.contactId = 'new';
  }
}

function resetDemo() {
  state = { ...defaultState, demoMode: true };
  state.messages = [];
  state.scenarioId = 'new_success';
  state.contactId = 'new';
  state.source = 'direct';
  state.campaign = 'spring_booking';
  state.language = null;
  state.bookingHistory = [];
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(DEMO_STORAGE_KEY);
  setDemoMode(true);
  loadScenario('new_success');
}

function loadScenario(scenarioId) {
  const scenario = demoScenarios.find((item) => item.id === scenarioId) || demoScenarios[0];
  state = { ...defaultState, ...{
    demoMode: true,
    scenarioId: scenario.id,
    source: scenario.source,
    campaign: scenario.source === 'qr' ? 'qr_dubai' : 'spring_booking',
    contactId: scenario.contactId,
    language: scenario.language,
    bookingHistory: demoContacts[scenario.contactId]?.bookings ? [...demoContacts[scenario.contactId].bookings] : [],
  } };

  if (scenario.contactId === 'sarah') {
    state.contactPhone = demoContacts.sarah.phone;
    state.branchId = demoContacts.sarah.lastBranchId;
    state.countryId = 'AE';
  }

  if (scenario.id === 'empty_history') {
    state.contactId = 'new';
    state.bookingHistory = [];
  }

  const savedDemo = { scenarioId: scenario.id, demoMode: true };
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(savedDemo));
  state.messages = [];
  state.actionButtons = [];
  state.pendingInput = null;
  state.otpStatus = 'idle';
  state.otpAttempts = 0;
  state.otpVerified = false;
  state.contactPhone = '';

  if (scenario.contactId === 'sarah') {
    state.contactPhone = '+971555123456';
    state.language = 'en';
  }

  state.currentStep = 'entry';
  persistState();
  bootFlow();
}

function bootFlow() {
  const contact = demoContacts[state.contactId] || demoContacts.new;
  state.contactPhone = state.contactPhone || contact.phone || '';
  state.bookingHistory = [...(contact.bookings || [])];
  if (state.language && state.currentStep === 'entry') {
    state.currentStep = 'menu';
  }
  render();
}

function getBranchById(id) { return branches.find((branch) => branch.id === id) || null; }

function getServiceById(id) {
  return services.find((service) => service.id === id) || null;
}

function getServicesForBranch(branchId) {
  return services.filter((service) => service.branchId === branchId);
}

function getSpecialistsForBranch(branchId) {
  return specialists.filter((specialist) => specialist.branchId === branchId);
}

function getMatchingSpecialists() {
  if (!state.branchId) return [];
  const requiredServiceIds = state.serviceIds;
  if (!requiredServiceIds.length) return [];

  return getSpecialistsForBranch(state.branchId).filter((specialist) => {
    return requiredServiceIds.every((serviceId) => specialist.serviceIds.includes(serviceId));
  });
}

function formatCurrency(value, currency) {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
  return formatter.format(value);
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours && mins) return `${hours}h ${mins}m`;
  if (hours) return `${hours}h`;
  return `${mins}m`;
}

function sumServicesPrice() {
  return state.serviceIds.reduce((sum, serviceId) => {
    const service = getServiceById(serviceId);
    return sum + (service ? service.price : 0);
  }, 0);
}

function sumServicesDuration() {
  return state.serviceIds.reduce((sum, serviceId) => {
    const service = getServiceById(serviceId);
    return sum + (service ? service.durationMinutes : 0);
  }, 0);
}

function getSelectedServices() {
  return state.serviceIds.map((serviceId) => getServiceById(serviceId)).filter(Boolean);
}

function getSelectedBranch() {
  return getBranchById(state.branchId);
}

function getSelectedSpecialist() {
  return specialists.find((specialist) => specialist.id === state.assignedSpecialistId) || null;
}

function isSlotAvailable(startIso, endIso, specialistId = state.assignedSpecialistId) {
  if (!specialistId || !startIso || !endIso) return false;
  const specialist = specialists.find((item) => item.id === specialistId);
  if (!specialist) return false;

  const branch = getBranchById(state.branchId);
  if (!branch) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  const durationMinutes = (end - start) / 60000;

  if (durationMinutes < sumServicesDuration()) return false;

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const open = parseTime(branch.hours.open);
  const close = parseTime(branch.hours.close);

  if (startMinutes < open || endMinutes > close) return false;

  const sameDayBookings = demoBookings.filter((booking) => booking.specialistId === specialistId && booking.branchId === branch.id);
  const overlaps = sameDayBookings.some((booking) => {
    const bookingStart = new Date(booking.start);
    const bookingEnd = new Date(booking.end);
    return start < bookingEnd && end > bookingStart;
  });
  return !overlaps;
}

function parseTime(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function nextSlotsForSelectedSpec() {
  const branch = getSelectedBranch();
  const specialist = getSelectedSpecialist();
  if (!branch || !specialist || !state.branchId) return [];

  const today = new Date();
  const slots = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const dayIndex = new Date(localDate).getDay();
    const schedule = specialist.schedule.find((entry) => entry.day === dayIndex) || specialist.schedule[0];
    if (!schedule) continue;

    const openMinutes = parseTime(schedule.start);
    const closeMinutes = parseTime(schedule.end);
    let cursor = openMinutes;
    while (cursor + sumServicesDuration() <= closeMinutes) {
      const start = new Date(localDate + 'T00:00:00');
      start.setMinutes(cursor);
      const end = new Date(start.getTime());
      end.setMinutes(end.getMinutes() + sumServicesDuration());
      const startIso = shiftTimezone(start, branch.timezone).toISOString();
      const endIso = shiftTimezone(end, branch.timezone).toISOString();
      if (isSlotAvailable(startIso, endIso, specialist.id)) {
        slots.push({
          start: startIso,
          end: endIso,
          label: `${DATE_FORMATTER.format(start)} • ${WEEKDAY_FORMATTER.format(start)}`,
          time: `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          branchId: branch.id,
        });
      }
      cursor += 30;
    }
  }
  return slots;
}

function shiftTimezone(date, timezone) {
  const dateString = date.toLocaleString('en-US', { timeZone: timezone, hour12: false });
  const [datePart, timePart] = dateString.split(', ');
  const [month, day, year] = datePart.split('/');
  const [hour, minute, second] = timePart.split(':');
  const offsetDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}:${second}`);
  return offsetDate;
}

function setHold() {
  const holdMinutes = demoConfig.holdMinutes;
  const expiresAt = new Date(Date.now() + holdMinutes * 60 * 1000);
  state.holdExpiresAt = expiresAt.toISOString();
  state.holdId = `hold-${Date.now()}`;
  persistState();
}

function checkHoldValid() {
  if (!state.holdExpiresAt) return true;
  return new Date(state.holdExpiresAt).getTime() > Date.now();
}

function clearHold() {
  state.holdId = null;
  state.holdExpiresAt = null;
  persistState();
}

function createBookingDraft() {
  const branch = getSelectedBranch();
  const specialist = getSelectedSpecialist();
  const total = sumServicesPrice();
  const deposit = Math.round(total * demoConfig.depositRate);

  return {
    id: `GLO-${Math.floor(1000 + Math.random() * 9000)}`,
    contactId: state.contactId,
    branchId: branch?.id || null,
    serviceIds: [...state.serviceIds],
    specialistId: specialist?.id || null,
    start: state.slotStart,
    end: state.slotEnd,
    note: state.note,
    phone: state.contactPhone,
    total,
    deposit,
    balance: total - deposit,
    status: 'pending',
  };
}

function buildSummaryCard() {
  const branch = getSelectedBranch();
  const specialist = getSelectedSpecialist();
  const services = getSelectedServices();
  const total = sumServicesPrice();
  const deposit = Math.round(total * demoConfig.depositRate);
  const balance = total - deposit;

  return `
    <div class="summary-card">
      <h4>Booking summary</h4>
      <div class="summary-row"><span>Branch</span><strong>${branch ? branch.nameEn : '—'}</strong></div>
      <div class="summary-row"><span>Address</span><strong>${branch ? branch.address : '—'}</strong></div>
      <div class="summary-row"><span>Services</span><strong>${services.map((service) => service.nameEn).join(', ') || '—'}</strong></div>
      <div class="summary-row"><span>Specialist</span><strong>${specialist ? specialist.name : 'No preference'}</strong></div>
      <div class="summary-row"><span>Time</span><strong>${state.slotStart ? new Date(state.slotStart).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—'}</strong></div>
      <div class="summary-row"><span>Duration</span><strong>${formatDuration(sumServicesDuration())}</strong></div>
      <div class="summary-row"><span>Total</span><strong>${formatCurrency(total, branch?.currency || 'AED')}</strong></div>
      <div class="summary-row"><span>Deposit</span><strong>${formatCurrency(deposit, branch?.currency || 'AED')}</strong></div>
      <div class="summary-row"><span>Balance</span><strong>${formatCurrency(balance, branch?.currency || 'AED')}</strong></div>
    </div>
  `;
}

function renderMessage(message) {
  const row = document.createElement('article');
  row.className = `message-row ${message.role === 'outgoing' ? 'outgoing' : 'incoming'}`;

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';

  if (message.card) {
    bubble.classList.add('card');
    bubble.innerHTML = message.card;
  } else {
    bubble.textContent = message.text;
  }

  row.appendChild(bubble);

  if (message.role === 'outgoing' && message.text) {
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    const timeSpan = document.createElement('span');
    timeSpan.textContent = message.timestamp || '';
    meta.appendChild(timeSpan);
    row.appendChild(meta);
  }

  if (message.role === 'incoming' && message.text) {
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    const timeSpan = document.createElement('span');
    timeSpan.textContent = message.timestamp || '';
    meta.appendChild(timeSpan);
    row.appendChild(meta);
  }

  return row;
}

function renderMessages() {
  feed.innerHTML = '';
  state.messages.forEach((message) => {
    const rendered = renderMessage(message);
    feed.appendChild(rendered);
  });
  requestAnimationFrame(() => {
    feed.scrollTop = feed.scrollHeight;
  });
}

function renderActions() {
  actionBar.innerHTML = '';
  const rules = getActionButtons();

  rules.forEach((action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `choice-button ${action.variant || ''}`.trim();
    button.textContent = action.label;
    button.dataset.action = action.action;
    button.dataset.value = action.value || '';
    if (action.disabled) button.disabled = true;
    actionBar.appendChild(button);
  });
}

function getActionButtons() {
  const defaultButtons = [];

  switch (state.currentStep) {
    case 'entry':
    case 'language':
      defaultButtons.push({ label: 'English', action: 'set-language', value: 'en' }, { label: 'العربية', action: 'set-language', value: 'ar' });
      break;
    case 'menu':
      defaultButtons.push({ label: 'Book new appointment', action: 'menu-select', value: 'book' }, { label: 'Check my booking', action: 'menu-select', value: 'check' }, { label: 'Talk to an agent', action: 'menu-select', value: 'agent' });
      break;
    case 'branch-context':
      defaultButtons.push({ label: `Continue at ${getBranchById(state.branchId)?.nameEn || 'branch'}`, action: 'branch-confirm', value: 'continue' }, { label: 'Choose another', action: 'branch-confirm', value: 'change' });
      break;
    case 'branch-search':
    case 'branch-city':
      defaultButtons.push({ label: 'Nearest to me', action: 'branch-method', value: 'nearest' }, { label: 'Choose city', action: 'branch-method', value: 'city' }, { label: 'Search by name', action: 'branch-method', value: 'name' }, { label: 'Change country', action: 'branch-method', value: 'country' });
      break;
    case 'country-pick':
      defaultButtons.push({ label: 'UAE', action: 'country-select', value: 'AE' }, { label: 'Saudi Arabia', action: 'country-select', value: 'SA' });
      break;
    case 'city-pick':
      defaultButtons.push({ label: 'Dubai', action: 'city-select', value: 'Dubai' }, { label: 'Riyadh', action: 'city-select', value: 'Riyadh' }, { label: 'Abu Dhabi', action: 'city-select', value: 'Abu Dhabi' }, { label: 'Other city', action: 'city-select', value: 'other' });
      break;
    case 'branch-results':
      if (state.branchId) {
        defaultButtons.push({ label: 'Continue', action: 'branch-result-select', value: state.branchId }, { label: 'Search again', action: 'branch-result-select', value: 'retry' });
      }
      break;
    case 'services':
      defaultButtons.push({ label: 'Open service menu', action: 'open-services-sheet', value: 'open' });
      break;
    case 'specialist':
      defaultButtons.push({ label: 'No preference', action: 'specialist-pick', value: 'any' });
      break;
    case 'slot-review':
      defaultButtons.push({ label: 'View available times', action: 'open-slot-sheet', value: 'open' }, { label: 'Other specialist', action: 'slot-action', value: 'specialist' }, { label: 'Other date', action: 'slot-action', value: 'date' });
      break;
    case 'review':
      defaultButtons.push({ label: 'Details correct', action: 'review-confirm', value: 'correct' }, { label: 'Edit', action: 'review-confirm', value: 'edit' });
      break;
    case 'note':
      defaultButtons.push({ label: 'Add note', action: 'note-action', value: 'add' }, { label: 'Skip', action: 'note-action', value: 'skip' });
      break;
    case 'phone':
      defaultButtons.push({ label: 'Use this number', action: 'phone-choice', value: 'current' }, { label: 'Another number', action: 'phone-choice', value: 'other' });
      break;
    case 'otp-channel':
      defaultButtons.push({ label: 'WhatsApp', action: 'otp-channel-select', value: 'whatsapp' }, { label: 'SMS', action: 'otp-channel-select', value: 'sms' });
      break;
    case 'otp-entry':
      defaultButtons.push({ label: 'Send code', action: 'otp-submit', value: 'submit' }, { label: 'Resend code', action: 'otp-resend', value: 'resend', disabled: state.otpStatus === 'cooldown' });
      break;
    case 'success':
      defaultButtons.push({ label: 'Check my booking', action: 'check-booking', value: 'check' });
      break;
    default:
      break;
  }

  return defaultButtons;
}

function renderComposer() {
  const inputSteps = ['branch-name', 'phone', 'note', 'otp', 'otp-entry'];
  const requiresText = Boolean(state.pendingInput) || inputSteps.includes(state.currentStep);
  composerInput.disabled = !requiresText;
  composerInput.placeholder = getComposerPlaceholder();
  sendButton.disabled = !requiresText;
  attachButton.disabled = true;
}

function getComposerPlaceholder() {
  if (state.currentStep === 'branch-name' || state.pendingInput === 'branch-name') return 'Search branch by name';
  if (state.currentStep === 'phone' || state.pendingInput === 'phone') return 'Type phone number';
  if (state.currentStep === 'otp-entry' || state.pendingInput === 'otp') return 'Enter 6-digit code';
  if (state.currentStep === 'note' || state.pendingInput === 'note') return 'Add a note for your appointment';
  return 'Message';
}

function render() {
  renderMessages();
  renderActions();
  renderComposer();
  syncDemoPanel();
  document.body.classList.toggle('demo-enabled', state.demoMode);
  const hasSheet = state.sheet.open;
  sheetOverlay.classList.toggle('hidden', !hasSheet);
  sheetOverlay.setAttribute('aria-hidden', String(!hasSheet));
  if (!hasSheet) {
    sheetBody.innerHTML = '';
    sheetTitle.textContent = 'Select a time';
    sheetKicker.textContent = 'Available times';
    sheetCta.textContent = 'Done';
    sheetCta.disabled = false;
  }
}

function openSheet(type, payload = {}) {
  state.sheet.type = type;
  state.sheet.open = true;
  state.sheet.options = payload.options || [];
  state.sheet.selectedValues = payload.selectedValues || [];
  state.sheet.submitLabel = payload.submitLabel || 'Done';
  buildSheetContent();
  render();
}

function closeSheet() {
  state.sheet.open = false;
  state.sheet.type = null;
  state.sheet.options = [];
  render();
}

function buildSheetContent() {
  sheetBody.innerHTML = '';
  sheetTitle.textContent = state.sheet.type === 'services' ? 'Select services' : 'Available times';
  sheetKicker.textContent = state.sheet.type === 'services' ? 'Services' : 'Available times';
  sheetCta.textContent = state.sheet.submitLabel;

  if (state.sheet.type === 'services') {
    const branch = getSelectedBranch();
    const branchServices = branch ? getServicesForBranch(branch.id) : [];

    const grouped = branchServices.reduce((map, service) => {
      (map[service.category] ||= []).push(service);
      return map;
    }, {});

    Object.entries(grouped).forEach(([category, items]) => {
      const section = document.createElement('div');
      section.className = 'sheet-section';
      const heading = document.createElement('h3');
      heading.textContent = category;
      section.appendChild(heading);

      const list = document.createElement('div');
      list.className = 'service-grid';

      items.forEach((service) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sheet-button';
        if (state.serviceIds.includes(service.id)) button.classList.add('is-selected');
        button.innerHTML = `
          <div>
            <strong>${service.nameEn}</strong>
            <small>${formatDuration(service.durationMinutes)} • ${formatCurrency(service.price, service.currency)}</small>
          </div>
          <span>${state.serviceIds.includes(service.id) ? '✓' : ''}</span>
        `;

        button.addEventListener('click', () => toggleServiceSelection(service.id));
        list.appendChild(button);
      });

      section.appendChild(list);
      sheetBody.appendChild(section);
    });

    sheetCta.disabled = state.serviceIds.length === 0;
    return;
  }

  if (state.sheet.type === 'slots') {
    const branch = getSelectedBranch();
    const specialist = getSelectedSpecialist();
    const slots = nextSlotsForSelectedSpec();

    if (!slots.length) {
      const empty = document.createElement('div');
      empty.className = 'summary-card';
      empty.innerHTML = '<h4>No slots</h4><p>There are no matching slots for this combination. Try another specialist or date.</p>';
      sheetBody.appendChild(empty);
      sheetCta.textContent = 'Other specialist';
      sheetCta.disabled = false;
      return;
    }

    const timeGrid = document.createElement('div');
    timeGrid.className = 'time-grid';

    slots.slice(0, 10).forEach((slot) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sheet-button';
      button.innerHTML = `
        <div>
          <strong>${new Date(slot.start).toLocaleDateString([], { month: 'short', day: 'numeric' })}</strong>
          <small>${new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
        </div>
        <span>${slot.branchId === branch?.id ? '✓' : ''}</span>
      `;
      button.addEventListener('click', () => {
        state.slotStart = slot.start;
        state.slotEnd = slot.end;
        state.holdId = `hold-${Date.now()}`;
        state.holdExpiresAt = new Date(Date.now() + demoConfig.holdMinutes * 60 * 1000).toISOString();
        state.currentStep = 'review';
        pushMessage('outgoing', `Selected ${new Date(slot.start).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} - ${new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        closeSheet();
        render();
      });
      timeGrid.appendChild(button);
    });

    sheetBody.appendChild(timeGrid);
    sheetCta.textContent = 'Select this time';
    sheetCta.disabled = false;
  }
}

function toggleServiceSelection(serviceId) {
  if (state.serviceIds.includes(serviceId)) {
    state.serviceIds = state.serviceIds.filter((item) => item !== serviceId);
  } else {
    state.serviceIds = [...state.serviceIds, serviceId];
  }
  if (state.serviceIds.length === 0) {
    state.currentStep = 'services';
  }
  persistState();
  buildSheetContent();
  render();
}

function showBotMessage(text, options = {}) {
  pushMessage('incoming', text, options);
  render();
}

function handleChoice() {
  const action = this.dataset.action;
  const value = this.dataset.value;

  if (action === 'set-language') {
    state.language = value;
    if (state.contactId === 'new') {
      state.currentStep = 'menu';
      pushMessage('outgoing', value === 'en' ? 'English' : 'العربية');
      showBotMessage('Perfect. I can help you book a new appointment.');
    } else {
      pushMessage('outgoing', value === 'en' ? 'English' : 'العربية');
      state.currentStep = 'menu';
      showBotMessage('Welcome back.');
    }
    persistState();
    render();
    return;
  }

  if (action === 'menu-select') {
    if (value === 'book') {
      if (state.contactId === 'sarah') {
        state.branchId = state.branchId || demoContacts.sarah.lastBranchId;
        state.currentStep = 'branch-context';
        showBotMessage(`I found your last branch, GLO365 Dubai. Would you like to continue there?`);
      } else {
        state.currentStep = 'branch-search';
        showBotMessage('Let’s find the right branch for your appointment.');
      }
      persistState();
      render();
      return;
    }

    if (value === 'check') {
      state.currentStep = 'history';
      showBookingHistory();
      return;
    }

    if (value === 'agent') {
      state.currentStep = 'agent';
      showBotMessage('I have handed your case to an agent. Please continue once you are ready, and I can resume the booking flow.');
      return;
    }
  }

  if (action === 'branch-confirm') {
    if (value === 'continue') {
      const branch = getBranchById(state.branchId);
      if (branch) {
        state.currentStep = 'services';
        pushMessage('outgoing', `Continue at ${branch.nameEn}`);
        showBotMessage(`Great. Let’s pick the services for ${branch.city}.`);
      }
    } else {
      state.currentStep = 'branch-search';
      showBotMessage('No problem — choose another branch search option.');
    }
    persistState();
    render();
    return;
  }

  if (action === 'branch-method') {
    if (value === 'nearest') {
      showBotMessage('I can suggest the nearest available branch based on your location. If sharing location is not available, you can search by city or name.');
      state.currentStep = 'branch-city';
      render();
      return;
    }

    if (value === 'city') {
      state.currentStep = 'city-pick';
      showBotMessage('Which city would you like to visit?');
      render();
      return;
    }

    if (value === 'name') {
      state.pendingInput = 'branch-name';
      state.currentStep = 'branch-name';
      showBotMessage('Please type a branch name, neighborhood, or city.');
      render();
      return;
    }

    if (value === 'country') {
      state.currentStep = 'country-pick';
      showBotMessage('Which country should I search?');
      render();
      return;
    }
  }

  if (action === 'country-select') {
    state.countryId = value;
    state.currentStep = 'branch-search';
    pushMessage('outgoing', value === 'AE' ? 'UAE' : 'Saudi Arabia');
    showBotMessage('This will narrow the branch results for your booking.');
    render();
    return;
  }

  if (action === 'city-select') {
    if (value === 'other') {
      state.currentStep = 'branch-name';
      state.pendingInput = 'branch-name';
      showBotMessage('Type a city or branch name to continue.');
      render();
      return;
    }

    const matches = branches.filter((branch) => branch.city === value && (!state.countryId || branch.countryId === state.countryId));
    if (!matches.length) {
      showBotMessage('No branches match that city. Try a different option or search by name.');
      return;
    }
    state.branchId = matches[0].id;
    state.currentStep = 'branch-results';
    showBotMessage(`I found ${matches.length} branch${matches.length > 1 ? 'es' : ''} in ${value}.`);
    render();
    return;
  }

  if (action === 'branch-result-select') {
    if (value === 'retry') {
      state.currentStep = 'branch-search';
      showBotMessage('Let’s try again with a different search method.');
      render();
      return;
    }

    state.branchId = value;
    const branch = getBranchById(state.branchId);
    if (branch) {
      state.currentStep = 'services';
      pushMessage('outgoing', `Branch: ${branch.nameEn}`);
      showBotMessage('Great. Please choose the services you want.');
      render();
    }
  }

  if (action === 'open-services-sheet') {
    openSheet('services', { selectedValues: state.serviceIds, submitLabel: 'Done' });
    return;
  }

  if (action === 'specialist-pick') {
    state.specialistPreference = value;
    const matching = getMatchingSpecialists();
    if (!matching.length) {
      showBotMessage('No specialist currently matches all selected services. Please adjust your services or branch.');
      state.currentStep = 'services';
      return;
    }
    state.assignedSpecialistId = value === 'any' ? matching[0].id : value;
    state.currentStep = 'slot-review';
    pushMessage('outgoing', value === 'any' ? 'No preference' : `Specialist: ${matching[0].name}`);
    showBotMessage('I’ve shortlisted the specialists who can support this combination.');
    render();
    return;
  }

  if (action === 'open-slot-sheet') {
    if (!state.assignedSpecialistId && !getMatchingSpecialists().length) {
      showBotMessage('Please choose a specialist before checking the available times.');
      return;
    }
    if (!state.assignedSpecialistId) {
      state.assignedSpecialistId = getMatchingSpecialists()[0]?.id || null;
    }
    state.currentStep = 'slot-review';
    openSheet('slots', { selectedValues: [], submitLabel: 'Select this time' });
    return;
  }

  if (action === 'slot-action') {
    if (value === 'specialist') {
      state.currentStep = 'specialist';
      showBotMessage('Please choose another specialist.');
      return;
    }
    if (value === 'date') {
      showBotMessage('Please pick a different date from the time selection sheet.');
      openSheet('slots', { selectedValues: [], submitLabel: 'Select this time' });
      return;
    }
  }

  if (action === 'review-confirm') {
    if (value === 'edit') {
      state.currentStep = 'services';
      showBotMessage('What would you like to change? You can edit the branch, services, specialist, or time.');
      return;
    }
    if (value === 'correct') {
      state.currentStep = 'note';
      showBotMessage('Would you like to add a note before we continue?');
      return;
    }
  }

  if (action === 'note-action') {
    if (value === 'add') {
      state.currentStep = 'note';
      state.pendingInput = 'note';
      showBotMessage('Add a short note for your appointment.');
      render();
      return;
    }
    state.note = '';
    state.currentStep = 'phone';
    showBotMessage('No note added. Let’s continue with your contact details.');
    render();
    return;
  }

  if (action === 'phone-choice') {
    if (value === 'current') {
      state.contactPhone = demoContacts[state.contactId]?.phone || state.contactPhone || '+971555123456';
      state.currentStep = 'otp-channel';
      showBotMessage('We will verify this contact number before confirming your booking.');
      render();
      return;
    }
    state.pendingInput = 'phone';
    state.currentStep = 'phone';
    showBotMessage('Please enter the phone number you would like to use for WhatsApp verification.');
    render();
    return;
  }

  if (action === 'otp-channel-select') {
    state.channel = value;
    state.otpStatus = 'sent';
    state.pendingInput = 'otp';
    state.currentStep = 'otp-entry';
    showBotMessage(`A demo OTP was sent to your ${value === 'whatsapp' ? 'WhatsApp' : 'SMS'} number.`);
    render();
    return;
  }

  if (action === 'otp-submit') {
    verifyOtp();
    return;
  }

  if (action === 'otp-resend') {
    if (state.otpStatus === 'cooldown') return;
    state.otpStatus = 'sent';
    state.otpAttempts = 0;
    showBotMessage('A fresh demo OTP has been generated.');
    render();
  }

  if (action === 'check-booking') {
    showBookingHistory();
  }
}

function showBookingHistory() {
  const bookings = demoContacts[state.contactId]?.bookings || [];
  if (!bookings.length) {
    state.currentStep = 'empty-state';
    showBotMessage('You do not have any upcoming bookings yet.');
    return;
  }

  const booking = bookings[0];
  const branch = getBranchById(booking.branchId);
  const services = booking.services.map((serviceId) => getServiceById(serviceId)?.nameEn || serviceId).join(', ');
  const card = `
    <div class="card-header">Booking status</div>
    <div class="card-body">
      <h3 class="card-title">${booking.id}</h3>
      <ul class="detail-list">
        <li><span class="icon-box"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></span><span>${branch?.nameEn || 'Branch'} • ${services}</span></li>
        <li><span class="icon-box"><svg viewBox="0 0 24 24"><path d="M7 3v4M17 3v4M4 9h16"/></svg></span><span>${new Date(booking.start).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span></li>
      </ul>
      <div class="card-footer">
        <span>${booking.status}</span>
      </div>
    </div>
  `;
  pushMessage('incoming', '', { card });
  render();
}

function handleComposerSubmit() {
  const value = composerInput.value.trim();
  if (!value) return;

  if (state.pendingInput === 'branch-name') {
    const normalized = value.toLowerCase();
    const result = branches.filter((branch) => {
      const haystack = `${branch.nameEn} ${branch.nameAr} ${branch.city} ${branch.region}`.toLowerCase();
      return haystack.includes(normalized);
    });

    if (!result.length) {
      showBotMessage('No branch matched that search. Please try again or ask for an agent.');
      composerInput.value = '';
      state.pendingInput = null;
      return;
    }

    state.branchId = result[0].id;
    pushMessage('outgoing', value);
    state.currentStep = 'branch-results';
    showBotMessage(`I found ${result.length} branch${result.length > 1 ? 'es' : ''} matching your search.`);
    composerInput.value = '';
    state.pendingInput = null;
    render();
    return;
  }

  if (state.pendingInput === 'phone') {
    const cleaned = value.replace(/\s+/g, '');
    if (!/^\+?[1-9]\d{7,14}$/.test(cleaned)) {
      showBotMessage('That phone number format looks invalid. Please use a valid country code and number.');
      composerInput.value = '';
      return;
    }
    state.contactPhone = cleaned;
    pushMessage('outgoing', cleaned);
    state.pendingInput = null;
    state.currentStep = 'otp-channel';
    showBotMessage('Your number is ready. Please choose how you would like to receive the OTP.');
    composerInput.value = '';
    render();
    return;
  }

  if (state.pendingInput === 'note') {
    if (value.length > demoConfig.noteLimit) {
      showBotMessage(`Please keep the appointment note under ${demoConfig.noteLimit} characters.`);
      return;
    }
    state.note = value;
    pushMessage('outgoing', value);
    state.pendingInput = null;
    state.currentStep = 'phone';
    showBotMessage('Your note has been saved. We just need your phone number to verify the booking.');
    composerInput.value = '';
    render();
    return;
  }

  if (state.pendingInput === 'otp') {
    state.pendingInput = null;
    if (value === demoConfig.demoOtp) {
      state.otpVerified = true;
      state.otpStatus = 'verified';
      pushMessage('outgoing', value);
      createBooking();
      composerInput.value = '';
      render();
      return;
    }

    state.otpAttempts += 1;
    if (state.otpAttempts >= demoConfig.maxOtpAttempts) {
      state.otpStatus = 'locked';
      showBotMessage('You entered the wrong code too many times. Please choose another number or ask an agent for help.');
      return;
    }
    showBotMessage(`That code is incorrect. You have ${demoConfig.maxOtpAttempts - state.otpAttempts} attempts left.`);
    composerInput.value = '';
    return;
  }

  pushMessage('outgoing', value);
  composerInput.value = '';
}

function verifyOtp() {
  const code = composerInput.value.trim();
  if (!code) {
    showBotMessage('Please enter the 6-digit OTP before continuing.');
    return;
  }
  if (code !== demoConfig.demoOtp) {
    state.otpAttempts += 1;
    if (state.otpAttempts >= demoConfig.maxOtpAttempts) {
      state.otpStatus = 'locked';
      showBotMessage('This session is locked after too many failed attempts. Please reset the demo or ask an agent.');
      composerInput.value = '';
      render();
      return;
    }
    showBotMessage(`Incorrect code. ${demoConfig.maxOtpAttempts - state.otpAttempts} attempts remaining.`);
    composerInput.value = '';
    render();
    return;
  }

  state.otpVerified = true;
  state.otpStatus = 'verified';
  composerInput.value = '';
  createBooking();
}

function createBooking() {
  state.currentStep = 'creating';
  showBotMessage('We are creating your appointment and checking the latest availability.');

  setTimeout(() => {
    const scenario = state.scenarioId;
    const shouldFail = scenario === 'system_error';

    if (scenario === 'hold_expired') {
      state.holdExpiresAt = new Date(Date.now() - 1000).toISOString();
      showBotMessage('The hold has expired. Please pick a new time for your appointment.');
      state.currentStep = 'slot-review';
      render();
      return;
    }

    if (scenario === 'system_error' && !state.lastError) {
      state.lastError = 'api-error';
      showBotMessage('The booking was not saved on the first try. Please retry.');
      state.currentStep = 'retry';
      render();
      return;
    }

    if (scenario === 'system_error' && state.lastError === 'api-error') {
      state.currentStep = 'agent';
      showBotMessage('Your booking could not be confirmed after a second attempt. An agent is ready to assist.');
      render();
      return;
    }

    if (!state.branchId || !state.serviceIds.length || !state.assignedSpecialistId || !state.slotStart || !state.slotEnd) {
      showBotMessage('Some required booking details are missing. Please review your selection and continue.');
      state.currentStep = 'review';
      render();
      return;
    }

    const draft = createBookingDraft();
    draft.bookingId = draft.id;
    if (state.contactId === 'new') {
      demoContacts.new.bookings = [draft];
    }
    if (state.contactId === 'sarah') {
      demoContacts.sarah.bookings = [draft];
    }
    state.bookingId = draft.id;
    state.bookingHistory = [draft];
    state.currentStep = 'success';
    const branch = getSelectedBranch();
    const specialist = getSelectedSpecialist();
    const total = sumServicesPrice();
    const deposit = Math.round(total * demoConfig.depositRate);
    const balance = total - deposit;

    const confirmationCard = `
      <div class="card-header">Appointment confirmed</div>
      <div class="card-body">
        <h3 class="card-title">${draft.id}</h3>
        <ul class="detail-list">
          <li><span class="icon-box"><svg viewBox="0 0 24 24"><path d="M12 3v8l4 3"/></svg></span><span>${branch?.nameEn || 'Branch'} • ${branch?.address || ''}</span></li>
          <li><span class="icon-box"><svg viewBox="0 0 24 24"><path d="M12 7v5l3 2"/></svg></span><span>${specialist?.name || 'Specialist'} • ${new Date(state.slotStart).toLocaleString([], { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}</span></li>
          <li><span class="icon-box"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg></span><span>${formatDuration(sumServicesDuration())} • ${formatCurrency(total, branch?.currency || 'AED')}</span></li>
        </ul>
        <div class="card-footer">
          <span>Deposit ${formatCurrency(deposit, branch?.currency || 'AED')}</span>
          <span>Balance ${formatCurrency(balance, branch?.currency || 'AED')}</span>
        </div>
      </div>
    `;

    pushMessage('incoming', '', { card: confirmationCard });
    showBotMessage('Your appointment has been successfully created and saved to your booking record.');
    clearHold();
    persistState();
    render();
  }, 700);
}

function hydrateFromState() {
  const contact = demoContacts[state.contactId] || demoContacts.new;
  state.contactPhone = state.contactPhone || contact.phone || '';
  if (!state.language && contact.language) state.language = contact.language;
  if (!state.bookingHistory.length && contact.bookings?.length) state.bookingHistory = [...contact.bookings];
}

function beginBookingFlow() {
  const branch = getBranchById(state.branchId) || getBranchById(demoContacts[state.contactId]?.lastBranchId || null);
  if (branch) {
    state.branchId = branch.id;
    state.currentStep = 'services';
    showBotMessage(`The branch is confirmed as ${branch.nameEn}.`);
  } else {
    state.currentStep = 'branch-search';
    showBotMessage('Let’s locate your preferred branch.');
  }
  render();
}

function startStateMachine() {
  hydrateFromState();

  if (!state.messages.length) {
    if (state.contactId === 'sarah' || state.language === 'en') {
      pushMessage('incoming', 'Hi! I’m GLO365. I can help you book a new appointment or check your current booking.');
    } else {
      pushMessage('incoming', 'Hi! I’m GLO365. I can help with your appointment booking.');
    }
  }

  if (state.currentStep === 'entry') {
    state.currentStep = 'language';
    pushMessage('incoming', 'Before we start, which language would you like to use?');
  }

  if (state.contactId === 'sarah' && !state.language) {
    state.language = 'en';
  }

  if (state.contactId === 'sarah' && state.currentStep === 'menu') {
    state.currentStep = 'branch-context';
  }

  if (state.currentStep === 'language') {
    showBotMessage('Please choose your preferred language.');
  }

  if (state.currentStep === 'menu') {
    showBotMessage('Please choose an option below.');
  }

  if (state.currentStep === 'services' && !state.serviceIds.length) {
    showBotMessage('Please choose one or more services for your appointment.');
  }

  if (state.currentStep === 'slot-review' && state.assignedSpecialistId) {
    showBotMessage('I’ve found time slots that fit your selected services and specialist.');
  }

  if (state.currentStep === 'review') {
    showBotMessage('Please check the booking details before continuing.');
  }

  if (state.currentStep === 'success') {
    showBotMessage('Your appointment is confirmed.');
  }
  persistState();
  render();
}

function initializeApp() {
  const params = new URLSearchParams(window.location.search);
  const demoParam = params.get('demo');
  if (demoParam === '1') {
    setDemoMode(true);
  } else {
    setDemoMode(false);
  }

  const scenario = getDemoScenario();
  if (scenario.scenarioId) {
    state.scenarioId = scenario.scenarioId;
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    state.contactId = scenario.scenarioId === 'existing_qr' ? 'sarah' : 'new';
    state.language = scenario.scenarioId === 'existing_qr' ? 'en' : null;
    state.source = demoScenarios.find((item) => item.id === scenario.scenarioId)?.source || 'direct';
    state.currentStep = 'entry';
    state.messages = [];
  }

  hydrateFromState();
  startStateMachine();
}

backButton.addEventListener('click', () => {
  if (state.sheet.open) {
    closeSheet();
    return;
  }

  if (state.currentStep === 'menu') {
    state.currentStep = 'language';
    showBotMessage('I’m ready when you are. Please choose your language again.');
    return;
  }

  if (state.currentStep === 'branch-results') {
    state.currentStep = 'branch-search';
    showBotMessage('You can search again by city, name or nearest location.');
    render();
    return;
  }

  if (state.currentStep === 'services') {
    state.currentStep = 'branch-search';
    showBotMessage('Your selected branch is still saved. You can change it when ready.');
    render();
    return;
  }

  if (state.currentStep === 'review') {
    state.currentStep = 'slot-review';
    showBotMessage('Your time selection is still saved.');
    render();
    return;
  }

  if (state.currentStep === 'otp-entry') {
    state.currentStep = 'phone';
    showBotMessage('Please re-enter the phone number or switch to another number.');
    render();
    return;
  }

  showBotMessage('You can continue from the current step.');
  render();
});

demoToggle.addEventListener('click', () => {
  setDemoMode(!state.demoMode);
  render();
});

sheetClose.addEventListener('click', closeSheet);
sheetOverlay.addEventListener('click', (event) => {
  if (event.target === sheetOverlay) closeSheet();
});

sheetCta.addEventListener('click', () => {
  if (state.sheet.type === 'services') {
    if (!state.serviceIds.length) {
      showBotMessage('Please select at least one service to continue.');
      return;
    }
    state.currentStep = 'specialist';
    const selected = state.serviceIds.map((serviceId) => getServiceById(serviceId)?.nameEn).filter(Boolean);
    pushMessage('outgoing', selected.join(', '));
    state.assignedSpecialistId = getMatchingSpecialists()[0]?.id || null;
    closeSheet();
    if (!state.assignedSpecialistId) {
      showBotMessage('No specialist is available for all selected services. Please adjust your selections.');
      state.currentStep = 'services';
      render();
      return;
    }
    showBotMessage('These services are selected. I’ve matched a specialist who can support them.');
    render();
    return;
  }

  if (state.sheet.type === 'slots') {
    if (!state.slotStart || !state.slotEnd) {
      showBotMessage('Please choose an available time.');
      return;
    }
    closeSheet();
    state.currentStep = 'review';
    showBotMessage('Your time is locked in. Please review the summary before continuing.');
    render();
  }
});

sendButton.addEventListener('click', handleComposerSubmit);
composerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleComposerSubmit();
  }
});

actionBar.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  handleChoice.call(target);
});

attachButton.addEventListener('click', () => {
  showBotMessage('This demo supports text-based booking details without connecting to a real device.');
});

window.addEventListener('load', initializeApp);
window.addEventListener('beforeunload', persistState);
window.addEventListener('storage', () => {
  const next = loadState();
  if (next) {
    state = next;
    render();
  }
});

window.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    const demoState = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) || '{}');
    if (demoState.scenarioId && demoState.scenarioId !== state.scenarioId) {
      loadScenario(demoState.scenarioId);
    }
  }
});

if (window.location.search.includes('demo=1')) {
  state.demoMode = true;
  document.body.classList.add('demo-enabled');
}

setInterval(() => {
  if (state.holdExpiresAt) {
    const expiry = new Date(state.holdExpiresAt).getTime();
    const remaining = expiry - Date.now();
    if (remaining <= 0 && state.currentStep !== 'success') {
      state.holdExpiresAt = null;
      showBotMessage('Your hold expired. Please select another time for the appointment.');
      state.currentStep = 'slot-review';
      render();
    }
  }
}, 30000);
