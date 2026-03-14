import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, CheckCircle } from 'lucide-react';
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
  @keyframes pulseHint {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.12); }
  }

  /* ── 3D Flip animation ── */
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
    from { opacity: 0; backdrop-filter: blur(0px); }
    to   { opacity: 1; backdrop-filter: blur(10px); }
  }
  @keyframes backdropOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  .modal-enter .modal-panel { animation: flipIn 0.55s cubic-bezier(0.16,1,0.3,1) both; }
  .modal-exit  .modal-panel { animation: flipOut 0.3s ease-in both; }
  .modal-enter { animation: backdropIn 0.3s ease both; }
  .modal-exit  { animation: backdropOut 0.3s ease both; }

  .svc-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .svc-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .svc-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .svc-r4 { animation: revealFade 1s ease 0.55s both; }
  .svc-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .svc-orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }
  .svc-orb-3 { animation: floatOrb 7s ease-in-out 4s infinite; }

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

  /* ── Service card ── */
  .svc-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(242,237,229,0.55) 100%);
    border: 1px solid var(--warm); border-radius: 24px;
    padding: 36px 32px 28px; backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; overflow: hidden; cursor: pointer;
  }
  .svc-card:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: rgba(92,126,106,0.5);
    box-shadow: 0 24px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(92,126,106,0.15);
  }
  .svc-card:hover .learn-more-row { opacity: 1; transform: translateY(0); }
  .svc-card:hover .card-icon-wrap { background: linear-gradient(135deg, rgba(92,126,106,0.15) 0%, var(--gold-lt) 100%); border-color: rgba(92,126,106,0.3); }

  .card-icon-wrap {
    width: 58px; height: 58px; border-radius: 18px;
    background: linear-gradient(135deg, var(--gold-lt) 0%, rgba(92,126,106,0.08) 100%);
    border: 1px solid rgba(196,168,130,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin-bottom: 22px;
    transition: all 0.25s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  }

  .learn-more-row {
    display: flex; align-items: center; gap: 8px; margin-top: 20px;
    font-family: 'Figtree', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--sage);
    opacity: 0; transform: translateY(6px); transition: opacity 0.22s, transform 0.22s;
  }
  .learn-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); animation: pulseHint 1.5s ease-in-out infinite; }

  /* ── Modal backdrop ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(28,24,20,0.7);
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }

  /* ── Modal panel ── */
  .modal-panel {
    background: var(--ivory); border-radius: 32px;
    width: 100%; max-width: 820px; max-height: 90vh; overflow-y: auto;
    position: relative;
    box-shadow: 0 48px 120px rgba(0,0,0,0.25), 0 12px 40px rgba(0,0,0,0.12);
    transform-origin: center center;
  }
  .modal-panel::-webkit-scrollbar { width: 4px; }
  .modal-panel::-webkit-scrollbar-track { background: transparent; }
  .modal-panel::-webkit-scrollbar-thumb { background: var(--warm); border-radius: 4px; }

  .modal-header {
    background: linear-gradient(145deg, var(--sage-dk) 0%, #4a7060 50%, var(--sage) 100%);
    border-radius: 32px 32px 0 0; padding: 52px 56px 48px;
    position: relative; overflow: hidden;
  }
  .modal-header::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(196,168,130,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .modal-header::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 44px;
    background: var(--ivory); clip-path: polygon(0 100%, 100% 0, 100% 100%);
  }
  .modal-close {
    position: absolute; top: 20px; right: 20px;
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; color: #fff;
  }
  .modal-close:hover { background: rgba(255,255,255,0.24); transform: scale(1.1) rotate(90deg); }
  .modal-body { padding: 16px 56px 56px; }

  /* Section dividers inside modal */
  .modal-section { margin-bottom: 36px; }
  .modal-section-title {
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--bark);
    margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
  }
  .modal-section-title::after { content: ''; flex: 1; height: 1px; background: var(--warm); }

  .modal-check-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 13px 0; border-bottom: 1px solid rgba(232,221,208,0.7);
  }
  .modal-check-item:last-child { border-bottom: none; }

  .info-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px;
  }
  .info-block {
    background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(242,237,229,0.5));
    border: 1px solid var(--warm); border-radius: 16px; padding: 20px 22px;
  }
  .info-block-label {
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-3);
    margin-bottom: 8px;
  }
  .info-block-text {
    font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400;
    color: var(--text); line-height: 1.5; font-style: italic;
  }

  /* ── Condition cards ── */
  .condition-card {
    position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 3/4;
    background: linear-gradient(145deg, var(--cream) 0%, var(--warm) 100%);
    border: 1px solid var(--warm); box-shadow: 0 16px 48px rgba(0,0,0,0.09);
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .condition-card:hover { transform: translateY(-8px); box-shadow: 0 28px 64px rgba(0,0,0,0.13); }
  .condition-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .condition-card:hover img { transform: scale(1.04); }
  .card-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(28,24,20,0.78) 100%); }
  .card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 24px 28px; }
  .card-tag {
    display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px;
    background: rgba(196,168,130,0.25); border: 1px solid rgba(196,168,130,0.4);
    border-radius: 999px; font-family: 'Figtree', sans-serif; font-size: 10px;
    font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.85); margin-bottom: 8px;
  }
  .card-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: #fff; line-height: 1.15; margin: 0; }
  .img-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(145deg, var(--cream), var(--warm)); gap: 10px; }
  .placeholder-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(92,126,106,0.1); border: 1px dashed rgba(92,126,106,0.3); display: flex; align-items: center; justify-content: center; font-size: 28px; }

  /* ── Spec pills ── */
  .spec-pill {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 12px 20px; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 500;
    backdrop-filter: blur(8px); transition: all 0.22s; text-align: center; cursor: default;
  }
  .spec-pill:hover { transform: translateY(-3px); }

  .svc-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 34px; background: var(--sage); color: #fff; border: none; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28);
  }
  .svc-btn:hover { transform: translateY(-2px) scale(1.02); background: var(--sage-dk); box-shadow: 0 10px 36px rgba(92,126,106,0.38); }
  .svc-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  .shimmer-text {
    background: linear-gradient(90deg, var(--sage-dk) 0%, var(--sage-lt) 40%, var(--gold) 60%, var(--sage-dk) 100%);
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 4s linear 1s infinite;
  }

  /* ── Insurance ticker ── */
  @keyframes tickerScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-track {
    display: flex; gap: 0;
    animation: tickerScroll 32s linear infinite;
    width: max-content;
  }
  .ticker-track:hover { animation-play-state: paused; }
  .ticker-item {
    display: flex; align-items: center; gap: 14px;
    padding: 0 28px; flex-shrink: 0;
    border-right: 1px solid rgba(255,255,255,0.15);
  }
  .ticker-logo-box {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
    backdrop-filter: blur(8px);
  }
  .ticker-name {
    font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.9); white-space: nowrap; letter-spacing: 0.01em;
  }

  .dark-band { background: var(--sage-dk); position: relative; overflow: hidden; }
  .dark-band::before { content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 40px; background: var(--ivory); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0); }
  .dark-band::after  { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 40px; background: var(--ivory); clip-path: polygon(0 100%, 100% 0, 100% 100%); }

  @media (max-width: 900px) {
    .svc-grid { grid-template-columns: repeat(2,1fr) !important; }
    .spec-grid { grid-template-columns: repeat(2,1fr) !important; }
    .condition-grid { grid-template-columns: repeat(2,1fr) !important; }
    .modal-header { padding: 36px 28px 32px !important; }
    .modal-body { padding: 12px 28px 40px !important; }
    .info-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    .svc-grid { grid-template-columns: 1fr !important; }
    .spec-grid { grid-template-columns: 1fr !important; }
    .condition-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
`;

const services = [
  {
    title: "Psychiatric Evaluation",
    icon: "🔍",
    shortDesc: "Comprehensive assessment and diagnosis of mental health conditions for all age groups.",
    fullTitle: "Comprehensive Psychiatric Evaluations",
    tagline: "Every mental health journey begins with understanding.",
    who: "Adolescents, adults & geriatric patients",
    format: "Virtual telehealth via secure video",
    intro: "Our psychiatric evaluations provide a thorough, compassionate assessment of your emotional, behavioral, and cognitive well-being. We take time to truly understand your full story — not just your symptoms.",
    body: "During your evaluation, we review your current symptoms in depth, your personal and family mental health history, any medical conditions or medications, lifestyle factors such as sleep and stress, and the social and environmental pressures shaping your daily experience. This holistic view allows us to form an accurate diagnosis and design a care plan that fits your life — not a one-size-fits-all template.",
    body2: "We understand that seeking psychiatric care can feel overwhelming. Our evaluations are structured to be thorough yet comfortable, giving you space to speak openly while our clinicians listen carefully. You'll leave your first visit with clarity about your diagnosis, a shared understanding of your treatment options, and a concrete plan for moving forward.",
    checks: [
      "Comprehensive mental health assessment covering mood, behavior, and cognition",
      "Validated diagnostic screening tools and structured clinical interviews",
      "Full review of medical history, family history, and current medications",
      "Discussion of personal goals, values, and treatment preferences",
      "Personalized, evidence-based care plan aligned with your needs",
    ],
  },
  {
    title: "Diagnosis & Treatment",
    icon: "💊",
    shortDesc: "Expert diagnosis and personalized treatment plans tailored to your unique needs.",
    fullTitle: "Diagnosis & Personalized Treatment",
    tagline: "Precision, compassion, and evidence at every step.",
    who: "All ages — adolescents through geriatric",
    format: "Virtual, ongoing telehealth care",
    intro: "Accurate diagnosis is the foundation of effective treatment. We combine clinical expertise with validated tools to ensure your diagnosis reflects your full picture — not just a checklist of symptoms.",
    body: "Our diagnostic process involves structured clinical interviews, validated questionnaires such as the PHQ-9 for depression and GAD-7 for anxiety, and a thorough review of your medical and psychiatric history. We also consider life context — stressors, trauma history, relationships, and daily functioning — because mental health does not exist in isolation from the rest of your life.",
    body2: "Treatment is never prescribed from a template. We work collaboratively with you to design a plan that may combine medication, psychotherapy, lifestyle strategies, and ongoing monitoring — adjusting as your needs evolve. Our goal is lasting recovery and a meaningful improvement in your quality of life.",
    checks: [
      "Structured clinical interview and in-depth diagnostic evaluation",
      "Validated questionnaires (PHQ-9, GAD-7, ADHD scales, and more)",
      "Physical health review to rule out medical contributions to symptoms",
      "Full consideration of life context, trauma history, and social factors",
      "Collaborative, personalized treatment planning you actively help shape",
    ],
  },
  {
    title: "Medication Management",
    icon: "📋",
    shortDesc: "Careful, evidence-based prescribing with ongoing monitoring and thoughtful adjustments.",
    fullTitle: "Medication Management",
    tagline: "The right medication. The right dose. The right reason.",
    who: "Adolescents (13+), adults & geriatric patients",
    format: "Regular virtual follow-up appointments",
    intro: "Medication management at Gigi Psychiatric Services is guided by three principles: safety, precision, and collaboration. We don't simply prescribe — we partner with you throughout every step of your medication journey.",
    body: "We begin with a comprehensive medication review, assessing your current prescriptions, past medication history, allergies, and how previous treatments have worked. From there, we recommend evidence-based options tailored specifically to your diagnosis, symptom severity, and overall health profile — including any medical conditions that may influence which medications are appropriate.",
    body2: "After beginning medication, we schedule regular follow-ups to monitor your response, assess for side effects, and make any necessary adjustments. We also educate you on what to expect — timelines for effectiveness, potential side effects, and how to communicate changes in your symptoms. Our goal is that you always feel informed, empowered, and confident in your treatment.",
    checks: [
      "Comprehensive medication review including past treatments and allergies",
      "Evidence-based prescribing tailored to diagnosis, severity, and health profile",
      "Regular follow-up visits to monitor effectiveness and safety",
      "Dose adjustments based on your response, progress, and side effect profile",
      "Full education on medication expectations, risks, benefits, and timelines",
    ],
  },
  {
    title: "Supportive Therapy",
    icon: "💚",
    shortDesc: "Structured, compassionate psychotherapy to build resilience and emotional well-being.",
    fullTitle: "Supportive Therapy",
    tagline: "A safe space to grow, heal, and find clarity.",
    who: "Adolescents, adults & geriatric patients",
    format: "Individual virtual therapy sessions",
    intro: "Psychotherapy at Gigi Psychiatric Services is a collaborative process — not something done to you, but something we build together. Our therapists meet you where you are and help you move toward where you want to be.",
    body: "We offer structured, supportive therapy tailored to your unique experiences, challenges, and personal goals. Our approach integrates several evidence-based modalities including Cognitive Behavioral Therapy (CBT), which helps you identify and reframe unhelpful thought patterns; trauma-informed care for those with histories of adverse experiences; solution-focused therapy for practical skill-building; and motivational interviewing to strengthen your own intrinsic motivation for change.",
    body2: "Therapy works best when it feels safe, consistent, and genuinely collaborative. We work to build a strong therapeutic relationship from your very first session — creating an environment where you can speak honestly without judgment. Over time, you'll develop stronger emotional regulation, clearer self-awareness, healthier coping strategies, and the tools to navigate future challenges with confidence.",
    checks: [
      "Cognitive Behavioral Therapy (CBT) to reframe negative thought patterns",
      "Trauma-informed interventions for adverse experiences and PTSD",
      "Solution-focused therapy for practical coping skill development",
      "Motivational interviewing to support lasting behavioral change",
      "Ongoing support for improved resilience, relationships, and self-awareness",
    ],
  },
  {
    title: "Virtual Telehealth",
    icon: "💻",
    shortDesc: "Secure, HIPAA-compliant virtual care — the same quality as in-person, from anywhere.",
    fullTitle: "Virtual Telehealth Services",
    tagline: "Mental health care without barriers.",
    who: "All patients across Maryland",
    format: "HIPAA-compliant secure video platform",
    intro: "At Gigi Psychiatric Services, telehealth is not a compromise — it is our intentional model of care. We believe that geography, transportation, and scheduling should never stand between you and quality psychiatric support.",
    body: "Our virtual appointments are conducted through a secure, HIPAA-compliant video platform that protects your privacy at every step. Whether you're at home, in your car, or in a private office space, you can connect with your clinician with the same level of professionalism, confidentiality, and clinical rigor as an in-person visit. All services — evaluations, therapy, medication management, and follow-ups — are available virtually.",
    body2: "Telehealth also supports better continuity of care. Fewer missed appointments, shorter wait times, and the comfort of a familiar environment mean you're more likely to stay consistent with treatment — and consistency is one of the strongest predictors of positive outcomes in psychiatric care. We are proud to serve patients across Maryland and remain committed to making excellent mental health care accessible to all.",
    checks: [
      "Comprehensive psychiatric evaluations via secure video",
      "Medication management and prescription follow-ups virtually",
      "Individual psychotherapy sessions from the comfort of your home",
      "Treatment planning, progress reviews, and care coordination",
      "Secure, HIPAA-compliant technology protecting your privacy at all times",
    ],
  },
  {
    title: "Adolescent, Adult & Geriatric Care",
    icon: "👥",
    shortDesc: "Specialized psychiatric treatment across every stage of life — from teens to older adults.",
    fullTitle: "Care Across Every Stage of Life",
    tagline: "Mental health looks different at every age. So does our care.",
    who: "Ages 13 and up — adolescents, adults, older adults",
    format: "Age-appropriate virtual psychiatric care",
    intro: "We recognize that mental health is not one-size-fits-all. The challenges a teenager faces are fundamentally different from those of a working adult or an older adult navigating late-life transitions. Our care is designed to reflect that reality.",
    body: "For adolescents (ages 13 and up), we provide age-sensitive psychiatric evaluation and treatment for conditions including depression, anxiety, ADHD, mood disorders, and behavioral challenges. We work closely with families when appropriate, and prioritize creating a non-judgmental, comfortable environment where young patients feel heard and respected. Academic pressure, social dynamics, identity development, and family relationships all factor into our approach.",
    body2: "For adults, we address the full spectrum of psychiatric conditions — from anxiety and depression to bipolar disorder, PTSD, and personality disorders — with care that recognizes the complexity of work, relationships, and life transitions. For geriatric patients, we provide specialized support that accounts for cognitive changes, grief, late-life depression, medication sensitivities, and the unique social and physical challenges of aging. In every age group, our goal is the same: dignified, effective, individualized care.",
    checks: [
      "Adolescent psychiatric care (ages 13+) with family-inclusive coordination",
      "Adult treatment for depression, anxiety, PTSD, mood disorders, and more",
      "Geriatric psychiatry with attention to cognitive health and age-related factors",
      "Age-appropriate clinical communication and care planning at every stage",
      "Trauma-sensitive, non-judgmental environment for patients of all backgrounds",
    ],
  },
];

const conditions = [
  { title: "Anxiety", tag: "We Treat", icon: "🌊", image: "/images/anxiety.png", description: "Generalized anxiety, panic disorder, social anxiety & more" },
  { title: "Depression", tag: "We Treat", icon: "🌧️", image: "/images/depression.png", description: "Major depressive disorder, persistent depressive disorder & more" },
  { title: "ADHD", tag: "We Treat", icon: "⚡", image: "/images/adhd.png", description: "Attention deficit hyperactivity disorder across all age groups" },
  { title: "Bipolar Disorder", tag: "We Treat", icon: "🔄", image: "/images/bipolar.png", description: "Bipolar I, Bipolar II, and cyclothymic disorder" },
];

const specializations = [
  "Insomnia", "Anxiety", "Depression", "Schizophrenia", "ADHD",
  "Post Traumatic Stress Disorder", "Mood Disorder", "Sleep Disorder",
  "Borderline Personality Disorder", "Psychosis", "Anger Management",
  "& many more conditions",
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const openModal = (i) => { setIsExiting(false); setActiveModal(i); };
  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => { setActiveModal(null); setIsExiting(false); }, 280);
  };

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeModal !== null) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

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

            {/* Header */}
            <div className="modal-header">
              <button className="modal-close" onClick={closeModal}><X size={16} /></button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {services[activeModal].icon}
                </div>
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  Gigi Psychiatric Services
                </span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em', color: '#fff', margin: '0 0 14px' }}>
                {services[activeModal].fullTitle}
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
                "{services[activeModal].tagline}"
              </p>
            </div>

            {/* Body */}
            <div className="modal-body">

              {/* At-a-glance info blocks */}
              <div className="info-grid" style={{ marginTop: 8 }}>
                <div className="info-block">
                  <div className="info-block-label">Who We Serve</div>
                  <div className="info-block-text">{services[activeModal].who}</div>
                </div>
                <div className="info-block">
                  <div className="info-block-label">Visit Format</div>
                  <div className="info-block-text">{services[activeModal].format}</div>
                </div>
              </div>

              {/* Overview */}
              <div className="modal-section">
                <div className="modal-section-title">Overview</div>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.9, margin: 0 }}>
                  {services[activeModal].intro}
                </p>
              </div>

              {/* Our Approach */}
              <div className="modal-section">
                <div className="modal-section-title">Our Approach</div>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.9, margin: '0 0 16px' }}>
                  {services[activeModal].body}
                </p>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.9, margin: 0 }}>
                  {services[activeModal].body2}
                </p>
              </div>

              {/* Checklist */}
              <div className="modal-section">
                <div className="modal-section-title">Your personalized plan may include</div>
                <div style={{ background: 'linear-gradient(145deg, var(--cream), rgba(232,221,208,0.4))', border: '1px solid var(--warm)', borderRadius: 20, padding: '8px 24px', marginBottom: 36 }}>
                  {services[activeModal].checks.map((item, i) => (
                    <div key={i} className="modal-check-item">
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold-lt)', border: '1px solid rgba(196,168,130,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, fontSize: 11, color: 'var(--bark)' }}>✓</div>
                      <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 400, color: 'var(--text-2)', lineHeight: 1.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button className="svc-btn" onClick={() => { closeModal(); navigate('/contact'); }}>
                  Book a Consultation <ArrowRight size={15} className="btn-arrow" />
                </button>
                <button onClick={closeModal} style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* Orbs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="svc-orb-1" style={{ position: "absolute", top: "5%", right: "8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)" }} />
          <div className="svc-orb-2" style={{ position: "absolute", bottom: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)" }} />
          <div className="svc-orb-3" style={{ position: "absolute", top: "40%", left: "38%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)" }} />
        </div>

        <Navbar />

        {/* ═══ HERO ═══ */}
        <section style={{ position: "relative", zIndex: 1, paddingTop: 40 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 32px 80px" }}>
            <div className="svc-r1" style={{ marginBottom: 16 }}>
              <span className="section-eyebrow">What We Offer</span>
            </div>
            <h1 className="svc-r2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)", lineHeight: 1.05, letterSpacing: "-0.01em", color: "var(--text)", marginBottom: 20 }}>
              Comprehensive{" "}
              <em className="shimmer-text" style={{ fontStyle: "italic", fontWeight: 400 }}>psychiatric</em>
              <br />care, built for you
            </h1>
            <p className="svc-r3" style={{ fontFamily: "'Figtree', sans-serif", fontSize: 16, fontWeight: 300, color: "var(--text-2)", lineHeight: 1.8, maxWidth: 560 }}>
              From evaluation to ongoing therapy — we provide a full spectrum of virtual mental health services delivered with warmth and clinical excellence.
            </p>
          </div>
        </section>

        {/* ═══ INSURANCE TICKER ═══ */}
        <section style={{ position: "relative", zIndex: 1, marginBottom: 56 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 16px" }}>
            <span className="section-eyebrow">Insurances Accepted</span>
          </div>
          <div style={{ background: "linear-gradient(135deg, var(--sage-dk) 0%, #4a7060 50%, var(--sage) 100%)", overflow: "hidden", padding: "18px 0", position: "relative", boxShadow: "0 8px 32px rgba(61,92,74,0.28), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #3d5c4a, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, #5c7e6a, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ overflow: "hidden" }}>
              <div className="ticker-track">
                {[...Array(2)].map((_, pass) =>
                  [
                    { name: "Aetna Health Plans", icon: "🏥" },
                    { name: "Blue Cross Blue Shield MD · Carefirst", icon: "💙" },
                    { name: "Cigna", icon: "🩺" },
                    { name: "GEHA", icon: "🏛️" },
                    { name: "Humana Veterans Healthcare Services", icon: "⭐" },
                    { name: "Maryland Public Behavioral Health", icon: "🌿" },
                    { name: "Medicaid of Maryland", icon: "🛡️" },
                    { name: "Medicare DC Metro Area", icon: "🏙️" },
                    { name: "Oxford Health Plan", icon: "📋" },
                    { name: "Tricare East", icon: "🎖️" },
                    { name: "United HealthCare of All States", icon: "🇺🇸" },
                  ].map((ins, i) => (
                    <div key={`${pass}-${i}`} className="ticker-item">
                      <div className="ticker-logo-box">{ins.icon}</div>
                      <span className="ticker-name">{ins.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES GRID ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 32px" }}>

            {/* Click hint pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, padding: '10px 20px', background: 'rgba(92,126,106,0.07)', border: '1px solid rgba(92,126,106,0.18)', borderRadius: 999, width: 'fit-content' }}>
              <span style={{ fontSize: 14, display: 'inline-block', animation: 'pulseHint 1.8s ease-in-out infinite' }}>👆</span>
              <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                Click any card to learn more
              </span>
            </div>

            <div className="svc-grid svc-r4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {services.map((svc, i) => (
                <div key={i} className="svc-card" onClick={() => openModal(i)}>
                  <div className="card-icon-wrap">{svc.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: "var(--text)", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 300, color: "var(--text-2)", lineHeight: 1.75, margin: 0 }}>
                    {svc.shortDesc}
                  </p>
                  <div className="learn-more-row">
                    <span className="learn-dot" />
                    Learn more
                    <ArrowRight size={12} />
                  </div>
                  <div style={{ position: "absolute", bottom: -16, right: -16, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(92,126,106,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONDITIONS IMAGE GRID ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 96px" }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ marginBottom: 14 }}><span className="section-eyebrow">Conditions We Treat</span></div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.6rem)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--text)", margin: 0 }}>
                  Focused care for the <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>conditions<br />that matter most</em>
                </h2>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 300, color: "var(--text-3)", lineHeight: 1.75, maxWidth: 340, margin: 0 }}>
                  Evidence-based treatment for these and many more mental health conditions — delivered virtually across Maryland.
                </p>
              </div>
            </div>
            <div className="condition-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {conditions.map((condition, i) => (
                <div key={i} className="condition-card">
                  <img src={condition.image} alt={condition.title} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="img-placeholder" style={{ display: 'none', position: 'absolute', inset: 0 }}>
                    <div className="placeholder-icon">{condition.icon}</div>
                    <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: 'uppercase' }}>Add image</span>
                    <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, color: "var(--text-3)" }}>/images/{condition.title.toLowerCase().replace(' ', '')}.png</span>
                  </div>
                  <div className="card-overlay" />
                  <div className="card-label">
                    <div className="card-tag"><span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />{condition.tag}</div>
                    <p className="card-title">{condition.title}</p>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, margin: "6px 0 0" }}>{condition.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SPECIALIZATIONS ═══ */}
        <section className="dark-band" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ marginBottom: 14 }}><span className="section-eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>Specializations</span></div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 14px" }}>
                Conditions we <em style={{ fontStyle: "italic", color: "rgba(196,168,130,0.9)", fontWeight: 400 }}>treat</em>
              </h2>
              <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto" }}>
                We specialize in treating a wide range of mental health conditions across all age groups
              </p>
            </div>
            <div className="spec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {specializations.map((spec, i) => (
                <div key={i} className="spec-pill" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.8)" }}>
                  {spec}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 32px" }}>
            <div style={{ background: "linear-gradient(145deg, var(--cream) 0%, rgba(232,221,208,0.5) 100%)", border: "1px solid var(--warm)", borderRadius: 32, padding: "64px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40, position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "absolute", top: -20, right: 40, fontFamily: "'Cormorant Garamond', serif", fontSize: 220, lineHeight: 1, color: "rgba(196,168,130,0.12)", fontStyle: "italic", pointerEvents: "none", userSelect: "none" }}>"</div>
              <div style={{ maxWidth: 580, position: "relative" }}>
                <div style={{ marginBottom: 16 }}><span className="section-eyebrow">Ready to Begin?</span></div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px" }}>
                  Your path to wellness <em style={{ fontStyle: "italic", color: "var(--sage)", fontWeight: 400 }}>starts here</em>
                </h2>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: "var(--text-2)", lineHeight: 1.8, margin: 0 }}>
                  Schedule a consultation today and take the first step toward better mental health — from the comfort of your home.
                </p>
              </div>
              <button className="svc-btn" onClick={() => navigate('/contact')} style={{ padding: '18px 40px', fontSize: 15 }}>
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