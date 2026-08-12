import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../lib/store';
import Logo from './Logo';

const links = [
  ['/flight-buddy', 'Flight Buddy'],
  ['/housing', 'Housing'],
  ['/referrals', 'Referrals'],
  ['/events', 'Events'],
  ['/community', 'Community'],
  ['/perks', 'Perks'],
];

export default function Header() {
  const app = useApp();
  const [open, setOpen] = useState(false);
  const signOut = () => { app.signOut(); window.location.assign(import.meta.env.BASE_URL); };

  return (
    <header className="site-header">
      <div className="wrap nav">
        <NavLink to="/" aria-label="ZOTO home"><Logo size={28} /></NavLink>
        <nav className={'nav-links' + (open ? ' open' : '')} onClick={(e) => { if (e.target.closest('a,button')) setOpen(false); }}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
          {/* Mobile drawer: account row lives here, not in the crowded top bar */}
          <div className="drawer-user">
            {app.user ? (
              <>
                <span className="who">
                  <span className="avatar" aria-hidden="true" />
                  {app.user.name.split(' ')[0]}
                  {app.subscribed && <span className="member-pill">Member</span>}
                </span>
                {app.subscribed ? (
                  <button className="link-quiet small" style={{ borderBottom: 'none' }} onClick={signOut}>Sign out</button>
                ) : (
                  <span className="row" style={{ gap: 14 }}>
                    <button className="btn saffron sm" onClick={() => app.gate('housingPost', null, 'Full membership')}>Upgrade</button>
                    <button className="link-quiet small" style={{ borderBottom: 'none' }} onClick={signOut}>Sign out</button>
                  </span>
                )}
              </>
            ) : (
              <>
                <NavLink className="link-quiet" to="/login">Sign in</NavLink>
                <NavLink className="btn saffron sm" to="/login" style={{ display: 'inline-flex' }}>Join free</NavLink>
              </>
            )}
          </div>
        </nav>
        <div className="nav-cta">
          {app.user ? (
            <>
              {app.subscribed ? (
                <span className="member-pill">Member</span>
              ) : (
                <button className="btn saffron sm" onClick={() => app.gate('housingPost', null, 'Full membership')}>
                  Upgrade
                </button>
              )}
              <div className="user-chip">
                <span className="avatar" aria-hidden="true" />
                <span>{app.user.name.split(' ')[0]}</span>
                <button
                  className="link-quiet small"
                  style={{ borderBottom: 'none' }}
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink className="link-quiet" to="/login">Sign in</NavLink>
              <NavLink className="btn saffron sm" to="/login">Join free</NavLink>
            </>
          )}
          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2D36" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
