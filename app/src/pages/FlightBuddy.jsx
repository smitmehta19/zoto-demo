import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../lib/store';

const seedFlights = [
  { id: 1, dir: 'dep', day: '21', mon: 'Aug', num: 'EI 104', route: ['Dublin', 'New York (JFK)'], tags: ['Sharing taxi to airport', 'First-time flyer friendly'], pref: ['taxi', 'firsttime'], travellers: 3, note: '4 seats in group' },
  { id: 2, dir: 'dep', day: '26', mon: 'Aug', num: 'EK 162', route: ['Dublin', 'Dubai', 'Hyderabad'], tags: ['Long layover — meet in DXB'], pref: [], travellers: 3 },
  { id: 3, dir: 'dep', day: '02', mon: 'Sep', num: 'QR 018', route: ['Dublin', 'Doha', 'Kochi'], tags: ['Onam trip home'], pref: ['women'], travellers: 2, note: 'Women-only' },
  { id: 4, dir: 'dep', day: '15', mon: 'Aug', num: 'FR 1918', route: ['Dublin', 'Lisbon'], tags: ['Sharing taxi to airport'], pref: ['taxi'], travellers: 3 },
  { id: 5, dir: 'arr', day: '14', mon: 'Sep', num: 'EI 122', route: ['Mumbai', 'Dublin'], tags: ['First-time flyer friendly', 'Shared taxi from T2'], pref: ['firsttime', 'taxi'], travellers: 3, note: '3 matched' },
  { id: 6, dir: 'arr', day: '19', mon: 'Sep', num: 'LH 980', route: ['Delhi', 'Frankfurt', 'Dublin'], tags: ['Helper wanted for transfer'], pref: ['firsttime'], travellers: 1, note: 'Parents flying alone' },
  { id: 7, dir: 'arr', day: '28', mon: 'Sep', num: 'TP 1332', route: ['São Paulo', 'Lisbon', 'Dublin'], tags: ['New to Ireland — semester start'], pref: [], travellers: 2 },
];

const prefs = [
  ['all', 'All flights'], ['women', 'Women-only groups'], ['firsttime', 'First-time flyer friendly'], ['taxi', 'Sharing a taxi'],
];

export default function FlightBuddy() {
  const app = useApp();
  const [dir, setDir] = useState('dep');
  const [pref, setPref] = useState('all');
  const [q, setQ] = useState('');
  const [flights, setFlights] = useState(seedFlights);
  const [joined, setJoined] = useState([]);
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ num: '', date: '', from: '', to: '', dir: 'dep' });

  const shown = flights.filter((f) =>
    f.dir === dir &&
    (pref === 'all' || f.pref.includes(pref)) &&
    (q.trim() === '' || (f.num + ' ' + f.route.join(' ')).toLowerCase().includes(q.trim().toLowerCase()))
  );

  const join = (f) => app.gate('flightJoin', () => {
    setJoined((j) => [...j, f.id]);
    app.notify(`You're in the ${f.num} group chat — say hi before you board!`);
  }, 'Joining flight group chats');

  const openPost = () => app.gate('flightPost', () => setPosting(true), 'Posting your flight');

  const submitPost = (e) => {
    e.preventDefault();
    if (!form.num.trim() || !form.from.trim() || !form.to.trim()) return;
    const d = form.date ? new Date(form.date + 'T00:00') : null;
    setFlights((fs) => [{
      id: Date.now(), dir: form.dir,
      day: d ? String(d.getDate()).padStart(2, '0') : '—',
      mon: d ? d.toLocaleString('en', { month: 'short' }) : '',
      num: form.num.toUpperCase(), route: [form.from, form.to],
      tags: ['Your flight'], pref: [], travellers: 1, mine: true,
    }, ...fs]);
    setDir(form.dir);
    setPosting(false);
    app.notify('Flight posted — you’ll be notified when someone joins your group.');
  };

  return (
    <>
      <style>{`
        .fb-toolbar{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin:24px 0 20px}
        .fb-search{display:flex;gap:10px;flex:1;max-width:420px}
        .fb-search .input{flex:1}
        .flight-list{display:flex;flex-direction:column;gap:16px;margin-top:20px}
        .flight-card{display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center;padding:22px 26px}
        .fc-date{text-align:center;border-right:1px dashed var(--line);padding-right:20px;min-width:74px}
        .fc-date .d{font-family:var(--font-display);font-size:1.7rem;font-weight:640;line-height:1.1}
        .fc-date .m{font-size:.78rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--saffron-deep)}
        .fc-main .num{font-weight:700;font-size:1.05rem;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
        .fc-route{display:flex;align-items:center;gap:10px;color:var(--ink-soft);font-size:.95rem;margin:6px 0 10px;flex-wrap:wrap}
        .fc-route .hop{height:2px;width:26px;background:repeating-linear-gradient(90deg,var(--saffron) 0 5px,transparent 5px 10px)}
        .fc-tags{display:flex;gap:8px;flex-wrap:wrap}
        .fc-side{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
        .travellers{display:flex;align-items:center;gap:8px;font-size:.88rem;color:var(--ink-soft)}
        .dots{display:flex}
        .dots i{width:22px;height:22px;border-radius:50%;border:2px solid var(--white);margin-left:-7px;background:linear-gradient(135deg,var(--saffron),var(--teal))}
        .dots i:first-child{margin-left:0}
        .dots i:nth-child(2){background:linear-gradient(135deg,var(--teal),#7BA8A0)}
        .dots i:nth-child(3){background:linear-gradient(135deg,#D9A441,var(--saffron-deep))}
        @media(max-width:820px){
          .flight-card{grid-template-columns:1fr}
          .fc-date{border-right:0;border-bottom:1px dashed var(--line);padding:0 0 12px;text-align:left;display:flex;gap:8px;align-items:baseline}
          .fc-side{flex-direction:row;align-items:center;justify-content:space-between;width:100%}
          .fb-toolbar{flex-direction:column;align-items:stretch}
          .fb-search{max-width:none}
        }
      `}</style>

      <section className="page-hero">
        <div className="wrap hero-row">
          <div>
            <span className="crumb">Before you fly</span>
            <h1>Flight Buddy</h1>
            <p className="sub">One group chat per flight. Find members on your exact plane, plan the airport taxi together, and land already knowing someone.</p>
          </div>
          <button className="btn saffron" onClick={openPost}>
            Post your flight {!app.subscribed && <span aria-hidden>·</span>} {!app.subscribed && <LockIcon />}
          </button>
        </div>
      </section>

      <div className="wrap">
        <div className="notice" role="note">
          <svg viewBox="0 0 24 24"><path d="M12 9v4M12 16.5v.5" /><circle cx="12" cy="12" r="9" /></svg>
          <span>Flight details are self-reported. ZOTO doesn't verify bookings or identities — use your own judgement when meeting anyone, and prefer public places like the boarding gate.</span>
        </div>

        <div className="fb-toolbar">
          <div className="tabs" role="tablist">
            <button className={'tab' + (dir === 'dep' ? ' on' : '')} onClick={() => setDir('dep')}>Departing Dublin</button>
            <button className={'tab' + (dir === 'arr' ? ' on' : '')} onClick={() => setDir('arr')}>Arriving to Dublin</button>
          </div>
          <div className="fb-search">
            <input className="input" placeholder="Search flight no. or city — e.g. EI 122, Mumbai" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        <div className="filter-row">
          <span className="filter-label">Show</span>
          {prefs.map(([v, label]) => (
            <button key={v} className={'chip' + (pref === v ? ' on' : '')} onClick={() => setPref(v)}>{label}</button>
          ))}
        </div>

        <div className="flight-list">
          {shown.map((f) => (
            <article className="card hover flight-card" key={f.id}>
              <div className="fc-date"><div className="d">{f.day}</div><div className="m">{f.mon}</div></div>
              <div className="fc-main">
                <div className="num">
                  {f.num}
                  {f.note && <span className={'badge ' + (f.note.includes('Women') || f.note.includes('Parents') ? 'saffron' : 'teal')}>{f.note}</span>}
                  {f.mine && <span className="badge saffron">Posted by you</span>}
                </div>
                <div className="fc-route">
                  {f.route.map((c, i) => (
                    <span key={i} style={{ display: 'contents' }}>
                      {i > 0 && <span className="hop" />}{c}
                    </span>
                  ))}
                </div>
                <div className="fc-tags">{f.tags.map((t) => <span key={t} className="badge teal">{t}</span>)}</div>
              </div>
              <div className="fc-side">
                <div className="travellers">
                  <span className="dots">{Array.from({ length: Math.min(f.travellers, 3) }).map((_, i) => <i key={i} />)}</span>
                  {f.travellers} traveller{f.travellers > 1 ? 's' : ''}
                </div>
                {joined.includes(f.id)
                  ? <button className="btn sm done">In the group ✓</button>
                  : <button className="btn sm" onClick={() => join(f)}>Join group chat {!app.subscribed && <LockIcon />}</button>}
              </div>
            </article>
          ))}
          {shown.length === 0 && (
            <div className="empty">
              <strong>No flights match</strong>
              Try clearing a filter — or post your own flight and start the group.
            </div>
          )}
        </div>
      </div>

      {posting && (
        <Modal title="Post your flight" onClose={() => setPosting(false)}>
          <form className="stack" onSubmit={submitPost}>
            <div className="field">
              <label>Direction</label>
              <div className="tabs" style={{ display: 'flex' }}>
                <button type="button" className={'tab' + (form.dir === 'dep' ? ' on' : '')} style={{ flex: 1 }} onClick={() => setForm({ ...form, dir: 'dep' })}>Departing Dublin</button>
                <button type="button" className={'tab' + (form.dir === 'arr' ? ' on' : '')} style={{ flex: 1 }} onClick={() => setForm({ ...form, dir: 'arr' })}>Arriving to Dublin</button>
              </div>
            </div>
            <div className="field">
              <label htmlFor="fnum">Flight number</label>
              <input id="fnum" className="input" placeholder="e.g. EI 122" value={form.num} onChange={(e) => setForm({ ...form, num: e.target.value })} />
            </div>
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="ffrom">From</label>
                <input id="ffrom" className="input" placeholder="City" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="fto">To</label>
                <input id="fto" className="input" placeholder="City" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="fdate">Date</label>
              <input id="fdate" className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <button className="btn saffron block" type="submit">Post flight</button>
          </form>
        </Modal>
      )}
    </>
  );
}

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Members only">
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
