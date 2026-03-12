import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const businessInfo = {
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Figtree:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --ivory:    #f9f7f3;
    --cream:    #f2ede5;
    --warm:     #e8ddd0;
    --sage:     #5c7e6a;
    --sage-lt:  #7a9e88;
    --sage-dk:  #3d5c4a;
    --bark:     #8a7060;
    --text:     #1c1814;
    --text-2:   #5c5248;
    --text-3:   #9c9088;
    --gold:     #c4a882;
    --gold-lt:  rgba(196,168,130,0.15);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--ivory);
    font-family: 'Figtree', sans-serif;
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(15px, -20px) scale(1.04); }
    66%       { transform: translate(-10px, 12px) scale(0.97); }
  }
  @keyframes scrollLine {
    0%   { transform: scaleY(0); transform-origin: top; }
    50%  { transform: scaleY(1); transform-origin: top; }
    51%  { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }
  @keyframes tagFloat {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .reveal-1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .reveal-2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .reveal-3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .reveal-4 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .reveal-5 { animation: revealFade 1.2s ease 0.7s both; }

  .orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }
  .orb-3 { animation: floatOrb 7s ease-in-out 4s infinite; }

  /* Pill badge */
  .telehealth-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: var(--gold-lt);
    border: 1px solid rgba(196,168,130,0.4);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--bark);
    animation: revealFade 0.8s ease 0s both;
  }
  .telehealth-badge .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sage);
    box-shadow: 0 0 0 2px rgba(92,126,106,0.25);
    position: relative;
  }
  .telehealth-badge .dot::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid rgba(92,126,106,0.3);
    animation: spinSlow 2s linear infinite;
  }

  /* Headline */
  .hero-headline {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 4.5vw, 4.8rem);
    line-height: 1.0;
    letter-spacing: -0.01em;
    color: var(--text);
  }
  .hero-headline em {
    font-style: italic;
    color: var(--sage);
    font-weight: 400;
  }
  .hero-headline .serif-accent {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
  }

  /* Shimmer text — all-blue range */
  .shimmer-text {
    background: linear-gradient(
      90deg,
      var(--sage-dk) 0%,
      var(--sage-lt) 40%,
      var(--gold) 60%,
      var(--sage-dk) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear 1.5s infinite;
  }

  /* CTA buttons */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 32px;
    background: var(--sage);
    color: #fff;
    border: none;
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28), 0 1px 4px rgba(92,126,106,0.15);
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.2s;
  }
  .btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px rgba(92,126,106,0.38), 0 2px 8px rgba(92,126,106,0.2);
    background: var(--sage-dk);
  }
  .btn-primary:hover::before { opacity: 1; }

  .btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 30px;
    background: rgba(255,255,255,0.5);
    color: var(--text);
    border: 1.5px solid var(--warm);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.22s;
    backdrop-filter: blur(8px);
  }
  .btn-secondary:hover {
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-1px);
    background: rgba(255,255,255,0.8);
  }

  .btn-primary:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  /* Contact links */
  .contact-link {
    display: flex; align-items: center; gap: 9px;
    color: var(--text-2);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    transition: color 0.18s;
    font-family: 'Figtree', sans-serif;
  }
  .contact-link:hover { color: var(--sage); }

  /* Floating tags */
  .floating-tag {
    position: absolute;
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
    border-radius: 16px;
    padding: 14px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
    font-family: 'Figtree', sans-serif;
    pointer-events: none;
  }

  /* Divider line */
  .scroll-line {
    width: 1px; height: 60px;
    background: var(--warm);
    position: relative; overflow: hidden;
  }
  .scroll-line::after {
    content: ''; position: absolute; inset: 0;
    background: var(--sage);
    animation: scrollLine 2s ease-in-out infinite;
  }

  /* Stats row */
  .stat-item { display: flex; flex-direction: column; gap: 4px; }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 300;
    color: var(--text); line-height: 1;
  }
  .stat-label {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-3);
  }

  /* Image frame */
  .image-frame {
    position: relative; border-radius: 28px; overflow: hidden;
    aspect-ratio: 3/4;
    background: linear-gradient(145deg, var(--cream) 0%, var(--warm) 100%);
    box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06);
  }
  .image-frame img { width: 100%; height: 100%; object-fit: cover; }

  /* Services pills */
  .service-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    background: rgba(255,255,255,0.7);
    border: 1px solid var(--warm);
    border-radius: 999px;
    font-size: 13px; font-weight: 500;
    color: var(--text-2);
    white-space: nowrap;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
    cursor: default;
  }
  .service-pill:hover {
    background: rgba(255,255,255,0.95);
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(92,126,106,0.12);
  }

  /* Section label */
  .section-eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Figtree', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--bark);
  }
  .section-eyebrow::before {
    content: ''; width: 32px; height: 1px;
    background: var(--gold);
  }

  /* Noise texture overlay */
  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  /* Responsive helpers */
  @media (max-width: 768px) {
    .hero-layout { flex-direction: column !important; }
    .image-frame { aspect-ratio: 4/3; max-width: 100%; }
    .floating-tag { display: none !important; }
    .stats-row { gap: 24px !important; }
    .hero-headline { font-size: clamp(2.6rem, 10vw, 3.8rem) !important; }
    .services-pills { gap: 8px !important; }
  }
`;

const services = [
  { icon: "🧠", label: "Psychiatric Evaluation" },
  { icon: "💊", label: "Medication Management" },
  { icon: "🌿", label: "Therapy & Counseling" },
  { icon: "👶", label: "Adolescent Care" },
  { icon: "🧓", label: "Geriatric Psychiatry" },
  { icon: "🏠", label: "Virtual Telehealth" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{globalStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* ── Atmospheric Background Orbs ── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="orb-1" style={{
            position: "absolute", top: "5%", right: "10%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)",
          }} />
          <div className="orb-2" style={{
            position: "absolute", bottom: "15%", left: "-5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)",
          }} />
          <div className="orb-3" style={{
            position: "absolute", top: "40%", left: "35%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)",
          }} />
        </div>

        <Navbar />

        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section style={{ position: "relative", zIndex: 1, paddingTop: 20 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 80px" }}>

            <div className="hero-layout" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>

              {/* ── LEFT COLUMN ── */}
              <div style={{ flex: "1 1 60%", paddingTop: 20, minWidth: 0 }}>

                {/* Badge */}
                <div style={{ marginBottom: 28 }}>
                  <span className="telehealth-badge reveal-1">
                    <span className="dot" />
                    Virtual Visits · Maryland Telehealth
                  </span>
                </div>

                {/* Headline */}
                <h1 className="hero-headline reveal-2" style={{ marginBottom: 28 }}>
                  <span style={{ display: "block" }}>Healing begins</span>
                  <span style={{ display: "block" }}>
                    with{" "}
                    <em className="shimmer-text">compassionate</em>
                  </span>
                  <span style={{ display: "block" }}>
                    <span className="serif-accent">psychiatric care.</span>
                  </span>
                </h1>

                {/* Tagline rule */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ height: 1, width: 48, background: "var(--gold)", opacity: 0.7 }} />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: "var(--bark)", fontWeight: 400 }}>
                    for adolescents, adults & geriatric patients
                  </p>
                </div>

                {/* Body */}
                <p className="reveal-3" style={{
                  fontSize: 15.5, lineHeight: 1.85, color: "var(--text-2)",
                  maxWidth: 540, marginBottom: 40, fontWeight: 300,
                }}>
                  At Gigi Psychiatric Services, we offer comprehensive virtual mental
                  health care delivered with warmth and clinical excellence — from
                  the privacy and comfort of your own home.
                </p>

                {/* CTA Buttons */}
                <div className="reveal-4" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                  <button className="btn-primary" onClick={() => navigate('/contact')}>
                    Schedule a Consultation
                    <ArrowRight size={16} className="btn-arrow" />
                  </button>
                  <button className="btn-secondary" onClick={() => navigate('/services')}>
                    Explore Services
                  </button>
                </div>

                {/* Contact strip */}
                <div className="reveal-5" style={{
                  display: "flex", flexWrap: "wrap", gap: 24,
                  paddingTop: 28, borderTop: "1px solid var(--warm)",
                }}>
                  <a href={`tel:${businessInfo.phone}`} className="contact-link">
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "var(--gold-lt)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Phone size={14} style={{ color: "var(--bark)" }} />
                    </span>
                    {businessInfo.phone}
                  </a>
                  <a href={`mailto:${businessInfo.email}`} className="contact-link">
                    <span style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "var(--gold-lt)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Mail size={14} style={{ color: "var(--bark)" }} />
                    </span>
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              {/* ── RIGHT COLUMN — Visual Card ── */}
              <div style={{ flex: "1 1 36%", position: "relative", minHeight: 520, display: "flex", flexDirection: "column", alignItems: "center" }} className="reveal-3">

                <div className="image-frame" style={{ maxWidth: 420, width: "100%", margin: "0 auto 0 0" }}>
                  <img src="/images/backdrop-for-hero.png" alt="Gigi Psychiatric Services" />

                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 40%, rgba(28,24,20,0.35) 100%)",
                  }} />

                  <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, color: "#fff" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", fontWeight: 300, marginBottom: 4 }}>
                      "Your mental health<br />matters to us."
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", opacity: 0.75, textTransform: "uppercase" }}>
                      — Gigi Psychiatric Services
                    </div>
                  </div>
                </div>

                {/* Floating tag — top left */}
                <div className="floating-tag" style={{ top: 40, left: -20, animation: "tagFloat 5s ease-in-out infinite" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 6 }}>
                    Accepting New Patients
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5cb85c", flexShrink: 0, boxShadow: "0 0 0 3px rgba(92,184,92,0.2)" }} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: "var(--text)" }}>All Ages Welcome</span>
                  </div>
                </div>

                {/* Floating tag — bottom right */}
                <div className="floating-tag" style={{ bottom: 60, right: -24, animation: "tagFloat 6s ease-in-out 2s infinite", maxWidth: 200 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 6 }}>
                    Telehealth
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 400, color: "var(--text)", lineHeight: 1.4 }}>
                    Secure · Private · Convenient
                  </div>
                </div>

                {/* Decorative rings */}
                <div style={{
                  position: "absolute", bottom: -30, right: -30,
                  width: 160, height: 160, borderRadius: "50%",
                  border: "1px solid rgba(196,168,130,0.3)",
                  zIndex: -1, pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: -50, right: -50,
                  width: 220, height: 220, borderRadius: "50%",
                  border: "1px solid rgba(196,168,130,0.15)",
                  zIndex: -1, pointerEvents: "none",
                }} />
              </div>
            </div>

            {/* ── Stats Row ── */}
            <div style={{
              marginTop: 64, paddingTop: 48,
              borderTop: "1px solid var(--warm)",
              display: "flex", alignItems: "center", gap: 0,
            }}>
              <div className="stats-row reveal-5" style={{ display: "flex", gap: 48, alignItems: "center", flex: 1, flexWrap: "wrap" }}>
                {[
                  { n: "3",   unit: "+", label: "Age Groups Served" },
                  { n: "100", unit: "%", label: "Virtual & Telehealth" },
                  { n: "1:1", unit: "",  label: "Personalized Care" },
                  { n: "MD",  unit: "",  label: "Maryland Licensed" },
                ].map((s, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-number">
                      {s.n}
                      <span style={{ fontSize: "1.4rem", color: "var(--sage)" }}>{s.unit}</span>
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Scroll indicator */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div className="scroll-line" />
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", writingMode: "vertical-rl" }}>
                  scroll
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════ SERVICES BAND ═══════════════ */}
        <section style={{ position: "relative", zIndex: 1, background: "var(--sage-dk)", overflow: "hidden", padding: "0" }}>
          {/* Top slant */}
          <div style={{
            position: "absolute", top: -1, left: 0, right: 0, height: 40,
            background: "var(--ivory)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          }} />
          {/* Bottom slant */}
          <div style={{
            position: "absolute", bottom: -1, left: 0, right: 0, height: 40,
            background: "var(--ivory)",
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
          }} />

          <div style={{ padding: "56px 32px 56px", maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <span className="section-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
                Our Services
              </span>
            </div>
            <div className="services-pills" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {services.map((s, i) => (
                <div key={i} className="service-pill" style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ ABOUT / CTA BAND ═══════════════ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>

              {/* Left — text */}
              <div style={{ flex: "1 1 50%", minWidth: 280 }}>
                <div style={{ marginBottom: 20 }}>
                  <span className="section-eyebrow">Who We Are</span>
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  lineHeight: 1.15, color: "var(--text)",
                  marginBottom: 20, letterSpacing: "-0.01em",
                }}>
                  A practice built on<br />
                  <em style={{ color: "var(--sage)", fontStyle: "italic" }}>empathy & expertise</em>
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-2)", marginBottom: 28, fontWeight: 300, maxWidth: 480 }}>
                  Gigi Psychiatric Services was founded with a simple belief: every
                  person deserves thoughtful, individualized mental health care —
                  without barriers. Through our secure telehealth platform, we bring
                  clinical excellence directly to you.
                </p>
                <button className="btn-primary" onClick={() => navigate('/about')} style={{ fontSize: 13 }}>
                  Meet Our Team <ArrowRight size={14} className="btn-arrow" />
                </button>
              </div>

              {/* Right — quote card */}
              <div style={{ flex: "1 1 40%", minWidth: 260 }}>
                <div style={{
                  background: "linear-gradient(145deg, var(--cream) 0%, rgba(232,221,208,0.5) 100%)",
                  border: "1px solid var(--warm)",
                  borderRadius: 28, padding: "40px 36px",
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Decorative quote mark */}
                  <div style={{
                    position: "absolute", top: -10, left: 24,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 140, lineHeight: 1,
                    color: "rgba(196,168,130,0.2)",
                    fontStyle: "italic", pointerEvents: "none", userSelect: "none",
                  }}>
                    "
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontStyle: "italic", fontWeight: 400,
                    lineHeight: 1.6, color: "var(--text)",
                    marginBottom: 20, position: "relative",
                  }}>
                    Mental health is not a destination, but a process. It's about
                    how you drive, not where you're going.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 1, background: "var(--gold)" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--bark)" }}>
                      Gigi Psychiatric Services
                    </span>
                  </div>

                  {/* Corner accent */}
                  <div style={{
                    position: "absolute", bottom: -20, right: -20,
                    width: 100, height: 100, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(92,126,106,0.1) 0%, transparent 70%)",
                  }} />
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