import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* ------------------------------------------------------------------
 * ZOTO demo store: auth + subscription + paywall + toasts.
 * Persisted to localStorage so refreshes keep you signed in.
 * In production this becomes Supabase auth + Stripe subscriptions.
 * ------------------------------------------------------------------ */

export const PROMO_CODE = 'THANKSTEJASDEMO';
export const PRICE = '€10';

/* Which features sit behind the paywall. Flip any flag to re-gate. */
export const GATES = {
  housingView: true,    // open a listing's full details
  housingPost: true,    // post a listing
  referralApply: true,  // apply for a referral
  referralPost: true,   // offer referrals at your company
  flightJoin: true,     // join a flight group chat
  flightPost: true,     // post your flight
  perkClaim: true,      // claim a partner perk
  eventRsvp: false,     // free
  eventCreate: false,   // free
  communityJoin: false, // free
};

const load = (k) => {
  try { return JSON.parse(localStorage.getItem(k)); } catch { return null; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => load('zoto.user'));
  const [sub, setSub] = useState(() => load('zoto.sub')); // {method:'promo'|'card', since}
  const [paywall, setPaywall] = useState(null);           // {feature:string} | null
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const api = useMemo(() => ({
    user,
    subscribed: !!sub,
    subMethod: sub?.method ?? null,
    paywall,
    toast,

    signIn(profile) {
      setUser(profile);
      save('zoto.user', profile);
    },
    signOut() {
      setUser(null); setSub(null);
      localStorage.removeItem('zoto.user');
      localStorage.removeItem('zoto.sub');
    },
    /** Subscribe with promo code or (demo) card. Returns error string or null. */
    activate(code) {
      if (code != null) {
        if (code.trim().toUpperCase() !== PROMO_CODE) return 'That code isn’t valid. Check it and try again.';
        const s = { method: 'promo', since: Date.now() };
        setSub(s); save('zoto.sub', s); setPaywall(null);
        setToast('Promo accepted — you have full access. Welcome aboard!');
        return null;
      }
      const s = { method: 'card', since: Date.now() };
      setSub(s); save('zoto.sub', s); setPaywall(null);
      setToast('Subscribed — you have full access. (Demo: Stripe checkout goes here.)');
      return null;
    },
    /** Run fn if the feature is free or the user subscribed; otherwise open the paywall. */
    gate(feature, fn, label) {
      if (!GATES[feature] || sub) { fn?.(); return true; }
      setPaywall({ feature, label });
      return false;
    },
    closePaywall() { setPaywall(null); },
    notify(msg) { setToast(msg); },
  }), [user, sub, paywall, toast]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
