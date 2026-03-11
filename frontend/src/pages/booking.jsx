import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock, User, FileText, Calendar, Mail } from 'lucide-react';
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
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .bk-r1 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .bk-r2 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .bk-r3 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .bk-r4 { animation: revealFade 1s ease 0.5s both; }

  .bk-orb-1 { animation: floatOrb 9s ease-in-out infinite; }
  .bk-orb-2 { animation: floatOrb 12s ease-in-out 2s infinite; }
  .bk-orb-3 { animation: floatOrb 7s ease-in-out 4s infinite; }

  .check-anim { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
  .modal-anim { animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }

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

  /* Week nav button */
  .week-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 999px; border: 1.5px solid var(--warm);
    background: rgba(255,255,255,0.6); backdrop-filter: blur(8px);
    font-family: 'Figtree', sans-serif; font-size: 13px; font-weight: 600;
    color: var(--text-2); cursor: pointer; transition: all 0.22s;
  }
  .week-btn:hover:not(:disabled) {
    border-color: var(--sage); color: var(--sage);
    background: rgba(255,255,255,0.9);
    transform: translateY(-1px); box-shadow: 0 4px 14px rgba(92,126,106,0.12);
  }
  .week-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* Day tab */
  .day-tab {
    border-radius: 20px; padding: 18px 12px; text-align: center;
    border: 1.5px solid var(--warm);
    background: linear-gradient(145deg, rgba(255,255,255,0.75) 0%, rgba(242,237,229,0.4) 100%);
    backdrop-filter: blur(8px);
    cursor: pointer; transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  }
  .day-tab:hover:not(.past):not(.selected) {
    border-color: var(--sage-lt);
    background: rgba(255,255,255,0.95);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(92,126,106,0.1);
  }
  .day-tab.selected {
    border-color: var(--sage);
    background: linear-gradient(145deg, rgba(92,126,106,0.08) 0%, rgba(92,126,106,0.04) 100%);
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 12px 32px rgba(92,126,106,0.16);
  }
  .day-tab.past { opacity: 0.35; cursor: not-allowed; }

  /* Time slot button */
  .time-slot {
    padding: 11px 8px; border-radius: 12px; text-align: center;
    border: 1.5px solid var(--warm);
    background: rgba(255,255,255,0.65); backdrop-filter: blur(6px);
    font-family: 'Figtree', sans-serif; font-size: 12px; font-weight: 500;
    color: var(--text-2); cursor: pointer;
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .time-slot:hover:not(:disabled) {
    background: var(--sage); color: #fff;
    border-color: var(--sage);
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 6px 18px rgba(92,126,106,0.3);
  }
  .time-slot:disabled {
    background: rgba(232,221,208,0.4);
    border-color: var(--warm);
    color: var(--text-3); cursor: not-allowed;
    text-decoration: line-through; opacity: 0.5;
  }

  /* Modal form inputs */
  .bk-input {
    width: 100%; border-radius: 14px;
    border: 1.5px solid var(--warm);
    padding: 12px 16px;
    font-size: 14px; font-family: 'Figtree', sans-serif; font-weight: 400;
    background: rgba(255,255,255,0.7); color: var(--text);
    outline: none; box-sizing: border-box;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  }
  .bk-input::placeholder { color: var(--text-3); }
  .bk-input:focus {
    border-color: var(--sage); background: rgba(255,255,255,0.95);
    box-shadow: 0 0 0 3px rgba(92,126,106,0.1);
  }

  /* Primary btn */
  .bk-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 28px; border-radius: 999px; border: none;
    background: var(--sage); color: #fff;
    font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 4px 20px rgba(92,126,106,0.28);
  }
  .bk-btn-primary:hover:not(:disabled) {
    background: var(--sage-dk); transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 32px rgba(92,126,106,0.38);
  }
  .bk-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .bk-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 14px 28px; border-radius: 999px;
    border: 1.5px solid var(--warm); background: transparent;
    font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 500;
    color: var(--text-2); cursor: pointer; transition: all 0.22s;
  }
  .bk-btn-ghost:hover {
    border-color: var(--sage); color: var(--sage);
    background: rgba(92,126,106,0.04);
  }
`;

// ── helpers ──────────────────────────────────────────────────────────────────
function getWeekDays(offset = 0) {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}
function generateSlots() {
  const slots = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${String(h).padStart(2,'0')}:00`);
    slots.push(`${String(h).padStart(2,'0')}:30`);
  }
  return slots;
}
function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2,'0')} ${suffix}`;
}
function dateKey(d) { return d.toISOString().split('T')[0]; }
function formatDateLabel(d) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
function formatDateShort(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

const TIME_SLOTS = generateSlots();

export default function BookingPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [booked, setBooked] = useState({});
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:'', age:'', email:'', reason:'' });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [showSpamNotice, setShowSpamNotice] = useState(false);
  const [error, setError] = useState('');

  const weekDays = getWeekDays(weekOffset);
  const today = new Date(); today.setHours(0,0,0,0);

  const isBooked = (date, time) => booked[dateKey(date)]?.includes(time);
  const isPast = (date) => date < today;

  const openModal = (date, time) => { setModal({ date, time }); setForm({ name:'', age:'', email:'', reason:'' }); setError(''); };
  const closeModal = () => { setModal(null); setError(''); };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age.trim() || !form.email.trim() || !form.reason.trim()) {
      setError('Please fill in all fields.'); return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://gigi-psychiatric-services-production.up.railway.app/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateKey(modal.date), time: modal.time, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      const key = dateKey(modal.date);
      setBooked(prev => ({ ...prev, [key]: [...(prev[key] || []), modal.time] }));
      setConfirmed({ date: modal.date, time: modal.time, name: form.name });
      setModal(null);
      setShowSpamNotice(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="noise-overlay" aria-hidden="true" />

      <div style={{ minHeight: "100vh", background: "var(--ivory)", position: "relative" }}>

        {/* Background orbs */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="bk-orb-1" style={{ position:"absolute", top:"5%", right:"8%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(92,126,106,0.09) 0%, transparent 65%)" }} />
          <div className="bk-orb-2" style={{ position:"absolute", bottom:"10%", left:"-5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(196,168,130,0.10) 0%, transparent 65%)" }} />
          <div className="bk-orb-3" style={{ position:"absolute", top:"40%", left:"38%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(92,126,106,0.06) 0%, transparent 65%)" }} />
        </div>

        <Navbar />

        {/* ═══ HERO ═══ */}
        <section style={{ position:"relative", zIndex:1, paddingTop:100 }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"60px 32px 72px" }}>
            <div className="bk-r1" style={{ marginBottom:16 }}>
              <span className="section-eyebrow">Virtual Telehealth</span>
            </div>
            <h1 className="bk-r2" style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:300, fontSize:"clamp(2.8rem, 5.5vw, 5.2rem)", lineHeight:1.05, letterSpacing:"-0.01em", color:"var(--text)", marginBottom:20 }}>
              Book an{" "}
              <em className="shimmer-text" style={{ fontStyle:"italic", fontWeight:400 }}>appointment</em>
            </h1>
            <p className="bk-r3" style={{ fontFamily:"'Figtree', sans-serif", fontSize:16, fontWeight:300, color:"var(--text-2)", lineHeight:1.8, maxWidth:500 }}>
              Monday – Friday &nbsp;·&nbsp; 9:00 AM – 5:00 PM &nbsp;·&nbsp; 30-minute virtual sessions
            </p>
          </div>
        </section>

        {/* ═══ CALENDAR AREA ═══ */}
        <section style={{ position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px 100px" }}>

            {/* Confirmed banner */}
            {confirmed && !showSpamNotice && (
              <div style={{ marginBottom:28, padding:"20px 28px", background:"linear-gradient(135deg, rgba(92,126,106,0.1) 0%, rgba(92,126,106,0.04) 100%)", border:"1.5px solid rgba(92,126,106,0.3)", borderRadius:20, display:"flex", alignItems:"flex-start", gap:16 }}>
                <div className="check-anim" style={{ width:44, height:44, borderRadius:"50%", background:"var(--sage)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:20, flexShrink:0, boxShadow:"0 4px 16px rgba(92,126,106,0.3)" }}>✓</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, fontWeight:500, color:"var(--sage-dk)", margin:"0 0 4px" }}>Appointment Confirmed!</p>
                  <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:14, fontWeight:400, color:"var(--text-2)", margin:"0 0 2px" }}>{confirmed.name} — {formatDateLabel(confirmed.date)} at {formatTime(confirmed.time)}</p>
                  <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:13, color:"var(--text-3)", margin:0 }}>A confirmation email with your Webex link has been sent.</p>
                </div>
                <button onClick={() => setConfirmed(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-3)", padding:4, transition:"color 0.15s" }} onMouseEnter={e=>e.target.style.color="var(--text)"} onMouseLeave={e=>e.target.style.color="var(--text-3)"}><X size={18}/></button>
              </div>
            )}

            {/* Week navigation */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <button className="week-btn" onClick={() => { setWeekOffset(w=>w-1); setSelectedDay(null); }} disabled={weekOffset<=0}>
                <ChevronLeft size={16}/> Previous
              </button>
              <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:14, fontWeight:600, color:"var(--text-2)", letterSpacing:"0.02em" }}>
                {formatDateShort(weekDays[0])} — {formatDateShort(weekDays[4])}
              </p>
              <button className="week-btn" onClick={() => { setWeekOffset(w=>w+1); setSelectedDay(null); }}>
                Next <ChevronRight size={16}/>
              </button>
            </div>

            {/* Day tabs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:28 }}>
              {weekDays.map((day) => {
                const key = dateKey(day);
                const bookedCount = booked[key]?.length || 0;
                const available = TIME_SLOTS.length - bookedCount;
                const past = isPast(day);
                const isSelected = selectedDay && dateKey(selectedDay) === key;
                return (
                  <button
                    key={key}
                    disabled={past}
                    onClick={() => setSelectedDay(day)}
                    className={`day-tab${isSelected ? ' selected' : ''}${past ? ' past' : ''}`}
                  >
                    <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: isSelected ? "var(--sage)" : "var(--text-3)", margin:"0 0 4px" }}>
                      {day.toLocaleDateString('en-US', { weekday:'short' })}
                    </p>
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:32, fontWeight:300, color: isSelected ? "var(--sage-dk)" : "var(--text)", margin:"0 0 6px", lineHeight:1 }}>
                      {day.getDate()}
                    </p>
                    <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:11, fontWeight:500, color: past ? "var(--text-3)" : available===0 ? "#c0392b" : "var(--sage)", margin:0 }}>
                      {past ? "—" : available===0 ? "Full" : `${available} open`}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDay ? (
              <div style={{ background:"linear-gradient(145deg, var(--cream) 0%, rgba(242,237,229,0.5) 100%)", border:"1px solid var(--warm)", borderRadius:28, padding:"40px 44px", boxShadow:"0 16px 48px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"linear-gradient(135deg, var(--gold-lt) 0%, rgba(92,126,106,0.08) 100%)", border:"1px solid rgba(196,168,130,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Calendar size={18} style={{ color:"var(--bark)" }}/>
                  </div>
                  <div>
                    <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--text-3)", margin:"0 0 2px" }}>Select a time</p>
                    <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:400, color:"var(--text)", margin:0 }}>{formatDateLabel(selectedDay)}</h3>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(90px, 1fr))", gap:10 }}>
                  {TIME_SLOTS.map((time) => {
                    const taken = isBooked(selectedDay, time);
                    return (
                      <button key={time} disabled={taken} onClick={() => openModal(selectedDay, time)} className="time-slot">
                        {formatTime(time)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ background:"linear-gradient(145deg, var(--cream) 0%, rgba(242,237,229,0.5) 100%)", border:"1px solid var(--warm)", borderRadius:28, padding:"72px 44px", textAlign:"center", boxShadow:"0 16px 48px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize:52, marginBottom:20 }}>📅</div>
                <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:24, fontWeight:400, fontStyle:"italic", color:"var(--text)", marginBottom:8 }}>Select a day to see available times</p>
                <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:14, fontWeight:300, color:"var(--text-3)", margin:0 }}>30-minute virtual sessions available Mon–Fri</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {/* ═══ SPAM NOTICE POPUP ═══ */}
      {showSpamNotice && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 16px", background:"rgba(28,24,20,0.6)", backdropFilter:"blur(6px)" }}>
          <div className="modal-anim" style={{ background:"var(--ivory)", borderRadius:28, boxShadow:"0 32px 80px rgba(0,0,0,0.18)", width:"100%", maxWidth:400, padding:"44px 40px", textAlign:"center", border:"1px solid var(--warm)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📬</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, fontWeight:400, fontStyle:"italic", color:"var(--text)", margin:"0 0 10px" }}>Check Your Email!</h3>
            <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:15, fontWeight:300, color:"var(--text-2)", lineHeight:1.7, margin:"0 0 16px" }}>
              Your confirmation and <strong style={{ color:"var(--text)", fontWeight:600 }}>Webex meeting link</strong> have been sent to your inbox.
            </p>
            <div style={{ background:"rgba(196,168,130,0.15)", border:"1px solid rgba(196,168,130,0.4)", borderRadius:14, padding:"14px 18px", marginBottom:28 }}>
              <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:13, fontWeight:400, color:"var(--bark)", lineHeight:1.65, margin:0 }}>
                ⚠️ If you don't see it, please check your <strong>spam or junk folder</strong> and mark it as "Not Spam" so you don't miss your link.
              </p>
            </div>
            <button className="bk-btn-primary" style={{ width:"100%" }} onClick={() => setShowSpamNotice(false)}>Got it!</button>
          </div>
        </div>
      )}

      {/* ═══ BOOKING MODAL ═══ */}
      {modal && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 16px", background:"rgba(28,24,20,0.6)", backdropFilter:"blur(6px)" }}>
          <div className="modal-anim" style={{ background:"var(--ivory)", borderRadius:28, boxShadow:"0 32px 80px rgba(0,0,0,0.18)", width:"100%", maxWidth:480, overflow:"hidden", border:"1px solid var(--warm)" }}>

            {/* Modal header */}
            <div style={{ background:"var(--sage-dk)", padding:"32px 40px", position:"relative", overflow:"hidden" }}>
              {/* Decorative ring */}
              <div style={{ position:"absolute", bottom:-40, right:-40, width:160, height:160, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.1)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-60, right:-60, width:220, height:220, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", pointerEvents:"none" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", margin:"0 0 8px" }}>Confirming appointment</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, fontWeight:400, fontStyle:"italic", color:"#fff", margin:"0 0 10px", lineHeight:1.2 }}>{formatDateLabel(modal.date)}</h3>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Clock size={15} style={{ color:"rgba(255,255,255,0.6)" }}/>
                    <span style={{ fontFamily:"'Figtree', sans-serif", fontSize:16, fontWeight:500, color:"rgba(255,255,255,0.9)" }}>{formatTime(modal.time)}</span>
                  </div>
                </div>
                <button onClick={closeModal} style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}>
                  <X size={18}/>
                </button>
              </div>
            </div>

            {/* Modal form */}
            <form onSubmit={handleBook} style={{ padding:"32px 40px", display:"flex", flexDirection:"column", gap:18 }}>
              {[
                { key:"name",   label:"Full Name",     icon:User,     type:"text",   placeholder:"Jane Doe",           required:true },
                { key:"age",    label:"Age",           icon:null,     type:"number", placeholder:"25",                 required:true, min:1, max:120 },
                { key:"email",  label:"Email Address", icon:Mail,     type:"email",  placeholder:"you@example.com",   required:true },
              ].map(({ key, label, icon: Icon, type, placeholder, required, min, max }) => (
                <div key={key}>
                  <label style={{ display:"block", fontFamily:"'Figtree', sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--text-3)", marginBottom:8 }}>
                    {Icon && <Icon size={12} style={{ display:"inline", marginRight:5, verticalAlign:"middle" }}/>}
                    {label}{required && <span style={{ color:"var(--sage)", marginLeft:3 }}>*</span>}
                  </label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={placeholder} className="bk-input" required={required} min={min} max={max}/>
                </div>
              ))}

              <div>
                <label style={{ display:"block", fontFamily:"'Figtree', sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--text-3)", marginBottom:8 }}>
                  <FileText size={12} style={{ display:"inline", marginRight:5, verticalAlign:"middle" }}/>
                  Reason for Visit <span style={{ color:"var(--sage)", marginLeft:3 }}>*</span>
                </label>
                <textarea value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} rows={3} placeholder="Briefly describe what brings you in..." className="bk-input" style={{ resize:"vertical", minHeight:90 }} required/>
              </div>

              {error && (
                <p style={{ fontFamily:"'Figtree', sans-serif", fontSize:13, color:"#c0392b", margin:0, background:"rgba(192,57,43,0.06)", border:"1px solid rgba(192,57,43,0.2)", borderRadius:10, padding:"10px 14px" }}>{error}</p>
              )}

              <div style={{ display:"flex", gap:12, paddingTop:4 }}>
                <button type="button" onClick={closeModal} className="bk-btn-ghost" style={{ flex:1 }}>Cancel</button>
                <button type="submit" disabled={loading} className="bk-btn-primary" style={{ flex:2 }}>
                  {loading ? 'Booking…' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}