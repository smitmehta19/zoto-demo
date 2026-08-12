import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../lib/store';

const seed = [
  { id: 1, month: 'August 2026', day: '16', w: 'Sun', title: 'Newcomers coffee morning', where: 'Accents Café, D2', time: '11:00', extra: 'Open to everyone', price: 0, who: 'all', going: 24 },
  { id: 2, month: 'August 2026', day: '18', w: 'Tue', title: 'Sunday hike — Howth cliff walk', where: 'Howth DART station', time: '10:30', extra: 'Bring water & layers', price: 0, who: 'all', going: 31 },
  { id: 3, month: 'August 2026', day: '23', w: 'Sun', title: 'Diwali night at the Docklands', where: 'The Mayson, D1', time: '19:00', extra: 'Dinner + DJ · dress up', price: 18, who: 'desi', going: 86, left: 14 },
  { id: 4, month: 'September 2026', day: '01', w: 'Tue', title: 'Desi comedy night', where: "The Workman's Club, D2", time: '20:00', extra: '18+ · English & Hindi sets', price: 12, who: 'desi', going: 42 },
  { id: 5, month: 'September 2026', day: '05', w: 'Sat', title: 'Salsa social — beginners welcome', where: 'Smock Alley, D8', time: '19:30', extra: 'Lesson first hour · no partner needed', price: 10, who: 'latin', going: 57 },
  { id: 6, month: 'September 2026', day: '12', w: 'Sat', title: 'Mid-Autumn Festival picnic', where: "St Stephen's Green", time: '14:00', extra: 'Mooncakes provided · families welcome', price: 0, who: 'oriental', going: 29 },
];

export default function Events() {
  const app = useApp();
  const [price, setPrice] = useState('all');
  const [who, setWho] = useState('all');
  const [events, setEvents] = useState(seed);
  const [going, setGoing] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', where: '', date: '', price: '' });

  const shown = events.filter((e) =>
    (price === 'all' || (price === 'free' ? e.price === 0 : e.price > 0)) &&
    (who === 'all' || e.who === who || e.who === 'all')
  );
  const months = [...new Set(shown.map((e) => e.month))];

  const rsvp = (ev) => app.gate('eventRsvp', () => {
    const on = going.includes(ev.id);
    setGoing((g) => on ? g.filter((i) => i !== ev.id) : [...g, ev.id]);
    setEvents((es) => es.map((e) => e.id === ev.id ? { ...e, going: e.going + (on ? -1 : 1) } : e));
    app.notify(on ? 'RSVP removed.' : `You're going to ${ev.title}!`);
  });

  const submitCreate = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.where.trim() || !form.date) return;
    const d = new Date(form.date + 'T00:00');
    setEvents((es) => [...es, {
      id: Date.now(),
      month: d.toLocaleString('en', { month: 'long', year: 'numeric' }),
      day: String(d.getDate()).padStart(2, '0'),
      w: d.toLocaleString('en', { weekday: 'short' }),
      title: form.title, where: form.where, time: '', extra: 'Hosted by you',
      price: Number(form.price) || 0, who: 'all', going: 1, mine: true,
    }]);
    setCreating(false);
    app.notify('Event published — it’s free promotion from here.');
  };

  return (
    <>
      <style>{`
        .ev-filters{display:flex;flex-direction:column;gap:14px;margin:24px 0 0}
        .month-label{font-family:var(--font-display);font-weight:560;font-size:1.3rem;margin:32px 0 16px;display:flex;align-items:center;gap:16px}
        .month-label::after{content:"";flex:1;height:1px;background:var(--line)}
        .event-list{display:flex;flex-direction:column;gap:14px}
        .event-card{display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center;padding:20px 24px}
        .ev-date{text-align:center;min-width:64px;border-right:1px dashed var(--line);padding-right:18px}
        .ev-date .d{font-family:var(--font-display);font-size:1.7rem;font-weight:640;line-height:1.1}
        .ev-date .w{font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--saffron-deep)}
        .ev-main h3{font-size:1.08rem;font-weight:700;margin-bottom:4px}
        .ev-meta{display:flex;gap:6px 16px;flex-wrap:wrap;font-size:.87rem;color:var(--ink-soft)}
        .ev-side{display:flex;flex-direction:column;align-items:flex-end;gap:9px}
        .going{font-size:.82rem;color:var(--ink-soft)}
        .going b{color:var(--teal)}
        .ev-actions{display:flex;gap:8px;align-items:center}
        .price-tag{font-weight:700;font-size:.95rem}
        .price-tag.free{color:#2E6B2E}
        @media(max-width:820px){
          .event-card{grid-template-columns:1fr}
          .ev-date{border-right:0;border-bottom:1px dashed var(--line);padding:0 0 10px;text-align:left;display:flex;gap:8px;align-items:baseline}
          .ev-side{flex-direction:row;justify-content:space-between;align-items:center;width:100%}
        }
      `}</style>

      <section className="page-hero">
        <div className="wrap hero-row">
          <div>
            <span className="crumb">Free for everyone</span>
            <h1>Events</h1>
            <p className="sub">What's on in Dublin — hosted by the community, open to all. RSVPs and hosting are free, and always will be.</p>
          </div>
          <button className="btn saffron" onClick={() => setCreating(true)}>Submit an event</button>
        </div>
      </section>

      <div className="wrap">
        <div className="ev-filters">
          <div className="filter-row">
            <span className="filter-label">Price</span>
            {[['all', 'All'], ['free', 'Free'], ['paid', 'Paid']].map(([v, l]) => (
              <button key={v} className={'chip' + (price === v ? ' on' : '')} onClick={() => setPrice(v)}>{l}</button>
            ))}
          </div>
          <div className="filter-row">
            <span className="filter-label">Community</span>
            {[['all', 'Everyone'], ['desi', 'Desi'], ['latin', 'Latin'], ['oriental', 'East Asian']].map(([v, l]) => (
              <button key={v} className={'chip' + (who === v ? ' on' : '')} onClick={() => setWho(v)}>{l}</button>
            ))}
          </div>
        </div>

        {months.map((m) => (
          <div key={m}>
            <h2 className="month-label">{m}</h2>
            <div className="event-list">
              {shown.filter((e) => e.month === m).map((ev) => (
                <article className="card hover event-card" key={ev.id}>
                  <div className="ev-date"><div className="d">{ev.day}</div><div className="w">{ev.w}</div></div>
                  <div className="ev-main">
                    <h3>{ev.title} {ev.mine && <span className="badge saffron">Yours</span>}</h3>
                    <div className="ev-meta">
                      <span>{ev.where}</span>
                      {ev.time && <span>{ev.time}</span>}
                      <span>{ev.extra}</span>
                    </div>
                  </div>
                  <div className="ev-side">
                    <span className={'price-tag' + (ev.price === 0 ? ' free' : '')}>{ev.price === 0 ? 'Free' : `€${ev.price}`}</span>
                    <div className="ev-actions">
                      <span className="going"><b>{ev.going}</b> going{ev.left ? ` · ${ev.left} spots left` : ''}</span>
                      <button
                        className={'btn sm' + (going.includes(ev.id) ? ' done' : '')}
                        onClick={() => rsvp(ev)}
                      >
                        {going.includes(ev.id) ? 'Going ✓' : ev.price === 0 ? 'RSVP' : 'Get ticket'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="empty" style={{ marginTop: 32 }}>
            <strong>No events match those filters</strong>
            Clear a filter — or be the person who hosts the first one.
          </div>
        )}

        <div className="notice info" style={{ marginTop: 48 }}>
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
          <span><strong>Want to host something?</strong> Community-hosted events get free promotion, an RSVP page, and help finding a venue.</span>
        </div>
      </div>

      {creating && (
        <Modal title="Submit an event" onClose={() => setCreating(false)}>
          <form className="stack" onSubmit={submitCreate}>
            <div className="field">
              <label htmlFor="et">Event name</label>
              <input id="et" className="input" placeholder="e.g. Cricket in the Phoenix Park" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="ew">Where</label>
              <input id="ew" className="input" placeholder="Venue or meeting point" value={form.where} onChange={(e) => setForm({ ...form, where: e.target.value })} />
            </div>
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="ed">Date</label>
                <input id="ed" className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="field" style={{ width: 140 }}>
                <label htmlFor="ep">Ticket € (0 = free)</label>
                <input id="ep" className="input" type="number" min="0" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            <button className="btn saffron block" type="submit">Publish event</button>
            <p className="small muted" style={{ textAlign: 'center' }}>Hosting is free. Paid tickets go through Stripe later — ZOTO takes no cut from community events.</p>
          </form>
        </Modal>
      )}
    </>
  );
}
