import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const businessInfo = {
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
  address: "18310 Montgomery Village Ave, Gaithersburg, MD 20879",
  hours: "Virtual Visits Only - Flexible Scheduling",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Get in <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-slate-600">We're here to answer your questions and schedule your appointment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", content: <a href={`tel:${businessInfo.phone}`} className="text-teal-600 hover:underline">{businessInfo.phone}</a> },
                    { icon: Mail, label: "Email", content: <a href={`mailto:${businessInfo.email}`} className="text-teal-600 hover:underline">{businessInfo.email}</a> },
                    { icon: MapPin, label: "Address", content: <p className="text-slate-600">{businessInfo.address}</p> },
                    { icon: Clock, label: "Hours", content: <p className="text-slate-600">{businessInfo.hours}</p> },
                  ].map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-teal-600" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-1">{label}</p>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Insurance & Payment</h3>
                <p className="text-slate-600 mb-4">We accept both cash and insurance for your convenience.</p>
                <p className="text-sm text-slate-500">Please contact us to verify your specific insurance coverage and discuss payment options.</p>
              </div>
            </div>

            <div className="rounded-2xl p-8 shadow-xl" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e4d8c 40%, #1a6fa6 100%)' }}>
              <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
              <p className="text-cyan-100 text-sm mb-6">We'll get back to you as soon as possible</p>

              {submitted ? (
                <div className="bg-white/20 rounded-xl p-8 text-center text-white">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-cyan-100">Thank you for reaching out. We'll be in touch soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 bg-white text-blue-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-50 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all"
                      placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all"
                      placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-100 mb-2">Message *</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5} className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all resize-none"
                      placeholder="Tell us how we can help you..." />
                  </div>
                  <button type="submit" className="w-full bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}