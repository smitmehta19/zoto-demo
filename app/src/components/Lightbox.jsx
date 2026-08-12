import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Full-screen photo viewer: horizontally scrollable with snap (swipe on touch),
   arrow buttons on desktop, Esc or backdrop tap to close. */
export default function Lightbox({ photos, start = 0, onClose }) {
  const track = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') slide(1);
      if (e.key === 'ArrowLeft') slide(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // jump to the clicked photo without animation
    const el = track.current;
    if (el) el.scrollLeft = el.clientWidth * start;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = (dir) => {
    const el = track.current;
    el?.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return createPortal(
    <div className="lb-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <button className="lb-x" onClick={onClose} aria-label="Close photos">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <button className="lb-nav prev" onClick={() => slide(-1)} aria-label="Previous photo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <div className="lb-track" ref={track}>
        {photos.map((src, i) => (
          <div className="lb-slide" key={i}>
            <img src={src.replace('w=800', 'w=1400')} alt={`Photo ${i + 1} of ${photos.length}`} />
          </div>
        ))}
      </div>
      <button className="lb-nav next" onClick={() => slide(1)} aria-label="Next photo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="lb-hint">{photos.length} photos · swipe or use arrows</div>
    </div>,
    document.body,
  );
}
