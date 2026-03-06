import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (href) => { setIsMenuOpen(false); navigate(href); };

  return (
    <>
      <div className="w-full text-white text-sm font-semibold text-center py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8"
        style={{ background: 'linear-gradient(90deg, #0f766e 0%, #0891b2 100%)' }}>
        <span>📅 Want to schedule an appointment?</span>
        <div className="flex gap-3">
          <button onClick={() => go('/booking')} className="bg-white text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-teal-50 transition-all">Patient Form</button>
          <button onClick={() => go('/booking')} className="bg-white/20 border border-white text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white/30 transition-all">Book an Appointment</button>
        </div>
      </div>

      <header className={`sticky top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            <button onClick={() => go('/')} className="flex items-center space-x-3 focus:outline-none">
              <img src="/images/logo.png" alt="Gigi Psychiatric Services Logo" className="w-12 h-12 object-contain" />
              <div className="text-left">
                <p className="text-xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent leading-tight">Gigi Psychiatric Services, LLC</p>
                <p className="text-xs text-slate-500">Your Mental Health Matters To Us</p>
              </div>
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <button key={link.href} onClick={() => go(link.href)}
                    className={`font-medium transition-colors duration-300 relative group focus:outline-none ${isActive ? 'text-teal-600' : 'text-slate-700 hover:text-teal-600'}`}>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                );
              })}
              <button onClick={() => go('/booking')} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2.5 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold">
                Book Appointment
              </button>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-700 hover:text-teal-600">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 animate-slide-down">
              {navLinks.map((link) => (
                <button key={link.href} onClick={() => go(link.href)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors font-medium ${location.pathname === link.href ? 'text-teal-600 bg-teal-50' : 'text-slate-700 hover:text-teal-600 hover:bg-teal-50'}`}>
                  {link.label}
                </button>
              ))}
              <button onClick={() => go('/booking')} className="mt-3 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold">
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}