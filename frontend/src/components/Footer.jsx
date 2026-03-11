import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const info = {
  name: "Gigi Psychiatric Services, LLC",
  tagline: "Your Mental Health Matters To Us",
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
  address: "18310 Montgomery Village Ave, Gaithersburg, MD 20879",
};

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Figtree:wght@300;400;500;600&display=swap');

  .footer-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Figtree', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: rgba(249,247,243,0.55);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
    letter-spacing: 0.01em;
  }
  .footer-link-btn:hover {
    color: rgba(249,247,243,0.95);
  }
  .footer-link-btn .arrow-icon {
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.2s;
  }
  .footer-link-btn:hover .arrow-icon {
    opacity: 1;
    transform: translateX(0);
  }

  .footer-contact-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: rgba(249,247,243,0.55);
    font-family: 'Figtree', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.5;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-contact-row:hover {
    color: rgba(249,247,243,0.9);
  }
  .footer-icon-wrap {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(196,168,130,0.12);
    border: 1px solid rgba(196,168,130,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: background 0.2s, border-color 0.2s;
  }
  .footer-contact-row:hover .footer-icon-wrap {
    background: rgba(196,168,130,0.22);
    border-color: rgba(196,168,130,0.4);
  }

  .footer-book-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 26px;
    background: rgba(92,126,106,0.9);
    color: #f9f7f3;
    border: none;
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.2);
  }
  .footer-book-btn:hover {
    background: #5c7e6a;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 28px rgba(92,126,106,0.35);
  }
`;

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <style>{footerStyles}</style>

      <footer style={{
        background: 'linear-gradient(180deg, #1c1814 0%, #161210 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Subtle top slant matching the page's section transitions */}
        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0,
          height: 48,
          background: '#f9f7f3',
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)',
          pointerEvents: 'none',
        }} />

        {/* Atmospheric orb */}
        <div style={{
          position: 'absolute', bottom: -60, right: -60,
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,126,106,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 80, left: -80,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,168,130,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 0', position: 'relative', zIndex: 1 }}>

          {/* ── Top CTA band ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            paddingBottom: 52,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 56,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.5 }} />
                <span style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8a7060',
                }}>
                  Ready to start?
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: 1.15,
                color: '#f9f7f3',
                letterSpacing: '-0.01em',
              }}>
                Take the first step toward{' '}
                <em style={{ color: '#7a9e88', fontStyle: 'italic' }}>healing.</em>
              </h2>
            </div>
            <button className="footer-book-btn" onClick={() => navigate('/booking')}>
              Book a Consultation
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* ── Main 3-col grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px 56px',
            marginBottom: 56,
          }}>

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'linear-gradient(145deg, rgba(232,221,208,0.12), rgba(242,237,229,0.06))',
                  border: '1px solid rgba(196,168,130,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0,
                }}>
                  <img
                    src="/images/logo.png"
                    alt="Gigi Psychiatric Services"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.85 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<span style="font-family:Cormorant Garamond,serif;font-size:20px;font-style:italic;color:#7a9e88;font-weight:400">G</span>';
                    }}
                  />
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#f9f7f3',
                    lineHeight: 1.2,
                    margin: 0,
                  }}>
                    Gigi Psychiatric Services
                    <span style={{ fontStyle: 'italic', color: '#7a9e88', fontWeight: 300 }}>, LLC</span>
                  </p>
                </div>
              </div>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13.5,
                fontWeight: 300,
                color: 'rgba(249,247,243,0.45)',
                lineHeight: 1.75,
                maxWidth: 260,
              }}>
                Compassionate virtual psychiatric care for adolescents, adults, and geriatric patients across Maryland.
              </p>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <h4 style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8a7060',
                marginBottom: 20,
              }}>
                Navigate
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {footerLinks.map(({ label, href }) => (
                  <button key={href} onClick={() => navigate(href)} className="footer-link-btn">
                    {label}
                    <ArrowUpRight size={12} className="arrow-icon" />
                  </button>
                ))}
              </div>
            </div>

            {/* Col 3 — Contact */}
            <div>
              <h4 style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8a7060',
                marginBottom: 20,
              }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a href={`tel:${info.phone}`} className="footer-contact-row">
                  <span className="footer-icon-wrap">
                    <Phone size={13} style={{ color: '#c4a882' }} />
                  </span>
                  {info.phone}
                </a>
                <a href={`mailto:${info.email}`} className="footer-contact-row">
                  <span className="footer-icon-wrap">
                    <Mail size={13} style={{ color: '#c4a882' }} />
                  </span>
                  {info.email}
                </a>
                <div className="footer-contact-row" style={{ cursor: 'default' }}>
                  <span className="footer-icon-wrap">
                    <MapPin size={13} style={{ color: '#c4a882' }} />
                  </span>
                  {info.address}
                </div>
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '24px 0 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 12.5,
              color: 'rgba(249,247,243,0.28)',
              fontWeight: 400,
              margin: 0,
            }}>
              © {new Date().getFullYear()} {info.name}. All rights reserved.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'rgba(249,247,243,0.28)',
              margin: 0,
            }}>
              Professional Mental Health Services · Maryland Licensed
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}