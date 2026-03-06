import { useNavigate } from 'react-router-dom';

const info = {
  name: "Gigi Psychiatric Services, LLC",
  tagline: "Your Mental Health Matters To Us",
  phone: "301-886-5868",
  email: "gigipsychiatricservices@gmail.com",
  address: "18310 Montgomery Village Ave, Gaithersburg, MD 20879",
};

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <h3 className="text-xl font-bold">{info.name}</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">{info.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <button key={href} onClick={() => navigate(href)} className="block text-slate-400 hover:text-white transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-slate-400 text-sm">
              <p>{info.phone}</p>
              <p>{info.email}</p>
              <p>{info.address}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2024 {info.name}. All rights reserved.</p>
          <p className="text-sm mt-2">Professional Mental Health Services</p>
        </div>
      </div>
    </footer>
  );
}