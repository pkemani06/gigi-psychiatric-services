import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, Calendar, Heart, Share2 } from 'lucide-react';
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
    from { opacity: 0; transform: translateY(32px); }
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
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .blog-orb-1 { animation: floatOrb 11s ease-in-out infinite; }
  .blog-orb-2 { animation: floatOrb 14s ease-in-out 3s infinite; }

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

  /* Blog listing card */
  .blog-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.85), rgba(242,237,229,0.5));
    border: 1px solid var(--warm); border-radius: 24px;
    overflow: hidden; cursor: pointer;
    transition: all 0.32s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
  }
  .blog-card:hover {
    transform: translateY(-6px);
    border-color: rgba(92,126,106,0.4);
    box-shadow: 0 24px 56px rgba(0,0,0,0.1), 0 4px 16px rgba(92,126,106,0.12);
  }
  .blog-card:hover .blog-card-arrow { transform: translateX(4px); opacity: 1; }
  .blog-card-arrow { transition: transform 0.22s, opacity 0.22s; opacity: 0.4; }

  /* Article reading view */
  .article-section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
    font-weight: 500;
    font-style: italic;
    color: var(--sage-dk);
    line-height: 1.3;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .article-section-heading::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 28px;
    background: linear-gradient(180deg, var(--gold), var(--sage));
    border-radius: 2px;
    flex-shrink: 0;
  }

  .article-body-text {
    font-family: 'Figtree', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: var(--text-2);
    line-height: 1.95;
    margin: 0 0 32px;
  }

  .article-pull-quote {
    background: linear-gradient(145deg, rgba(92,126,106,0.06), rgba(196,168,130,0.08));
    border-left: 3px solid var(--gold);
    border-radius: 0 16px 16px 0;
    padding: 24px 28px;
    margin: 8px 0 36px;
  }
  .article-pull-quote p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 400;
    font-style: italic;
    color: var(--sage-dk);
    line-height: 1.6;
    margin: 0;
  }

  .cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 34px; background: var(--sage); color: #fff; border: none; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28);
  }
  .cta-btn:hover { transform: translateY(-2px) scale(1.02); background: var(--sage-dk); box-shadow: 0 10px 36px rgba(92,126,106,0.38); }
  .cta-btn:hover .btn-arrow { transform: translateX(3px); }
  .btn-arrow { transition: transform 0.2s; }

  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--sage); background: none; border: none; cursor: pointer;
    padding: 0; transition: gap 0.2s;
  }
  .back-btn:hover { gap: 4px; }

  .tag-pill {
    display: inline-flex; align-items: center;
    padding: 5px 14px; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
  }

  .reading-progress {
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, var(--sage-dk), var(--gold));
    z-index: 100; transition: width 0.1s linear;
    box-shadow: 0 1px 6px rgba(92,126,106,0.4);
  }

  .share-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 18px; border-radius: 999px;
    font-family: 'Figtree', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    background: rgba(92,126,106,0.08); border: 1px solid rgba(92,126,106,0.2);
    color: var(--sage); cursor: pointer; transition: all 0.2s;
  }
  .share-btn:hover { background: rgba(92,126,106,0.14); transform: translateY(-1px); }

  @keyframes r1 { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
  @keyframes r2 { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
  @keyframes r3 { from { opacity:0; } to { opacity:1; } }
  .anim-r1 { animation: r1 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .anim-r2 { animation: r2 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .anim-r3 { animation: r3 0.8s ease 0.4s both; }
  .anim-r4 { animation: r3 0.8s ease 0.55s both; }
  .page-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image: url('/images/backdrop.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const article = {
  id: 1,
  category: "Mental Health",
  readTime: "7 min read",
  date: "March 2025",
  title: "If You Are Suffering From Depression and Not Seeking Help",
  subtitle: "The Silent Weight of Untreated Depression",
  excerpt: "For many people, depression doesn't arrive suddenly. It often begins quietly — like a shadow that slowly stretches across everyday life. Understanding its reach is the first step toward healing.",
  sections: [
    {
      heading: "The Silent Weight of Untreated Depression",
      body: "For many people, depression doesn't arrive suddenly. It often begins quietly — like a shadow that slowly stretches across everyday life. At first, it may feel like simple exhaustion or a few difficult days. But over time, the heaviness grows, making even the smallest tasks feel overwhelming.",
      body2: "Depression is far more than occasional sadness. It's a serious mental health condition that can affect how a person thinks, feels, and functions. Yet despite the availability of effective treatments, countless individuals continue to suffer in silence, unsure of how to ask for help or afraid of being misunderstood.",
    },
    {
      heading: "When the World Begins to Feel Distant",
      body: "One of the most painful aspects of untreated depression is the growing sense of isolation. Activities that once brought joy may lose their appeal, and social gatherings can feel exhausting rather than comforting. Gradually, people may begin withdrawing from friends, family, and colleagues.",
      pullQuote: "The outside world keeps moving, but someone experiencing depression may feel as though they are watching life from behind a glass wall — present, yet disconnected.",
      body2: "The stigma surrounding mental health can make it even harder to open up, reinforcing the belief that it's better to stay silent about the struggle.",
    },
    {
      heading: "The Quiet Strain on Relationships",
      body: "Depression doesn't only affect the person experiencing it; it also touches the lives of those around them. Loved ones may notice changes — less conversation, less energy, fewer shared moments.",
      body2: "What might look like indifference is often emotional exhaustion. Someone living with depression may desperately want to connect but simply lack the energy or clarity to do so. Without understanding and support, these changes can lead to misunderstandings and distance in relationships.",
    },
    {
      heading: "When the Body Begins to Feel the Burden",
      body: "Depression also takes a toll on the body. Sleep may become restless or excessive. Appetite may disappear — or increase in an attempt to find comfort. Motivation to exercise or maintain healthy routines often fades.",
      body2: "Over time, these changes can contribute to physical health problems such as heart disease, diabetes, and weight fluctuations. The mind and body are deeply connected, and when mental health suffers, physical health often follows.",
    },
    {
      heading: "The Impact on Work and Daily Life",
      body: "For someone living with untreated depression, focusing on work or school can feel like climbing a mountain. Concentration becomes difficult, decisions feel overwhelming, and tasks that once seemed simple suddenly require immense effort.",
      body2: "Missed deadlines, reduced productivity, and frequent absences may begin to affect professional or academic life. This can lead to frustration, self-doubt, and financial stress — deepening the emotional weight already being carried.",
    },
    {
      heading: "When Hopelessness Takes Hold",
      body: "Perhaps the most concerning aspect of untreated depression is the way hopelessness can grow over time. Feelings of worthlessness or despair may become so intense that some individuals begin to experience thoughts of self-harm or suicide.",
      pullQuote: "These thoughts are not a sign of weakness — they are a sign that someone is in deep pain and needs support. Reaching out during these moments can be life-saving.",
    },
    {
      heading: "A Path Toward Healing",
      body: "The most important thing to remember is that depression is treatable. Therapy, medication, and supportive lifestyle changes have helped millions of people regain balance and hope.",
      body2: "Seeking help can feel intimidating at first, but it is often the first step toward relief. With the guidance of a licensed mental health professional, individuals can learn coping strategies, process difficult emotions, and gradually rebuild their sense of well-being.",
    },
    {
      heading: "You Don't Have to Carry It Alone",
      body: "Living with untreated depression can feel like carrying an invisible weight every day. But no one has to face that burden alone.",
      pullQuote: "Support is available, and healing is possible.",
      body2: "If you or someone you know is struggling with anxiety, depression, or mood swings, consider reaching out to a licensed psychologist or mental health professional. Taking that first step can open the door to understanding, recovery, and a brighter future.",
    },
  ],
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [reading, setReading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const el = e.target;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="page-backdrop" aria-hidden="true" />
      {reading && (
        <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />
      )}

      <div
        style={{ minHeight: '100vh', background: 'transparent', position: 'relative', overflowY: reading ? 'auto' : 'unset' }}
        onScroll={reading ? handleScroll : undefined}
      >
        {/* Background orbs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="blog-orb-1" style={{ position: 'absolute', top: '8%', right: '4%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(92,126,106,0.08) 0%, transparent 65%)' }} />
          <div className="blog-orb-2" style={{ position: 'absolute', bottom: '12%', left: '-8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.09) 0%, transparent 65%)' }} />
        </div>

        <Navbar />

        {!reading ? (
          /* ═══ BLOG LISTING VIEW ═══ */
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Hero */}
            <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px 64px' }}>
              <div className="anim-r1" style={{ marginBottom: 16 }}>
                <span className="section-eyebrow">Our Blog</span>
              </div>
              <h1 className="anim-r2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--text)', marginBottom: 20, maxWidth: 700 }}>
                Insights for your{' '}
                <em className="shimmer-text" style={{ fontStyle: 'italic', fontWeight: 300 }}>mental  wellness </em>{' '}
                journey
              </h1>
              <p className="anim-r3" style={{ fontFamily: "'Figtree', sans-serif", fontSize: 16, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 520 }}>
                Evidence-informed articles, compassionate perspectives, and practical guidance from our clinical team — written to help you understand and support your mental health.
              </p>
            </section>

            {/* Featured article card */}
            <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
              <div className="anim-r4">
                {/* Featured large card */}
                <div
                  className="blog-card"
                  onClick={() => setReading(true)}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 420 }}
                >
                  {/* Left: decorative visual panel */}
                  <div style={{
                    background: 'linear-gradient(145deg, var(--sage-dk) 0%, #4a7060 50%, var(--sage) 100%)',
                    borderRadius: '24px 0 0 24px',
                    padding: '52px 48px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {/* Decorative elements */}
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -20, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(196,168,130,0.2)', border: '1px solid rgba(196,168,130,0.35)', borderRadius: 999, marginBottom: 32 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Featured Article</span>
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 1.25, margin: 0, letterSpacing: '-0.01em' }}>
                        "Depression is far more than occasional sadness."
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        🌧️
                      </div>
                      <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                        Mental Health · Depression
                      </p>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <span className="tag-pill" style={{ background: 'rgba(92,126,106,0.1)', border: '1px solid rgba(92,126,106,0.2)', color: 'var(--sage)' }}>
                          {article.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 400, color: 'var(--text-3)' }}>
                          <Clock size={12} /> {article.readTime}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 400, color: 'var(--text-3)' }}>
                          <Calendar size={12} /> {article.date}
                        </span>
                      </div>

                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 2vw, 2rem)', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 16px' }}>
                        {article.title}
                      </h2>
                      <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                        {article.excerpt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--warm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(145deg, var(--warm), var(--cream))', border: '1px solid rgba(196,168,130,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                          🌿
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text)', margin: 0 }}>Gigi Psychiatric Services</p>
                          <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 400, color: 'var(--text-3)', margin: 0 }}>Clinical Team</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--sage)', fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 600 }}>
                        Read article <ArrowRight size={14} className="blog-card-arrow" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* More articles teaser */}
                <div style={{ marginTop: 20, padding: '28px 36px', background: 'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(242,237,229,0.4))', border: '1px solid var(--warm)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 400, color: 'var(--text)', margin: '0 0 4px' }}>
                      More articles are on the way
                    </p>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--text-3)', margin: 0 }}>
                      Our team is writing on anxiety, ADHD, geriatric care, and more.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                    <Heart size={13} style={{ color: 'var(--gold)' }} /> Coming soon
                  </div>
                </div>
              </div>
            </section>

            {/* CTA strip */}
            <section style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
                <div style={{ background: 'linear-gradient(145deg, var(--cream), rgba(232,221,208,0.5))', border: '1px solid var(--warm)', borderRadius: 32, padding: '56px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.05)' }}>
                  <div style={{ position: 'absolute', top: -24, right: 36, fontFamily: "'Cormorant Garamond', serif", fontSize: 200, lineHeight: 1, color: 'rgba(196,168,130,0.1)', fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>"</div>
                  <div style={{ maxWidth: 520, position: 'relative' }}>
                    <div style={{ marginBottom: 14 }}><span className="section-eyebrow">Ready to Talk?</span></div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--text)', margin: '0 0 14px' }}>
                      You deserve support —{' '}
                      <em style={{ fontStyle: 'italic', color: 'var(--sage)', fontWeight: 400 }}>let's talk</em>
                    </h2>
                    <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                      Our compassionate team is here to help. Book a consultation and take your first step toward healing today.
                    </p>
                  </div>
                  <button className="cta-btn" onClick={() => navigate('/contact')} style={{ padding: '18px 40px', fontSize: 15 }}>
                    Book a Consultation <ArrowRight size={16} className="btn-arrow" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ═══ ARTICLE READING VIEW ═══ */
          <div style={{ position: 'relative', zIndex: 1 }} onScroll={handleScroll}>
            {/* Article header */}
            <div style={{ background: 'linear-gradient(145deg, var(--sage-dk) 0%, #4a7060 60%, var(--sage) 100%)', padding: '60px 32px 96px', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative orbs */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,168,130,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -40, left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
                <button className="back-btn" onClick={() => { setReading(false); setScrollProgress(0); }} style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 36 }}>
                  <ArrowLeft size={14} /> Back to Blog
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
                  <span className="tag-pill" style={{ background: 'rgba(196,168,130,0.2)', border: '1px solid rgba(196,168,130,0.35)', color: 'rgba(255,255,255,0.85)' }}>
                    {article.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Figtree', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    <Clock size={12} /> {article.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Figtree', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    <Calendar size={12} /> {article.date}
                  </span>
                </div>

                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1, letterSpacing: '-0.015em', color: '#fff', margin: '0 0 20px' }}>
                  {article.title}
                </h1>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 600 }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      🌿
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Gigi Psychiatric Services</p>
                      <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>Clinical Team</p>
                    </div>
                  </div>
                  <button className="share-btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }} onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                    <Share2 size={12} /> Share Article
                  </button>
                </div>
              </div>
            </div>

            {/* Curved top of content area */}
            <div style={{ height: 56, background: 'var(--ivory)', marginTop: -2, borderRadius: '0 0 0 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 56, background: 'linear-gradient(145deg, var(--sage-dk), var(--sage))', clipPath: 'ellipse(55% 100% at 50% 0%)', opacity: 0.06 }} />
            </div>

            {/* Article body */}
            <div style={{ maxWidth: 780, margin: '0 auto', padding: '8px 32px 80px' }}>

              {/* Sticky progress context */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48, padding: '12px 20px', background: 'rgba(92,126,106,0.06)', border: '1px solid rgba(92,126,106,0.14)', borderRadius: 16 }}>
                <div style={{ flex: 1, height: 3, background: 'var(--warm)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${scrollProgress}%`, background: 'linear-gradient(90deg, var(--sage-dk), var(--gold))', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 11, fontWeight: 600, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{article.readTime}</span>
              </div>

              {/* Sections */}
              {article.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: 48 }}>
                  <h2 className="article-section-heading">{section.heading}</h2>
                  <p className="article-body-text">{section.body}</p>
                  {section.pullQuote && (
                    <div className="article-pull-quote">
                      <p>{section.pullQuote}</p>
                    </div>
                  )}
                  {section.body2 && (
                    <p className="article-body-text" style={{ marginBottom: 0 }}>{section.body2}</p>
                  )}
                </div>
              ))}

              {/* Crisis resources note */}
              <div style={{ background: 'linear-gradient(145deg, rgba(92,126,106,0.08), rgba(196,168,130,0.06))', border: '1px solid rgba(92,126,106,0.2)', borderRadius: 20, padding: '28px 32px', marginBottom: 48 }}>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', margin: '0 0 10px' }}>
                  If you are in crisis
                </p>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>
                  If you or someone you know is experiencing thoughts of self-harm or suicide, please reach out immediately. Call or text <strong style={{ fontWeight: 600, color: 'var(--text)' }}>988</strong> (Suicide & Crisis Lifeline) or go to your nearest emergency room. You are not alone.
                </p>
              </div>

              {/* End of article CTA */}
              <div style={{ textAlign: 'center', padding: '56px 32px', background: 'linear-gradient(145deg, var(--cream), rgba(232,221,208,0.4))', border: '1px solid var(--warm)', borderRadius: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -16, right: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 160, lineHeight: 1, color: 'rgba(196,168,130,0.1)', fontStyle: 'italic', pointerEvents: 'none', userSelect: 'none' }}>"</div>
                <div style={{ marginBottom: 12 }}><span className="section-eyebrow">Take the First Step</span></div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.15, color: 'var(--text)', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                  Support is available.{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--sage)', fontWeight: 400 }}>Healing is possible.</em>
                </h3>
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 15, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, margin: '0 auto 28px', maxWidth: 460 }}>
                  Our compassionate team is accepting new patients. Book a virtual consultation today — from the comfort of your home.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="cta-btn" onClick={() => navigate('/contact')}>
                    Book a Consultation <ArrowRight size={15} className="btn-arrow" />
                  </button>
                  <button onClick={() => { setReading(false); setScrollProgress(0); window.scrollTo(0,0); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 28px', background: 'none', border: '1px solid var(--warm)', borderRadius: 999, fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-2)', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.color = 'var(--sage)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--warm)'; e.currentTarget.style.color = 'var(--text-2)'; }}
                  >
                    ← Back to Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}