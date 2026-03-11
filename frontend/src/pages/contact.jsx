import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Figtree:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --ivory:   #f9f7f3;
    --cream:   #f2ede5;
    --warm:    #e8ddd0;
    --sage:    #5c7e6a;
    --sage-lt: #7a9e88;
    --sage-dk: #3d5c4a;
    --bark:    #8a7060;
    --text:    #1c1814;
    --text-2:  #5c5248;
    --text-3:  #9c9088;
    --gold:    #c4a882;
    --gold-lt: rgba(196,168,130,0.15);
  }

  @keyframes revealUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatOrb {
    0%, 100% { transform: translate(0,0) scale(1); }
    33%       { transform: translate(14px,-18px) scale(1.04); }
    66%       { transform: translate(-10px,10px) scale(0.97); }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position:  200% center; }
  }
  @keyframes checkPop {
    0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
    70%  { transform: scale(1.15) rotate(3deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  .con-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .con-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .con-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .con-r4 { animation: revealFade 1s ease 0.55s both; }

  .con-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .con-orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }
  .con-orb-3 { animation: floatOrb 7s ease-in-out 4s infinite; }

  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Figtree', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--bark);
  }
  .section-eyebrow::before {
    content: ''; width: 32px; height: 1px; background: var(--gold);
  }

  .shimmer-text {
    background: linear-gradient(90deg, var(--sage-dk) 0%, var(--sage-lt) 40%, var(--gold) 60%, var(--sage-dk) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear 1s infinite;
  }

  /* Contact info items */
  .con-info-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 20px 24px;
    background: rgba(255,255,255,0.55);
    border: 1px solid var(--warm);
    border-radius: 18px;
    backdrop-filter: blur(8px);
    transition: all 0.22s;
  }
  .con-info-item:hover {
    background: rgba(255,255,255,0.9);
    border-color: var(--sage);
    transform: translateX(4px);
    box-shadow: 0 6px 20px rgba(92,126,106,0.1);
  }

  /* Form inputs */
  .con-input {
    width: 100%;
    border-radius: 14px;
    border: 1.5px solid var(--warm);
    padding: 13px 16px;
    font-size: 14px;
    font-family: 'Figtree', sans-serif;
    font-weight: 400;
    background: rgba(255,255,255,0.7);
    color: var(--text);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    backdrop-filter: blur(8px);
  }
  .con-input::placeholder { color: var(--text-3); }
  .con-input:focus {
    border-color: var(--sage);
    background: rgba(255,255,255,0.95);
    box-shadow: 0 0 0 3px rgba(92,126,106,0.1);
  }

  /* Submit button */
  .con-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 16px 28px;
    background: var(--sage); color: #fff; border: none;
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28);
    position: relative; overflow: hidden;
  }
  .con-btn::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.2s;
  }
  .con-btn:hover {
    background: var(--sage-dk);
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 10px 32px rgba(92,126,106,0.38);
  }
  .con-btn:hover::before { opacity: 1; }
  .con-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  /* Success animation */
  .check-anim { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

  @media (max-width: 860px) {
    .con-grid { grid-template-columns: 1fr !important; }
  }
`;

const businessInfo = {
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
  address: "18310 Montgomery Village Ave, Gaithersburg, MD 20879",
  hours: "Virtual Visits Only · Flexible Scheduling",
};

const contactItems = [
  {
    icon: Phone, label: "Phone",
    href: `tel:${businessInfo.phone}`,
    value: businessInfo.phone,
    isLink: true,
  },
  {
    icon: Mail, label: "Email",
    href: `mailto:${businessInfo.email}`,
    value: businessInfo.email,
    isLink: true,
    small: true,
  },
  {
    icon: MapPin, label: "Address",
    value: businessInfo.address,
    isLink: false,
  },
  {
    icon: Clock, label: "Availability",
    value: businessInfo.hours,
    isLink: false,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="con-orb-1" style={{
            position: "absolute", top: "5%", right: "8%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)",
          }} />
          <div className="con-orb-2" style={{
            position: "absolute", bottom: "10%", left: "-5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)",
          }} />
          <div className="con-orb-3" style={{
            position: "absolute", top: "40%", left: "38%",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)",
          }} />
        </div>

        <Navbar />

        {/* ═══ HERO HEADER ═══ */}
        <section style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 72px" }}>

            <div className="con-r1" style={{ marginBottom: 16 }}>
              <span className="section-eyebrow">Reach Out</span>
            </div>

            <h1 className="con-r2" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
              lineHeight: 1.05, letterSpacing: "-0.01em",
              color: "var(--text)", marginBottom: 20,
            }}>
              Get in{" "}
              <em className="shimmer-text" style={{ fontStyle: "italic", fontWeight: 400 }}>touch</em>
            </h1>

            <p className="con-r3" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: "var(--text-2)", lineHeight: 1.8,
              maxWidth: 520,
            }}>
              We're here to answer your questions and schedule your appointment.
              Reach out — we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* ═══ MAIN CONTENT ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 100px" }}>
            <div className="con-grid con-r4" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              alignItems: "start",
            }}>

              {/* ── LEFT: Info cards ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Contact info card */}
                <div style={{
                  background: "linear-gradient(145deg, var(--cream) 0%, rgba(232,221,208,0.4) 100%)",
                  border: "1px solid var(--warm)",
                  borderRadius: 28,
                  padding: "40px 40px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ marginBottom: 24 }}>
                    <span className="section-eyebrow">Contact</span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28, fontWeight: 400, fontStyle: "italic",
                    color: "var(--text)", margin: "0 0 28px", lineHeight: 1.2,
                  }}>
                    Contact Information
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {contactItems.map(({ icon: Icon, label, href, value, isLink, small }) => (
                      <div key={label} className="con-info-item">
                        <div style={{
                          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                          background: "linear-gradient(135deg, var(--gold-lt) 0%, rgba(92,126,106,0.08) 100%)",
                          border: "1px solid rgba(196,168,130,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}>
                          <Icon size={18} style={{ color: "var(--bark)" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{
                            fontFamily: "'Figtree', sans-serif",
                            fontSize: 10, fontWeight: 600,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            color: "var(--text-3)", margin: "0 0 4px",
                          }}>
                            {label}
                          </p>
                          {isLink ? (
                            <a href={href} style={{
                              fontFamily: "'Figtree', sans-serif",
                              fontSize: small ? 13 : 14,
                              fontWeight: 500,
                              color: "var(--sage)",
                              textDecoration: "none",
                              wordBreak: "break-all",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={e => e.target.style.color = "var(--sage-dk)"}
                            onMouseLeave={e => e.target.style.color = "var(--sage)"}
                            >
                              {value}
                            </a>
                          ) : (
                            <p style={{
                              fontFamily: "'Figtree', sans-serif",
                              fontSize: 14, fontWeight: 400,
                              color: "var(--text-2)", margin: 0, lineHeight: 1.6,
                            }}>
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Corner orb */}
                  <div style={{
                    position: "absolute", bottom: -30, right: -30,
                    width: 140, height: 140, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(92,126,106,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                </div>

                {/* Insurance card */}
                <div style={{
                  background: "var(--sage-dk)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 28,
                  padding: "36px 40px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(61,92,74,0.25)",
                }}>
                  {/* Large decorative quote */}
                  <div style={{
                    position: "absolute", top: -16, right: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 160, lineHeight: 1,
                    color: "rgba(255,255,255,0.06)",
                    fontStyle: "italic", pointerEvents: "none", userSelect: "none",
                  }}>
                    $
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <span className="section-eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>Billing</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24, fontWeight: 400, fontStyle: "italic",
                    color: "#fff", margin: "0 0 14px", lineHeight: 1.2,
                  }}>
                    Insurance &amp; Payment
                  </h3>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14, fontWeight: 300,
                    color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: "0 0 10px",
                  }}>
                    We accept both cash and insurance for your convenience.
                  </p>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13, fontWeight: 300,
                    color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0,
                  }}>
                    Please contact us to verify your specific insurance coverage
                    and discuss payment options.
                  </p>
                </div>
              </div>

              {/* ── RIGHT: Form card ── */}
              <div style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(242,237,229,0.6) 100%)",
                border: "1px solid var(--warm)",
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
                backdropFilter: "blur(12px)",
              }}>

                {/* Card header */}
                <div style={{
                  padding: "36px 44px 28px",
                  borderBottom: "1px solid var(--warm)",
                  background: "linear-gradient(135deg, var(--cream) 0%, rgba(255,255,255,0.6) 100%)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ marginBottom: 14 }}>
                    <span className="section-eyebrow">Message Us</span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28, fontWeight: 400, fontStyle: "italic",
                    color: "var(--text)", margin: "0 0 6px", lineHeight: 1.2,
                  }}>
                    Send us a Message
                  </h2>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14, fontWeight: 300,
                    color: "var(--text-3)", margin: 0,
                  }}>
                    We'll get back to you as soon as possible
                  </p>
                </div>

                {/* Form body */}
                <div style={{ padding: "36px 44px" }}>
                  {submitted ? (
                    <div style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 16,
                      padding: "48px 0", textAlign: "center",
                    }}>
                      <div className="check-anim" style={{
                        width: 72, height: 72, borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-dk) 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 8px 28px rgba(92,126,106,0.35)",
                        fontSize: 32,
                      }}>
                        ✓
                      </div>
                      <h4 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 26, fontWeight: 400, fontStyle: "italic",
                        color: "var(--text)", margin: 0,
                      }}>
                        Message Sent!
                      </h4>
                      <p style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 15, fontWeight: 300,
                        color: "var(--text-2)", margin: 0, lineHeight: 1.7, maxWidth: 320,
                      }}>
                        Thank you for reaching out. We'll be in touch with you soon.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        style={{
                          marginTop: 8, padding: "12px 28px",
                          borderRadius: 999,
                          border: "1.5px solid var(--warm)",
                          background: "transparent",
                          color: "var(--text-2)",
                          fontSize: 14, fontWeight: 500,
                          fontFamily: "'Figtree', sans-serif",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = "var(--sage)"; e.target.style.color = "var(--sage)"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "var(--warm)"; e.target.style.color = "var(--text-2)"; }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                      {[
                        { key: "name",    label: "Full Name",      type: "text",  placeholder: "Jane Smith",        required: true },
                        { key: "email",   label: "Email Address",  type: "email", placeholder: "jane@example.com",  required: true },
                        { key: "phone",   label: "Phone Number",   type: "tel",   placeholder: "(555) 123-4567",    required: false },
                      ].map(({ key, label, type, placeholder, required }) => (
                        <div key={key}>
                          <label style={{
                            display: "block",
                            fontFamily: "'Figtree', sans-serif",
                            fontSize: 11, fontWeight: 600,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            color: "var(--text-3)", marginBottom: 8,
                          }}>
                            {label}{required && <span style={{ color: "var(--sage)", marginLeft: 3 }}>*</span>}
                          </label>
                          <input
                            type={type}
                            required={required}
                            value={formData[key]}
                            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="con-input"
                          />
                        </div>
                      ))}

                      <div>
                        <label style={{
                          display: "block",
                          fontFamily: "'Figtree', sans-serif",
                          fontSize: 11, fontWeight: 600,
                          letterSpacing: "0.12em", textTransform: "uppercase",
                          color: "var(--text-3)", marginBottom: 8,
                        }}>
                          Message <span style={{ color: "var(--sage)", marginLeft: 3 }}>*</span>
                        </label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          className="con-input"
                          style={{ resize: "vertical", minHeight: 130 }}
                        />
                      </div>

                      <button type="submit" className="con-btn">
                        Send Message
                        <Send size={15} className="btn-arrow" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}