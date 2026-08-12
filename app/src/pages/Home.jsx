import { Link, useNavigate } from 'react-router-dom';
import { useApp, PRICE } from '../lib/store';

const faqs = [
  ['What’s free and what’s paid?', 'Browsing everything, events and community groups are free — forever. Membership (€10/month) unlocks the actions: opening full listings, posting, applying and offering referrals, joining flight groups, and claiming partner perks.'],
  ['How do you verify members?', 'A college or work email, or a LinkedIn profile, earns the verified badge. Housing listings are reviewed before they publish, and group invite links are only visible to verified members.'],
  ['Can I cancel anytime?', 'Yes — one click, no questions. Your profile, groups and event RSVPs stay exactly as they are; only the member actions pause.'],
  ['I’m not Desi — is ZOTO for me?', 'Yes. ZOTO has Desi, Latin and East Asian communities, and the interest groups — cricket, hiking, tech careers, foodies — deliberately cross all three. Everyone is welcome at everything.'],
  ['Which cities do you cover?', 'Dublin is home base. Cork, Galway and Limerick have active county groups, and new cities open whenever five members raise their hand to start one.'],
];

const testimonials = [
  ['“I messaged my flight buddy from the boarding gate in Mumbai. By the time we landed we’d already split a taxi and she’d told me which SIM card to buy.”', 'Ananya S.', 'Moved from Pune · Sep 2025'],
  ['“Three weeks of Daft.ie scams, then one week on ZOTO and I had keys. The landlord was someone’s flatmate’s cousin — that’s how it works here.”', 'Carlos R.', 'Moved from São Paulo · Jan 2026'],
  ['“A member at my dream company referred me on a Tuesday. I signed the offer the next month. I now refer two people a quarter — it’s the rule.”', 'Lin W.', 'Moved from Shenzhen · Jun 2025'],
];

export default function Home() {
  const app = useApp();
  const nav = useNavigate();
  const first = app.user?.name.split(' ')[0];

  /* Logged-out visitors go to login first; logged-in free users get the paywall. */
  const joinAction = () => {
    if (!app.user) nav('/login');
    else app.gate('housingPost', null, 'Full membership');
  };

  const invite = async () => {
    try { await navigator.clipboard.writeText('https://zoto.ie/invite/' + encodeURIComponent(first.toLowerCase())); } catch { /* clipboard unavailable */ }
    app.notify('Invite link copied — send it to whoever’s landing next.');
  };

  return (
    <>
      <style>{`
        .hero{padding:72px 0 56px;position:relative;overflow:hidden}
        .hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.8rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);margin-bottom:20px}
        .eyebrow::before{content:"";width:28px;height:2px;background:var(--saffron)}
        .hero h1{font-size:clamp(2.4rem,5vw,3.8rem);line-height:1.08;margin-bottom:20px}
        .hero h1 em{font-style:italic;font-weight:480;color:var(--saffron-deep)}
        .hero .lede{font-size:1.12rem;color:var(--ink-soft);max-width:34rem;margin-bottom:30px}
        .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;align-items:center}

        .pass{background:var(--white);border:1px solid var(--line);border-radius:var(--radius);
          box-shadow:0 24px 60px -24px rgba(31,45,54,.25);overflow:hidden;transform:rotate(1.5deg)}
        .pass-top{background:var(--teal);color:#fff;padding:15px 24px;display:flex;justify-content:space-between;align-items:center}
        .pass-top .tag{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;opacity:.8}
        .pass-top strong{font-family:var(--font-display);font-size:1.05rem}
        .pass-body{padding:24px}
        .route{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
        .route .city{text-align:center}
        .route .code{font-family:var(--font-display);font-size:2rem;font-weight:640;line-height:1}
        .route .name{font-size:.78rem;color:var(--ink-soft);margin-top:4px}
        .route-line{flex:1;position:relative;height:2px;background:repeating-linear-gradient(90deg,var(--saffron) 0 8px,transparent 8px 16px)}
        .route-line::after{content:"";position:absolute;right:-2px;top:50%;translate:0 -50%;width:10px;height:10px;border-radius:50%;background:var(--saffron)}
        .pass-rows{display:grid;grid-template-columns:1fr 1fr;gap:13px 20px;border-top:1px dashed var(--line);padding-top:18px}
        .pass-rows .k{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft)}
        .pass-rows .v{font-weight:600;font-size:.94rem}
        .pass-note{margin-top:18px;background:var(--sand);border-radius:12px;padding:13px 16px;font-size:.9rem}
        .pass-note strong{color:var(--saffron-deep)}

        .stat-strip{border-block:1px solid var(--line);background:rgba(255,255,255,.5)}
        .stat-strip .inner{display:flex;justify-content:center;gap:clamp(28px,6vw,80px);flex-wrap:wrap;padding:22px 24px;font-size:.9rem;color:var(--ink-soft)}
        .stat-strip b{font-family:var(--font-display);font-weight:640;font-size:1.25rem;color:var(--teal);margin-right:6px}

        .journey{padding:72px 0 30px}
        .journey-head{max-width:620px;margin-bottom:52px}
        .journey-head h2{font-size:clamp(1.8rem,3.2vw,2.5rem);line-height:1.15;margin-bottom:12px}
        .journey-head p{color:var(--ink-soft);font-size:1.05rem}
        .stage{display:grid;grid-template-columns:64px 1fr;gap:28px;position:relative;padding-bottom:56px}
        .stage:last-child{padding-bottom:20px}
        .stage-marker{position:relative}
        .stage-dot{width:44px;height:44px;border-radius:50%;background:var(--white);border:2px solid var(--saffron);
          display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:640;color:var(--saffron-deep);position:relative;z-index:2}
        .stage:not(:last-child) .stage-marker::after{content:"";position:absolute;left:21px;top:48px;bottom:-8px;width:2px;
          background:repeating-linear-gradient(180deg,var(--line) 0 6px,transparent 6px 12px)}
        .stage h3{font-family:var(--font-display);font-size:1.45rem;font-weight:560;margin-bottom:2px}
        .stage .when{font-size:.84rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);margin-bottom:16px}
        .jcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px}
        .jcards .card h4{font-size:1.06rem;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:10px}
        .jcards .card p{font-size:.93rem;color:var(--ink-soft)}
        .jcards .card .go{display:inline-block;margin-top:12px}

        .band{background:var(--sand);padding:76px 0;margin-top:56px}
        .band h2{font-size:clamp(1.8rem,3.2vw,2.5rem);line-height:1.15;margin-bottom:10px}
        .band .band-sub{color:var(--ink-soft);font-size:1.05rem;max-width:36rem;margin-bottom:40px}
        .t-wall{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .t-card{background:var(--white);border-radius:var(--radius);padding:28px;border:1px solid var(--line);display:flex;flex-direction:column;gap:16px}
        .t-card p{font-family:var(--font-display);font-style:italic;font-weight:480;font-size:1.02rem;line-height:1.55;flex:1}
        .t-who{display:flex;align-items:center;gap:12px;font-size:.88rem}
        .t-who .avatar{width:38px;height:38px;border-radius:50%;flex:none}
        .t-who strong{display:block}
        .t-who span{color:var(--ink-soft);font-size:.82rem}

        .pricing{padding:88px 0 20px}
        .pricing-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;max-width:960px;margin:0 auto}
        .pricing h2{font-size:clamp(1.8rem,3.2vw,2.5rem);line-height:1.15;margin-bottom:12px}
        .pricing .p-sub{color:var(--ink-soft);font-size:1.02rem;margin-bottom:8px}
        .price-card{border:2px solid var(--saffron);border-radius:22px;background:var(--white);padding:32px;position:relative;overflow:hidden}
        .price-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--saffron),var(--teal))}
        .price-big{font-family:var(--font-display);font-weight:640;font-size:2.6rem}
        .price-big span{font-size:.95rem;font-family:var(--font-body);font-weight:500;color:var(--ink-soft)}
        .price-card ul{list-style:none;margin:18px 0 22px;display:flex;flex-direction:column;gap:10px}
        .price-card li{display:flex;gap:10px;align-items:flex-start;font-size:.94rem}
        .price-card li::before{content:"";width:17px;height:17px;flex:none;margin-top:3px;border-radius:50%;background:var(--teal-soft);
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2314554B' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 13 4 4 10-10'/%3E%3C/svg%3E");
          background-size:9px;background-position:center;background-repeat:no-repeat}
        .promo-hint{margin-top:14px;text-align:center;font-size:.86rem}

        .faq-sec{padding:80px 0 20px}
        .faq-sec h2{font-size:clamp(1.8rem,3.2vw,2.5rem);text-align:center;margin-bottom:36px}

        .cta{padding:96px 0;text-align:center}
        .cta h2{font-size:clamp(1.8rem,3.2vw,2.5rem);max-width:640px;margin:0 auto 14px}
        .cta p{color:var(--ink-soft);max-width:480px;margin:0 auto 30px}

        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr;gap:44px}
          .pass{transform:none;max-width:440px}
          .t-wall{grid-template-columns:1fr}
          .pricing-grid{grid-template-columns:1fr;gap:36px}
        }
        @media(max-width:720px){
          .hero{padding:48px 0 40px}
          .stage{grid-template-columns:44px 1fr;gap:16px}
          .stage-dot{width:36px;height:36px}
          .stage:not(:last-child) .stage-marker::after{left:17px;top:40px}
        }
      `}</style>

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              {app.user ? `Welcome back, ${first} · Dublin, Ireland` : 'Your best friend abroad · Dublin, Ireland'}
            </span>
            <h1>Moving countries is hard. <em>Moving alone</em> is harder.</h1>
            <p className="lede">ZOTO connects internationals building a life in Ireland — a flight buddy before takeoff, a room when you land, and a referral when you're ready to grow.</p>
            <div className="hero-ctas">
              {app.subscribed ? (
                <>
                  <Link className="btn saffron" to="/housing">Post a listing</Link>
                  <Link className="link-quiet" to="/events">What's on this week</Link>
                </>
              ) : app.user ? (
                <>
                  <button className="btn saffron" onClick={joinAction}>Become a member</button>
                  <a className="link-quiet" href="#journey">See how it works</a>
                </>
              ) : (
                <>
                  <button className="btn saffron" onClick={joinAction}>Join ZOTO free</button>
                  <a className="link-quiet" href="#journey">See how it works</a>
                </>
              )}
            </div>
          </div>
          <div className="pass" aria-label="Example flight buddy match">
            <div className="pass-top">
              <span className="tag">Flight Buddy · Matched</span>
              <strong>ZOTO</strong>
            </div>
            <div className="pass-body">
              <div className="route">
                <div className="city"><div className="code">BOM</div><div className="name">Mumbai</div></div>
                <div className="route-line" />
                <div className="city"><div className="code">DUB</div><div className="name">Dublin</div></div>
              </div>
              <div className="pass-rows">
                <div><div className="k">Flight</div><div className="v">EI 122 · 14 Sep</div></div>
                <div><div className="k">Buddies on board</div><div className="v">3 matched</div></div>
                <div><div className="k">Landing</div><div className="v">09:40 · T2</div></div>
                <div><div className="k">Airport taxi</div><div className="v">Shared · €12 each</div></div>
              </div>
              <div className="pass-note"><strong>Priya</strong> and 2 others are on your flight. Say hi before you board.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Social proof strip ---------- */}
      <div className="stat-strip">
        <div className="wrap inner">
          <span><b>4,000+</b>members across Ireland</span>
          <span><b>600+</b>flight buddies matched</span>
          <span><b>350+</b>rooms found</span>
          <span><b>40+</b>events hosted</span>
        </div>
      </div>

      {/* ---------- Journey ---------- */}
      <section className="journey wrap" id="journey">
        <div className="journey-head">
          <h2>One community, every step of the journey</h2>
          <p>ZOTO is organised the way your move actually happens — before you fly, the week you land, and the years you settle.</p>
        </div>

        <div className="stage">
          <div className="stage-marker"><div className="stage-dot">1</div></div>
          <div>
            <h3>Before you fly</h3>
            <div className="when">Visa in hand · bags packed</div>
            <div className="jcards">
              <Link className="card hover" to="/flight-buddy">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><path d="M10.5 13.5 3 10l1.5-2 6.5 1L17 3.5 19.5 5l-4 6.5 4.5 5-2 1.5-5.5-3.5-3 3.5-1.5-.5.5-4z" /></svg></span>
                  Flight Buddy {!app.subscribed && <span className="lock" style={{ marginLeft: 'auto' }}>Membership</span>}</h4>
                <p>One group chat per flight. Find members on your exact plane, share the airport taxi, and land already knowing someone.</p>
                <span className="go link-accent">Find your flight →</span>
              </Link>
              <div className="card">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /></svg></span>
                  Schengen Visas <span className="badge teal" style={{ marginLeft: 'auto' }}>Soon</span></h4>
                <p>Step-by-step visa guidance from people who've done it — appointment tips, checklists, embassy know-how.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stage">
          <div className="stage-marker"><div className="stage-dot">2</div></div>
          <div>
            <h3>When you land</h3>
            <div className="when">First weeks in Ireland</div>
            <div className="jcards">
              <Link className="card hover" to="/housing">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg></span>
                  Housing {!app.subscribed && <span className="lock" style={{ marginLeft: 'auto' }}>Membership</span>}</h4>
                <p>Rooms offered and wanted, from verified members only. Find a place — or find your flatmate.</p>
                <span className="go link-accent">Browse rooms →</span>
              </Link>
              <div className="card">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></svg></span>
                  Part-Time Jobs <span className="badge teal" style={{ marginLeft: 'auto' }}>Soon</span></h4>
                <p>Student-friendly part-time roles vetted by the community — hours that fit around college timetables.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stage">
          <div className="stage-marker"><div className="stage-dot">3</div></div>
          <div>
            <h3>As you settle</h3>
            <div className="when">Building your life here</div>
            <div className="jcards">
              <Link className="card hover" to="/referrals">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></span>
                  Job Referrals {!app.subscribed && <span className="lock" style={{ marginLeft: 'auto' }}>Membership</span>}</h4>
                <p>Members refer members. Get your CV in front of hiring managers through people who'll vouch for you.</p>
                <span className="go link-accent">Request a referral →</span>
              </Link>
              <Link className="card hover" to="/events">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg></span>
                  Events <span className="badge free" style={{ marginLeft: 'auto' }}>Free</span></h4>
                <p>Diwali nights, salsa socials, cliff walks and newcomer coffee mornings — your calendar fills up fast.</p>
                <span className="go link-accent">See what's on →</span>
              </Link>
              <Link className="card hover" to="/community">
                <h4><span className="glyph"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><circle cx="16" cy="9" r="2.5" /><path d="M4 19c0-3 2.2-5 5-5s5 2 5 5" /><path d="M14.5 14.5c2.5.2 4.5 2 4.5 4.5" /></svg></span>
                  Community <span className="badge free" style={{ marginLeft: 'auto' }}>Free</span></h4>
                <p>Groups by community, county and interest — for the everyday questions and the lifelong friends.</p>
                <span className="go link-accent">Join a group →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Testimonial wall ---------- */}
      <section className="band">
        <div className="wrap">
          <h2>Built by people who remember their first week</h2>
          <p className="band-sub">Every ZOTO service exists because someone in the community needed it and couldn't find it. That's still how we decide what to build next.</p>
          <div className="t-wall">
            {testimonials.map(([quote, who, sub], i) => (
              <div className="t-card" key={who}>
                <p>{quote}</p>
                <div className="t-who">
                  <span className="avatar" style={{ background: ['linear-gradient(135deg,var(--saffron),var(--teal))', 'linear-gradient(135deg,#D9A441,var(--saffron-deep))', 'linear-gradient(135deg,var(--teal),#7BA8A0)'][i] }} />
                  <div><strong>{who}</strong><span>{sub}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing (non-members only) ---------- */}
      {!app.subscribed && (
        <section className="pricing wrap" id="pricing">
          <div className="pricing-grid">
            <div>
              <h2>One plan. Everything unlocked.</h2>
              <p className="p-sub">Browsing, events and community groups are free — forever. Membership funds verification, moderation and the events, and unlocks the actions.</p>
              <p className="p-sub muted small">Cancel anytime. Your profile and groups stay.</p>
            </div>
            <div className="price-card">
              <div className="price-big">{PRICE}<span> / month</span></div>
              <ul>
                <li>Open full listings — photos, exact area, and the poster</li>
                <li>Post rooms, or yourself as a flatmate</li>
                <li>Apply for referrals and offer them at your company</li>
                <li>Join flight group chats and post your flights</li>
                <li>Claim every partner perk</li>
              </ul>
              <button className="btn saffron block" onClick={joinAction}>
                {app.user ? 'Become a member' : 'Join free, then choose your plan'}
              </button>
              <div className="promo-hint">
                <button className="link-quiet" onClick={joinAction}>Have a promo code?</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className="faq-sec wrap">
        <h2>Questions people actually ask</h2>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <div className="faq-a">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="cta">
        <div className="wrap">
          {app.subscribed ? (
            <>
              <h2>Know someone about to move?</h2>
              <p>The best thing a settled member can do is hold the door open. Send them your invite link.</p>
              <button className="btn saffron" onClick={invite}>Copy my invite link</button>
            </>
          ) : (
            <>
              <h2>Your people are already here</h2>
              <p>Everything above is real and happening this month. {app.user ? 'Membership takes two minutes.' : 'Joining takes two minutes.'}</p>
              <button className="btn saffron" onClick={joinAction}>{app.user ? 'Join ZOTO membership' : 'Join ZOTO free'}</button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
