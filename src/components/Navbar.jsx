import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, BookOpen, Home } from 'lucide-react';
import '../index.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Link to="/">ADANA_PALIMPSEST</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <Home size={18} /> Ana Sayfa
        </Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          <BookOpen size={18} /> Hakkında
        </Link>
        <Link to="/simulation" className={location.pathname === '/simulation' ? 'active' : ''}>
          <Map size={18} /> Simülasyon Haritası
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
