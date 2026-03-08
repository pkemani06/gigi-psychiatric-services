import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const line1 = "Find Peace,";
const line2 = "Discover Strength";

const businessInfo = {
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
};

// ── Global styles injected once ───────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700&display=swap');

  :root {
    --bg:        #f5f3ef;
    --surface:   #ffffff;
    --surface-2: #f0ede8;
    --border:    #e2ddd6;
    --accent:    #4e7c68;
    --accent-bg: rgba(78, 124, 104, 0.08);
    --text:      #1a1916;
    --text-2:    #5a5650;
    --text-3:    #9b9590;
    --sh-lg:     0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
    --sh-xl:     0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05);
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .gigi-fade-1 { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) both; }
  .gigi-fade-2 { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s both; }
  .gigi-fade-3 { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.2s both; }
  .gigi-fade-4 { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.3s both; }
  .gigi-fade-5 { animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.4s both; }

  .cursor-blink { animation: blink 0.9s step-end infinite; }

  .gigi-btn-primary:hover  { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(78,124,104,0.35) !important; }
  .gigi-btn-secondary:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
  .gigi-contact-link:hover  { color: var(--accent) !important; }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [typed1, setTyped1] = useState('');
  const [typed2, setTyped2] = useState('');
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const t1 = setInterval(() => {
        i++;
        setTyped1(line1.slice(0, i));
        if (i >= line1.length) {
          clearInterval(t1);
          setTimeout(() => {
            setActiveLine(2);
            let j = 0;
            const t2 = setInterval(() => {
              j++;
              setTyped2(line2.slice(0, j));
              if (j >= line2.length) {
                clearInterval(t2);
                setTimeout(() => setActiveLine(0), 600);
              }
            }, 110);
          }, 350);
        }
      }, 110);
    }, 500);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Navbar />

        {/* ── Hero Section ── */}
        <section
          id="home"
          style={{
            position: "relative",
            paddingTop: 120,
            paddingBottom: 80,
            paddingLeft: 24,
            paddingRight: 24,
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(90deg)",
              width: "100vh",
              height: "100vw",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <img
              src="/images/backdrop-for-hero.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.15,
              }}
            />
          </div>

          {/* Warm gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(245,243,239,0.92) 0%, rgba(240,237,232,0.80) 50%, rgba(78,124,104,0.07) 100%)",
              zIndex: 1,
            }}
          />

          {/* Decorative glow circle top-right */}
          <div
            style={{
              position: "absolute",
              top: -140,
              right: -140,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(78,124,104,0.07) 0%, transparent 70%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {/* Eyebrow label */}
            <div className="gigi-fade-1" style={{ marginBottom: 20 }}>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  background: "var(--accent-bg)",
                  border: "1px solid rgba(78,124,104,0.2)",
                  padding: "6px 16px",
                  borderRadius: 999,
                  display: "inline-block",
                }}
              >
                Virtual Visits Only · Telehealth Services
              </span>
            </div>

            {/* Headline */}
            <h1
              className="gigi-fade-2"
              style={{
                fontFamily: "Lora, Georgia, serif",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                margin: "0 0 24px",
              }}
            >
              {/* Line 1 */}
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                  minHeight: "1.15em",
                  color: "var(--text)",
                }}
              >
                {typed1}
                <span
                  className={activeLine === 1 ? "cursor-blink" : ""}
                  style={{
                    opacity: activeLine === 1 ? 1 : 0,
                    color: "var(--accent)",
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
              </span>

              {/* Line 2 — accent colored */}
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                  minHeight: "1.15em",
                  color: "var(--accent)",
                }}
              >
                {typed2}
                <span
                  className={activeLine === 2 ? "cursor-blink" : ""}
                  style={{
                    opacity: activeLine === 2 ? 1 : 0,
                    color: "var(--accent)",
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
              </span>
            </h1>

            {/* Body copy */}
            <p
              className="gigi-fade-3"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 18,
                color: "var(--text-2)",
                lineHeight: 1.75,
                maxWidth: 620,
                margin: "0 0 36px",
              }}
            >
              We provide comprehensive virtual psychiatric care for adolescents,
              adults and geriatric patients. Your mental health matters to us at
              Gigi Psychiatric Services. Experience professional, compassionate
              care from the comfort of your home through our secure telehealth
              platform.
            </p>

            {/* CTA buttons */}
            <div
              className="gigi-fade-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 40,
              }}
            >
              <button
                onClick={() => navigate('/contact')}
                className="gigi-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 14,
                  border: "none",
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "DM Sans, sans-serif",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(78,124,104,0.28)",
                  transition: "all 0.18s",
                }}
              >
                Schedule Consultation
              </button>

              <button
                onClick={() => navigate('/services')}
                className="gigi-btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "DM Sans, sans-serif",
                  cursor: "pointer",
                  boxShadow: "var(--sh-lg)",
                  transition: "all 0.18s",
                }}
              >
                Explore Services
              </button>
            </div>

            {/* Contact strip */}
            <div
              className="gigi-fade-5"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                paddingTop: 28,
                borderTop: "1px solid var(--border)",
              }}
            >
              <a
                href={`tel:${businessInfo.phone}`}
                className="gigi-contact-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-2)",
                  textDecoration: "none",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
              >
                <Phone size={16} style={{ color: "var(--accent)" }} />
                {businessInfo.phone}
              </a>

              <a
                href={`mailto:${businessInfo.email}`}
                className="gigi-contact-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-2)",
                  textDecoration: "none",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
              >
                <Mail size={16} style={{ color: "var(--accent)" }} />
                {businessInfo.email}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}