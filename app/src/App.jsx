import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useApp } from './lib/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Paywall from './components/Paywall';
import Login from './pages/Login';
import Home from './pages/Home';
import FlightBuddy from './pages/FlightBuddy';
import Housing from './pages/Housing';
import Referrals from './pages/Referrals';
import Events from './pages/Events';
import Community from './pages/Community';
import Perks from './pages/Perks';

/* The home page is public. Every other page needs an account —
   visitors are sent to /login and returned to where they were heading. */
function Shell({ children, isPublic = false }) {
  const app = useApp();
  const location = useLocation();
  if (!app.user && !isPublic) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="page" key={location.pathname} style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <Paywall />
      {app.toast && <div className="toast" role="status">{app.toast}</div>}
    </div>
  );
}

/* Once signed in, leave /login for wherever the visitor was originally heading. */
function LoginRoute() {
  const app = useApp();
  const location = useLocation();
  if (app.user) return <Navigate to={location.state?.from || '/'} replace />;
  return <Login />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/" element={<Shell isPublic><Home /></Shell>} />
      <Route path="/flight-buddy" element={<Shell><FlightBuddy /></Shell>} />
      <Route path="/housing" element={<Shell><Housing /></Shell>} />
      <Route path="/referrals" element={<Shell><Referrals /></Shell>} />
      <Route path="/events" element={<Shell><Events /></Shell>} />
      <Route path="/community" element={<Shell><Community /></Shell>} />
      <Route path="/perks" element={<Shell><Perks /></Shell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
