import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Shield, Target, Award, Sparkles, Navigation, Calendar } from 'lucide-react';
import { useLanguage, TIMELINE_EVENTS_EN, TIMELINE_EVENTS_VI } from '../context/LanguageContext';

export default function About() {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Custom counts based on requirements
  const [yearsCount, setYearsCount] = useState(0);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200; // ms
    const yearsTarget = 10;
    const campaignsTarget = 200;
    const clientsTarget = 100;

    const startTime = performance.now();

    const animateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = Math.sin((progress * Math.PI) / 2);

      setYearsCount(Math.floor(easedProgress * yearsTarget));
      setCampaignsCount(Math.floor(easedProgress * campaignsTarget));
      setClientsCount(Math.floor(easedProgress * clientsTarget));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isInView]);

  const timelineEvents = language === 'en' ? TIMELINE_EVENTS_EN : TIMELINE_EVENTS_VI;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/40"
    >
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT PANEL: Corporate Pitch & Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#5C7FA3]/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3]">
                {t('philosophyTitle')}
              </span>
            </div>
            
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-[1.1] uppercase mb-6">
              {t('aboutMainHeaderPart1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C7FA3] to-[#7BA7D9] font-semibold">
                {t('aboutMainHeaderPart2')}
              </span>
            </h2>

            <p className="font-sans text-[#2C3E50]/70 text-base leading-relaxed font-light mb-8">
              {t('aboutSubtext')}
            </p>

            {/* Experienced & Strategic pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/80 border border-[#7BA7D9]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <Shield className="w-5 h-5 text-[#5C7FA3] mb-3" />
                <h3 className="text-[#1D2B3D] font-semibold text-sm font-sans uppercase tracking-wider">
                  {t('sincerityTitle')}
                </h3>
                <p className="text-[#2C3E50]/60 text-xs mt-2 font-light leading-relaxed">
                  {t('sinceritySub')}
                </p>
              </div>

              <div className="bg-white/80 border border-[#7BA7D9]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <Target className="w-5 h-5 text-[#7BA7D9] mb-3" />
                <h3 className="text-[#1D2B3D] font-semibold text-sm font-sans uppercase tracking-wider">
                  {t('focusTitle')}
                </h3>
                <p className="text-[#2C3E50]/60 text-xs mt-2 font-light leading-relaxed">
                  {t('focusSub')}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Stats and Minimalist Timeline */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-10 text-left">
            
            {/* Split counters panel designed visually after Editorial Minimalist Aesthetic */}
            <div className="bg-white border border-[#7BA7D9]/15 p-8 rounded-3xl flex justify-between items-center shadow-sm">
              <div className="text-center flex-1">
                <div className="text-3xl sm:text-4xl font-light font-sans text-[#5C7FA3] tracking-tight font-semibold">
                  {yearsCount}+ {language === 'en' ? 'Years' : 'Năm'}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#2C3E50]/50 mt-1.5 font-bold">
                  {language === 'en' ? 'Experience' : 'Kinh Nghiệm'}
                </div>
              </div>
              <div className="h-12 w-[1px] bg-[#7BA7D9]/15"></div>
              
              <div className="text-center flex-1">
                <div className="text-3xl sm:text-4xl font-light font-sans text-[#1D2B3D] tracking-tight font-semibold">
                  {campaignsCount}+
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#2C3E50]/50 mt-1.5 font-bold">
                  {language === 'en' ? 'Campaigns' : 'Chiến dịch'}
                </div>
              </div>
              <div className="h-12 w-[1px] bg-[#7BA7D9]/15"></div>
              
              <div className="text-center flex-1">
                <div className="text-3xl sm:text-4xl font-light font-sans text-[#7BA7D9] tracking-tight font-semibold">
                  {clientsCount}+
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#2C3E50]/50 mt-1.5 font-bold">
                  {language === 'en' ? 'Clients' : 'Khách Hàng'}
                </div>
              </div>
            </div>

            {/* Simple Minimalist Growth Timeline */}
            <div className="bg-white/60 border border-[#7BA7D9]/10 p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-[#5C7FA3]" />
                <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase font-bold">
                  // {t('timelineHeader')}
                </span>
              </div>

              <div className="space-y-6 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#7BA7D9]/30">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Small Timeline Node dot */}
                    <div className="absolute -left-[20.5px] top-1.5 w-2 h-2 rounded-full border border-[#5C7FA3] bg-white group-hover:bg-[#7BA7D9] transition-colors duration-300" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="font-mono text-xs text-[#5C7FA3] font-semibold">{evt.year}</span>
                      <h4 className="font-sans text-[#1D2B3D] font-medium text-xs uppercase tracking-wider">{evt.title}</h4>
                    </div>
                    <p className="text-[#2C3E50]/60 text-[11px] mt-1 font-light leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft corporate footer recommendation */}
            <div className="flex items-center gap-4 bg-[#E6EEF8]/40 border border-[#7BA7D9]/10 p-5 rounded-2xl">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#7BA7D9]/30 border border-white flex items-center justify-center text-[9px] font-bold text-[#1D2B3D]">VN</div>
                <div className="w-7 h-7 rounded-full bg-[#5C7FA3]/30 border border-white flex items-center justify-center text-[9px] font-bold text-[#1D2B3D]">EU</div>
                <div className="w-7 h-7 rounded-full bg-white border border-[#7BA7D9]/30 flex items-center justify-center text-[8px] font-bold text-[#5C7FA3]">★</div>
              </div>
              <div className="text-[10px] leading-relaxed text-left">
                <span className="font-semibold block text-[#1D2B3D] uppercase tracking-wider">{t('trustedByLeaders')}</span>
                <span className="text-[#2C3E50]/50">{t('trustedByLeadersSub')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
