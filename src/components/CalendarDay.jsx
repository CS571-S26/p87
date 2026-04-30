import React from 'react';
import { getTypeInfo } from '../calendarUtils';
import styles from './Calendar.module.css';

const MAX_CHIPS = 3;

/**
 * CalendarDay
 *
 * Renders a single day cell in the calendar grid (read-only).
 * Clicking an event chip opens the EventDetail panel.
 * Clicking the cell itself does nothing (no add-event behaviour).
 *
 * Props:
 *   day          { day, month, year, dateStr, isOtherMonth }
 *   events       Event[] for this day (pre-sorted by time)
 *   isToday      boolean
 *   onEventClick (event: Event) => void
 */
export default function CalendarDay({ day, events, isToday, onEventClick }) {
  const cellClasses = [
    styles.dayCell,
    styles.dayCellReadOnly,
    day.isOtherMonth ? styles.otherMonth : '',
    isToday ? styles.todayCell : '',
  ]
    .filter(Boolean)
    .join(' ');

  const visible  = events.slice(0, MAX_CHIPS);
  const overflow = events.length - MAX_CHIPS;

  return (
    <div
      className={cellClasses}
      aria-label={`${day.dateStr}${events.length ? `, ${events.length} event${events.length > 1 ? 's' : ''}` : ''}`}
    >
      <div className={styles.dayNum}>{day.day}</div>

      {visible.map((ev) => {
        const typeInfo = getTypeInfo(ev.type);
        return (
          <button
            key={ev.id}
            type="button"
            className={styles.eventChip}
            style={{ background: typeInfo.bg, color: typeInfo.text }}
            onClick={() => onEventClick(ev)}
            title={`${ev.time} · ${ev.title}${ev.location ? ` · ${ev.location}` : ''}`}
          >
            {ev.time} {ev.title}
          </button>
        );
      })}

      {overflow > 0 && (
        <span className={styles.moreEvents}>+{overflow} more</span>
      )}
    </div>
  );
}
