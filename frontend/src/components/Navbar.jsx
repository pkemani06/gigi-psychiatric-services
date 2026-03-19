import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'What We Treat', href: '/what-we-treat' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Figtree:wght@300;400;500;600&display=swap');

  .nav-announcement {
    background: linear-gradient(90deg, #3d5c4a 0%, #5c7e6a 50%, #3d5c4a 100%);
    background-size: 200% auto;
    animation: navShimmerBg 6s linear infinite;
  }
  @keyframes navShimmerBg {
    from { background-position: 0% center; }
    to   { background-position: 200% center; }
  }

  .nav-pill-white {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; background: rgba(249,247,243,0.15);
    border: 1px solid rgba(249,247,243,0.3); border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; color: #f9f7f3; cursor: pointer;
    transition: all 0.22s; text-transform: uppercase;
  }
  .nav-pill-white:hover { background: rgba(249,247,243,0.28); border-color: rgba(249,247,243,0.55); transform: translateY(-1px); }

  .nav-pill-solid {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; background: #f9f7f3; border: 1px solid #f9f7f3; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; color: #3d5c4a; cursor: pointer;
    transition: all 0.22s; text-transform: uppercase;
  }
  .nav-pill-solid:hover { background: #e8ddd0; border-color: #e8ddd0; transform: translateY(-1px); }

  .nav-link-btn {
    position: relative; font-family: 'Figtree', sans-serif; font-size: 13.5px; font-weight: 500;
    background: none; border: none; cursor: pointer; padding: 4px 0;
    letter-spacing: 0.01em; transition: color 0.2s; white-space: nowrap;
  }
  .nav-link-btn::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    height: 1px; width: 0; background: #5c7e6a;
    transition: width 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  .nav-link-btn:hover::after, .nav-link-btn.active::after { width: 100%; }

  .nav-book-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 24px; background: #5c7e6a; color: #f9f7f3;
    border: none; border-radius: 999px; font-family: 'Figtree', sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 0.03em; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 16px rgba(92,126,106,0.25), 0 1px 4px rgba(92,126,106,0.12);
    white-space: nowrap;
  }
  .nav-book-btn:hover { background: #3d5c4a; transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 24px rgba(92,126,106,0.35); }

  .nav-mobile-link {
    display: block; width: 100%; text-align: left; padding: 12px 16px; border-radius: 12px;
    font-family: 'Figtree', sans-serif; font-size: 15px; font-weight: 500;
    background: none; border: none; cursor: pointer; transition: all 0.18s; letter-spacing: 0.01em;
  }

  .nav-mobile-drawer { animation: drawerDown 0.28s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes drawerDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .nav-live-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #c4a882;
    box-shadow: 0 0 0 2px rgba(196,168,130,0.3); flex-shrink: 0;
  }

  .nav-mobile-section-label {
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: #9c9088; padding: 8px 16px 4px;
  }

  .nav-phone-link {
    display: flex; align-items: center; gap: 7px;
    font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 500;
    color: #8a7060; text-decoration: none; transition: color 0.18s; flex-shrink: 0;
  }
  .nav-phone-link:hover { color: #5c7e6a; }

  .nav-phone-icon {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(196,168,130,0.15);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .nav-phones-divider {
    width: 1px; height: 18px; background: rgba(196,168,130,0.4);
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (href) => { setIsMenuOpen(false); navigate(href); };

  return (
    <>
      <style>{navStyles}</style>

      {/* ── Announcement Bar ── */}
      <div className="nav-announcement" style={{
        width: '100%', padding: '10px 24px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="nav-live-dot" />
          <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(249,247,243,0.9)', letterSpacing: '0.06em' }}>
            Now accepting new patients · Maryland Telehealth
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="nav-pill-white" onClick={() => go('/contact')}>Patient Form</button>
          <button className="nav-pill-solid" onClick={() => go('/booking')}>Book Appointment</button>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header style={{
        position: 'sticky', top: 0, width: '100%', zIndex: 50, transition: 'all 0.4s ease',
        background: isScrolled ? 'rgba(249,247,243,0.97)' : 'rgba(249,247,243,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isScrolled ? 'rgba(232,221,208,0.9)' : 'rgba(232,221,208,0.4)'}`,
        boxShadow: isScrolled ? '0 4px 32px rgba(28,24,20,0.07)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>

            {/* Logo */}
            <button onClick={() => go('/')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(145deg, #e8ddd0, #f2ede5)',
                border: '1px solid rgba(196,168,130,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, overflow: 'hidden',
              }}>
                <img
                  src="/images/logo.png"
                  alt="Gigi Psychiatric Services"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<span style="font-family:Cormorant Garamond,serif;font-size:20px;font-style:italic;color:#5c7e6a;font-weight:400">G</span>';
                  }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 500, color: '#1c1814', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>
                  Gigi Psychiatric Services
                  <span style={{ fontStyle: 'italic', color: '#5c7e6a', fontWeight: 300 }}>, LLC</span>
                </p>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9c9088', margin: 0 }}>
                  Your Mental Health Matters To Us
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav style={{ display: 'none', alignItems: 'center', gap: 28 }} className="desktop-nav">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <button key={link.href} onClick={() => go(link.href)}
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                    style={{ color: isActive ? '#5c7e6a' : '#5c5248' }}>
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div style={{ display: 'none', alignItems: 'center', gap: 12 }} className="desktop-cta">
              {/* Phone numbers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a href="tel:301-886-5868" className="nav-phone-link">
                  <span className="nav-phone-icon">
                    <Phone size={12} style={{ color: '#8a7060' }} />
                  </span>
                  301-886-5868
                </a>
                <span className="nav-phones-divider" />
                <a href="tel:301-921-5810" className="nav-phone-link">
                  301-921-5810
                </a>
              </div>
              <button className="nav-book-btn" onClick={() => go('/booking')}>
                Book Appointment
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#5c5248', transition: 'color 0.18s' }}
              className="mobile-menu-btn">
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {isMenuOpen && (
            <div className="nav-mobile-drawer" style={{ paddingBottom: 20, borderTop: '1px solid rgba(232,221,208,0.6)' }}>
              <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.filter(l => !['What We Treat', 'Blog'].includes(l.label)).map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <button key={link.href} onClick={() => go(link.href)} className="nav-mobile-link"
                      style={{ color: isActive ? '#5c7e6a' : '#5c5248', background: isActive ? 'rgba(92,126,106,0.08)' : 'transparent' }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(92,126,106,0.05)'; e.currentTarget.style.color = '#5c7e6a'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = isActive ? 'rgba(92,126,106,0.08)' : 'transparent'; e.currentTarget.style.color = isActive ? '#5c7e6a' : '#5c5248'; }}>
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ height: 1, background: 'rgba(232,221,208,0.8)', margin: '10px 0 4px' }} />
              <div className="nav-mobile-section-label">Explore</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.filter(l => ['What We Treat', 'Blog'].includes(l.label)).map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <button key={link.href} onClick={() => go(link.href)} className="nav-mobile-link"
                      style={{ color: isActive ? '#5c7e6a' : '#5c5248', background: isActive ? 'rgba(92,126,106,0.08)' : 'transparent', display: 'flex', alignItems: 'center', gap: 10 }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(92,126,106,0.05)'; e.currentTarget.style.color = '#5c7e6a'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = isActive ? 'rgba(92,126,106,0.08)' : 'transparent'; e.currentTarget.style.color = isActive ? '#5c7e6a' : '#5c5248'; }}>
                      <span style={{ fontSize: 16 }}>{link.label === 'Blog' ? '✍️' : '🌿'}</span>
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ height: 1, background: 'rgba(232,221,208,0.8)', margin: '12px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px' }}>
                {/* Two separate phone numbers in mobile */}
                <a href="tel:301-886-5868" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 500,
                  color: '#8a7060', textDecoration: 'none', padding: '8px 12px',
                }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(196,168,130,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={14} style={{ color: '#8a7060' }} />
                  </span>
                  301-886-5868
                </a>
                <a href="tel:301-921-5810" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 500,
                  color: '#8a7060', textDecoration: 'none', padding: '8px 12px',
                }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(196,168,130,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={14} style={{ color: '#8a7060' }} />
                  </span>
                  301-921-5810
                </a>
                <button className="nav-book-btn" onClick={() => go('/booking')}
                  style={{ width: '100%', justifyContent: 'center', borderRadius: 14, padding: '13px 24px' }}>
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}