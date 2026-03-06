import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const line1 = "Find Peace,";
const line2 = "Discover Strength";
const businessInfo = {
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
};

export default function HomePage() {
  const navigate = useNavigate();
  const [typed1, setTyped1] = useState('');
  const [typed2, setTyped2] = useState('');
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const t1 = setInterval(() => {
        i++;
        setTyped1(line1.slice(0, i));
        if (i >= line1.length) {
          clearInterval(t1);
          setTimeout(() => {
            setActiveLine(2);
            let j = 0;
            const t2 = setInterval(() => {
              j++;
              setTyped2(line2.slice(0, j));
              if (j >= line2.length) {
                clearInterval(t2);
                setTimeout(() => setActiveLine(0), 600);
              }
            }, 110);
          }, 350);
        }
      }, 110);
    }, 500);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', width: '100vh', height: '100vw', zIndex: 0, pointerEvents: 'none' }}>
          <img src="/images/backdrop-for-hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(219,234,254,0.6) 50%, rgba(15,42,90,0.25) 100%)', zIndex: 1 }} />

        <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
          <div className="w-full">
            <div className="space-y-6 animate-fade-in w-full">
              <div className="inline-block">
                <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">Virtual Visits Only • Telehealth Services</span>
              </div>
              <h1 className="font-bold text-slate-900 leading-tight w-full">
                <span className="block w-full text-slate-900" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)', minHeight: '1.2em' }}>
                  {typed1}<span className="typewriter-cursor" style={{ opacity: activeLine === 1 ? 1 : 0 }}>|</span>
                </span>
                <span className="block w-full bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)', minHeight: '1.2em' }}>
                  {typed2}<span className="typewriter-cursor" style={{ color: '#0d9488', opacity: activeLine === 2 ? 1 : 0 }}>|</span>
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We provide comprehensive virtual psychiatric care for adolescents, adults and geriatric patients.
                Your mental health matters to us at Gigi Psychiatric Services. Experience professional,
                compassionate care from the comfort of your home through our secure telehealth platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
                  Schedule Consultation
                </button>
                <button onClick={() => navigate('/services')} className="border-2 border-teal-600 text-teal-700 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 text-center">
                  Explore Services
                </button>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
                <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <Phone size={18} className="text-teal-600" />
                  <span className="font-medium">{businessInfo.phone}</span>
                </a>
                <a href={`mailto:${businessInfo.email}`} className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <Mail size={18} className="text-teal-600" />
                  <span className="font-medium">{businessInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}