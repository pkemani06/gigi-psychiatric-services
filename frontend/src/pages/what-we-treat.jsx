import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Figtree:wght@300;400;500;600&display=swap');

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
    from { opacity: 0; } to { opacity: 1; }
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
  @keyframes flipIn {
    0%   { opacity: 0; transform: perspective(1200px) rotateY(-90deg) scale(0.85); }
    60%  { opacity: 1; transform: perspective(1200px) rotateY(8deg) scale(1.01); }
    80%  { transform: perspective(1200px) rotateY(-4deg) scale(0.995); }
    100% { transform: perspective(1200px) rotateY(0deg) scale(1); }
  }
  @keyframes flipOut {
    0%   { opacity: 1; transform: perspective(1200px) rotateY(0deg) scale(1); }
    100% { opacity: 0; transform: perspective(1200px) rotateY(90deg) scale(0.85); }
  }
  @keyframes backdropIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes backdropOut {
    from { opacity: 1; } to { opacity: 0; }
  }

  .modal-enter .modal-panel { animation: flipIn 0.55s cubic-bezier(0.16,1,0.3,1) both; }
  .modal-exit  .modal-panel { animation: flipOut 0.3s ease-in both; }
  .modal-enter { animation: backdropIn 0.3s ease both; }
  .modal-exit  { animation: backdropOut 0.3s ease both; }

  .noise-overlay {
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025; pointer-events: none; z-index: 9999;
  }

  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--bark);
  }
  .section-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--gold); }

  .shimmer-text {
    background: linear-gradient(90deg, var(--sage-dk) 0%, var(--sage-lt) 40%, var(--gold) 60%, var(--sage-dk) 100%);
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 4s linear 1s infinite;
  }

  /* Condition card */
  .condition-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.85), rgba(242,237,229,0.5));
    border: 1px solid var(--warm); border-radius: 24px;
    overflow: hidden; cursor: pointer;
    transition: all 0.32s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
    display: flex; flex-direction: column;
  }
  .condition-card:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: rgba(92,126,106,0.45);
    box-shadow: 0 24px 56px rgba(0,0,0,0.1), 0 4px 16px rgba(92,126,106,0.14);
  }
  .condition-card:hover .card-learn-row { opacity: 1; transform: translateY(0); }
  .condition-card:hover .img-placeholder-inner { background: linear-gradient(145deg, rgba(92,126,106,0.12), rgba(196,168,130,0.1)); }

  .card-learn-row {
    display: flex; align-items: center; gap: 8px; margin-top: 14px;
    font-family: 'Figtree', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--sage);
    opacity: 0; transform: translateY(6px); transition: opacity 0.22s, transform 0.22s;
  }

  /* Image placeholder */
  .img-placeholder-inner {
    width: 100%; aspect-ratio: 16/9;
    background: linear-gradient(145deg, var(--cream), var(--warm));
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; transition: background 0.25s;
    position: relative; overflow: hidden;
  }
  .img-placeholder-inner::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 8px,
      rgba(196,168,130,0.06) 8px,
      rgba(196,168,130,0.06) 16px
    );
  }
  .placeholder-icon-circle {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(92,126,106,0.1);
    border: 1.5px dashed rgba(92,126,106,0.35);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; position: relative; z-index: 1;
  }
  .placeholder-label {
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-3);
    position: relative; z-index: 1;
  }
  .placeholder-path {
    font-family: 'Figtree', sans-serif; font-size: 9px; font-weight: 400;
    color: rgba(156,144,136,0.6); position: relative; z-index: 1;
  }

  /* Modal */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(28,24,20,0.72);
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .modal-panel {
    background: var(--ivory); border-radius: 32px;
    width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto;
    position: relative;
    box-shadow: 0 48px 120px rgba(0,0,0,0.25), 0 12px 40px rgba(0,0,0,0.12);
    transform-origin: center center;
  }
  .modal-panel::-webkit-scrollbar { width: 4px; }
  .modal-panel::-webkit-scrollbar-track { background: transparent; }
  .modal-panel::-webkit-scrollbar-thumb { background: var(--warm); border-radius: 4px; }

  .modal-close {
    position: absolute; top: 18px; right: 18px;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; color: #fff; z-index: 2;
  }
  .modal-close:hover { background: rgba(255,255,255,0.26); transform: scale(1.1) rotate(90deg); }

  .modal-img-placeholder {
    width: 100%; aspect-ratio: 16/7;
    background: linear-gradient(145deg, var(--cream), var(--warm));
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 12px; border-radius: 32px 32px 0 0; position: relative; overflow: hidden;
  }
  .modal-img-placeholder::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg, transparent, transparent 10px,
      rgba(196,168,130,0.07) 10px, rgba(196,168,130,0.07) 20px
    );
  }

  .cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 32px; background: var(--sage); color: #fff; border: none; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28);
  }
  .cta-btn:hover { transform: translateY(-2px) scale(1.02); background: var(--sage-dk); box-shadow: 0 10px 36px rgba(92,126,106,0.38); }
  .cta-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  .orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .orb-2 { animation: floatOrb 13s ease-in-out 2s infinite; }
  .anim-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .anim-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .anim-r3 { animation: revealFade 0.8s ease 0.4s both; }
  .anim-r4 { animation: revealFade 0.8s ease 0.55s both; }

  @media (max-width: 900px) {
    .conditions-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 560px) {
    .conditions-grid { grid-template-columns: 1fr !important; }
  }
`;

const conditions = [
  {
    title: "Insomnia",
    icon: "🌙",
    imagePath: "/images/conditions/insomnia.jpg",
    tag: "Sleep",
    shortDesc: "Difficulty falling or staying asleep that affects daily functioning and quality of life.",
    fullDesc: "Insomnia is one of the most common sleep disorders, characterized by persistent difficulty falling asleep, staying asleep, or waking too early. It can be short-term (acute) or long-lasting (chronic), often linked to stress, anxiety, depression, or medical conditions. Untreated insomnia can significantly impair concentration, mood, immune function, and overall well-being.",
    treatments: ["Cognitive Behavioral Therapy for Insomnia (CBT-I)", "Sleep hygiene and behavioral coaching", "Medication management when clinically appropriate", "Stress reduction and relaxation strategies"],
  },
  {
    title: "Anxiety",
    icon: "🌊",
    imagePath: "/images/conditions/anxiety.jpg",
    tag: "Mood",
    shortDesc: "Persistent worry, fear, or nervousness that interferes with everyday activities.",
    fullDesc: "Anxiety disorders are among the most prevalent mental health conditions, encompassing generalized anxiety disorder (GAD), panic disorder, social anxiety disorder, and specific phobias. Symptoms may include excessive worry, racing thoughts, physical tension, rapid heartbeat, and avoidance behaviors. With proper treatment, anxiety is highly manageable.",
    treatments: ["Cognitive Behavioral Therapy (CBT)", "Medication management (SSRIs, SNRIs)", "Exposure-based therapy", "Mindfulness and relaxation techniques"],
  },
  {
    title: "Depression",
    icon: "🌧️",
    imagePath: "/images/conditions/depression.jpg",
    tag: "Mood",
    shortDesc: "Persistent sadness, loss of interest, and emotional heaviness that affects all areas of life.",
    fullDesc: "Depression is a serious and common mood disorder that goes far beyond feeling sad. It affects how a person thinks, feels, and handles daily activities such as sleeping, eating, and working. Types include major depressive disorder, persistent depressive disorder (dysthymia), postpartum depression, and seasonal affective disorder. Depression is highly treatable with the right support.",
    treatments: ["Psychotherapy (CBT, interpersonal therapy)", "Antidepressant medication management", "Lifestyle and behavioral activation strategies", "Ongoing monitoring and supportive care"],
  },
  {
    title: "Schizophrenia",
    icon: "🔮",
    imagePath: "/images/conditions/schizophrenia.jpg",
    tag: "Psychotic",
    shortDesc: "A complex condition affecting how a person thinks, feels, and perceives reality.",
    fullDesc: "Schizophrenia is a serious mental health condition characterized by distortions in thinking, perception, emotions, language, and behavior. Symptoms may include hallucinations, delusions, disorganized thinking, and diminished emotional expression. With consistent treatment and support, people living with schizophrenia can lead meaningful and fulfilling lives.",
    treatments: ["Antipsychotic medication management", "Supportive psychotherapy", "Psychoeducation for patients and families", "Community support and care coordination"],
  },
  {
    title: "ADHD",
    icon: "⚡",
    imagePath: "/images/conditions/adhd.jpg",
    tag: "Neurodevelopmental",
    shortDesc: "Difficulty with attention, impulse control, and hyperactivity across all age groups.",
    fullDesc: "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition marked by persistent inattention, hyperactivity, and impulsivity that interferes with daily functioning. It affects children, adolescents, and adults alike. ADHD presents differently in each person, and an accurate diagnosis is essential to finding the most effective treatment approach.",
    treatments: ["Medication management (stimulant and non-stimulant)", "Behavioral therapy and coaching", "Organizational and executive function strategies", "Academic or workplace accommodations guidance"],
  },
  {
    title: "Post Traumatic Stress Disorder",
    icon: "🛡️",
    imagePath: "/images/conditions/ptsd.jpg",
    tag: "Trauma",
    shortDesc: "Lasting emotional and psychological effects following exposure to a traumatic event.",
    fullDesc: "PTSD can develop after experiencing or witnessing a traumatic event such as violence, abuse, accidents, natural disasters, or combat. Symptoms include intrusive memories, flashbacks, nightmares, emotional numbness, hypervigilance, and avoidance of trauma-related triggers. Trauma-informed care is at the heart of our approach to PTSD treatment.",
    treatments: ["Trauma-focused cognitive behavioral therapy", "EMDR (Eye Movement Desensitization and Reprocessing)", "Medication management for symptom relief", "Grounding and stabilization techniques"],
  },
  {
    title: "Mood Disorder",
    icon: "🔄",
    imagePath: "/images/conditions/mood-disorder.jpg",
    tag: "Mood",
    shortDesc: "Emotional dysregulation that causes significant shifts in mood, energy, and behavior.",
    fullDesc: "Mood disorders encompass a range of conditions including bipolar disorder (I and II), cyclothymia, and disruptive mood dysregulation disorder. These conditions are characterized by extreme mood episodes — from periods of elevated or irritable mood (mania or hypomania) to deep depressive episodes. Effective treatment helps stabilize mood and restore balance to daily life.",
    treatments: ["Mood-stabilizing medication management", "Psychotherapy and psychoeducation", "Lifestyle rhythm and sleep regulation", "Relapse prevention planning"],
  },
  {
    title: "Sleep Disorder",
    icon: "😴",
    imagePath: "/images/conditions/sleep-disorder.jpg",
    tag: "Sleep",
    shortDesc: "Disruptions to normal sleep patterns that impair health, mood, and daily performance.",
    fullDesc: "Sleep disorders go beyond insomnia and include conditions such as hypersomnia, circadian rhythm disorders, parasomnias (sleepwalking, night terrors), and sleep apnea-related psychological effects. Poor sleep has wide-ranging effects on mental health, including worsening anxiety and depression. A comprehensive evaluation helps identify the root cause and appropriate treatment plan.",
    treatments: ["Behavioral sleep medicine techniques", "CBT-I and sleep scheduling", "Medication when appropriate", "Evaluation of co-occurring mental health conditions"],
  },
  {
    title: "Borderline Personality Disorder",
    icon: "💫",
    imagePath: "/images/conditions/bpd.jpg",
    tag: "Personality",
    shortDesc: "Intense emotional experiences, unstable relationships, and a fluctuating sense of self.",
    fullDesc: "Borderline Personality Disorder (BPD) is characterized by emotional instability, intense and unstable relationships, impulsive behaviors, a distorted or shifting self-image, and fear of abandonment. Many individuals with BPD have experienced significant trauma or adversity. With compassionate, evidence-based care, people with BPD can develop healthier coping strategies and more stable, fulfilling lives.",
    treatments: ["Dialectical Behavior Therapy (DBT)", "Trauma-informed individual therapy", "Emotion regulation and distress tolerance skills", "Medication management for co-occurring symptoms"],
  },
  {
    title: "Psychosis",
    icon: "🌀",
    imagePath: "/images/conditions/psychosis.jpg",
    tag: "Psychotic",
    shortDesc: "A break from reality involving hallucinations, delusions, or disorganized thinking.",
    fullDesc: "Psychosis refers to a state in which a person loses touch with reality, experiencing hallucinations (seeing or hearing things that aren't there), delusions (false fixed beliefs), or severely disorganized thoughts and behavior. Psychosis can occur as part of several conditions, including schizophrenia, bipolar disorder, or as a response to substances or medical conditions. Early intervention leads to significantly better outcomes.",
    treatments: ["Antipsychotic medication management", "Early psychosis intervention programs", "Individual and family supportive therapy", "Coordinated specialty care"],
  },
  {
    title: "Anger Management",
    icon: "🔥",
    imagePath: "/images/conditions/anger.jpg",
    tag: "Behavioral",
    shortDesc: "Difficulty controlling anger responses that affect relationships and daily life.",
    fullDesc: "Anger is a normal emotion, but when it becomes intense, frequent, or uncontrollable, it can damage relationships, lead to poor decisions, and cause significant distress. Problematic anger is often linked to underlying mental health conditions such as depression, PTSD, or personality disorders. Our approach addresses both the anger itself and the underlying causes driving it.",
    treatments: ["Cognitive behavioral techniques for anger", "Emotional regulation and coping skills", "Conflict resolution and communication strategies", "Evaluation for underlying psychiatric conditions"],
  },
];

export default function WhatWeTreatPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const openModal = (i) => { setIsExiting(false); setActiveModal(i); document.body.style.overflow = 'hidden'; };
  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => { setActiveModal(null); setIsExiting(false); document.body.style.overflow = ''; }, 280);
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      {/* ══════════ MODAL ══════════ */}
      {activeModal !== null && (
        <div
          className={`modal-backdrop ${isExiting ? 'modal-exit' : 'modal-enter'}`}
          onClick={closeModal}
        >
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={15} /></button>

            {/* Image placeholder */}
            <div className="modal-img-placeholder">
              <img
                src={conditions[activeModal].imagePath}
                alt={conditions[activeModal].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, borderRadius: '32px 32px 0 0' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(92,126,106,0.1)', border: '1.5px dashed rgba(92,126,106,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                  {conditions[activeModal].icon}
                </div>
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Add image</span>
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 9, color: 'rgba(156,144,136,0.7)' }}>{conditions[activeModal].imagePath}</span>
              </div>
            </div>

            {/* Modal content */}
            <div style={{ padding: '32px 40px 44px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(92,126,106,0.1)', border: '1px solid rgba(92,126,106,0.2)', fontFamily: "'Figtree', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                  {conditions[activeModal].tag}
                </span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 18px' }}>
                {conditions[activeModal].title}
              </h2>

              <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.9, margin: '0 0 28px' }}>
                {conditions[activeModal].fullDesc}
              </p>

              {/* Treatments */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bark)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  Our Approach
                  <span style={{ flex: 1, height: 1, background: 'var(--warm)', display: 'inline-block' }} />
                </p>
                <div style={{ background: 'linear-gradient(145deg, var(--cream), rgba(232,221,208,0.4))', border: '1px solid var(--warm)', borderRadius: 16, padding: '6px 20px' }}>
                  {conditions[activeModal].treatments.map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: i < conditions[activeModal].treatments.length - 1 ? '1px solid rgba(232,221,208,0.7)' : 'none' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold-lt)', border: '1px solid rgba(196,168,130,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontSize: 10, color: 'var(--bark)' }}>✓</div>
                      <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 400, color: 'var(--text-2)', lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="cta-btn" onClick={() => { closeModal(); navigate('/contact'); }}>
                  Book a Consultation <ArrowRight size={15} className="btn-arrow" />
                </button>
                <button onClick={closeModal} style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ minHeight: '100vh', background: 'var(--ivory)', position: 'relative' }}>

        {/* Orbs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="orb-1" style={{ position: 'absolute', top: '6%', right: '6%', width: 580, height: 580, borderRadius: '50%', background: 'radial-gradient(circle, rgba(92,126,106,0.08) 0%, transparent 65%)' }} />
          <div className="orb-2" style={{ position: 'absolute', bottom: '8%', left: '-6%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.09) 0%, transparent 65%)' }} />
        </div>

        <Navbar />

        {/* ═══ HERO ═══ */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px 64px' }}>
            <div className="anim-r1" style={{ marginBottom: 16 }}>
              <span className="section-eyebrow">What We Treat</span>
            </div>
            <h1 className="anim-r2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.6rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)', marginBottom: 20, maxWidth: 720 }}>
              Compassionate care for{' '}
              <em className="shimmer-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>every condition</em>
            </h1>
            <p className="anim-r3" style={{ fontFamily: "'Figtree', sans-serif", fontSize: 16, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 560 }}>
              We provide evidence-based psychiatric treatment for a wide range of mental health conditions — delivered with warmth, precision, and deep clinical expertise. Click any condition to learn more.
            </p>

            {/* Click hint */}
            <div className="anim-r4" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 24, padding: '10px 20px', background: 'rgba(92,126,106,0.07)', border: '1px solid rgba(92,126,106,0.18)', borderRadius: 999 }}>
              <span style={{ fontSize: 14 }}>👆</span>
              <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                Click any card to learn more
              </span>
            </div>
          </div>
        </section>

        {/* ═══ CONDITIONS GRID ═══ */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
            <div
              className="conditions-grid anim-r4"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
            >
              {conditions.map((condition, i) => (
                <div key={i} className="condition-card" onClick={() => openModal(i)}>

                  {/* Image placeholder / actual image */}
                  <div className="img-placeholder-inner">
                    <img
                      src={condition.imagePath}
                      alt={condition.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="placeholder-icon-circle">{condition.icon}</div>
                    <span className="placeholder-label">Add image</span>
                    <span className="placeholder-path">{condition.imagePath}</span>
                  </div>

                  {/* Card content */}
                  <div style={{ padding: '24px 26px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(92,126,106,0.09)', border: '1px solid rgba(92,126,106,0.18)', fontFamily: "'Figtree', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                        {condition.tag}
                      </span>
                      <span style={{ fontSize: 18 }}>{condition.icon}</span>
                    </div>

                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: 'var(--text)', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {condition.title}
                    </h3>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13.5, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.75, margin: 0, flex: 1 }}>
                      {condition.shortDesc}
                    </p>

                    <div className="card-learn-row">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)', flexShrink: 0 }} />
                      Learn more
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ))}

              {/* "& many more" card */}
              <div style={{
                background: 'linear-gradient(145deg, var(--sage-dk) 0%, #4a7060 60%, var(--sage) 100%)',
                border: '1px solid rgba(92,126,106,0.3)', borderRadius: 24,
                padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden', minHeight: 260,
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 2vw, 1.9rem)', fontStyle: 'italic', color: '#fff', lineHeight: 1.25, margin: '0 0 14px' }}>
                    & many more conditions
                  </p>
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>
                    If you don't see your condition listed, reach out — we treat a wide range of mental health concerns and will help connect you with the right care.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 28, padding: '12px 24px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 999, fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', transition: 'all 0.22s', width: 'fit-content' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                >
                  Contact Us <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
            <div style={{ background: 'linear-gradient(145deg, var(--cream), rgba(232,221,208,0.5))', border: '1px solid var(--warm)', borderRadius: 32, padding: '64px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.06)' }}>
              <div style={{ position: 'absolute', top: -20, right: 40, fontFamily: "'Cormorant Garamond', serif", fontSize: 220, lineHeight: 1, color: 'rgba(196,168,130,0.12)', fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>"</div>
              <div style={{ maxWidth: 560, position: 'relative' }}>
                <div style={{ marginBottom: 16 }}><span className="section-eyebrow">Ready to Begin?</span></div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 16px' }}>
                  Your path to wellness{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--sage)', fontWeight: 400 }}>starts here</em>
                </h2>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                  Schedule a consultation today and take the first step toward better mental health — from the comfort of your home.
                </p>
              </div>
              <button className="cta-btn" onClick={() => navigate('/contact')} style={{ padding: '18px 40px', fontSize: 15 }}>
                Book an Appointment <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}