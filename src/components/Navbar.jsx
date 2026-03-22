import { useState, useEffect } from 'react';
import '../styles/navbar.css';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'AI Assistant', href: '#ai' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  const handleNav = (href) => {
    const id = href.replace('#', '');
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); handleNav('#home'); }}>
            <div className="nav-logo-mark">Nx</div>
            Nexlify
          </a>

          <ul className="nav-links">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={active === link.href.replace('#', '') ? 'active' : ''}
                  onClick={e => { e.preventDefault(); handleNav(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <button
              className="btn-primary"
              onClick={() => handleNav('#contact')}
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              className={`nav-hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={e => { e.preventDefault(); handleNav(link.href); }}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
