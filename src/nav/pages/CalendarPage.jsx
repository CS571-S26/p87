import React, { useState, useMemo } from 'react';
import CalendarDay from '../../components/CalendarDay';
import EventDetail from '../../components/EventDetail';
import events from '../../assets/events.json';
import {
  MONTHS,
  DAYS_OF_WEEK,
  EVENT_TYPES,
  buildCalendarCells,
  buildEventsMap,
  todayStr,
} from '../../calendarUtils';
import styles from '../../components/Calendar.module.css';

/**
 * CalendarPage
 *
 * Read-only calendar. Events are loaded from ../events.json at build time.
 * To add or modify events, edit events.json directly.
 */
export default function CalendarPage() {
  // Navigation
  const today = new Date();
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(8);

  const goToPrevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const goToNextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const goToToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  // Open event
  const [selectedEvent, setSelectedEvent] = useState(null);

  const cells           = useMemo(() => buildCalendarCells(year, month), [year, month]);
  const eventsMap       = useMemo(() => buildEventsMap(events), []);
  const currentTodayStr = todayStr();

  return (
    <div className={styles.calendarPage}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.monthTitle}>
          {MONTHS[month]} {year}
        </h1>

        <div className={styles.navGroup}>
          <button className={styles.navBtn} onClick={goToToday}>Today</button>
          <button className={styles.navBtn} onClick={goToPrevMonth} aria-label="Previous month">←</button>
          <button className={styles.navBtn} onClick={goToNextMonth} aria-label="Next month">→</button>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        {EVENT_TYPES.map((t) => (
          <span key={t.key} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: t.dot }} />
            {t.label}
          </span>
        ))}
      </div>

      {/* Day-of-week */}
      <div className={styles.dowRow}>
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className={styles.dowCell}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.calGrid}>
        {cells.map((cell) => (
          <CalendarDay
            key={cell.dateStr}
            day={cell}
            events={eventsMap[cell.dateStr] ?? []}
            isToday={cell.dateStr === currentTodayStr}
            onEventClick={setSelectedEvent}
          />
        ))}
      </div>

      {/* Event detail opener */}
      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
