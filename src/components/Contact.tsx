import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { language, t } = useLanguage();
  
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formConcept, setFormConcept] = useState('');
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setFormStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          concept: formConcept,
          services: ['Corporate Brand Inbound Briefing']
        })
      });
      if (res.ok) {
        setFormStatus('success');
        setFormName('');
        setFormEmail('');
        setFormConcept('');
      } else {
        setFormStatus('idle');
      }
    } catch (err) {
      console.error("Submit lead error:", err);
      setFormStatus('idle');
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 md:px-8 bg-white/20 text-left">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 text-left">
          
          {/* LEFT: Structural contacts details & Vector blueprint MAP */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <div className="mb-4 flex items-center gap-3">
                <span className="w-12 h-[1px] bg-[#5C7FA3]/30"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3]">
                  {t('contactChannel')}
                </span>
              </div>
              
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-[1.05] uppercase">
                {language === 'en' ? "LET'S SHAPE YOUR" : "CÙNG CHÚNG TÔI KIẾN TẠO"}<br />
                <span className="text-[#5C7FA3] font-semibold">{language === 'en' ? "BRAND STORY TELLING" : "CÂU CHUYỆN THƯƠNG HIỆU"}</span>
              </h2>

              <p className="font-sans text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-md text-left">
                {t('contactSub')}
              </p>

              {/* Direct detail anchors */}
              <div className="space-y-4 pt-4 text-left">
                <div className="flex items-center gap-4 text-xs font-mono justify-start">
                  <div className="w-9 h-9 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#5C7FA3]" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] font-bold tracking-wider">
                      {t('emailEnquiries')}
                    </span>
                    <a href="mailto:contact@halo.agency" className="text-[#1D2B3D] hover:text-[#5C7FA3] transition-colors font-sans text-sm font-semibold">
                      contact@halo.agency
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono justify-start">
                  <div className="w-9 h-9 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#5C7FA3]" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] font-bold tracking-wider">
                      {t('telephone')}
                    </span>
                    <span className="text-[#1D2B3D] font-sans text-sm font-semibold">(093) 327-1128</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono justify-start">
                  <div className="w-9 h-9 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#5C7FA3]" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] font-bold tracking-wider">
                      {t('headquarters')}
                    </span>
                    <span className="text-[#1D2B3D] font-sans text-sm font-semibold text-wrap truncate-none">
                      17-19-21 Nguyễn Văn Trỗi, Phú Nhuận District, Ho Chi Minh City
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MINIMAL CORPORATE GEOLOCATION DETAIL CARD */}
            <div className="mt-12 p-6 rounded-[24px] border border-[#7BA7D9]/15 bg-white shadow-xs overflow-hidden relative min-h-[160px] flex flex-col justify-end text-left">
              <div className="absolute inset-0 bg-radial-gradient from-[#7BA7D9]/5 to-transparent pointer-events-none" />
              
              {/* Soft corporate map marker/grid elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{
                backgroundImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #5C7FA3 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }} />

              {/* Glowing location ring */}
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 shrink-0">
                <span className="relative flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA7D9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-[#E6EEF8] border border-[#7BA7D9]/40 flex items-center justify-center">
                    <Globe className="w-3 h-3 text-[#5C7FA3]" />
                  </span>
                </span>
              </div>

              <div className="z-10 text-left font-mono">
                <span className="block text-[10px] text-[#5C7FA3] mb-0.5 tracking-wider font-bold animate-pulse">
                  // {t('regionalHq')}
                </span>
                <span className="block text-[9px] text-slate-400 uppercase">
                  {t('hanoiCoords')}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: High tech sleek Minimal form */}
          <div className="lg:col-span-12 xl:col-span-7 text-left">
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-[#7BA7D9]/15 shadow-sm relative overflow-hidden text-left">
              <div className="absolute -top-14 -right-14 w-36 h-36 bg-[#7BA7D9]/5 rounded-full blur-2xl" />

              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#5C7FA3]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[#1D2B3D] text-xl font-bold uppercase leading-none mb-3">
                      {t('successfulSubmit')}
                    </h3>
                    <p className="text-slate-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
                      {t('successSubText')}
                    </p>
                  </div>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-sans text-[10px] tracking-wider transition-colors uppercase font-bold"
                  >
                    {t('submitNewEnquiry')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                  <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase block mb-3 font-bold">
                    // {t('enquirySpec')}
                  </span>

                  <div className="space-y-1 text-left relative">
                    <label className="font-mono text-[9px] text-slate-400 tracking-wider uppercase block font-bold">
                      {t('fullNameOrg')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('placeholderName')}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#7BA7D9] focus:bg-white p-3.5 rounded-2xl text-xs font-sans text-slate-805 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1 text-left relative">
                    <label className="font-mono text-[9px] text-slate-400 tracking-wider uppercase block font-bold">
                      {language === 'en' ? 'Corporate Email Address' : 'Địa chỉ Email Doanh nghiệp'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t('emailPlaceholder') || "e.g., katherine@masangroup.com"}
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#7BA7D9] focus:bg-white p-3.5 rounded-2xl text-xs font-sans text-slate-805 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1 text-left relative">
                    <label className="font-mono text-[9px] text-slate-400 tracking-wider uppercase block font-bold">
                      {t('briefStrategy')}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t('briefPlaceholder') || "Describe target objectives, market categories, or timeline targets..."}
                      value={formConcept}
                      onChange={(e) => setFormConcept(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#7BA7D9] focus:bg-white p-3.5 rounded-2xl text-xs font-sans text-slate-805 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
                    <div className="flex items-center gap-2 text-slate-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5C7FA3]" />
                      <span>{t('directCoop')}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center uppercase disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      {formStatus === 'submitting' ? t('producingBrief') : t('submitEnquiry')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
