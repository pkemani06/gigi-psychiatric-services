import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  { title: "Psychiatric Evaluation",  description: "Comprehensive assessment and diagnosis of mental health conditions for adolescents and adults.",        icon: "🔍" },
  { title: "Diagnosis and Treatment", description: "Expert diagnosis and personalized treatment plans tailored to your unique needs.",                       icon: "💊" },
  { title: "Medication Management",   description: "Careful monitoring and adjustment of psychiatric medications for optimal results.",                      icon: "📋" },
  { title: "Supportive Therapy",      description: "Compassionate therapeutic support to help you navigate life's challenges.",                             icon: "💚" },
  { title: "Virtual Visits",          description: "Convenient, secure telehealth appointments from the comfort of your home.",                             icon: "💻" },
  { title: "Adolescent & Adult Care", description: "Specialized treatment for both adolescents and adults at every life stage.",                            icon: "👥" },
];

const specializations = [
  "Insomnia",
  "Anxiety",
  "Depression",
  "Schizophrenia",
  "ADHD",
  "Post Traumatic Stress Disorder (PTSD)",
  "Mood Disorder",
  "Sleep Disorder",
  "Borderline Personality Disorder",
  "Psychosis",
  "Anger Management",
  "And many more psychiatric issues",
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* ── Services Grid ── */}
      <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(78,124,104,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

          <div style={{ marginBottom: 52, textAlign: "center" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
              What We Offer
            </p>
            <h1 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 14px", lineHeight: 1.1 }}>
              Our{" "}
              <span style={{ color: "var(--accent)" }}>Services</span>
            </h1>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "var(--text-2)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Comprehensive mental health care designed around your unique needs
            </p>
          </div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  boxShadow: "var(--sh-lg)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--sh-xl)";
                  e.currentTarget.style.borderColor = "rgba(78,124,104,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--sh-lg)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16, lineHeight: 1 }}>
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: "Lora, Georgia, serif", fontSize: 19, fontWeight: 700, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, margin: 0 }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Areas of Expertise ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, boxShadow: "var(--sh-xl)", overflow: "hidden" }}>

            <div style={{ padding: "36px 48px 28px", borderBottom: "1px solid var(--border)", textAlign: "center", background: "var(--surface-2)" }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
                Specializations
              </p>
              <h2 style={{ fontFamily: "Lora, Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 10px", lineHeight: 1.15 }}>
                Areas of Expertise
              </h2>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "var(--text-2)", margin: 0 }}>
                We specialize in treating a wide range of mental health conditions
              </p>
            </div>

            <div style={{ padding: "36px 48px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {specializations.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    textAlign: "center",
                    transition: "all 0.18s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(78,124,104,0.08)";
                    e.currentTarget.style.borderColor = "rgba(78,124,104,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", margin: 0, lineHeight: 1.4 }}>
                    {spec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ padding: "0 24px 80px", textAlign: "center" }}>
        <button
          onClick={() => navigate('/contact')}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "15px 32px",
            borderRadius: 14,
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(78,124,104,0.28)",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(78,124,104,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(78,124,104,0.28)";
          }}
        >
          Book an Appointment
        </button>
      </div>

      <Footer />
    </div>
  );
}