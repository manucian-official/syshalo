import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, TESTIMONIALS_EN, TESTIMONIALS_VI } from '../context/LanguageContext';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const { language, t, testimonialsData } = useLanguage();
  const testimonialsList = testimonialsData;
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeTest = testimonialsList[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/40 text-left">
      <div className="w-full max-w-5xl mx-auto z-10 relative text-left">
        <center className="mb-16">
          <span className="font-mono text-[10px] text-[#5C7FA3] tracking-[0.3em] uppercase block mb-3 font-bold">
            // {t('clientTestimonials') || 'CLIENT TESTIMONIALS'}
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase">
            {t('trustedByLeadersTitle') || 'TRUSTED BY LEADERS'}
          </h2>
        </center>

        {/* Dynamic Slider Module */}
        <div className="relative bg-white p-8 md:p-14 rounded-[32px] border border-[#7BA7D9]/15 shadow-sm overflow-hidden min-h-[300px] flex items-center justify-center text-center">
          {/* Quote large backdrop background */}
          <Quote className="absolute -top-6 -left-6 w-32 h-32 text-slate-100 pointer-events-none select-none stroke-[0.5]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-center md:px-6"
            >
              {/* Star rating metrics */}
              <div className="flex justify-center items-center gap-1.5 mb-6 text-[#7BA7D9]">
                {[...Array(activeTest.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#7BA7D9]" />
                ))}
              </div>

              {/* Massive statement review quote */}
              <p className="text-[#2C3E50] text-base md:text-xl lg:text-xl font-light leading-relaxed font-sans max-w-3xl mx-auto italic">
                "{activeTest.quote}"
              </p>

              {/* Author bio details */}
              <div className="mt-8">
                <h4 className="font-sans text-[#1D2B3D] text-base font-bold uppercase tracking-wider leading-none mb-1">
                  {activeTest.author}
                </h4>
                <p className="font-mono text-[10px] sm:text-xs text-slate-400 tracking-wider font-bold">
                  {activeTest.role} // <span className="text-[#5C7FA3]">{activeTest.company}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SLIDER OPERATIONS NAVIGATION AND BULLETS */}
        <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center transition-all border border-[#7BA7D9]/15 group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-450 group-hover:text-slate-800 transition-colors" />
          </button>

          {/* Bullets spacer */}
          <div className="flex items-center gap-2">
            {testimonialsList.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  activeIdx === i ? 'w-8 bg-[#5C7FA3]' : 'w-2 bg-slate-200 hover:bg-slate-350'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center transition-all border border-[#7BA7D9]/15 group cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-450 group-hover:text-slate-800 transition-colors" />
          </button>
        </div>

        {/* COMPANY TRUST LOGOS OR EMBLEMS (Vietnamese Prestige branding) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-14 max-w-4xl mx-auto mt-20 opacity-40 hover:opacity-60 transition-all duration-500">
          <div className="text-center font-sans font-semibold text-xs md:text-sm tracking-[0.2em] text-[#5C7FA3] uppercase">
            VINGROUP
          </div>
          <div className="text-center font-sans font-semibold text-xs md:text-sm tracking-[0.2em] text-[#5C7FA3] uppercase">
            VIETCOMBANK
          </div>
          <div className="text-center font-sans font-semibold text-xs md:text-sm tracking-[0.2em] text-[#5C7FA3] uppercase">
            MASAN GROUP
          </div>
          <div className="text-center font-sans font-semibold text-xs md:text-sm tracking-[0.2em] text-[#5C7FA3] uppercase">
            VINAMILK
          </div>
        </div>
      </div>
    </section>
  );
}
