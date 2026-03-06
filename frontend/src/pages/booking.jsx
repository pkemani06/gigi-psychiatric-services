import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Clock, User, FileText, Calendar, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function dateKey(d) {
  return d.toISOString().split('T')[0];
}

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
  const [form, setForm] = useState({ name: '', age: '', email: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [showSpamNotice, setShowSpamNotice] = useState(false);
  const [error, setError] = useState('');

  const weekDays = getWeekDays(weekOffset);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBooked = (date, time) => booked[dateKey(date)]?.includes(time);
  const isPast = (date) => date < today;

  const openModal = (date, time) => {
    setModal({ date, time });
    setForm({ name: '', age: '', email: '', reason: '' });
    setError('');
  };

  const closeModal = () => { setModal(null); setError(''); };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age.trim() || !form.email.trim() || !form.reason.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://gigi-psychiatric-services-production.up.railway.app/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateKey(modal.date),
          time: modal.time,
          name: form.name,
          age: form.age,
          email: form.email,
          reason: form.reason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');

      const key = dateKey(modal.date);
      setBooked(prev => ({ ...prev, [key]: [...(prev[key] || []), modal.time] }));
      setConfirmed({ date: modal.date, time: modal.time, name: form.name });
      setModal(null);
      setShowSpamNotice(true); // show spam notice after booking
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Virtual Telehealth
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Book an <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Appointment</span>
          </h1>
          <p className="text-xl text-slate-600">Monday – Friday • 9:00 AM – 5:00 PM • 30-minute sessions</p>
        </div>
      </section>

      {/* Spam Notice Popup */}
      {showSpamNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="text-5xl mb-4">📬</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Check Your Email!</h3>
            <p className="text-slate-600 mb-2">
              Your confirmation and <strong>Webex meeting link</strong> have been sent to your inbox.
            </p>
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
              ⚠️ If you don't see it, please check your <strong>spam or junk folder</strong> and mark it as "Not Spam" so you don't miss your link.
            </p>
            <button
              onClick={() => setShowSpamNotice(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Confirmed Banner */}
      {confirmed && !showSpamNotice && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="font-bold text-green-800 text-lg">Appointment Confirmed!</p>
              <p className="text-green-700">{confirmed.name} — {formatDateLabel(confirmed.date)} at {formatTime(confirmed.time)}</p>
              <p className="text-green-600 text-sm mt-1">A confirmation email with your Webex link has been sent.</p>
            </div>
            <button onClick={() => setConfirmed(null)} className="ml-auto text-green-400 hover:text-green-600"><X size={20} /></button>
          </div>
        </div>
      )}

      {/* Calendar */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Week Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => { setWeekOffset(w => w - 1); setSelectedDay(null); }}
              disabled={weekOffset <= 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${weekOffset <= 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-md'}`}
            >
              <ChevronLeft size={20} /> Previous Week
            </button>
            <p className="font-semibold text-slate-600">
              {formatDateShort(weekDays[0])} — {formatDateShort(weekDays[4])}
            </p>
            <button
              onClick={() => { setWeekOffset(w => w + 1); setSelectedDay(null); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-white hover:shadow-md transition-all"
            >
              Next Week <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Tabs */}
          <div className="grid grid-cols-5 gap-3 mb-8">
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
                  className={`rounded-2xl p-4 text-center transition-all duration-200 border-2 ${
                    past ? 'opacity-40 cursor-not-allowed border-slate-100 bg-slate-50'
                    : isSelected ? 'border-teal-500 bg-teal-50 shadow-lg scale-105'
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-md'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${isSelected ? 'text-teal-600' : 'text-slate-800'}`}>
                    {day.getDate()}
                  </p>
                  <p className={`text-xs font-semibold mt-1 ${available === 0 ? 'text-red-400' : 'text-green-500'}`}>
                    {past ? '—' : available === 0 ? 'Full' : `${available} open`}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          {selectedDay ? (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={22} className="text-teal-600" />
                <h3 className="text-xl font-bold text-slate-900">{formatDateLabel(selectedDay)}</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                {TIME_SLOTS.map((time) => {
                  const taken = isBooked(selectedDay, time);
                  return (
                    <button
                      key={time}
                      disabled={taken}
                      onClick={() => openModal(selectedDay, time)}
                      className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                        taken
                          ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                          : 'border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {formatTime(time)}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-xl font-semibold text-slate-600">Select a day above to see available times</p>
              <p className="text-slate-400 mt-2">30-minute virtual sessions available Mon–Fri</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-100 text-sm font-semibold mb-1">Confirming appointment</p>
                  <h3 className="text-2xl font-bold">{formatDateLabel(modal.date)}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={16} className="text-teal-200" />
                    <span className="text-lg font-semibold">{formatTime(modal.time)}</span>
                  </div>
                </div>
                <button onClick={closeModal} className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBook} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User size={14} className="inline mr-1" /> Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 outline-none transition-all text-slate-800"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 outline-none transition-all text-slate-800"
                  placeholder="25"
                  min="1" max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail size={14} className="inline mr-1" /> Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 outline-none transition-all text-slate-800"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <FileText size={14} className="inline mr-1" /> Reason for Visit *
                </label>
                <textarea
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-400 outline-none transition-all text-slate-800 resize-none"
                  placeholder="Briefly describe what brings you in..."
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-60">
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}