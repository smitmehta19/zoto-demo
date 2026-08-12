import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div><strong style={{ color: 'var(--ink)' }}>ZOTO</strong> · Your best friend abroad · Dublin, Ireland</div>
        <div className="foot-links">
          <Link to="/community">Community</Link>
          <Link to="/perks">Partner Perks</Link>
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
