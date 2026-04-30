// ─── Event Type Definitions ───────────────────────────────────────────────────

export const EVENT_TYPES = [
  { key: 'school',     label: 'School',     bg: '#E6F1FB', text: '#0C447C', dot: '#185FA5' },
  { key: 'club-casual', label: 'Casual Club Meeting', bg: '#EAF3DE', text: '#27500A', dot: '#3B6D11' },
  { key: 'club-competitive',   label: 'Competitive Club Meeting',   bg: '#EEEDFE', text: '#3C3489', dot: '#534AB7' },
  { key: 'paid',   label: 'Paid Events',   bg: '#FAEEDA', text: '#633806', dot: '#854F0B' },
  { key: 'major',   label: 'Major Events',   bg: '#E1F5EE', text: '#085041', dot: '#0F6E56' },
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/** Zero-pad a number to 2 digits */
const pad = (n) => String(n).padStart(2, '0');

/** Format a date as YYYY-MM-DD */
export const toDateStr = (year, month, day) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

/** Today as YYYY-MM-DD */
export const todayStr = () => {
  const t = new Date();
  return toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
};

/** Number of days in a given month */
export const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/** Day-of-week (0=Sun) that the 1st of the month falls on */
export const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

// ─── Event Helpers ────────────────────────────────────────────────────────────

/** Return the EVENT_TYPES entry for a given key, falling back to 'other' */
export const getTypeInfo = (key) =>
  EVENT_TYPES.find((t) => t.key === key) ?? EVENT_TYPES[EVENT_TYPES.length - 1];

/**
 * Build a map of { dateStr -> Event[] } sorted by time, for fast calendar rendering.
 * @param {Event[]} events
 * @returns {Record<string, Event[]>}
 */
export const buildEventsMap = (events) => {
  const map = {};
  events.forEach((ev) => {
    if (!map[ev.date]) map[ev.date] = [];
    map[ev.date].push(ev);
  });
  Object.values(map).forEach((arr) =>
    arr.sort((a, b) => a.time.localeCompare(b.time))
  );
  return map;
};

/**
 * Build the array of day-cells to render in the calendar grid.
 * Each cell: { day, month, year, dateStr, isOtherMonth }
 */
export const buildCalendarCells = (year, month) => {
  const dim      = getDaysInMonth(year, month);
  const startDow = getFirstDayOfWeek(year, month);
  const prevDim  = getDaysInMonth(year, month - 1);
  const totalCells = Math.ceil((startDow + dim) / 7) * 7;

  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    let day, mo, yr, isOtherMonth;
    if (i < startDow) {
      day = prevDim - startDow + i + 1; mo = month - 1; yr = year; isOtherMonth = true;
    } else if (i >= startDow + dim) {
      day = i - startDow - dim + 1; mo = month + 1; yr = year; isOtherMonth = true;
    } else {
      day = i - startDow + 1; mo = month; yr = year; isOtherMonth = false;
    }
    cells.push({ day, month: mo, year: yr, dateStr: toDateStr(yr, mo, day), isOtherMonth });
  }
  return cells;
};
