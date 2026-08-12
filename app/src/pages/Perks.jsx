import { useState } from 'react';
import { useApp } from '../lib/store';

const perks = [
  { id: 1, name: 'Chai & Co', cat: 'Food & drink', offer: '20% off your first order', where: 'Camden St & Smithfield', code: 'ZOTO20', grad: 'linear-gradient(135deg,var(--saffron),var(--saffron-deep))' },
  { id: 2, name: 'Spice Bazaar', cat: 'Groceries', offer: '10% off every shop over €40', where: 'Parnell St & Rathmines', code: 'ZOTOSPICE', grad: 'linear-gradient(135deg,#C94F4F,#8E3B5E)' },
  { id: 3, name: 'DubRemit', cat: 'Money transfer', offer: 'Zero fees on your first 3 transfers home', where: 'Online', code: 'ZOTOHOME', grad: 'linear-gradient(135deg,var(--teal),#3E7C72)' },
  { id: 4, name: 'Fitzwilliam Gym', cat: 'Fitness', offer: 'No joining fee + first month €19', where: 'D2 & D15', code: 'ZOTOFIT', grad: 'linear-gradient(135deg,#5E837C,#2F5A52)' },
  { id: 5, name: 'Cantina Bonita', cat: 'Food & drink', offer: 'Free churros with any main, Mon–Wed', where: 'Temple Bar', code: 'ZOTOBONITA', grad: 'linear-gradient(135deg,#D9A441,#B0722A)' },
  { id: 6, name: 'Lucky Dragon', cat: 'Food & drink', offer: '15% off hotpot for tables of 4+', where: 'Parnell St', code: 'ZOTOHOTPOT', grad: 'linear-gradient(135deg,#8E3B5E,#5D2740)' },
];

const cats = ['All', 'Food & drink', 'Groceries', 'Money transfer', 'Fitness'];

export default function Perks() {
  const app = useApp();
  const [cat, setCat] = useState('All');
  const [claimed, setClaimed] = useState([]);

  const shown = perks.filter((p) => cat === 'All' || p.cat === cat);

  const claim = (p) => app.gate('perkClaim', () => {
    setClaimed((c) => (c.includes(p.id) ? c : [...c, p.id]));
    app.notify(`Perk claimed — show code ${p.code} at ${p.name}.`);
  }, 'Claiming partner perks');

  return (
    <>
      <style>{`
        .perk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:24px}
        .perk-card{padding:0;overflow:hidden;display:flex;flex-direction:column}
        .perk-top{height:88px;position:relative;display:flex;align-items:flex-end;padding:14px 22px}
        .perk-top .cat{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.85);color:var(--ink);
          font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:999px}
        .perk-top h3{font-family:var(--font-display);font-weight:640;font-size:1.35rem;color:#fff;text-shadow:0 1px 8px rgba(31,45,54,.3)}
        .perk-body{padding:18px 22px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
        .perk-offer{font-weight:700;font-size:1.02rem}
        .perk-where{font-size:.85rem;color:var(--ink-soft)}
        .perk-foot{margin-top:auto;padding-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px}
        .perk-code{font-family:ui-monospace,monospace;font-weight:700;letter-spacing:.08em;font-size:.9rem;
          background:var(--sand);border:1px dashed var(--saffron-deep);color:var(--saffron-deep);
          padding:7px 14px;border-radius:10px;animation:popIn .3s cubic-bezier(.2,.9,.3,1.15) both}
        .partner-cta{margin-top:52px}
      `}</style>

      <section className="page-hero">
        <div className="wrap hero-row">
          <div>
            <span className="crumb">{app.subscribed ? 'Included in your membership' : 'Members only'}</span>
            <h1>Partner Perks</h1>
            <p className="sub">
              {app.subscribed
                ? 'Your discounts at the places that feel like home. Tap a perk to reveal its code, then show it in store or at checkout.'
                : 'Discounts at the places that feel like home — negotiated by the community, for the community. Codes unlock with membership.'}
            </p>
          </div>
          <button className="btn ghost" onClick={() => app.notify('Partner enquiry noted — in the real app this opens a partner form.')}>
            Partner with ZOTO
          </button>
        </div>
      </section>

      <div className="wrap">
        <div className="filter-row">
          <span className="filter-label">Category</span>
          {cats.map((c) => (
            <button key={c} className={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="perk-grid">
          {shown.map((p) => (
            <article className="card hover perk-card" key={p.id}>
              <div className="perk-top" style={{ background: p.grad }}>
                <span className="cat">{p.cat}</span>
                <h3>{p.name}</h3>
              </div>
              <div className="perk-body">
                <span className="perk-offer">{p.offer}</span>
                <span className="perk-where">{p.where}</span>
                <div className="perk-foot">
                  {claimed.includes(p.id)
                    ? <span className="perk-code">{p.code}</span>
                    : <span className="small muted">{app.subscribed ? 'Tap to reveal your code' : 'Members only'}</span>}
                  {claimed.includes(p.id)
                    ? <span className="badge teal">Claimed</span>
                    : (
                      <button className="btn saffron sm" onClick={() => claim(p)}>
                        Claim {!app.subscribed && <Lock />}
                      </button>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="notice partner-cta" role="note">
          <svg viewBox="0 0 24 24"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 7v14" /></svg>
          <span><strong>Run a business?</strong> Partner perks put you in front of 4,000+ internationals in Ireland. Partners are chosen by member vote — the community decides what's genuinely useful.</span>
        </div>
      </div>
    </>
  );
}

const Lock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Members only">
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
