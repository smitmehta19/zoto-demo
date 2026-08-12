import { useState } from 'react';
import Modal from '../components/Modal';
import Lightbox from '../components/Lightbox';
import { useApp } from '../lib/store';

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=60`;

const rooms = [
  {
    id: 1, title: 'Sunny ensuite room by the canal', price: 950,
    area: 'D8 · Portobello', zone: 'Dublin — Southside', postcode: 'D8',
    roomType: 'ensuite', term: 'long', tags: ['veg-friendly'],
    photos: [U('1522708323590-d24dbb6b0267'), U('1560448204-e02f11c3d0e2'), U('1484154218962-a197022b5858')],
    poster: 'Rahul M.', posted: '2 days ago', expires: 5, flatmates: '2 flatmates',
    desc: 'Bright double room with its own bathroom in a 3-bed flat along the Grand Canal. Two flatmates (both engineers, quiet weekdays). Bills split evenly, ~€60/month each. 15 min walk to the city centre.',
  },
  {
    id: 2, title: 'Room in a calm veggie household', price: 780,
    area: 'D4 · Ballsbridge', zone: 'Dublin — Southside', postcode: 'D4',
    roomType: 'single', term: 'long', tags: ['women-only', 'veg-friendly', 'bills-included'],
    photos: [U('1502672260266-1c1ef2d93688'), U('1513694203232-719a280e022f'), U('1484154218962-a197022b5858')],
    poster: 'Meera K.', posted: '5 days ago', expires: 2, flatmates: '3 flatmates',
    desc: 'Cosy single room in a peaceful all-women house. Fully vegetarian kitchen. Four tenants share the house; bills are included in rent. Close to the Aviva Stadium DART stop.',
  },
  {
    id: 3, title: 'Short-let single near DCU, Sep–Dec', price: 620,
    area: 'D9 · Drumcondra', zone: 'Dublin — Northside', postcode: 'D9',
    roomType: 'single', term: 'short', tags: ['student-friendly', 'bills-included'],
    photos: [U('1493809842364-78817add7ffb'), U('1536376072261-38c75010e6c9'), U('1560448204-e02f11c3d0e2')],
    poster: 'Anh T.', posted: '1 day ago', expires: 4, flatmates: '3 flatmates',
    desc: 'Single room free while my flatmate is on Erasmus. Perfect for a semester — DCU is a 10-minute walk, city buses at the door. Friendly house of three students.',
  },
  {
    id: 4, title: 'Large double in a new-build, city views', price: 1350,
    area: 'D1 · North Docks', zone: 'Dublin — City Centre', postcode: 'D1',
    roomType: 'double', term: 'long', tags: ['professional'],
    photos: [U('1554995207-c18c203602cb'), U('1598928506311-c55ded91a20c'), U('1522708323590-d24dbb6b0267')],
    poster: 'Diego F.', posted: '3 days ago', expires: 7, flatmates: '2 flatmates',
    desc: 'Modern apartment block with concierge and residents’ gym. Room comes furnished with a king bed and built-in wardrobe. Two professional flatmates, both early risers.',
  },
  {
    id: 5, title: 'Studio flat over a bakery, Stoneybatter', price: 1150,
    area: 'D7 · Stoneybatter', zone: 'Dublin — Northside', postcode: 'D7',
    roomType: 'studio', term: 'long', tags: ['professional'],
    photos: [U('1536376072261-38c75010e6c9'), U('1502672260266-1c1ef2d93688'), U('1554995207-c18c203602cb')],
    poster: 'Sofia L.', posted: '6 days ago', expires: 3, flatmates: 'Live alone',
    desc: 'Compact self-contained studio above the best bakery on Manor Street. Own kitchenette and shower room. Smells like sourdough every morning — this is a warning and a promise.',
  },
  {
    id: 6, title: 'Double room in a family home, Tallaght', price: 700,
    area: 'D24 · Tallaght', zone: 'Dublin — Southside', postcode: 'D24',
    roomType: 'double', term: 'long', tags: ['veg-friendly', 'bills-included'],
    photos: [U('1560448204-e02f11c3d0e2'), U('1493809842364-78817add7ffb'), U('1598928506311-c55ded91a20c')],
    poster: 'Pooja S.', posted: '4 days ago', expires: 6, flatmates: 'Host family',
    desc: 'Double room with a host family — ideal first landing spot. Home-cooked dinners available, Luas red line nearby. Popular with students in their first semester.',
  },
];

const people = [
  {
    id: 101, name: 'Carlos Ribeiro', role: 'Software engineer', from: 'Brazil',
    budget: 1100, areas: 'D2 / D4 / D6', move: 'October', term: 'long',
    prefs: ['Non-smoker', 'Quiet', 'Ensuite preferred'],
    about: 'Joining a fintech in the docks. Clean, sociable but respectful of quiet time. References from previous flatshares and proof of employment available.',
  },
  {
    id: 102, name: 'Lin Wei', role: 'MSc student, UCD Smurfit', from: 'China',
    budget: 700, areas: 'Near UCD', move: 'September', term: 'short',
    prefs: ['Non-smoker', 'Tidy', 'No pets'],
    about: 'Exchange semester at UCD. Happy to house-sit or help with chores. Budget includes bills.',
  },
  {
    id: 103, name: 'Divya Menon', role: 'Nurse, St James’s', from: 'India',
    budget: 900, areas: 'D8 / D12', move: 'ASAP', term: 'long',
    prefs: ['Women-only house', 'Veg kitchen'],
    about: 'Night-shift nurse — sleeps days some weeks, so I need a genuinely quiet house. In return you will never wait for a GP appointment advice again.',
  },
  {
    id: 104, name: 'Mateo Alvarez', role: 'Chef', from: 'Mexico',
    budget: 800, areas: 'City Centre / Northside', move: 'November', term: 'long',
    prefs: ['Evenings out', 'Loves cooking for the house'],
    about: 'Chef at a Temple Bar kitchen, so I’m out most evenings and I bring home dessert. Looking for a sociable house that likes food.',
  },
];

const postcodes = ['Anywhere', 'D1', 'D2', 'D4', 'D6', 'D7', 'D8', 'D9', 'D15', 'D24'];
const tagLabels = { 'women-only': 'Women-only', 'veg-friendly': 'Veg-friendly', 'student-friendly': 'Student-friendly', professional: 'Professional', 'bills-included': 'Bills included' };

export default function Housing() {
  const app = useApp();
  const member = app.subscribed;

  const [cat, setCat] = useState('rooms');            // rooms | people
  const [term, setTerm] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [area, setArea] = useState('Anywhere');
  const [maxBudget, setMaxBudget] = useState('');
  const [tags, setTags] = useState([]);               // multi-select
  const [allRooms, setAllRooms] = useState(rooms);
  const [allPeople, setAllPeople] = useState(people);
  const [open, setOpen] = useState(null);
  const [openPerson, setOpenPerson] = useState(null);
  const [lightbox, setLightbox] = useState(null);   // {photos, start}
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({ kind: 'room', title: '', postcode: 'D8', price: '', term: 'long', roomType: 'double', tags: [] });

  const toggleTag = (t) => setTags((ts) => ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]);

  const shownRooms = allRooms.filter((r) =>
    (term === 'all' || r.term === term) &&
    (roomType === 'all' || r.roomType === roomType) &&
    (area === 'Anywhere' || r.postcode === area) &&
    (!maxBudget || r.price <= Number(maxBudget)) &&
    tags.every((t) => r.tags.includes(t))
  );

  const shownPeople = allPeople.filter((p) =>
    (term === 'all' || p.term === term) &&
    (!maxBudget || p.budget <= Number(maxBudget))
  );

  const maskName = (name) => member ? name : name.split(' ')[0] + ' ' + name.split(' ')[1][0] + '.';

  const viewRoom = (r) => app.gate('housingView', () => setOpen(r), 'Opening full listings');
  const viewPerson = (p) => app.gate('housingView', () => setOpenPerson(p), 'Opening full profiles');
  const openPost = () => app.gate('housingPost', () => setPosting(true), 'Posting a listing');

  const submitPost = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) return;
    if (form.kind === 'room') {
      setAllRooms((rs) => [{
        id: Date.now(), title: form.title, price: Number(form.price),
        area: `${form.postcode} · Your area`, zone: 'Dublin', postcode: form.postcode,
        roomType: form.roomType, term: form.term, tags: form.tags,
        photos: [U('1598928506311-c55ded91a20c')], poster: app.user.name, posted: 'just now',
        expires: 7, flatmates: '—', mine: true,
        desc: 'Your listing is live. In the real app you’d upload photos and house rules here.',
      }, ...rs]);
      setCat('rooms');
    } else {
      setAllPeople((ps) => [{
        id: Date.now(), name: app.user.name, role: form.title, from: '—',
        budget: Number(form.price), areas: form.postcode, move: 'Flexible', term: form.term,
        prefs: form.tags.map((t) => tagLabels[t]).filter(Boolean), mine: true,
        about: 'Your profile is live. Members can now message you about rooms.',
      }, ...ps]);
      setCat('people');
    }
    setPosting(false);
    app.notify(form.kind === 'room' ? 'Listing published.' : 'You’re now listed as looking — good luck!');
  };

  return (
    <>
      <style>{`
        .hz-top{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin:20px 0 22px}
        .hz-filters{display:flex;flex-direction:column;gap:12px;margin-bottom:26px}
        .hz-filters .row-wrap{display:flex;gap:10px 14px;flex-wrap:wrap;align-items:center}
        .hz-filters select.input,.hz-filters input.input{width:auto;min-width:150px;padding:9px 14px}

        .room-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
        .room-card{padding:0;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;text-align:left}
        .room-photos{height:190px;display:grid;grid-template-columns:2fr 1fr;gap:3px}
        .room-photos .ph-wrap:first-child{grid-row:span 2}
        .room-photos.single{grid-template-columns:1fr}
        .room-body{padding:18px 22px 20px;display:flex;flex-direction:column;gap:9px;flex:1}
        .room-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
        .room-card h3{font-size:1.05rem;font-weight:700;line-height:1.35}
        .price{font-family:var(--font-display);font-weight:640;font-size:1.22rem;white-space:nowrap}
        .price span{font-size:.75rem;color:var(--ink-soft);font-family:var(--font-body);font-weight:500}
        .hz-meta{display:flex;gap:6px 14px;flex-wrap:wrap;font-size:.85rem;color:var(--ink-soft)}
        .tag-row{display:flex;gap:6px;flex-wrap:wrap}
        .room-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:12px;border-top:1px solid var(--line-soft);font-size:.82rem;color:var(--ink-soft)}
        .poster{display:flex;align-items:center;gap:8px}
        .poster .avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--saffron),var(--teal))}
        .expires.hot{color:var(--saffron-deep);font-weight:600}

        .people-list{display:flex;flex-direction:column;gap:14px}
        .person-card{display:flex;gap:18px;align-items:flex-start;padding:22px 24px;cursor:pointer;text-align:left;width:100%}
        .p-avatar{width:52px;height:52px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;
          font-family:var(--font-display);font-weight:640;font-size:1.2rem;color:#fff;background:linear-gradient(135deg,var(--teal),#7BA8A0)}
        .person-main{flex:1;min-width:0}
        .person-main h3{font-size:1.05rem;font-weight:700}
        .person-main .role{font-size:.88rem;color:var(--ink-soft);margin-bottom:8px}
        .person-side{text-align:right;flex:none}
        .person-side .price{font-size:1.1rem}
        .person-side .move{font-size:.8rem;color:var(--ink-soft)}
        .gallery{display:grid;grid-template-columns:2fr 1fr;gap:4px;height:230px;border-radius:14px;overflow:hidden;margin-bottom:18px}
        .gallery .ph-wrap:first-child{grid-row:span 2}
        .gallery-btn{border:0;padding:0;cursor:zoom-in}
        .gallery-btn:hover .ph-img{opacity:.92}
        @media(max-width:820px){
          .hz-top{flex-direction:column;align-items:stretch}
          .person-card{flex-wrap:wrap}
          .person-side{text-align:left;width:100%;display:flex;justify-content:space-between;align-items:center}
        }
        @media(max-width:720px){
          /* One scrollable line per filter group — no chip soup */
          .hz-filters .row-wrap{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}
          .hz-filters .row-wrap::-webkit-scrollbar{display:none}
          .hz-filters .row-wrap .chip{flex:none;white-space:nowrap}
          .hz-filters select.input,.hz-filters input.input{flex:none;min-width:130px}
        }
      `}</style>

      <section className="page-hero">
        <div className="wrap hero-row">
          <div>
            <span className="crumb">When you land</span>
            <h1>Housing</h1>
            <p className="sub">
              {member
                ? 'Rooms and flatmates from verified members. New listings appear here 48 hours before they go public.'
                : 'Rooms and flatmates from verified members. Full listings — photos, exact area, and who posted — open with membership.'}
            </p>
          </div>
          <button className="btn saffron" onClick={openPost}>Post a listing {!member && <Lock />}</button>
        </div>
      </section>

      <div className="wrap">
        <div className="hz-top">
          <div className="seg" role="tablist" aria-label="Housing category">
            <button className={'seg-btn' + (cat === 'rooms' ? ' on' : '')} onClick={() => setCat('rooms')}>
              Rooms<small>{allRooms.length} available</small>
            </button>
            <button className={'seg-btn' + (cat === 'people' ? ' on' : '')} onClick={() => setCat('people')}>
              People<small>{allPeople.length} looking</small>
            </button>
          </div>
        </div>

        <div className="hz-filters">
          <div className="row-wrap">
            <span className="filter-label">Filters</span>
            {cat === 'rooms' && (
              <select className="input" value={area} onChange={(e) => setArea(e.target.value)} aria-label="Area">
                {postcodes.map((p) => <option key={p}>{p}</option>)}
              </select>
            )}
            <input className="input" type="number" min="0" placeholder="Max € / month" value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)} aria-label="Maximum budget" style={{ width: 150 }} />
            {[['all', 'Any length'], ['long', 'Long-term'], ['short', 'Short-term']].map(([v, l]) => (
              <button key={v} className={'chip' + (term === v ? ' on' : '')} onClick={() => setTerm(v)}>{l}</button>
            ))}
          </div>
          {cat === 'rooms' && (
            <>
              <div className="row-wrap">
                <span className="filter-label">Room</span>
                {[['all', 'Any type'], ['single', 'Single'], ['double', 'Double'], ['ensuite', 'Ensuite'], ['studio', 'Studio']].map(([v, l]) => (
                  <button key={v} className={'chip' + (roomType === v ? ' on' : '')} onClick={() => setRoomType(v)}>{l}</button>
                ))}
              </div>
              <div className="row-wrap">
                <span className="filter-label">Household</span>
                {Object.entries(tagLabels).map(([t, l]) => (
                  <button key={t} className={'chip' + (tags.includes(t) ? ' on' : '')} onClick={() => toggleTag(t)}>{l}</button>
                ))}
              </div>
            </>
          )}
        </div>

        {cat === 'rooms' && (
          <div className="room-grid">
            {shownRooms.map((r) => (
              <button className="card hover room-card" key={r.id} onClick={() => viewRoom(r)}>
                <div className={'room-photos' + (!member ? ' single' : '')}>
                  {r.photos.slice(0, member ? 3 : 1).map((src, i) => (
                    <div className={'ph-wrap' + (!member ? ' locked' : '')} key={i}>
                      <img className="ph-img" src={src} alt="" />
                      {!member && (
                        <span className="ph-lock">
                          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                          Photos unlock with membership
                        </span>
                      )}
                      {member && i === 2 && (
                        <span style={{ position: 'absolute', right: 8, bottom: 8 }} className="badge teal">{r.photos.length} photos</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="room-body">
                  <div className="room-top">
                    <h3>{r.title}</h3>
                    <div className="price">€{r.price.toLocaleString()}<span> /mo</span></div>
                  </div>
                  <div className="hz-meta">
                    <span>{member ? r.area : r.zone}</span>
                    <span style={{ textTransform: 'capitalize' }}>{r.roomType}</span>
                    <span>{r.term === 'long' ? 'Long-term' : 'Short-term'}</span>
                    <span>{r.flatmates}</span>
                  </div>
                  {r.tags.length > 0 && (
                    <div className="tag-row">
                      {r.tags.map((t) => <span key={t} className="badge teal">{tagLabels[t]}</span>)}
                      {r.mine && <span className="badge saffron">Yours</span>}
                    </div>
                  )}
                  <div className="room-foot">
                    <div className="poster">
                      <span className="avatar" />
                      <span>{member ? r.poster : 'Verified member'} <span className="badge verified">Verified</span></span>
                    </div>
                    <span className={'expires' + (r.expires <= 2 ? ' hot' : '')}>Expires in {r.expires}d</span>
                  </div>
                </div>
              </button>
            ))}
            {shownRooms.length === 0 && (
              <div className="empty" style={{ gridColumn: '1/-1' }}>
                <strong>Nothing matches those filters</strong>
                Widen your budget or clear a filter — new rooms are posted daily.
              </div>
            )}
          </div>
        )}

        {cat === 'people' && (
          <div className="people-list">
            {shownPeople.map((p) => (
              <button className="card hover person-card" key={p.id} onClick={() => viewPerson(p)}>
                <span className="p-avatar">{p.name[0]}</span>
                <div className="person-main">
                  <h3>{maskName(p.name)} {p.mine && <span className="badge saffron">You</span>}</h3>
                  <div className="role">{p.role} · from {p.from}</div>
                  <div className="hz-meta">
                    <span>Wants: {p.areas}</span>
                    <span>{p.term === 'long' ? 'Long-term' : 'Short-term'}</span>
                  </div>
                  <div className="tag-row" style={{ marginTop: 8 }}>
                    {p.prefs.map((x) => <span key={x} className="badge teal">{x}</span>)}
                  </div>
                </div>
                <div className="person-side">
                  <div className="price">€{p.budget}<span> max</span></div>
                  <div className="move">Moving: {p.move}</div>
                </div>
              </button>
            ))}
            {shownPeople.length === 0 && (
              <div className="empty">
                <strong>No one matches those filters</strong>
                Clear a filter — or post a room and let them find you.
              </div>
            )}
          </div>
        )}

        <div className="notice info" style={{ marginTop: 44 }}>
          <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6z" /><path d="m9.5 12 2 2 3.5-3.5" /></svg>
          <span><strong>How we keep this safe:</strong> every poster is identity-verified, listings expire after 7 days, and deposits are never handled through chat. Report anything that feels off.</span>
        </div>
      </div>

      {/* Room detail (members only — gate handles access) */}
      {open && (
        <Modal title={open.title} onClose={() => setOpen(null)} wide>
          <div className="gallery">
            {open.photos.slice(0, 3).map((src, i) => (
              <button
                type="button"
                className="ph-wrap gallery-btn"
                key={i}
                aria-label={`Open photo ${i + 1} full screen`}
                onClick={() => setLightbox({ photos: open.photos, start: i })}
              >
                <img className="ph-img" src={src} alt="" />
              </button>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: -12, marginBottom: 14 }}>Tap a photo to view full screen</p>
          <div className="spread" style={{ marginBottom: 10 }}>
            <div className="hz-meta">
              <span>{open.area}</span>
              <span style={{ textTransform: 'capitalize' }}>{open.roomType}</span>
              <span>{open.term === 'long' ? 'Long-term' : 'Short-term'}</span>
              <span>{open.flatmates}</span>
            </div>
            <div className="price">€{open.price.toLocaleString()}<span> /mo</span></div>
          </div>
          {open.tags.length > 0 && (
            <div className="tag-row" style={{ marginBottom: 12 }}>
              {open.tags.map((t) => <span key={t} className="badge teal">{tagLabels[t]}</span>)}
            </div>
          )}
          <p style={{ fontSize: '.95rem', marginBottom: 18 }}>{open.desc}</p>
          <div className="spread" style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 16 }}>
            <div className="poster">
              <span className="avatar" style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--saffron),var(--teal))' }} />
              <span>{open.poster} <span className="badge verified">Verified</span> · posted {open.posted}</span>
            </div>
            <button className="btn sm" onClick={() => { setOpen(null); app.notify(`Message sent to ${open.poster} — they usually reply within a day.`); }}>
              Message {open.poster.split(' ')[0]}
            </button>
          </div>
        </Modal>
      )}

      {lightbox && (
        <Lightbox photos={lightbox.photos} start={lightbox.start} onClose={() => setLightbox(null)} />
      )}

      {/* Person detail */}
      {openPerson && (
        <Modal title={openPerson.name} onClose={() => setOpenPerson(null)}>
          <div className="role muted" style={{ marginBottom: 12 }}>{openPerson.role} · from {openPerson.from}</div>
          <div className="hz-meta" style={{ marginBottom: 12 }}>
            <span>Budget €{openPerson.budget}/mo</span>
            <span>Wants: {openPerson.areas}</span>
            <span>Moving: {openPerson.move}</span>
          </div>
          <div className="tag-row" style={{ marginBottom: 14 }}>
            {openPerson.prefs.map((x) => <span key={x} className="badge teal">{x}</span>)}
          </div>
          <p style={{ fontSize: '.95rem', marginBottom: 18 }}>{openPerson.about}</p>
          <button className="btn block" onClick={() => { setOpenPerson(null); app.notify(`Message sent to ${openPerson.name.split(' ')[0]}.`); }}>
            Message {openPerson.name.split(' ')[0]}
          </button>
        </Modal>
      )}

      {/* Post modal */}
      {posting && (
        <Modal title="Post to Housing" onClose={() => setPosting(false)}>
          <form className="stack" onSubmit={submitPost}>
            <div className="field">
              <label>I'm posting…</label>
              <div className="tabs" style={{ display: 'flex' }}>
                <button type="button" className={'tab' + (form.kind === 'room' ? ' on' : '')} style={{ flex: 1 }} onClick={() => setForm({ ...form, kind: 'room' })}>A room I have</button>
                <button type="button" className={'tab' + (form.kind === 'person' ? ' on' : '')} style={{ flex: 1 }} onClick={() => setForm({ ...form, kind: 'person' })}>Myself, looking</button>
              </div>
            </div>
            <div className="field">
              <label htmlFor="pt">{form.kind === 'room' ? 'Listing title' : 'Who are you? (role / one-liner)'}</label>
              <input id="pt" className="input" placeholder={form.kind === 'room' ? 'e.g. Bright double near Phoenix Park' : 'e.g. Data analyst, tidy, loves cooking'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="pc">{form.kind === 'room' ? 'Postcode' : 'Preferred areas'}</label>
                {form.kind === 'room'
                  ? <select id="pc" className="input" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })}>{postcodes.slice(1).map((p) => <option key={p}>{p}</option>)}</select>
                  : <input id="pc" className="input" placeholder="e.g. D2 / D8" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} />}
              </div>
              <div className="field" style={{ width: 150 }}>
                <label htmlFor="pp">{form.kind === 'room' ? '€ / month' : 'Max budget €'}</label>
                <input id="pp" className="input" type="number" min="0" placeholder="900" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            {form.kind === 'room' && (
              <div className="field">
                <label>Room type</label>
                <div className="filter-row">
                  {['single', 'double', 'ensuite', 'studio'].map((v) => (
                    <button type="button" key={v} className={'chip' + (form.roomType === v ? ' on' : '')} style={{ textTransform: 'capitalize' }} onClick={() => setForm({ ...form, roomType: v })}>{v}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="field">
              <label>Length</label>
              <div className="filter-row">
                {[['long', 'Long-term'], ['short', 'Short-term']].map(([v, l]) => (
                  <button type="button" key={v} className={'chip' + (form.term === v ? ' on' : '')} onClick={() => setForm({ ...form, term: v })}>{l}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Household tags</label>
              <div className="filter-row">
                {Object.entries(tagLabels).map(([t, l]) => (
                  <button type="button" key={t} className={'chip' + (form.tags.includes(t) ? ' on' : '')}
                    onClick={() => setForm({ ...form, tags: form.tags.includes(t) ? form.tags.filter((x) => x !== t) : [...form.tags, t] })}>{l}</button>
                ))}
              </div>
            </div>
            <button className="btn saffron block" type="submit">{form.kind === 'room' ? 'Publish listing' : 'List me as looking'}</button>
            <p className="small muted" style={{ textAlign: 'center' }}>Listings expire automatically after 7 days.</p>
          </form>
        </Modal>
      )}
    </>
  );
}

const Lock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Members only">
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
