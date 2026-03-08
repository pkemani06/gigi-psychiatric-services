import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <section
        style={{
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(78,124,104,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

          {/* Page eyebrow */}
          <div style={{ marginBottom: 48 }}>
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 8,
              }}
            >
              About Us
            </p>
            <h1
              style={{
                fontFamily: "Lora, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Meet the doctor
            </h1>
          </div>

          {/* Two-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            {/* LEFT — Photo */}
            <div
              style={{
                height: 600,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--sh-xl)",
                flexShrink: 0,
              }}
            >
              <img
                src="/images/provider-photo.png"
                alt="Doctor at Gigi Psychiatric Services"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 10%",
                  display: "block",
                }}
              />
            </div>

            {/* RIGHT — Bio card */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                boxShadow: "var(--sh-lg)",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 15,
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                I have over 20 years of nursing background in various health care
                settings and 3 years as a Psychiatric Nurse Practitioner. I
                obtained my BSc. in Nursing degree from Chamberlain School of
                Nursing and my post master certificate as a psychiatric Nurse
                Practitioner from Walden University. As a PMHNP I have experience
                in using evidence based practice to provide holistic care to my
                patients, empowering minds and providing support and care where
                ever you are. With a background in nursing and psychiatry, I
                provide holistic mental health care that addresses the biological,
                psychological, and social factors influencing emotional well-being.
              </p>

              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 15,
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                At Gigi Psychiatric Services, we make high-quality mental health
                services accessible from the comfort and privacy of your home. We
                offer both medication management &amp; therapy in a single
                appointment to save you time and money. Pairing therapy and
                medication to treat depression and anxiety can help you feel better
                faster with a 75% improved chance of recovery.
              </p>

              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 15,
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                We assist patients struggling with depression, anxiety, bipolar
                disorder, schizophrenia, autism spectrum disorder and other
                psychiatric issues. I have experience working in an outpatient
                setting. We focus on adolescence, adults and the geriatric
                population.
              </p>

              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 15,
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                I am passionate about supporting clients and families with the
                tools to understand and manage behaviors, leading more balanced and
                meaningful lives. My professional interests include medication
                management and psychotherapy. I enjoy assisting clients to become
                the best version of themselves.
              </p>

              {/* Attribution */}
              <div
                style={{
                  paddingTop: 20,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <p
                  style={{
                    fontFamily: "Lora, Georgia, serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Gigi, PMHNP-BC
                </p>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 13,
                    color: "var(--text-3)",
                    margin: 0,
                  }}
                >
                  Psychiatric Nurse Practitioner, PMHNP-BC
                </p>
                <p
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--accent)",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Gigi Psychiatric Services, LLC
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/contact')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(78,124,104,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(78,124,104,0.28)";
                }}
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
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
                  marginTop: 4,
                }}
              >
                Schedule with Gigi
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}