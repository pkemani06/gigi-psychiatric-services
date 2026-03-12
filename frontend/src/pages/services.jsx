import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

  .svc-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .svc-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .svc-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .svc-r4 { animation: revealFade 1s ease 0.55s both; }

  .svc-orb-1 { animation: floatOrb 9s  ease-in-out       infinite; }
  .svc-orb-2 { animation: floatOrb 12s ease-in-out 2s   infinite; }
  .svc-orb-3 { animation: floatOrb 7s  ease-in-out 4s   infinite; }

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

  /* Service cards */
  .svc-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.75) 0%, rgba(242,237,229,0.5) 100%);
    border: 1px solid var(--warm);
    border-radius: 24px;
    padding: 36px 32px;
    backdrop-filter: blur(12px);
    transition: all 0.26s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
    overflow: hidden;
    cursor: default;
  }
  .svc-card::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(92,126,106,0.04) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.22s;
    border-radius: inherit;
  }
  .svc-card:hover {
    transform: translateY(-6px);
    border-color: rgba(92,126,106,0.35);
    box-shadow: 0 20px 56px rgba(0,0,0,0.09), 0 4px 16px rgba(92,126,106,0.1);
  }
  .svc-card:hover::after { opacity: 1; }

  /* Spec pills */
  .spec-pill {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 12px 20px;
    background: rgba(255,255,255,0.65);
    border: 1px solid var(--warm);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--text-2);
    backdrop-filter: blur(8px);
    transition: all 0.22s;
    text-align: center;
    cursor: default;
  }
  .spec-pill:hover {
    background: rgba(255,255,255,0.95);
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(92,126,106,0.14);
  }

  /* CTA button */
  .svc-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 18px 38px;
    background: var(--sage);
    color: #fff; border: none;
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28), 0 1px 4px rgba(92,126,106,0.15);
    position: relative; overflow: hidden;
  }
  .svc-btn::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.2s;
  }
  .svc-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 36px rgba(92,126,106,0.38);
    background: var(--sage-dk);
  }
  .svc-btn:hover::before { opacity: 1; }
  .svc-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  /* Shimmer headline accent */
  .shimmer-text {
    background: linear-gradient(90deg, var(--sage-dk) 0%, var(--sage-lt) 40%, var(--gold) 60%, var(--sage-dk) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear 1s infinite;
  }

  /* Condition image cards */
  .condition-card {
    position: relative; border-radius: 24px; overflow: hidden;
    aspect-ratio: 3/4;
    background: linear-gradient(145deg, var(--cream) 0%, var(--warm) 100%);
    border: 1px solid var(--warm);
    box-shadow: 0 16px 48px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05);
    cursor: default;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .condition-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 64px rgba(0,0,0,0.13), 0 8px 24px rgba(92,126,106,0.12);
  }
  .condition-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .condition-card:hover img { transform: scale(1.04); }
  .condition-card .card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 35%, rgba(28,24,20,0.75) 100%);
  }
  .condition-card .card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 24px 28px; }
  .condition-card .card-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(196,168,130,0.25); border: 1px solid rgba(196,168,130,0.4);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.85); margin-bottom: 8px;
  }
  .condition-card .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 400; font-style: italic;
    color: #fff; line-height: 1.15; margin: 0;
  }
  .condition-card .img-placeholder {
    width: 100%; height: 100%; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(145deg, var(--cream), var(--warm)); gap: 12px;
  }
  .condition-card .img-placeholder .placeholder-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(92,126,106,0.1); border: 1px dashed rgba(92,126,106,0.3);
    display: flex; align-items: center; justify-content: center; font-size: 28px;
  }
  .condition-card .img-placeholder .placeholder-text {
    font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3);
  }

  @media (max-width: 900px) { .condition-grid { grid-template-columns: repeat(2,1fr) !important; } }

  /* Dark band */
  .dark-band {
    background: var(--sage-dk);
    position: relative; overflow: hidden;
  }
  .dark-band::before {
    content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 40px;
    background: var(--ivory);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }
  .dark-band::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 40px;
    background: var(--ivory);
    clip-path: polygon(0 100%, 100% 0, 100% 100%);
  }

  @media (max-width: 900px) {
    .svc-grid { grid-template-columns: repeat(2,1fr) !important; }
    .spec-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 600px) {
    .svc-grid { grid-template-columns: 1fr !important; }
    .spec-grid { grid-template-columns: 1fr !important; }
  }
`;

const services = [
  { title: "Psychiatric Evaluation",  description: "Comprehensive assessment and diagnosis of mental health conditions for adolescents and adults.", icon: "🔍" },
  { title: "Diagnosis & Treatment",   description: "Expert diagnosis and personalized treatment plans tailored to your unique needs.",               icon: "💊" },
  { title: "Medication Management",   description: "Careful monitoring and adjustment of psychiatric medications for optimal results.",              icon: "📋" },
  { title: "Supportive Therapy",      description: "Compassionate therapeutic support to help you navigate life's challenges.",                     icon: "💚" },
  { title: "Virtual Visits",          description: "Convenient, secure telehealth appointments from the comfort of your home.",                     icon: "💻" },
  { title: "Adolescent & Adult Care", description: "Specialized treatment for both adolescents and adults at every life stage.",                    icon: "👥" },
];

const conditions = [
  { title: "Anxiety",          tag: "We Treat", icon: "🌊", image: "/images/anxiety.png",    description: "Generalized anxiety, panic disorder, social anxiety & more" },
  { title: "Depression",       tag: "We Treat", icon: "🌧", image: "/images/depression.png", description: "Major depressive disorder, persistent depressive disorder & more" },
  { title: "ADHD",             tag: "We Treat", icon: "⚡", image: "/images/adhd.png",       description: "Attention deficit hyperactivity disorder across all age groups" },
  { title: "Bipolar Disorder", tag: "We Treat", icon: "🔄", image: "/images/bipolar.png",    description: "Bipolar I, Bipolar II, and cyclothymic disorder" },
];

const specializations = [
  "Insomnia", "Anxiety", "Depression", "Schizophrenia", "ADHD",
  "Post Traumatic Stress Disorder", "Mood Disorder", "Sleep Disorder",
  "Borderline Personality Disorder", "Psychosis", "Anger Management",
  "& many more conditions",
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="svc-orb-1" style={{
            position: "absolute", top: "5%", right: "8%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)",
          }} />
          <div className="svc-orb-2" style={{
            position: "absolute", bottom: "10%", left: "-5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)",
          }} />
          <div className="svc-orb-3" style={{
            position: "absolute", top: "40%", left: "38%",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)",
          }} />
        </div>

        <Navbar />

        {/* ═══ HERO / HEADER ═══ */}
        <section style={{ position: "relative", zIndex: 1, paddingTop: 20 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 80px" }}>

            <div className="svc-r1" style={{ marginBottom: 16 }}>
              <span className="section-eyebrow">What We Offer</span>
            </div>

            <h1 className="svc-r2" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginBottom: 20,
            }}>
              Comprehensive{" "}
              <em className="shimmer-text" style={{ fontStyle: "italic", fontWeight: 400 }}>psychiatric</em>
              <br />care, built for you
            </h1>

            <p className="svc-r3" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16, fontWeight: 300,
              color: "var(--text-2)", lineHeight: 1.8,
              maxWidth: 560, marginBottom: 0,
            }}>
              From evaluation to ongoing therapy — we provide a full spectrum of virtual
              mental health services delivered with warmth and clinical excellence.
            </p>
          </div>
        </section>

        {/* ═══ SERVICES GRID ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
            <div className="svc-grid svc-r4" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}>
              {services.map((svc, i) => (
                <div key={i} className="svc-card">
                  {/* Icon bubble */}
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, var(--gold-lt) 0%, rgba(92,126,106,0.08) 100%)",
                    border: "1px solid rgba(196,168,130,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, marginBottom: 22,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    {svc.icon}
                  </div>

                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22, fontWeight: 500,
                    color: "var(--text)", margin: "0 0 12px",
                    lineHeight: 1.2, letterSpacing: "-0.01em",
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14, fontWeight: 300,
                    color: "var(--text-2)", lineHeight: 1.75, margin: 0,
                  }}>
                    {svc.description}
                  </p>

                  {/* Corner accent */}
                  <div style={{
                    position: "absolute", bottom: -16, right: -16,
                    width: 80, height: 80, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(92,126,106,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONDITIONS WE TREAT ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ marginBottom: 14 }}>
                <span className="section-eyebrow">Conditions We Treat</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "clamp(2rem, 4vw, 3.6rem)", lineHeight: 1.1,
                  letterSpacing: "-0.01em", color: "var(--text)", margin: 0,
                }}>
                  Focused care for the{" "}
                  <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>conditions<br />that matter most</em>
                </h2>
                <p style={{
                  fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 300,
                  color: "var(--text-3)", lineHeight: 1.75, maxWidth: 340, margin: 0,
                }}>
                  Our team specializes in evidence-based treatment for these and many more mental health conditions.
                </p>
              </div>
            </div>

            <div className="condition-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {conditions.map((condition, i) => (
                <div key={i} className="condition-card">
                  <img
                    src={condition.image}
                    alt={condition.title}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div className="img-placeholder" style={{ display: 'none', position: 'absolute', inset: 0 }}>
                    <div className="placeholder-icon">{condition.icon}</div>
                    <span className="placeholder-text">Add {condition.title} image</span>
                    <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.06em" }}>
                      /images/{condition.title.toLowerCase().replace(' ', '')}.png
                    </span>
                  </div>
                  <div className="card-overlay" />
                  <div className="card-label">
                    <div className="card-tag">
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                      {condition.tag}
                    </div>
                    <p className="card-title">{condition.title}</p>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, margin: "6px 0 0" }}>
                      {condition.description}
                    </p>
                  </div>
                  <div style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", pointerEvents: "none" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SPECIALIZATIONS DARK BAND ═══ */}
        <section className="dark-band" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px 72px" }}>

            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ marginBottom: 14 }}>
                <span className="section-eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Specializations
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                lineHeight: 1.1, letterSpacing: "-0.01em",
                color: "#fff", margin: "0 0 14px",
              }}>
                Conditions we{" "}
                <em style={{ fontStyle: "italic", color: "rgba(196,168,130,0.9)", fontWeight: 400 }}>treat</em>
              </h2>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 15, fontWeight: 300,
                color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto",
              }}>
                We specialize in treating a wide range of mental health conditions
              </p>
            </div>

            <div className="spec-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}>
              {specializations.map((spec, i) => (
                <div key={i} className="spec-pill" style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.8)",
                }}>
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA BAND ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px" }}>
            <div style={{
              background: "linear-gradient(145deg, var(--cream) 0%, rgba(232,221,208,0.5) 100%)",
              border: "1px solid var(--warm)",
              borderRadius: 32,
              padding: "64px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 40,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.06)",
            }}>

              {/* Large decorative quote mark */}
              <div style={{
                position: "absolute", top: -20, right: 40,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 220, lineHeight: 1,
                color: "rgba(196,168,130,0.12)",
                fontStyle: "italic", pointerEvents: "none", userSelect: "none",
              }}>
                "
              </div>

              <div style={{ maxWidth: 580, position: "relative" }}>
                <div style={{ marginBottom: 16 }}>
                  <span className="section-eyebrow">Ready to Begin?</span>
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  lineHeight: 1.15, letterSpacing: "-0.01em",
                  color: "var(--text)", margin: "0 0 16px",
                }}>
                  Your path to wellness{" "}
                  <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>starts here</em>
                </h2>
                <p style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 15, fontWeight: 300,
                  color: "var(--text-2)", lineHeight: 1.8, margin: 0,
                }}>
                  Schedule a consultation today and take the first step toward
                  better mental health — from the comfort of your home.
                </p>
              </div>

              <button className="svc-btn" onClick={() => navigate('/contact')}>
                Book an Appointment
                <ArrowRight size={16} className="btn-arrow" />
              </button>

              {/* Corner orb */}
              <div style={{
                position: "absolute", bottom: -40, right: -40,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(92,126,106,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}