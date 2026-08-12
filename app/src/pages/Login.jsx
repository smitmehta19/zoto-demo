import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/store';
import Logo from '../components/Logo';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.8-3.8H1.2v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.2a12 12 0 0 0 0 10.8l4.1-3.1z"/><path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.6 1.8L20 3.1A12 12 0 0 0 1.2 6.6l4.1 3.1A7.2 7.2 0 0 1 12 4.7z"/></svg>
);

export default function Login() {
  const app = useApp();
  const nav = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('');
  const [err, setErr] = useState(null);

  const dest = location.state?.from || '/';

  const submit = (e) => {
    e.preventDefault();
    const mail = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) { setErr('Enter a valid email address.'); return; }
    const displayName =
      mode === 'signup' && name.trim()
        ? name.trim()
        : mail.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    app.signIn({ name: displayName, email: mail, stage: stage || null });
    nav(dest, { replace: true });
  };

  const google = () => {
    app.signIn({ name: 'Demo User', email: 'demo@zoto.ie', stage: null });
    nav(dest, { replace: true });
  };

  return (
    <div className="login-shell">
      <style>{`
        .login-shell{min-height:100vh;display:grid;grid-template-columns:1fr 1fr}
        .lg-brand{background:var(--sand);padding:56px 52px;display:flex;flex-direction:column;justify-content:space-between;gap:40px}
        .lg-brand .logo{margin-bottom:40px;display:inline-block}
        .lg-brand h1{font-size:clamp(1.8rem,2.8vw,2.5rem);line-height:1.15;margin-bottom:14px}
        .lg-brand h1 em{font-style:italic;font-weight:480;color:var(--saffron-deep)}
        .lg-brand p{color:var(--ink-soft);max-width:26rem}
        .mini-journey{display:flex;flex-direction:column;margin-top:32px}
        .mj-step{display:flex;gap:14px;align-items:flex-start;position:relative;padding-bottom:22px}
        .mj-step:last-child{padding-bottom:0}
        .mj-dot{width:28px;height:28px;border-radius:50%;flex:none;background:var(--white);border:2px solid var(--saffron);
          display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:640;font-size:.8rem;color:var(--saffron-deep);position:relative;z-index:1}
        .mj-step:not(:last-child)::before{content:"";position:absolute;left:13px;top:30px;bottom:-2px;width:2px;
          background:repeating-linear-gradient(180deg,rgba(31,45,54,.25) 0 5px,transparent 5px 10px)}
        .mj-step b{display:block;font-size:.95rem}
        .mj-step span{font-size:.85rem;color:var(--ink-soft)}
        .lg-quote{font-family:var(--font-display);font-style:italic;font-weight:480;font-size:1.02rem;line-height:1.5;max-width:26rem}
        .lg-quote footer{font-family:var(--font-body);font-style:normal;font-size:.85rem;color:var(--ink-soft);margin-top:10px}
        .lg-form{display:flex;align-items:center;justify-content:center;padding:48px 24px}
        .lg-card{width:100%;max-width:420px;animation:pageIn .5s cubic-bezier(.2,.7,.2,1) both}
        .lg-card .tabs{width:100%;display:flex;margin-bottom:26px}
        .lg-card .tab{flex:1;text-align:center}
        .lg-card h2{font-size:1.55rem;margin-bottom:6px}
        .lg-card .sub{color:var(--ink-soft);font-size:.95rem;margin-bottom:24px}
        .lg-fields{display:flex;flex-direction:column;gap:16px}
        .btn-google{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;
          background:var(--white);border:1px solid var(--line);border-radius:999px;padding:12px;font-weight:600;font-size:.95rem;transition:box-shadow .2s}
        .btn-google:hover{box-shadow:0 4px 14px rgba(31,45,54,.1)}
        .legal{font-size:.8rem;color:var(--ink-soft);margin-top:20px;text-align:center}
        .legal a{color:var(--teal);font-weight:600}
        @media(max-width:900px){.login-shell{grid-template-columns:1fr}.lg-brand{order:2}.lg-quote{display:none}}
      `}</style>

      <aside className="lg-brand">
        <div>
          <span className="logo" style={{ marginBottom: 36, display: 'inline-block' }}>
            <Logo size={32} />
          </span>
          <h1>Your first friend in Ireland is <em>two minutes away</em>.</h1>
          <p>One account unlocks every ZOTO service — and your profile carries one verified identity across all of them.</p>
          <div className="mini-journey">
            <div className="mj-step"><span className="mj-dot">1</span><div><b>Before you fly</b><span>Flight buddies on your exact plane</span></div></div>
            <div className="mj-step"><span className="mj-dot">2</span><div><b>When you land</b><span>Verified rooms and flatmates</span></div></div>
            <div className="mj-step"><span className="mj-dot">3</span><div><b>As you settle</b><span>Referrals, events, perks, your community</span></div></div>
          </div>
        </div>
        <blockquote className="lg-quote">
          "Signed up at the airport, had a flight buddy by boarding, a room viewing by Friday."
          <footer>Ananya S. · moved from Pune, Sep 2025</footer>
        </blockquote>
      </aside>

      <main className="lg-form">
        <div className="lg-card">
          <div className="tabs" role="tablist">
            <button className={'tab' + (mode === 'signin' ? ' on' : '')} onClick={() => setMode('signin')}>Sign in</button>
            <button className={'tab' + (mode === 'signup' ? ' on' : '')} onClick={() => setMode('signup')}>Create account</button>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
            {mode === 'signin' ? 'Welcome back' : 'Join ZOTO'}
          </h2>
          <p className="sub">
            {mode === 'signin'
              ? 'Demo build: any valid email signs you in instantly.'
              : 'Two minutes now, a soft landing later. Verification keeps every space scam-free.'}
          </p>

          <form className="lg-fields" onSubmit={submit}>
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className={'input' + (err ? ' err' : '')}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErr(null); }}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {err && <span className="err-text">{err}</span>}
            </div>
            {mode === 'signup' && (
              <div className="field">
                <label htmlFor="stage">Where are you in the journey?</label>
                <select id="stage" className="input" value={stage} onChange={(e) => setStage(e.target.value)}>
                  <option value="">Choose one…</option>
                  <option>Moving to Ireland soon</option>
                  <option>Just landed — first 3 months</option>
                  <option>Settled — here over a year</option>
                </select>
              </div>
            )}
            <button className="btn saffron block" type="submit">
              {mode === 'signin' ? 'Sign in' : 'Create my account'}
            </button>
          </form>

          <div className="divider">or</div>
          <button className="btn-google" onClick={google}><GoogleIcon /> Continue with Google</button>

          <p className="legal">
            {mode === 'signin'
              ? <>New here? <a onClick={() => setMode('signup')} style={{ cursor: 'pointer' }}>Create a free account</a></>
              : <>By joining you agree to the <a href="#">community guidelines</a> and <a href="#">privacy policy</a>.</>}
          </p>
        </div>
      </main>
    </div>
  );
}
