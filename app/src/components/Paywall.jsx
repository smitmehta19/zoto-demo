import { useState } from 'react';
import Modal from './Modal';
import { useApp, PRICE } from '../lib/store';

export default function Paywall() {
  const app = useApp();
  const [code, setCode] = useState('');
  const [err, setErr] = useState(null);

  if (!app.paywall) return null;

  const tryPromo = (e) => {
    e.preventDefault();
    if (!code.trim()) { setErr('Enter a code first.'); return; }
    const error = app.activate(code);
    if (error) setErr(error);
  };

  return (
    <Modal title="Become a ZOTO member" onClose={app.closePaywall}>
      <p className="muted" style={{ marginBottom: 4 }}>
        {app.paywall.label || 'This feature'} is part of ZOTO membership. One plan, everything included.
      </p>
      <div className="plan">
        <div className="price">{PRICE}<span> / month · cancel anytime</span></div>
        <ul>
          <li>Post &amp; open full housing listings, 48h before they go public</li>
          <li>Apply for referrals — and offer them at your company</li>
          <li>Join flight group chats and post your own flights</li>
          <li>Claim every partner perk</li>
          <li>Events &amp; community groups stay free for everyone</li>
        </ul>
      </div>
      <button className="btn saffron block" onClick={() => app.activate(null)}>
        Subscribe for {PRICE}/month
      </button>
      <p className="small muted" style={{ textAlign: 'center', marginTop: 8 }}>
        Demo build — no card is charged. Stripe Checkout plugs in here.
      </p>
      <div className="divider">or use a promo code</div>
      <form className="promo-row" onSubmit={tryPromo}>
        <input
          className={'input' + (err ? ' err' : '')}
          placeholder="PROMO CODE"
          value={code}
          onChange={(e) => { setCode(e.target.value); setErr(null); }}
          aria-label="Promo code"
        />
        <button className="btn" type="submit">Apply</button>
      </form>
      {err && <p className="err-text" style={{ marginTop: 8 }}>{err}</p>}
    </Modal>
  );
}
