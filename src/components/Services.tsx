import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, MessageSquare, TrendingUp, Target, Video, Share2, ChevronRight, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Service } from '../types';

export default function Services() {
  const { t, servicesData } = useLanguage();
  const servicesList = servicesData;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-5 h-5 text-[#5C7FA3]" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#7BA7D9]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#1D2B3D]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#5C7FA3]" />;
      case 'Video': return <Video className="w-5 h-5 text-[#7BA7D9]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#1D2B3D]" />;
      default: return <Award className="w-5 h-5 text-[#5C7FA3]" />;
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-transparent">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#5C7FA3]/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3]">
                {t('strategicCapabilities')}
              </span>
            </div>
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase">
              {t('ourServiceSuite')}
            </h2>
          </div>
          <div>
            <p className="font-sans text-[#2C3E50]/70 text-sm max-w-md font-light leading-relaxed">
              {t('servicesIntroText')}
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white border border-[#7BA7D9]/15 p-8 rounded-3xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[250px] hover:border-[#7BA7D9]/40 hover:shadow-lg hover:shadow-[#7BA7D9]/5 transition-all duration-300 transform hover:-translate-y-1 text-left"
              whileHover={{ scale: 1.015 }}
            >
              {/* Subtle background color shift */}
              <div className="absolute inset-0 bg-[#E6EEF8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#E6EEF8]/60 flex items-center justify-center border border-[#7BA7D9]/15 mb-6 group-hover:bg-white transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-sans text-[#1D2B3D] text-lg font-semibold tracking-wide uppercase">
                  {service.title}
                </h3>
                <p className="text-[#2C3E50]/70 text-xs mt-3 leading-relaxed font-light line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 font-mono text-[9px] tracking-widest text-slate-400">
                <span>0{idx + 1} // {t('analyzeLabel')}</span>
                <ChevronRight className="w-4 h-4 text-slate-350 group-hover:text-[#5C7FA3] group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Budget Estimator Feature Removed */}

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-[#1D2B3D]/30 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative w-full max-w-lg bg-white p-8 rounded-[28px] border border-[#7BA7D9]/20 shadow-2xl overflow-hidden z-10 text-left"
              >
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#E6EEF8]/40 rounded-full blur-2xl" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E6EEF8]/60 flex items-center justify-center border border-[#7BA7D9]/15">
                      {getIcon(selectedService.icon)}
                    </div>
                    <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase font-bold">
                      {t('deliverablesLabel')} // 0{servicesList.findIndex(s => s.id === selectedService.id) + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer border border-slate-100"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
                  </button>
                </div>

                <h3 className="font-sans text-[#1D2B3D] text-2xl font-semibold tracking-wide uppercase mb-3 text-left">
                  {selectedService.title}
                </h3>

                <p className="text-[#2C3E50]/80 text-sm font-light leading-relaxed mb-6 text-left">
                  {selectedService.details}
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <h4 className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase mb-3 font-bold">
                    // {t('keyOutcomesLabel')}
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/25 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#5C7FA3] stroke-[3]" />
                        </div>
                        <span className="text-[#2C3E50]/70 text-xs font-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium text-xs tracking-wider uppercase transition-all cursor-pointer text-center"
                  >
                    {t('closeBtn')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cost Planner Slideout Console removed */}
      </div>
    </section>
  );
}
