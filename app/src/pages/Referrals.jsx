import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../lib/store';

const seedCompanies = [
  { id: 1, name: 'Stripe', color: '#5851DB', members: 4, teams: 'Engineering · Ops', hiring: true },
  { id: 2, name: 'Google', color: '#1A73E8', members: 6, teams: 'Engineering · Sales · Cloud', hiring: true },
  { id: 3, name: 'Accenture', color: '#A100FF', members: 9, teams: 'Consulting · Tech Delivery' },
  { id: 4, name: 'Bank of Ireland', color: '#1B4396', members: 3, teams: 'Finance · Risk · Data' },
  { id: 5, name: 'Meta', color: '#0668E1', members: 2, teams: 'Engineering · Integrity' },
  { id: 6, name: 'Workday', color: '#D40E14', members: 5, teams: 'Engineering · Product', hiring: true },
];

const seedOpen = [
  { id: 1, title: 'Data analyst · 3 yrs experience → Bank of Ireland', sub: 'Posted 2 days ago · CV attached · SQL, Python, Tableau' },
  { id: 2, title: 'Frontend engineer · React → Stripe or Workday', sub: 'Posted 4 days ago · CV attached · Currently on Stamp 1G' },
  { id: 3, title: 'New grad · MSc Data Science UCD → any analytics role', sub: 'Posted 6 days ago · CV attached · Available immediately' },
];

export default function Referrals() {
  const app = useApp();
  const [tab, setTab] = useState('companies');
  const [companies, setCompanies] = useState(seedCompanies);
  const [mine, setMine] = useState([
    { id: 1, title: 'Google — Cloud Sales Associate', sub: 'Requested 12 Aug via Arjun P.', status: 'referred' },
    { id: 2, title: 'Stripe — Risk Operations', sub: 'Requested 10 Aug via Sofia L.', status: 'viewed' },
  ]);
  const [applying, setApplying] = useState(null);   // company being applied to
  const [offering, setOffering] = useState(false);
  const [form, setForm] = useState({ role: '', note: '' });
  const [offerForm, setOfferForm] = useState({ company: '', teams: '' });

  const statusLabel = { requested: 'Requested', viewed: 'CV viewed', referred: 'Referred — check your email' };

  const apply = (c) => app.gate('referralApply', () => { setForm({ role: '', note: '' }); setApplying(c); }, 'Requesting referrals');
  const offer = () => app.gate('referralPost', () => setOffering(true), 'Offering referrals');

  const submitApply = (e) => {
    e.preventDefault();
    if (!form.role.trim()) return;
    setMine((m) => [{ id: Date.now(), title: `${applying.name} — ${form.role}`, sub: 'Requested just now', status: 'requested' }, ...m]);
    setApplying(null);
    setTab('my');
    app.notify(`Request sent to members at ${applying.name} — you'll hear back within a few days.`);
  };

  const submitOffer = (e) => {
    e.preventDefault();
    if (!offerForm.company.trim()) return;
    setCompanies((cs) => [{ id: Date.now(), name: offerForm.company, color: 'var(--teal)', members: 1, teams: offerForm.teams || 'Your team', you: true }, ...cs]);
    setOffering(false);
    app.notify(`You're now listed as a referrer at ${offerForm.company}. Thank you for holding the door open.`);
  };

  return (
    <>
      <style>{`
        .rf-toolbar{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin:24px 0 20px}
        .co-list{display:flex;flex-direction:column;gap:12px}
        .co-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px 18px;padding:18px 22px}
        .co-logo{width:46px;height:46px;border-radius:12px;flex:none;display:flex;align-items:center;justify-content:center;
          font-family:var(--font-display);font-weight:640;font-size:1.15rem;color:#fff}
        .co-main{flex:1;min-width:0}
        .co-main h3{font-size:1.02rem;font-weight:700}
        .co-main .sub{font-size:.85rem;color:var(--ink-soft);display:flex;gap:12px;flex-wrap:wrap}
        .co-side{display:flex;align-items:center;gap:14px}
        .status{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;font-weight:600}
        .status i{width:8px;height:8px;border-radius:50%}
        .status.requested i{background:#B9A26B}
        .status.viewed i{background:var(--saffron)}
        .status.referred i{background:var(--teal)}
        @media(max-width:820px){
          .rf-toolbar{flex-direction:column;align-items:stretch}
          /* Logo + name up top; badge and button drop to their own clean row */
          .co-row{grid-template-columns:auto 1fr}
          .co-side{grid-column:1/-1;justify-content:space-between;width:100%;
            border-top:1px solid var(--line-soft);padding-top:12px}
          .co-side .btn{margin-left:auto}
        }
      `}</style>

      <section className="page-hero">
        <div className="wrap hero-row">
          <div>
            <span className="crumb">As you settle</span>
            <h1>Job Referrals</h1>
            <p className="sub">Members working at Irish companies refer your CV internally. A warm introduction beats a cold application.</p>
          </div>
          <button className="btn saffron" onClick={offer}>Offer referrals at my company {!app.subscribed && <Lock />}</button>
        </div>
      </section>

      <div className="wrap">
        <div className="rf-toolbar">
          <div className="tabs" role="tablist">
            <button className={'tab' + (tab === 'companies' ? ' on' : '')} onClick={() => setTab('companies')}>Companies</button>
            <button className={'tab' + (tab === 'open' ? ' on' : '')} onClick={() => setTab('open')}>Open requests</button>
            <button className={'tab' + (tab === 'my' ? ' on' : '')} onClick={() => setTab('my')}>My requests</button>
          </div>
        </div>

        {tab === 'companies' && (
          <div className="co-list">
            {companies.map((c) => (
              <article className="card hover co-row" key={c.id}>
                <div className="co-logo" style={{ background: c.color }}>{c.name[0]}</div>
                <div className="co-main">
                  <h3>{c.name} {c.you && <span className="badge saffron">You refer here</span>}</h3>
                  <div className="sub">
                    <span>{app.subscribed ? `${c.members} member${c.members > 1 ? 's' : ''} here` : 'Referrers hidden until you join'}</span>
                    <span>{c.teams}</span>
                  </div>
                </div>
                <div className="co-side">
                  {c.hiring && <span className="badge teal">Hiring now</span>}
                  <button className="btn sm" onClick={() => apply(c)}>Request referral {!app.subscribed && <Lock />}</button>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === 'open' && (
          <div className="co-list">
            <div className="notice info" style={{ marginBottom: 8 }}>
              <svg viewBox="0 0 24 24"><path d="M12 9v4M12 16.5v.5" /><circle cx="12" cy="12" r="9" /></svg>
              <span>These members want a referral at a company where <strong>you</strong> work. Helping one takes about five minutes.</span>
            </div>
            {seedOpen.map((r) => (
              <article className="card hover co-row" key={r.id}>
                <div className="co-main">
                  <h3>{r.title}</h3>
                  <div className="sub">{r.sub}</div>
                </div>
                <button className="btn sm" onClick={() => app.gate('referralPost', () => app.notify('CV opened — refer them through your internal portal, then mark it done.'), 'Referring members')}>
                  View &amp; refer {!app.subscribed && <Lock />}
                </button>
              </article>
            ))}
          </div>
        )}

        {tab === 'my' && (
          <div className="co-list">
            {mine.map((r) => (
              <article className="card co-row" key={r.id}>
                <div className="co-main">
                  <h3>{r.title}</h3>
                  <div className="sub">{r.sub}</div>
                </div>
                <span className={'status ' + r.status}><i />{statusLabel[r.status]}</span>
              </article>
            ))}
            <div className="empty">
              <strong>Tip: one request per company at a time</strong>
              Focused requests with a tailored note get referred 3× more often than bulk asks.
            </div>
          </div>
        )}
      </div>

      {applying && (
        <Modal title={`Request a referral — ${applying.name}`} onClose={() => setApplying(null)}>
          <form className="stack" onSubmit={submitApply}>
            <div className="field">
              <label htmlFor="role">Role or team</label>
              <input id="role" className="input" placeholder="e.g. Data Analyst, Risk team" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="note">Three-line note to the referrer</label>
              <textarea id="note" className="input" rows="3" placeholder="Who you are, what you do, why this company." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
              <span className="hint">Your profile CV is attached automatically.</span>
            </div>
            <button className="btn saffron block" type="submit">Send request</button>
          </form>
        </Modal>
      )}

      {offering && (
        <Modal title="Offer referrals at my company" onClose={() => setOffering(false)}>
          <form className="stack" onSubmit={submitOffer}>
            <div className="field">
              <label htmlFor="oc">Company</label>
              <input id="oc" className="input" placeholder="e.g. Salesforce" value={offerForm.company} onChange={(e) => setOfferForm({ ...offerForm, company: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="ot">Teams you can refer into</label>
              <input id="ot" className="input" placeholder="e.g. Engineering · Customer Success" value={offerForm.teams} onChange={(e) => setOfferForm({ ...offerForm, teams: e.target.value })} />
              <span className="hint">You choose which requests to accept — nothing is automatic.</span>
            </div>
            <button className="btn saffron block" type="submit">List me as a referrer</button>
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
