import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pageStyles = `
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
  @keyframes tagFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-7px); }
  }

  .about-reveal-1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .about-reveal-2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .about-reveal-3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .about-reveal-4 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }

  .about-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .about-orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }

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
  }
  .about-btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px rgba(92,126,106,0.38), 0 2px 8px rgba(92,126,106,0.2);
    background: var(--sage-dk);
  }
  .about-btn-primary:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  .about-section-eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Figtree', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bark);
  }
  .about-section-eyebrow::before {
    content: '';
    width: 32px; height: 1px;
    background: var(--gold);
    flex-shrink: 0;
  }

  .about-tag-pill {
    display: inline-flex; align-items: center;
    padding: 7px 16px;
    background: rgba(255,255,255,0.7);
    border: 1px solid var(--warm);
    border-radius: 999px;
    font-family: 'Figtree', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-2);
    white-space: nowrap;
    backdrop-filter: blur(8px);
    transition: all 0.2s;
    cursor: default;
  }
  .about-tag-pill:hover {
    background: rgba(255,255,255,0.95);
    border-color: var(--sage);
    color: var(--sage);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(92,126,106,0.12);
  }

  .about-stat-card {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    padding: 20px 12px;
    background: var(--sage);
    border: 1px solid var(--sage-dk);
    border-radius: 20px;
    backdrop-filter: blur(8px);
    text-align: center;
    flex: 1;
    transition: all 0.22s;
  }
  .about-stat-card:hover {
    background: var(--sage-dk);
    border-color: var(--sage-dk);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(92,126,106,0.25);
  }

  .about-edu-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--warm);
  }
  .about-edu-row:last-child { border-bottom: none; }

  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    z-index: 9999;
  }

  @media (max-width: 800px) {
    .about-grid { grid-template-columns: 1fr !important; }
    .about-stats-row { flex-wrap: wrap; }
  }
`;

const stats = [
  { value: "20+", label: "Years Nursing" },
  { value: "PMHNP", label: "Board Certified" },
  { value: "3+", label: "Years Psych NP" },
];

const areas = [
  "Depression", "Anxiety", "Bipolar Disorder", "Schizophrenia",
  "Autism Spectrum", "Adolescents", "Adults", "Geriatric Population",
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
            position: "absolute", top: "8%", right: "5%",
            width: 580, height: 580, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,126,106,0.08) 0%, transparent 65%)",
          }} />
          <div className="about-orb-2" style={{
            position: "absolute", bottom: "10%", left: "-5%",
            width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,168,130,0.09) 0%, transparent 65%)",
          }} />
        </div>

        <Navbar />

        <section style={{ position: "relative", zIndex: 1, padding: "24px 32px 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Page eyebrow */}
            <div className="about-reveal-1" style={{ marginBottom: 52 }}>
              <span className="about-section-eyebrow" style={{ marginBottom: 16, display: "flex" }}>
                About Us
              </span>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}>
                Meet the{" "}
                <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>Provider</em>
              </h1>
            </div>

            {/* Two-column grid */}
            <div className="about-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 52,
              alignItems: "start",
            }}>

              {/* LEFT — Photo + stats */}
              <div className="about-reveal-2" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Photo */}
                <div style={{
                  borderRadius: 28,
                  overflow: "hidden",
                  height: 520,
                  position: "relative",
                  background: "linear-gradient(145deg, var(--cream) 0%, var(--warm) 100%)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(255,255,255,0.8)",
                }}>
                  <img
                    src="/images/provider-photo.png"
                    alt="Giesel Kemani, PMHNP-BC"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", display: "block" }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg, transparent 45%, rgba(28,24,20,0.58) 100%)",
                  }} />
                  {/* Name overlay */}
                  <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 24, fontWeight: 500,
                      color: "#fff", margin: "0 0 4px", lineHeight: 1.2,
                    }}>
                      Giesel Kemani, PMHNP-BC
                    </p>
                    <p style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 13, color: "rgba(255,255,255,0.75)", margin: 0, fontWeight: 400,
                    }}>
                      Psychiatric Nurse Practitioner · Board Certified
                    </p>
                  </div>
                  {/* Accepting badge */}
                  <div style={{
                    position: "absolute", top: 20, right: 20,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderRadius: 14,
                    padding: "10px 16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    animation: "tagFloat 5s ease-in-out infinite",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: "#5cb85c",
                        boxShadow: "0 0 0 3px rgba(92,184,92,0.2)",
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "var(--text-2)",
                      }}>
                        Accepting Patients
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="about-stats-row" style={{ display: "flex", gap: 12 }}>
                  {stats.map((s) => (
                    <div key={s.label} className="about-stat-card">
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 30, fontWeight: 400,
                        color: "#fff", lineHeight: 1,
                      }}>
                        {s.value}
                      </span>
                      <span style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.75)",
                      }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Bio card */}
              <div className="about-reveal-3" style={{
                background: "linear-gradient(145deg, var(--cream) 0%, rgba(242,237,229,0.5) 100%)",
                border: "1px solid var(--warm)",
                borderRadius: 28,
                padding: "40px 44px",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                boxShadow: "0 16px 48px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)",
                position: "relative",
                overflow: "hidden",
              }}>

                {/* Decorative quote mark */}
                <div style={{
                  position: "absolute", top: -16, left: 24,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 180, lineHeight: 1,
                  color: "rgba(196,168,130,0.12)",
                  fontStyle: "italic",
                  pointerEvents: "none", userSelect: "none",
                }}>
                  "
                </div>

                {/* Bio */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, color: "var(--text-2)", lineHeight: 1.85, fontWeight: 300 }}>
                    I have over 20 years of nursing background in various health care
                    settings and 3 years as a Psychiatric Nurse Practitioner. I obtained
                    my BSc. in Nursing from Chamberlain School of Nursing and my post
                    master certificate as a PMHNP from Walden University.
                  </p>
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, color: "var(--text-2)", lineHeight: 1.85, fontWeight: 300 }}>
                    At Gigi Psychiatric Services, we make high-quality mental health
                    services accessible from the comfort of your home. We offer both{" "}
                    <strong style={{ color: "var(--sage)", fontWeight: 600 }}>medication management &amp; therapy</strong>{" "}
                    in a single appointment — pairing both increases your chance of recovery by{" "}
                    <strong style={{ color: "var(--sage)", fontWeight: 600 }}>75%</strong>.
                  </p>
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, color: "var(--text-2)", lineHeight: 1.85, fontWeight: 300 }}>
                    I am passionate about supporting clients and families with the tools
                    to understand and manage behaviors, leading more balanced and
                    meaningful lives.
                  </p>
                </div>

                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Areas of Focus */}
                <div>
                  <span className="about-section-eyebrow" style={{ marginBottom: 16, display: "flex" }}>
                    Areas of Focus
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {areas.map((area) => (
                      <span key={area} className="about-tag-pill">{area}</span>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Education */}
                <div>
                  <span className="about-section-eyebrow" style={{ marginBottom: 4, display: "flex" }}>
                    Education
                  </span>
                  <div>
                    {education.map((e) => (
                      <div key={e.degree} className="about-edu-row">
                        <span style={{ fontSize: 20, marginTop: 2, flexShrink: 0 }}>{e.icon}</span>
                        <div>
                          <p style={{
                            fontFamily: "'Figtree', sans-serif",
                            fontSize: 14, fontWeight: 600,
                            color: "var(--text)", margin: "0 0 2px",
                          }}>
                            {e.degree}
                          </p>
                          <p style={{
                            fontFamily: "'Figtree', sans-serif",
                            fontSize: 13, color: "var(--text-3)", margin: 0, fontWeight: 400,
                          }}>
                            {e.school}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--warm)" }} />

                {/* Attribution + CTA */}
                <div style={{
                  display: "flex", alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexWrap: "wrap", gap: 20,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20, fontWeight: 500,
                      color: "var(--text)", margin: 0,
                    }}>
                      Giesel Kemani, PMHNP-BC
                    </p>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, color: "var(--text-3)", margin: 0 }}>
                      Psychiatric Nurse Practitioner, PMHNP-BC
                    </p>
                    <p style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--bark)", margin: 0,
                    }}>
                      Gigi Psychiatric Services, LLC
                    </p>
                  </div>

                  <button className="about-btn-primary" onClick={() => navigate('/contact')}>
                    Schedule with Giesel
                    <ArrowRight size={15} className="btn-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dark band — matches homepage services band */}
        <section style={{
          position: "relative",
          zIndex: 1,
          background: "var(--sage-dk)",
          overflow: "hidden",
          padding: "0",
        }}>
          <div style={{
            position: "absolute", top: -1, left: 0, right: 0, height: 40,
            background: "var(--ivory)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
          }} />
          <div style={{
            position: "absolute", bottom: -1, left: 0, right: 0, height: 40,
            background: "var(--ivory)",
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
          }} />

          <div style={{ padding: "64px 32px", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.5,
              maxWidth: 680,
              margin: "0 auto 28px",
            }}>
              "I enjoy assisting clients to become the best version of themselves."
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 1, background: "var(--gold)" }} />
              <span style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}>
                Giesel Kemani, PMHNP-BC
              </span>
              <div style={{ width: 32, height: 1, background: "var(--gold)" }} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}