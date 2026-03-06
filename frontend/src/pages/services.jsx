import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  { title: "Psychiatric Evaluation", description: "Comprehensive assessment and diagnosis of mental health conditions for adolescents and adults.", icon: "🔍" },
  { title: "Diagnosis and Treatment", description: "Expert diagnosis and personalized treatment plans tailored to your unique needs.", icon: "💊" },
  { title: "Medication Management", description: "Careful monitoring and adjustment of psychiatric medications for optimal results.", icon: "📋" },
  { title: "Supportive Therapy", description: "Compassionate therapeutic support to help you navigate life's challenges.", icon: "💚" },
  { title: "Virtual Visits", description: "Convenient, secure telehealth appointments from the comfort of your home.", icon: "💻" },
  { title: "Adolescent & Adult Care", description: "Specialized treatment for both adolescents and adults at every life stage.", icon: "👥" },
];

const specializations = [
  "Insomnia", "Anxiety", "Depression", "Schizophrenia", "ADHD",
  "Post Traumatic Stress Disorder (PTSD)", "Mood Disorder", "Sleep Disorder",
  "Borderline Personality Disorder", "Psychosis", "Anger Management",
  "And many more psychiatric issues",
];

export default function ServicesPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Comprehensive mental health care designed around your unique needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 rounded-3xl p-12 shadow-2xl text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Areas of Expertise</h2>
              <p className="text-teal-50 text-lg">We specialize in treating a wide range of mental health conditions</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializations.map((spec, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <p className="font-semibold text-lg">{spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 text-center">
        <button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
          Book an Appointment
        </button>
      </div>

      <Footer />
    </div>
  );
}