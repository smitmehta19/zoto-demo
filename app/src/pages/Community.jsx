import { useState } from 'react';
import { useApp } from '../lib/store';

const communities = [
  { id: 'desi', name: 'Desi', accent: 'linear-gradient(90deg,var(--saffron),var(--saffron-deep))', desc: 'India, Pakistan, Bangladesh, Sri Lanka and Nepal. The largest ZOTO community — cricket debates included.', members: '2,800+', groups: 14 },
  { id: 'latin', name: 'Latin', accent: 'linear-gradient(90deg,#C94F4F,#8E3B5E)', desc: 'Brazil, Mexico, Colombia, Argentina and beyond. Salsa on Saturdays, churrasco when the sun shows up.', members: '700+', groups: 6 },
  { id: 'asian', name: 'East Asian', accent: 'linear-gradient(90deg,var(--teal),#3E7C72)', desc: 'China, Vietnam, Philippines, Korea and Japan. Hotpot nights, Mid-Autumn picnics, karaoke that goes late.', members: '500+', groups: 5 },
];

const counties = [
  ['Dublin — Northside', '1,240 members'], ['Dublin — Southside', '1,080 members'],
  ['Cork', '310 members'], ['Galway', '190 members'], ['Limerick', '150 members'],
];

const interests = [
  ['Cricket', '640 members · nets on Sundays'], ['Hiking & outdoors', '520 members · monthly walks'],
  ['Tech & careers', '780 members · CV clinics'], ['Foodies', '460 members · restaurant crawls'],
  ['Families & parents', '230 members · playdates, schools'],
];

export default function Community() {
  const app = useApp();
  const [joined, setJoined] = useState([]);

  const join = (key, label) => app.gate('communityJoin', () => {
    const on = joined.includes(key);
    setJoined((j) => on ? j.filter((k) => k !== key) : [...j, key]);
    app.notify(on ? `Left ${label}.` : `Welcome to ${label}! The invite link is in your email.`);
  });

  return (
    <>
      <style>{`
        .communities{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:24px}
        .comm-card{padding:30px;position:relative;overflow:hidden}
        .comm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:var(--accent)}
        .comm-card h3{font-family:var(--font-display);font-weight:560;font-size:1.4rem;margin:14px 0 6px}
        .comm-card p{font-size:.93rem;color:var(--ink-soft);margin-bottom:14px}
        .comm-card .members{font-size:.83rem;color:var(--ink-soft);display:block;margin-bottom:16px}
        .comm-card .members b{color:var(--teal)}
        .section-label{font-family:var(--font-display);font-weight:560;font-size:1.5rem;margin:52px 0 6px}
        .section-sub{color:var(--ink-soft);margin-bottom:20px}
        .group-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
        .group-row{display:flex;align-items:center;gap:14px;padding:18px 20px;text-align:left;width:100%}
        .group-main{flex:1;min-width:0}
        .group-main h4{font-size:.98rem;font-weight:700}
        .group-main span{font-size:.82rem;color:var(--ink-soft)}
        .joined-dot{color:var(--teal);font-weight:700;font-size:.8rem;white-space:nowrap}
        @media(max-width:900px){.communities{grid-template-columns:1fr}}
      `}</style>

      <section className="page-hero">
        <div className="wrap">
          <span className="crumb">Free for everyone</span>
          <h1>Community</h1>
          <p className="sub">Three communities, one platform. Join yours for the everyday questions — and everyone's welcome at everything.</p>
        </div>
      </section>

      <div className="wrap">
        <div className="communities">
          {communities.map((c) => (
            <article className="card hover comm-card" key={c.id} style={{ '--accent': c.accent }}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <span className="members"><b>{c.members}</b> members · {c.groups} groups</span>
              <button
                className={'btn sm' + (joined.includes(c.id) ? ' done' : '')}
                onClick={() => join(c.id, `the ${c.name} community`)}
              >
                {joined.includes(c.id) ? 'Joined ✓' : `Join ${c.name} community`}
              </button>
            </article>
          ))}
        </div>

        <h2 className="section-label">Groups by county</h2>
        <p className="section-sub">Local groups are where the practical help lives — every county group has members who've already solved your problem.</p>
        <div className="group-grid">
          {counties.map(([name, sub]) => (
            <button className="card hover group-row" key={name} onClick={() => join(name, name)}>
              <span className="glyph teal"><svg viewBox="0 0 24 24"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
              <div className="group-main"><h4>{name}</h4><span>{sub}</span></div>
              {joined.includes(name) && <span className="joined-dot">Joined ✓</span>}
            </button>
          ))}
        </div>

        <h2 className="section-label">Groups by interest</h2>
        <p className="section-sub">Friendship happens around shared things, not shared passports. These groups cross all three communities.</p>
        <div className="group-grid">
          {interests.map(([name, sub]) => (
            <button className="card hover group-row" key={name} onClick={() => join(name, name)}>
              <span className="glyph"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><path d="M4 19c0-3 2.2-5 5-5s5 2 5 5" /><circle cx="17" cy="7" r="2" /><path d="M15.5 13.5c2.5.2 4.5 2 4.5 4.5" /></svg></span>
              <div className="group-main"><h4>{name}</h4><span>{sub}</span></div>
              {joined.includes(name) && <span className="joined-dot">Joined ✓</span>}
            </button>
          ))}
        </div>

        <div className="notice info" style={{ marginTop: 52 }}>
          <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6z" /><path d="m9.5 12 2 2 3.5-3.5" /></svg>
          <span><strong>House rules:</strong> group invites are visible to verified members only — that's how the chats stay spam-free. Be the person you needed in your first week here.</span>
        </div>
      </div>
    </>
  );
}
