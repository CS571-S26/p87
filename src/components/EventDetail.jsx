import React, { useEffect } from 'react';
import { getTypeInfo } from '../calendarUtils';
import styles from './Calendar.module.css';

/**
 * EventDetail
 *
 * Read-only overlay showing the full details of a calendar event.
 * No editing or deletion controls are exposed.
 *
 * Props:
 *   event    Event object to display
 *   onClose  () => void
 */
export default function EventDetail({ event, onClose }) {
  const typeInfo = getTypeInfo(event.type);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Format date for display: "Wednesday, April 29, 2026"
  const formattedDate = new Date(`${event.date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time for display: "9:00 AM"
  // Falls back to the raw string if the value is non-numeric (e.g. "TBD", "All day")
  const rawTime = new Date(`${event.date}T${event.time}`);
  const formattedTime = isNaN(rawTime)
    ? event.time
    : rawTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Event details"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Colour-coded type badge + close button */}
        <div className={styles.detailHeader}>
          <span
            className={styles.typeBadge}
            style={{ background: typeInfo.bg, color: typeInfo.text }}
          >
            {typeInfo.label}
          </span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <h2 className={styles.detailTitle}>{event.title}</h2>

        {/* Detail rows */}
        <dl className={styles.detailList}>
          <div className={styles.detailRow}>
            <dt className={styles.detailIcon} aria-label="Date">📅</dt>
            <dd className={styles.detailValue}>{formattedDate}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt className={styles.detailIcon} aria-label="Time">🕐</dt>
            <dd className={styles.detailValue}>{formattedTime}</dd>
          </div>
          {event.location && (
            <div className={styles.detailRow}>
              <dt className={styles.detailIcon} aria-label="Location">📍</dt>
              <dd className={styles.detailValue}>{event.location}</dd>
            </div>
          )}
        </dl>

        {/* Dismiss */}
        <div className={styles.modalActions}>
          <button className={styles.btnSave} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
