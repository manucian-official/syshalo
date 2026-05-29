import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import { Compass, Menu, X, ArrowUpRight, Github, Twitter, Linkedin, Smartphone, Shield, Key } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import AndroidAppView from './components/AndroidAppView';
import AdminPanel from './components/AdminPanel';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const { language, setLanguage, t, websiteSettings } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openCookiePolicyTrigger, setOpenCookiePolicyTrigger] = useState(false);
  
  // Section index tracker for scrolling headers styling
  const [activeSection, setActiveSection] = useState('hero');

  // Dynamic SEO states matching current scrolled section
  const seoSettings = websiteSettings.seoSettings || {};
  const activeSeoData = seoSettings[activeSection] || seoSettings['hero'] || {
    titleEn: "HALO Agency | Leading Strategic Communications & PR in Vietnam",
    titleVi: "HALO Agency | Kể Chuyện Thương Hiệu & PR Chiến Lược Tại Việt Nam",
    descEn: "HALO Agency delivers high-end media campaign solutions and premium digital platforms for modern Vietnamese brands.",
    descVi: "HALO Agency đem đến giải pháp truyền thông chất lượng cao và hệ thống cổng số hóa danh giá cho thương hiệu Việt.",
    keywordsEn: "HALO Agency, PR Vietnam, Media solutions Hanoi, Strategic communication Vietnam, Digital solutions, Brand design",
    keywordsVi: "HALO Agency, Truyền thông PR Việt Nam, Giải pháp truyền thông Hà Nội, Kể chuyện thương hiệu, Thiết kế web, Giải pháp số",
    ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
  };

  const currentSeoTitle = language === 'en' ? activeSeoData.titleEn : activeSeoData.titleVi;
  const currentSeoDesc = language === 'en' ? activeSeoData.descEn : activeSeoData.descVi;
  const currentSeoKeywords = language === 'en' ? activeSeoData.keywordsEn : activeSeoData.keywordsVi;
  const currentSeoImage = activeSeoData.ogImage;

  const [isAndroidAppMode, setIsAndroidAppMode] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isIPBlocked, setIsIPBlocked] = useState<boolean>(false);

  // Sync simulated IP Whitelisting protection blocker status
  useEffect(() => {
    const isEnabled = localStorage.getItem('halo_ip_whitelist_enabled') === 'true';
    if (isEnabled) {
      const isBypassed = sessionStorage.getItem('halo_ip_whitelist_bypass') === 'true';
      if (!isBypassed) {
        setIsIPBlocked(true);
      } else {
        setIsIPBlocked(false);
      }
    } else {
      setIsIPBlocked(false);
    }
  }, [isAdminOpen]);

  const handleSimulateDevBypass = () => {
    sessionStorage.setItem('halo_ip_whitelist_bypass', 'true');
    setIsIPBlocked(false);
  };

  // Auto detect native mobile / Android WebView user agents
  useEffect(() => {
    const isAndroidUA = /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const hasAndroidFlag = localStorage.getItem('halo_android_app_mode') === 'true';
    if (isAndroidUA || hasAndroidFlag) {
      setIsAndroidAppMode(true);
    }
  }, []);

  const handleToggleAndroidAppMode = (val: boolean) => {
    setIsAndroidAppMode(val);
    localStorage.setItem('halo_android_app_mode', val ? 'true' : 'false');
  };

  // Mouse Coordinates State that gets fed as custom global CSS coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleScroll = () => {
      // Calculate Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section for navigation highlighter
      const sections = ['hero', 'about', 'services', 'portfolio', 'process', 'testimonials', 'team', 'faq', 'contact'];
      let current = 'hero';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is above some margin of viewport, consider it active
          if (rect.top <= 180) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper to scroll to section
  const navigateToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t('home'), target: 'hero' },
    { label: t('about'), target: 'about' },
    { label: t('services'), target: 'services' },
    { label: t('portfolio'), target: 'portfolio' },
    { label: t('process'), target: 'process' },
    { label: t('team'), target: 'team' },
    { label: t('faq'), target: 'faq' },
    { label: t('contact'), target: 'contact' }
  ];

  if (isAndroidAppMode) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden text-slate-100">
        <ParticleBackground />
        
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5C7FA3]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7BA7D9]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Outer Header for Simulation Controls */}
        <div className="absolute top-4 left-4 right-4 lg:left-8 lg:right-8 flex items-center justify-between z-20 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5C7FA3] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              H
            </div>
            <div className="text-left">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#7BA7D9] leading-none">HALO APP INTEGRATION</h2>
              <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">// GOOGLE PLAY TARGET DEVICE</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="bg-slate-900/85 p-0.5 rounded-full flex items-center border border-slate-850 shadow-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                  language === 'en' ? 'bg-[#5C7FA3] text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                  language === 'vi' ? 'bg-[#5C7FA3] text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                VI
              </button>
            </div>

            <button
              onClick={() => handleToggleAndroidAppMode(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-full text-[9px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700/60 transition-all cursor-pointer"
            >
              {language === 'en' ? 'Exit Simulator' : 'Thoát Trình Giả Lập'}
            </button>
          </div>
        </div>

        {/* Mockup Frame wrapper or Fullscreen */}
        <div className="w-full h-full max-w-[400px] max-h-[820px] aspect-[9/18.5] relative z-10 mt-14 lg:mt-6 transition-all">
          <div className="hidden sm:block absolute inset-0 bg-[#090D16] border-[10px] border-[#1E293B] rounded-[52px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] pointer-events-none z-30 ring-1 ring-[#334155]/50">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-5 bg-[#090D16] rounded-full flex items-center justify-center border border-slate-800/20 box-content">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-950 flex items-center justify-center p-0.5 ml-auto mr-4">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-blue-900/30"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-full bg-[#0F172A] sm:p-[10px] sm:rounded-[52px] overflow-hidden flex flex-col">
            <AndroidAppView 
              isSimulated={true} 
              onExitSimulator={() => handleToggleAndroidAppMode(false)} 
            />
          </div>
        </div>

        <div className="mt-6 text-center text-slate-500 text-[9px] font-mono tracking-wider max-w-xs uppercase leading-relaxed select-none">
          {language === 'en' 
            ? 'Fully optimized for webview publishing // Capacitor bundle compliant // Touch screen optimized layout' 
            : 'Tương thích hoàn toàn với Google Play // Phù hợp WebView // Tối ưu kích thước cảm ứng đa điểm'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-[#1D2B3D] bg-[#F5F7FA] font-sans selection:bg-[#7BA7D9]/20 selection:text-[#1D2B3D] overflow-x-hidden">
      
      {/* Dynamic SEO Meta Control via React Helmet */}
      <Helmet>
        <title>{currentSeoTitle}</title>
        <meta name="description" content={currentSeoDesc} />
        <meta name="keywords" content={currentSeoKeywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentSeoTitle} />
        <meta property="og:description" content={currentSeoDesc} />
        <meta property="og:image" content={currentSeoImage} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSeoTitle} />
        <meta name="twitter:description" content={currentSeoDesc} />
        <meta name="twitter:image" content={currentSeoImage} />
      </Helmet>

      {/* 1. Interactive Particles Backdrop */}
      <ParticleBackground />

      {/* Editorial aesthetic ambient blur blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#7BA7D9]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5C7FA3]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-[#E6EEF8]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* 2. Global TOP Scroll Indicator Line */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#5C7FA3] to-[#7BA7D9] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3. Luxury Sticky Header/Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#F5F7FA]/80 backdrop-blur-xl border-b border-[#7BA7D9]/10 py-4.5 px-4 md:px-8 transition-all">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigateToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-[#5C7FA3] transition-transform duration-500 group-hover:scale-110"></div>
            <span className="text-base font-semibold tracking-wider uppercase text-[#1D2B3D]">
              HALO AGENCY
            </span>
          </div>

          {/* Desktop Links Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => navigateToSection(link.target)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all hover:text-[#1D2B3D] cursor-pointer ${
                  activeSection === link.target ? 'text-[#1D2B3D] border-b-2 border-[#5C7FA3] pb-1' : 'text-[#2C3E50]/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side controls containing buttons and toggle */}
          <div className="flex items-center gap-4">
            {/* Language Toggle Button */}
            <div className="bg-slate-200/50 p-0.5 rounded-full flex items-center border border-[#7BA7D9]/15 shadow-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#5C7FA3] text-white shadow-xs'
                    : 'text-[#2C3E50]/60 hover:text-[#2C3E50]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-wider rounded-full transition-all cursor-pointer ${
                  language === 'vi'
                    ? 'bg-[#5C7FA3] text-white shadow-xs'
                    : 'text-[#2C3E50]/60 hover:text-[#2C3E50]'
                }`}
              >
                VI
              </button>
            </div>

            {/* Super Admin Control Panel Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 px-2.5 rounded-full border border-[#7BA7D9]/15 bg-white hover:bg-slate-50 transition-all cursor-pointer text-[#5C7FA3] hover:text-[#1D2B3D] flex items-center gap-1 shadow-2xs"
              title="Super Admin System Console"
            >
              <Shield className="w-3 h-3 text-[var(--primary-theme,#5C7FA3)] animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest uppercase font-bold hidden sm:inline">CONSOLE</span>
            </button>

            {/* Call to action trigger */}
            <div className="hidden lg:block">
              <button
                onClick={() => navigateToSection('contact')}
                className="px-5 py-2.5 bg-[#5C7FA3] hover:bg-[#1D2B3D] rounded-full text-[9px] font-bold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer"
              >
                {t('startProject')}
              </button>
            </div>

            {/* Mobile responsive toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-[#7BA7D9]/15 flex items-center justify-center text-[#1D2B3D] cursor-pointer hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1D2B3D]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. Adaptive Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col justify-center items-center p-8 gap-6">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => navigateToSection(link.target)}
              className="font-sans font-light text-xl text-[#1D2B3D] tracking-wider hover:text-[#5C7FA3] transition-colors uppercase cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigateToSection('contact')}
            className="w-full max-w-xs py-3.5 rounded-full bg-[#5C7FA3] text-white font-semibold text-xs tracking-wider transition-all uppercase"
          >
            {t('startProject')} //
          </button>
        </div>
      )}

      {/* 4.5 FEATURED CAMPAIGNS & LIVE COUNTDOWNS SYSTEM */}
      <ActiveCampaignBanner />

      {/* 5. Core Screen Assemblies */}
      {isIPBlocked ? (
        <div className="min-h-[85vh] flex flex-col items-center justify-center p-8 text-center bg-[#090D16] text-white relative z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,127,163,0.1),transparent)] pointer-events-none" />
          <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-2xl text-red-500 mb-6 animate-pulse">
            <Shield className="w-10 h-10 mx-auto" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight mb-2">
            RESTRICTED SECURITY LANDMARK
          </h2>
          <p className="font-mono text-[10px] text-slate-400 tracking-widest uppercase mb-6">// ACTIVE IP PROTECTION MIDDLEWARE ENFORCED</p>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-8">
            This workspace restricts active payloads to authorized whitelisted IP addresses. Your connection is logged for audit telemetry checks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleSimulateDevBypass}
              className="px-6 py-3.5 bg-[#7BA7D9] hover:bg-[#5C7FA3] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-[#7BA7D9]/15 transition-all"
            >
              Simulate Dev Whitelisted Connection
            </button>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all font-mono"
            >
              Sign In to Super Admin Panel
            </button>
          </div>
        </div>
      ) : (
        <main className="relative z-10">
          {websiteSettings.layoutSections.map((sectionKey) => {
            switch (sectionKey) {
              case 'hero':
                return (
                  <div key="hero">
                    <Hero 
                      onScrollToContact={() => navigateToSection('contact')} 
                      onScrollToPortfolio={() => navigateToSection('portfolio')}
                    />
                  </div>
                );
              case 'about':
                return (
                  <div key="about">
                    <About />
                  </div>
                );
              case 'services':
                return (
                  <div key="services">
                    <Services />
                  </div>
                );
              case 'portfolio':
                return (
                  <div key="portfolio">
                    <Portfolio />
                  </div>
                );
              case 'process':
                return (
                  <div key="process">
                    <Process />
                  </div>
                );
              case 'testimonials':
                return (
                  <div key="testimonials">
                    <Testimonials />
                  </div>
                );
              case 'team':
                return (
                  <div key="team">
                    <Team />
                  </div>
                );
              case 'faq':
                return (
                  <div key="faq">
                    <FAQ />
                  </div>
                );
              case 'contact':
                return (
                  <div key="contact">
                    <Contact />
                  </div>
                );
              default:
                return null;
            }
          })}
        </main>
      )}

      {/* 6. High End Sleek Corporate Footer */}
      <footer className="relative z-10 py-16 px-4 md:px-8 bg-white border-t border-[#7BA7D9]/15 font-sans">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-100 text-left">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#5C7FA3]"></div>
              <span className="font-sans font-bold text-xs text-[#1D2B3D] tracking-wider uppercase">
                HALO AGENCY
              </span>
            </div>
            <p className="text-[#2C3E50]/70 text-[11px] font-light leading-relaxed">
              {t('footerSub')}
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-4">
            <span className="text-slate-400 text-[9px] tracking-widest uppercase font-bold">// {t('navigation') || 'NAVIGATION'}</span>
            <ul className="space-y-2 text-xs text-[#2C3E50]/70">
              <li><button onClick={() => navigateToSection('about')} className="hover:text-[#5C7FA3] cursor-pointer transition-colors">{t('about')}</button></li>
              <li><button onClick={() => navigateToSection('services')} className="hover:text-[#5C7FA3] cursor-pointer transition-colors">{t('services')}</button></li>
              <li><button onClick={() => navigateToSection('portfolio')} className="hover:text-[#5C7FA3] cursor-pointer transition-colors">{t('portfolio')}</button></li>
              <li><button onClick={() => navigateToSection('process')} className="hover:text-[#5C7FA3] cursor-pointer transition-colors">{t('process')}</button></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-4">
            <span className="text-slate-400 text-[9px] tracking-widest uppercase font-bold">// {language === 'en' ? 'COLLABORATION' : 'HỢP TÁC'}</span>
            <ul className="space-y-2 text-xs text-[#2C3E50]/70 text-left">
              <li>
                <button 
                  onClick={() => setOpenCookiePolicyTrigger(true)} 
                  className="hover:text-[#5C7FA3] text-[#5C7FA3] font-medium cursor-pointer text-left transition-colors whitespace-nowrap"
                >
                  {language === 'en' ? 'Cookie & Privacy Policy' : 'Chính sách Cookie & Bảo mật'}
                </button>
              </li>
              <li><span className="text-[#2C3E50]/40 block">{language === 'en' ? 'Corporate Office' : 'Văn phòng hành chính'}</span></li>
              <li><span className="text-[#2C3E50]/40 block">{language === 'en' ? 'Bespoke Strategy' : 'Chiến lược Bản sắc'}</span></li>
              <li><span className="text-[#2C3E50]/40 block">{language === 'en' ? 'Brand Inquiries' : 'Yêu cầu Thương hiệu'}</span></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div className="space-y-3">
            <span className="text-slate-400 text-[9px] tracking-widest uppercase font-bold">// {t('engageLabel')}</span>
            <div className="flex gap-4">
              <a href="#contact" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#5C7FA3] hover:bg-[#E6EEF8] transition-all">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#contact" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#5C7FA3] hover:bg-[#E6EEF8] transition-all">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="#contact" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#5C7FA3] hover:bg-[#E6EEF8] transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Copyright disclaimer */}
        <div className="w-full max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[9px] text-[#2C3E50]/40 gap-4">
          <div className="flex gap-6 uppercase tracking-widest text-[#2C3E50]/40">
            <span>HANOI</span>
            <span>HO CHI MINH CITY</span>
            <span>DA NANG</span>
          </div>
          <span>
            {t('allRightsReserved')}
          </span>
        </div>
      </footer>

      {/* Floating Trigger for Android App Simulation */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleToggleAndroidAppMode(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#0F172A] border border-[#7BA7D9]/20 hover:border-[#7BA7D9]/60 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(123,167,217,0.15)] transition-all hover:-translate-y-0.5 cursor-pointer font-sans"
        >
          <Smartphone className="w-4.5 h-4.5 text-[#7BA7D9] animate-bounce" />
          <div className="text-left">
            <span className="block text-[10px] uppercase font-bold tracking-widest leading-none text-slate-100">
              {language === 'en' ? 'Android App Mode' : 'Chế độ Android App'}
            </span>
            <span className="block text-[8px] text-slate-400 font-mono">
              // GOOGLE PLAY PREVIEW
            </span>
          </div>
        </button>
      </div>

      {/* 7. Super Admin Operations & Control OS Window */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      {/* 8. Cookie Consent Framework Banner */}
      <CookieBanner 
        onOpenPolicyFromFooter={openCookiePolicyTrigger}
        onResetOpenState={() => setOpenCookiePolicyTrigger(false)}
      />

    </div>
  );
}

// -------------------------------------------------------------
// Live Campaigns & Countdowns banner system
// -------------------------------------------------------------
function ActiveCampaignBanner() {
  const { events, language } = useLanguage();
  const activeFeatured = events.filter(e => e.isFeatured);

  if (activeFeatured.length === 0) return null;

  // Render the pinned/featured event announcement with glassmorphism style
  const currentEvent = activeFeatured[0];
  const isPast = new Date(currentEvent.date).getTime() < Date.now();

  return (
    <div className="relative z-30 bg-slate-950 text-white border-b border-white/5 py-4 px-4 sm:px-8 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7BA7D9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5C7FA3]"></span>
            </span>
            <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded bg-[#7BA7D9]/10 text-[#7BA7D9] border border-[#7BA7D9]/20">
              {language === 'en' ? currentEvent.badgeTextEn : currentEvent.badgeTextVi}
            </span>
          </span>
          <div className="text-xs font-semibold leading-tight text-slate-200">
            {language === 'en' ? currentEvent.titleEn : currentEvent.titleVi} &mdash;{' '}
            <span className="text-slate-400 font-normal">
              {language === 'en' ? currentEvent.descEn : currentEvent.descVi}
            </span>
          </div>
        </div>

        {/* Live ticking clock */}
        {!isPast && (
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono tracking-widest text-[#7BA7D9]/80 uppercase">COUNTDOWN:</span>
            <CountdownTicking targetDate={currentEvent.date} />
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownTicking({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calc());
    const interval = setInterval(() => {
      setTimeLeft(calc());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-1.5 font-mono text-[10px] text-slate-100">
      <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold">{String(timeLeft.days).padStart(2, '0')}d</span>
      <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
      <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
      <span className="bg-[#7BA7D9] text-slate-950 px-1.5 py-0.5 rounded font-bold animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
    </div>
  );
}
