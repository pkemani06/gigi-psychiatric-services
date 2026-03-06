import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img src="/images/provider-photo.png" alt="Doctor at Gigi Psychiatric Services" className="w-full h-full object-cover" style={{ objectPosition: 'center 10%' }} />
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Meet the doctor</h2>

              <p className="text-slate-600 leading-relaxed text-lg">
                I have over 20 years of nursing background in various health care settings and 3 years as a Psychiatric Nurse Practitioner. I obtained my BSc. in Nursing degree from Chamberlain School of Nursing and my post master certificate as a psychiatric Nurse Practitioner from Walden University. As a PMHNP I have experience in using evidence based practice to provide holistic care to my patients, empowering minds and providing support and care where ever you are. With a background in nursing and psychiatry, I provide holistic mental health care that addresses the biological, psychological, and social factors influencing emotional well-being.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                At Gigi Psychiatric Services, we make high-quality mental health services accessible from the comfort and privacy of your home. We offer both medication management & therapy in a single appointment to save you time and money. Pairing therapy and medication to treat depression and anxiety can help you feel better faster with a 75% improved chance of recovery.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                We assist patients struggling with depression, anxiety, bipolar disorder, schizophrenia, autism spectrum disorder and other psychiatric issues. I have experience working in an outpatient setting. We focus on adolescence, adults and the geriatric population.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                I am passionate about supporting clients and families with the tools to understand and manage behaviors, leading more balanced and meaningful lives. My professional interests include medication management and psychotherapy. I enjoy assisting clients to become the best version of themselves.
              </p>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-lg font-bold text-slate-900">Gigi, PMHNP-BC</p>
                <p className="text-slate-500">Psychiatric Nurse Practitioner, PMHNP-BC</p>
                <p className="text-slate-500">Gigi Psychiatric Services, LLC</p>
              </div>

              <button onClick={() => navigate('/contact')} className="mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Schedule with Gigi
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}