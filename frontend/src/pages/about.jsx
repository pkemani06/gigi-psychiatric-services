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
  @keyframes tagFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-7px); }
  }

  .about-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .about-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .about-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .about-r4 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
  .about-r5 { animation: revealFade 1s ease 0.65s both; }

  .about-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .about-orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }
  .about-orb-3 { animation: floatOrb 7s ease-in-out 4s infinite; }

  .about-tag-1 { animation: tagFloat 5s ease-in-out infinite; }
  .about-tag-2 { animation: tagFloat 6s ease-in-out 2s infinite; }

  .about-btn-primary {
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
  .about-btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.2s;
  }
  .about-btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px rgba(92,126,106,0.38), 0 2px 8px rgba(92,126,106,0.2);
    background: var(--sage-dk);
  }
  .about-btn-primary:hover::before { opacity: 1; }
  .about-btn-primary:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  .about-pill {
    display: inline-flex; align-items: center;
    padding: 7px 16px;
    background: rgba(255,255,255,0.7);
    border: 1px solid var(--warm);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-2);
    backdrop-filter: blur(8px);
    transition: all 0.2s;
  }
  .about-pill:hover {
    background: rgba(255,255,255,0.95);
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(92,126,106,0.12);
  }

  .section-eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Figtree', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--bark);
  }
  .section-eyebrow::before {
    content: ''; width: 32px; height: 1px; background: var(--gold);
  }

  .edu-item {
    padding: 20px 24px;
    background: rgba(255,255,255,0.6);
    border: 1px solid var(--warm);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    transition: all 0.22s;
  }
  .edu-item:hover {
    background: rgba(255,255,255,0.9);
    border-color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(92,126,106,0.1);
  }

  .stat-card {
    display: flex; flex-direction: column; gap: 4px;
    padding: 24px 28px;
    background: rgba(255,255,255,0.5);
    border: 1px solid var(--warm);
    border-radius: 20px;
    backdrop-filter: blur(8px);
    text-align: center;
    transition: all 0.22s;
  }
  .stat-card:hover {
    background: rgba(255,255,255,0.85);
    border-color: var(--sage);
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(92,126,106,0.12);
  }

  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr !important; }
    .about-floating-tag { display: none !important; }
    .about-stats-row { grid-template-columns: repeat(3,1fr) !important; }
  }
`;

const stats = [
  { value: "20+", unit: "", label: "Years in Nursing" },
  { value: "PMHNP", unit: "", label: "Board Certified" },
  { value: "3+", unit: "", label: "Years Psychiatric NP" },
];

const areas = [
  "Depression", "Anxiety", "Bipolar Disorder", "Schizophrenia",
  "Autism Spectrum Disorder", "Adolescents", "Adults", "Geriatric Population",
];

const education = [
  { degree: "BSc. in Nursing", school: "Chamberlain School of Nursing", icon: "🎓" },
  { degree: "Post Master Certificate, PMHNP", school: "Walden University", icon: "📜" },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="about-orb-1" style={{
            position: "absolute", top: "5%", right: "8%",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)",
          }} />
          <div className="about-orb-2" style={{
            position: "absolute", bottom: "10%", left: "-5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)",
          }} />
          <div className="about-orb-3" style={{
            position: "absolute", top: "45%", left: "40%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)",
          }} />
        </div>

        <Navbar />

        {/* ═══ MAIN SECTION ═══ */}
        <section style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 100px" }}>

            {/* Eyebrow */}
            <div className="about-r1" style={{ marginBottom: 16 }}>
              <span className="section-eyebrow">About Us</span>
            </div>

            {/* Headline */}
            <h1 className="about-r2" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginBottom: 56,
            }}>
              Meet the{" "}
              <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>provider</em>
            </h1>

            {/* Two-column grid */}
            <div className="about-grid about-r3" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "start",
            }}>

              {/* ── LEFT: Photo + stats ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Photo frame */}
                <div style={{
                  position: "relative",
                  borderRadius: 28,
                  overflow: "hidden",
                  height: 540,
                  background: "linear-gradient(145deg, var(--cream) 0%, var(--warm) 100%)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(255,255,255,0.8)",
                }}>
                  <img
                    src="/images/provider-photo.png"
                    alt="Gigi, PMHNP-BC"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block" }}
                  />

                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 45%, rgba(28,24,20,0.55) 100%)",
                  }} />

                  {/* Name overlay */}
                  <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26, fontWeight: 500, fontStyle: "italic",
                      color: "#fff", margin: 0, lineHeight: 1.2,
                    }}>
                      Gigi, PMHNP-BC
                    </p>
                    <p style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 13, color: "rgba(255,255,255,0.75)",
                      margin: "5px 0 0", fontWeight: 400, letterSpacing: "0.02em",
                    }}>
                      Psychiatric Nurse Practitioner · Board Certified
                    </p>
                  </div>

                  {/* Floating badge: top-right */}
                  <div className="about-floating-tag about-tag-1" style={{
                    position: "absolute", top: 20, right: 20,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderRadius: 14,
                    padding: "12px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 5 }}>
                      Accepting Patients
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5cb85c", flexShrink: 0, boxShadow: "0 0 0 3px rgba(92,184,92,0.2)" }} />
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 500, color: "var(--text)" }}>All Ages Welcome</span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="about-stats-row" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}>
                  {stats.map((s) => (
                    <div key={s.label} className="stat-card">
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 32, fontWeight: 300, color: "var(--text)", lineHeight: 1,
                      }}>
                        {s.value}
                        {s.unit && <span style={{ color: "var(--sage)", fontSize: "1.2rem" }}>{s.unit}</span>}
                      </div>
                      <div style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                        textTransform: "uppercase", color: "var(--text-3)",
                      }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Bio card ── */}
              <div style={{
                background: "linear-gradient(145deg, var(--cream) 0%, rgba(232,221,208,0.4) 100%)",
                border: "1px solid var(--warm)",
                borderRadius: 28,
                padding: "44px 44px",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03)",
              }}>

                {/* Decorative large quote */}
                <div style={{
                  position: "absolute", top: -16, right: 20,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 180, lineHeight: 1, color: "rgba(196,168,130,0.15)",
                  fontStyle: "italic", pointerEvents: "none", userSelect: "none",
                }}>
                  "
                </div>

                {/* Bio paragraphs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif", fontSize: 15,
                    color: "var(--text-2)", lineHeight: 1.85, margin: 0, fontWeight: 300,
                  }}>
                    I have over 20 years of nursing background in various health care
                    settings and 3 years as a Psychiatric Nurse Practitioner. I obtained
                    my BSc. in Nursing from Chamberlain School of Nursing and my post
                    master certificate from Walden University. As a PMHNP I use evidence
                    based practice to provide holistic care — empowering minds wherever
                    you are.
                  </p>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif", fontSize: 15,
                    color: "var(--text-2)", lineHeight: 1.85, margin: 0, fontWeight: 300,
                  }}>
                    At Gigi Psychiatric Services, we offer both{" "}
                    <strong style={{ color: "var(--sage)", fontWeight: 600 }}>medication management &amp; therapy</strong>{" "}
                    in a single appointment — pairing both increases your chance of recovery by{" "}
                    <strong style={{ color: "var(--sage)", fontWeight: 600 }}>75%</strong>.
                  </p>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif", fontSize: 15,
                    color: "var(--text-2)", lineHeight: 1.85, margin: 0, fontWeight: 300,
                  }}>
                    I am passionate about supporting clients and families with tools to lead
                    more balanced, meaningful lives — helping each person become the best
                    version of themselves.
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Areas of Focus */}
                <div>
                  <div style={{ marginBottom: 14 }}>
                    <span className="section-eyebrow">Areas of Focus</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {areas.map((area) => (
                      <span key={area} className="about-pill">{area}</span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Education */}
                <div>
                  <div style={{ marginBottom: 14 }}>
                    <span className="section-eyebrow">Education</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {education.map((e) => (
                      <div key={e.degree} className="edu-item">
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{e.icon}</span>
                          <div>
                            <p style={{
                              fontFamily: "'Figtree', sans-serif", fontSize: 14,
                              fontWeight: 600, color: "var(--text)", margin: "0 0 3px",
                            }}>
                              {e.degree}
                            </p>
                            <p style={{
                              fontFamily: "'Figtree', sans-serif", fontSize: 13,
                              color: "var(--text-3)", margin: 0,
                            }}>
                              {e.school}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Attribution + CTA */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20, fontWeight: 500, fontStyle: "italic",
                      color: "var(--text)", margin: 0,
                    }}>
                      Gigi, PMHNP-BC
                    </p>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, color: "var(--text-3)", margin: 0 }}>
                      Psychiatric Nurse Practitioner, PMHNP-BC
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                      <div style={{ width: 24, height: 1, background: "var(--gold)" }} />
                      <p style={{
                        fontFamily: "'Figtree', sans-serif", fontSize: 11,
                        fontWeight: 600, letterSpacing: "0.1em",
                        color: "var(--bark)", margin: 0, textTransform: "uppercase",
                      }}>
                        Gigi Psychiatric Services, LLC
                      </p>
                    </div>
                  </div>

                  <button className="about-btn-primary" onClick={() => navigate('/contact')}>
                    Schedule with Gigi
                    <ArrowRight size={15} className="btn-arrow" />
                  </button>
                </div>

                {/* Corner accent orb */}
                <div style={{
                  position: "absolute", bottom: -30, right: -30,
                  width: 140, height: 140, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(92,126,106,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}