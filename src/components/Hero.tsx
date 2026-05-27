import { motion } from 'motion/react';
import { ArrowRight, Compass, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToPortfolio: () => void;
  onOpenServicePlanner: () => void;
}

export default function Hero({ onScrollToContact, onScrollToPortfolio, onOpenServicePlanner }: HeroProps) {
  const { t, websiteSettings, language } = useLanguage();
  const headline = language === 'en' ? websiteSettings.heroHeadlineEn : websiteSettings.heroHeadlineVi;
  const subline = language === 'en' ? websiteSettings.heroSubEn : websiteSettings.heroSubVi;
  const headlineParts = headline.split('//');

  return (
    <section id="hero" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 md:px-8 transition-colors duration-500 ${websiteSettings.isDarkMode ? 'bg-[#090D16] text-white' : websiteSettings.homeBg}`}>
      
      {/* Soft Animated Gradient Ambient Background & Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Slow moving soft blue/navy ambient blobs */}
        <div className="absolute top-[15%] left-[-15%] w-[45rem] h-[45rem] bg-[#7BA7D9]/10 rounded-full blur-[140px] animate-drift pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] bg-[#5C7FA3]/10 rounded-full blur-[130px] animate-drift [animation-delay:6s] pointer-events-none" />
        <div className="absolute top-[40%] left-[40%] w-[35rem] h-[35rem] bg-[#E6EEF8]/30 rounded-full blur-[110px] animate-drift [animation-delay:3s] pointer-events-none" />

        {/* Minimal geometric grid line decoration (very faint) */}
        <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(92,127,163,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(92,127,163,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-70" />
        
        {/* Background Visual Media if specified in CMS */}
        {websiteSettings.heroMediaUrl && (
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none mix-blend-overlay">
            {websiteSettings.heroMediaUrl.endsWith('.mp4') ? (
              <video src={websiteSettings.heroMediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={websiteSettings.heroMediaUrl} alt="Hero Background overlay" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            )}
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl mx-auto z-10 relative text-center">
        {/* Soft elegant mini tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-[#7BA7D9]/15 backdrop-blur-md mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#5C7FA3]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5C7FA3] font-sans">
            {t('established')}
          </span>
        </motion.div>

        {/* Large Cinematic Elegant Typography */}
        <h1 className={`font-sans font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-4xl mx-auto mb-8 font-light ${websiteSettings.isDarkMode ? 'text-white' : 'text-[#1D2B3D]'}`}>
          {headlineParts.length > 1 ? (
            <>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="block animate-fade-in"
              >
                {headlineParts[0].trim()}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block overflow-hidden py-1 font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-theme,#5C7FA3)] to-[var(--secondary-theme,#7BA7D9)]"
              >
                {headlineParts[1].trim()}
              </motion.span>
            </>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block"
            >
              {headline}
            </motion.span>
          )}
        </h1>

        {/* Spacious, premium subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide px-4 ${websiteSettings.isDarkMode ? 'text-slate-300' : 'text-[#2C3E50]/80'}`}
        >
          {subline}
        </motion.p>

        {/* Premium Soft Blue/Navy Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 px-6"
        >
          <button
            id="hero-cta-services"
            onClick={onScrollToPortfolio}
            className="w-full sm:w-auto px-8 py-4 bg-[#7BA7D9] text-white rounded-full font-medium text-xs tracking-wider uppercase hover:bg-[#5C7FA3] transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md shadow-[#7BA7D9]/15"
          >
            {t('exploreServices')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-cta-contact"
            onClick={onScrollToContact}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#2C3E50] border border-[#7BA7D9]/20 rounded-full font-medium text-xs tracking-wider uppercase hover:bg-slate-50 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {t('contactUs')}
            <Send className="w-3.5 h-3.5 text-[#5C7FA3]" />
          </button>

          <button
            id="hero-cta-estimator"
            onClick={onOpenServicePlanner}
            className="w-full sm:w-auto px-7 py-4 rounded-full font-sans text-xs font-semibold tracking-wider text-[#5C7FA3] border border-[#5C7FA3]/15 hover:border-[#5C7FA3]/35 hover:bg-white/50 bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA7D9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7BA7D9]"></span>
            </span>
            {t('estimatorConsole')}
          </button>
        </motion.div>

        {/* Minimal and elegant corporate statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-6 rounded-3xl border border-[#7BA7D9]/10 bg-white/70 backdrop-blur-md max-w-4xl mx-auto mt-20 shadow-sm"
        >
          <div className="text-center md:border-r border-[#7BA7D9]/10 last:border-0 py-2">
            <span className="block font-mono text-[9px] text-[#2C3E50]/40 tracking-widest uppercase mb-1">{t('foundedIn')}</span>
            <span className="font-sans text-sm text-[#5C7FA3] font-semibold uppercase">{t('established')}</span>
          </div>
          <div className="text-center md:border-r border-[#7BA7D9]/10 last:border-0 py-2">
            <span className="block font-mono text-[9px] text-[#2C3E50]/40 tracking-widest uppercase mb-1">{t('experience')}</span>
            <span className="font-sans text-sm text-[#5C7FA3] font-semibold uppercase">{t('yearsActive')}</span>
          </div>
          <div className="text-center md:border-r border-[#7BA7D9]/10 last:border-0 py-2">
            <span className="block font-mono text-[9px] text-[#2C3E50]/40 tracking-widest uppercase mb-1">{t('strategies')}</span>
            <span className="font-sans text-sm text-[#5C7FA3] font-semibold uppercase">{t('campaignsCountText')}</span>
          </div>
          <div className="text-center py-2">
            <span className="block font-mono text-[9px] text-[#2C3E50]/40 tracking-widest uppercase mb-1">{t('aestheticStatus')}</span>
            <span className="font-sans text-sm text-[#5C7FA3] font-semibold uppercase">{t('minimalStandard')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
