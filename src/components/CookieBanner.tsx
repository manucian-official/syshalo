import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cookie, 
  ShieldCheck, 
  Settings, 
  Check, 
  X, 
  FileText, 
  BarChart3, 
  Activity, 
  Lock, 
  Info, 
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  lastUpdated: string;
}

interface CookieBannerProps {
  onOpenPolicyFromFooter?: boolean;
  onResetOpenState?: () => void;
}

export default function CookieBanner({ onOpenPolicyFromFooter, onResetOpenState }: CookieBannerProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Default Cookie Preferences State
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
    lastUpdated: new Date().toISOString()
  });

  // Check if consent was already given in localStorage
  useEffect(() => {
    const savedConsent = localStorage.getItem('halo_cookie_consent_v1');
    if (!savedConsent) {
      // Show banner with a slight premium delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(savedConsent) as CookiePreferences;
        setPreferences(parsed);
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  // Trigger from parents (e.g., footer link clicked)
  useEffect(() => {
    if (onOpenPolicyFromFooter) {
      setShowFullPolicy(true);
      if (onResetOpenState) onResetOpenState();
    }
  }, [onOpenPolicyFromFooter, onResetOpenState]);

  const handleAcceptAll = () => {
    const allPrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
      lastUpdated: new Date().toISOString()
    };
    setPreferences(allPrefs);
    localStorage.setItem('halo_cookie_consent_v1', JSON.stringify(allPrefs));
    
    // Trigger simulated analytics log
    triggerMockAnalyticsLog('all_accepted');

    setSuccessMessage(language === 'en' ? 'Preferences saved successfully!' : 'Đã lưu cấu hình bảo mật thành công!');
    setTimeout(() => {
      setIsVisible(false);
      setShowSettings(false);
      setSuccessMessage(null);
    }, 1200);
  };

  const handleDeclineNonEssential = () => {
    const defaultPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
      lastUpdated: new Date().toISOString()
    };
    setPreferences(defaultPrefs);
    localStorage.setItem('halo_cookie_consent_v1', JSON.stringify(defaultPrefs));

    // Trigger simulated analytics log
    triggerMockAnalyticsLog('essential_only');

    setSuccessMessage(language === 'en' ? 'Necessary cookies accepted' : 'Đã cấu hình tùy chọn tối thiểu');
    setTimeout(() => {
      setIsVisible(false);
      setShowSettings(false);
      setSuccessMessage(null);
    }, 1200);
  };

  const handleSaveCustom = () => {
    const customPrefs = {
      ...preferences,
      necessary: true, // always true
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('halo_cookie_consent_v1', JSON.stringify(customPrefs));

    // Trigger simulated analytics log
    triggerMockAnalyticsLog(JSON.stringify(customPrefs));

    setSuccessMessage(language === 'en' ? 'Custom parameters locked!' : 'Đã thiết lập chi tiết!');
    setTimeout(() => {
      setIsVisible(false);
      setShowSettings(false);
      setSuccessMessage(null);
    }, 1200);
  };

  // Helper simulated telemetry to log cookie acceptance events contextually
  const triggerMockAnalyticsLog = (type: string) => {
    const count = parseInt(localStorage.getItem('halo_telemetry_consents_count') || '0', 10);
    localStorage.setItem('halo_telemetry_consents_count', (count + 1).toString());
    
    const logs = JSON.parse(localStorage.getItem('halo_audit_logs') || '[]');
    const newLog = {
      id: `cookie-audit-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      module: 'SECURITY',
      action: `User customized and saved privacy parameters: "${type}"`
    };
    localStorage.setItem('halo_audit_logs', JSON.stringify([newLog, ...logs].slice(0, 50)));
  };

  const togglePreference = (key: keyof Omit<CookiePreferences, 'lastUpdated'>) => {
    if (key === 'necessary') return; // Cannot turn off necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Content dictionary
  const text = {
    en: {
      title: "Data Protection & Cookie Policy",
      badge: "SECURITY MIDDLEWARE",
      shortDescription: "In compliance with GDPR and local cybersecurity frameworks, we measure visitor metrics and campaign dynamics to optimize your digital intelligence experience.",
      acceptAll: "Accept All",
      rejectAll: "Essential Only",
      customize: "Customize Preferences",
      saveCustom: "Save Parameters",
      back: "Back",
      policyLink: "Cookie Policy & Data Statement",
      learnMore: "Read Complete policy",
      
      neededTitle: "Necessary Session Integrity",
      neededDesc: "System authentication trackers, administrative whitelisting compliance, and interactive calculator budget variables. Always active.",
      
      analyticsTitle: "Analytics & High-Fidelity Performance",
      analyticsDesc: "Tracks visit times, interactive click paths, and scroll dimensions to optimize campaign rendering speeds.",
      
      marketingTitle: "Programmatic Tracking & Attribution",
      marketingDesc: "Attributes media campaign statistics, simulated leads, and branding ROI feedback data streams.",
      
      statusActive: "ACTIVE",
      statusDisabled: "DISABLED",
      statusRequired: "REQUIRED",
      
      // Policy texts inside the Modal
      modalTitle: "Cookie Policy & User Data Statement",
      modalSubtitle: "HALO Agency Strategic Data Infrastructure Compliance Framework",
      modalIntro: "This Cookie Policy governs the data collection processes of HALO Agency ('us', 'we', or 'our') within the standard preview workspace environment, integrated with GDPR, CCPA, and Vietnamese Cyber Information Security standards.",
      
      legalSection1Title: "1. Data We Collect and Analyze",
      legalSection1Body: "We gather essential performance parameters when you interact with our website elements. This includes calculated planner budgets, custom layout section preferences, device rendering parameters, active simulated IP whitelists, and navigation clicks. We store zero persistent personally identifiable files except what you voluntarily submit in our strategy briefing forms.",
      
      legalSection2Title: "2. The Role of Cookies",
      legalSection2Body: "Cookies are small data files deposited on your local storage to remember language choices ('en' vs 'vi'), simulation modes (normal web browser vs simulated Android application view), and whether security checks have been certified. Essential cookies are automatically cleared when you exit your browser.",
      
      legalSection3Title: "3. Direct Security Compliance",
      legalSection3Body: "Your safety and compliance are paramount. Any action regarding whitelisting, administrative console bypasses, or telemetry tracking is securely logged locally on your client machine for audit integrity. We do not export or transmit your local storage dataset to hostile third-party analytics hubs.",
      
      closePolicy: "Acknowledge policy"
    },
    vi: {
      title: "Chính sách Bảo mật & Cookie",
      badge: "KIỂM SOÁT BẢO MẬT",
      shortDescription: "Để đảm bảo tuân thủ các quy định bảo mật thông tin và tối ưu hóa hệ thống, chúng tôi đo lường số liệu truy cập và hiệu suất các chiến dịch truyền thông của đối tác.",
      acceptAll: "Đồng Ý Tất Cả",
      rejectAll: "Chỉ Cookie Thiết Yếu",
      customize: "Tùy Chỉnh Thiết Lập",
      saveCustom: "Lưu Thiết Lập",
      back: "Quay lại",
      policyLink: "Chính sách Cookie & Dữ liệu",
      learnMore: "Đọc đầy đủ chính sách bản quyền",
      
      neededTitle: "Cookie Hệ Thống & Tính Năng Thiết Yếu",
      neededDesc: "Liên quan đến theo dõi trạng thái quản trị viên siêu cấp, kiểm tra danh sách IP Whitelist, và các biến số tính toán ngân sách. Bắt buộc kích hoạt.",
      
      analyticsTitle: "Tối Ưu Hóa & Phân Tích Thống Kê",
      analyticsDesc: "Thu thập thời lượng xem trang, bản đồ nhiệt click, và các số liệu thời gian thực để cải thiện tốc độ và giao diện người dùng.",
      
      marketingTitle: "Chiến dịch Truyền thông & Quảng cáo",
      marketingDesc: "Đo lường chỉ số chuyển đổi, liên kết chiến dịch quảng cáo và phản hồi từ các nguồn truyền thông số.",
      
      statusActive: "ĐANG BẬT",
      statusDisabled: "ĐANG TẮT",
      statusRequired: "THIẾT YẾU",
      
      // Policy texts inside the Modal
      modalTitle: "Tuyên bố Chính sách Bảo mật & Cookie",
      modalSubtitle: "Khung Tuân thủ Cơ sở Dữ liệu của HALO Agency Việt Nam",
      modalIntro: "Chính sách này công bố chi tiết về cách thức thu thập, phân tích và quản lý dữ liệu người dùng tại ứng dụng HALO Agency để tuân thủ Luật An ninh mạng Việt Nam và các tiêu chuẩn quốc tế như GDPR.",
      
      legalSection1Title: "1. Loại dữ liệu thu thập & phân tích",
      legalSection1Body: "Chúng tôi ghi nhận các biến dữ liệu nội bộ bao gồm: thông tin ngân sách ước tính từ Planner, việc lựa chọn sắp xếp thư mục hiển thị trang chủ, thông tin thiết bị duyệt app, hồ sơ IP ghi nhận tạm thời trong Admin Console và hành trình tương tác. Không lưu trữ thông tin cá nhân bắt buộc khi chưa được sự cho phép.",
      
      legalSection2Title: "2. Vai trò của việc sử dụng Cookie",
      legalSection2Body: "Cookie là các tệp thông tin nhỏ được lưu trữ cục bộ để hỗ trợ lưu giữ ngôn ngữ làm việc (Tiếng Việt/Tiếng Anh), lưu trạng thái hoạt động của trình mô phỏng thiết bị di động Android và ghi nhớ quyền truy cập tạm thời vào bảng điều khiển Console của chuyên viên.",
      
      legalSection3Title: "3. Cam kết Bảo mật & Bảo vệ thông tin",
      legalSection3Body: "Dữ liệu thu thập hoàn toàn phục vụ mục tiêu tối ưu trải nghiệm trực quan và ghi nhận bảo mật hệ thống. Nhật ký hoạt động chỉ được lưu dưới dạng LocalStorage/SessionStorage tại máy tính cá nhân của bạn và không chia sẻ cho bên thứ ba vì mục đích kinh doanh.",
      
      closePolicy: "Đã hiểu và Xác thực"
    }
  };

  const currentText = language === 'en' ? text.en : text.vi;

  return (
    <>
      {/* 1. COMPACT SLIDE-UP PREMIUM BANNER */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="halo-cookie-banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-[460px] z-45 font-sans"
          >
            <div className="glass-panel text-left p-5 sm:p-6 rounded-2xl border border-[#7BA7D9]/25 shadow-[0_20px_50px_-12px_rgba(92,127,163,0.25)] relative overflow-hidden">
              
              {/* Subtle background security line layout decorations */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#5C7FA3]" />

              {/* Success Notification Fade-In */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0F172A] text-white z-20 flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/25 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">{successMessage}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">// CREDENTIALS SYNCED OK</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Banner Content */}
              {!showSettings ? (
                <div className="space-y-4">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Cookie className="w-4 h-4 text-[#5C7FA3] animate-pulse" />
                        <span className="text-[8px] font-mono tracking-widest text-[#5C7FA3] font-bold uppercase py-0.5 px-2 bg-[#E6EEF8] rounded-md border border-[#7BA7D9]/15">
                          {currentText.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs uppercase tracking-tight text-slate-900 font-sans">
                        {currentText.title}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setIsVisible(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {currentText.shortDescription}{' '}
                    <button
                      onClick={() => setShowFullPolicy(true)}
                      className="text-[#5C7FA3] hover:text-[#7BA7D9] transition-all font-semibold underline cursor-pointer inline-flex items-center gap-0.5"
                    >
                      {currentText.policyLink} <ExternalLink className="w-2.5 h-2.5 inline" />
                    </button>
                  </p>

                  {/* Buttons line */}
                  <div className="flex flex-col gap-2 pt-1 font-sans">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleAcceptAll}
                        className="px-3.5 py-2.5 bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer hover:shadow-md flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {currentText.acceptAll}
                      </button>
                      <button
                        onClick={handleDeclineNonEssential}
                        className="px-3.5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        {currentText.rejectAll}
                      </button>
                    </div>

                    <button
                      onClick={() => setShowSettings(true)}
                      className="w-full py-2 bg-slate-100/70 hover:bg-slate-200/60 border border-slate-200/40 text-slate-600 hover:text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Settings className="w-3 h-3 text-slate-500" />
                      {currentText.customize}
                    </button>
                  </div>
                </div>
              ) : (
                /* CUSTOM PRIVACY CRITERIA WORKBENCH */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-150">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#5C7FA3]" />
                      <h4 className="font-bold text-xs uppercase tracking-tight text-slate-900">
                        {currentText.customize}
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-[9px] font-mono font-bold uppercase bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 cursor-pointer"
                    >
                      &lt; {currentText.back}
                    </button>
                  </div>

                  {/* Switch togglers */}
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    
                    {/* Item 1: Essential (Always active) */}
                    <div className="p-2.5 rounded-xl border border-[#7BA7D9]/10 bg-slate-50/60 flex items-start gap-3">
                      <Lock className="w-4 h-4 text-[#5C7FA3] mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-slate-800 leading-none">{currentText.neededTitle}</span>
                          <span className="text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-500">
                            {currentText.statusRequired}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{currentText.neededDesc}</p>
                      </div>
                    </div>

                    {/* Item 2: Analytics & Statistics */}
                    <div 
                      onClick={() => togglePreference('analytics')}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-[#7BA7D9]/30 bg-white flex items-start gap-3 cursor-pointer transition-colors"
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-slate-800 leading-none">{currentText.analyticsTitle}</span>
                          <button
                            type="button" 
                            className={`w-8 h-4 rounded-full relative transition-colors ${preferences.analytics ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                            <span className={`block w-2.5 h-2.5 bg-white rounded-full absolute top-[3px] transition-transform ${preferences.analytics ? 'left-[19px]' : 'left-[3px]'}`} />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{currentText.analyticsDesc}</p>
                      </div>
                    </div>

                    {/* Item 3: Marketing Attribution */}
                    <div 
                      onClick={() => togglePreference('marketing')}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-[#7BA7D9]/30 bg-white flex items-start gap-3 cursor-pointer transition-colors"
                    >
                      <Activity className="w-4 h-4 text-[#7BA7D9] mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-slate-800 leading-none">{currentText.marketingTitle}</span>
                          <button
                            type="button" 
                            className={`w-8 h-4 rounded-full relative transition-colors ${preferences.marketing ? 'bg-[#5C7FA3]' : 'bg-slate-200'}`}
                          >
                            <span className={`block w-2.5 h-2.5 bg-white rounded-full absolute top-[3px] transition-transform ${preferences.marketing ? 'left-[19px]' : 'left-[3px]'}`} />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{currentText.marketingDesc}</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={handleSaveCustom}
                      className="flex-1 py-2.5 bg-[#1D2B3D] hover:bg-[#5C7FA3] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {currentText.saveCustom}
                    </button>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      {currentText.back}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DETAILED POLICY INFORMATION MODAL (GDPR / VIETNAMESE LOCAL STANDARD LAWS) */}
      <AnimatePresence>
        {showFullPolicy && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#7BA7D9]/25 rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl relative text-left"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setShowFullPolicy(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Blue stripe layout visual */}
              <div className="h-2 bg-gradient-to-r from-[#5C7FA3] to-[#7BA7D9] rounded-t-2xl shrink-0" />

              {/* Modal Core Headers */}
              <div className="p-6 pb-2 shrink-0 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#5C7FA3]" />
                  <span className="text-[8px] font-mono tracking-widest text-[#5C7FA3] font-bold uppercase">
                    REGULATORY COMPLIANCE STATEMT
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-none uppercase">
                  {currentText.modalTitle}
                </h2>
                <p className="text-[10px] font-mono text-[#7BA7D9] mt-1.5 uppercase font-bold tracking-wider leading-none">
                  {currentText.modalSubtitle}
                </p>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-6 pt-4 overflow-y-auto space-y-5 font-sans flex-1 text-slate-700 text-xs leading-relaxed">
                <p className="font-medium text-slate-800 border-l-2 border-[#7BA7D9] pl-3 py-0.5 bg-slate-50/50">
                  {currentText.modalIntro}
                </p>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    {currentText.legalSection1Title}
                  </h4>
                  <p>{currentText.legalSection1Body}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    {currentText.legalSection2Title}
                  </h4>
                  <p>{currentText.legalSection2Body}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    {currentText.legalSection3Title}
                  </h4>
                  <p>{currentText.legalSection3Body}</p>
                </div>

                {/* Additional simulated audit log analytics block */}
                <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-[#E6EEF8]/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#5C7FA3] font-bold uppercase leading-none">
                      <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                      Client-Side Telemetry Analytics State
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200/50 text-[8px] font-mono font-bold uppercase text-slate-500">
                      SECURE SANDBOX
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 leading-none">
                    <li>// LOCALSTORAGE COOKIE: <span className="text-emerald-600 font-bold">READY</span></li>
                    <li>// REGULATORY ACCORD: <span className="text-[#5C7FA3] font-bold">GDPR COMPLIANT</span></li>
                    <li>// AUDIT LOG DEPTH: <span className="text-slate-800 font-semibold">{JSON.parse(localStorage.getItem('halo_audit_logs') || '[]').length} events</span></li>
                    <li>// SESSION KEY TYPE: <span className="text-slate-800 font-semibold">AES-GCM (Simulated)</span></li>
                  </ul>
                  <p className="text-[9px] text-[#2C3E50]/50 font-sans leading-normal pt-1.5 border-t border-slate-100">
                    * By interacting with this interface, you authorize client sandbox logs to measure metrics within this local web container. Absolutely zero external API endpoints are reached.
                  </p>
                </div>
              </div>

              {/* Close Footer Action */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono text-slate-400">
                  // HALO SECURITY SECTOR VII
                </span>
                <button
                  type="button"
                  onClick={() => setShowFullPolicy(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                >
                  {currentText.closePolicy}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
