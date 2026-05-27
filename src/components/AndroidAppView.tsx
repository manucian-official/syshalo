import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PORTFOLIO_DATA } from '../data';
import { 
  TrendingUp, Award, MessageSquare, Target, Video, 
  Share2, ShieldCheck, Cpu, Smartphone, ScanLine, 
  Check, Play, Info, Eye, Download, Wifi, RefreshCw, 
  FileText, Compass, Settings, Sparkles, Send, 
  CheckCircle2, Laptop, AlertTriangle, ChevronRight,
  Sparkle, QrCode, Camera, Zap, ZapOff, ExternalLink
} from 'lucide-react';

interface AndroidAppViewProps {
  onExitSimulator?: () => void;
  isSimulated?: boolean;
}

export default function AndroidAppView({ onExitSimulator, isSimulated = false }: AndroidAppViewProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pitch' | 'studio' | 'settings'>('dashboard');
  
  // Tab 1: Sentiment Sentinel states
  const [sentinelTerm, setSentinelTerm] = useState('');
  const [sentinelLoading, setSentinelLoading] = useState(false);
  const [sentinelResult, setSentinelResult] = useState<any>(null);

  // Tab 2: AI Pitch Assistant states
  const [pitchIndustry, setPitchIndustry] = useState('aviation');
  const [pitchGoal, setPitchGoal] = useState('trust');
  const [pitchAudience, setPitchAudience] = useState('eco');
  const [pitchLoading, setPitchLoading] = useState(false);
  const [pitchResult, setPitchResult] = useState<any>(null);

  // Tab 3: AR Lens Studio states
  const [arAsset, setArAsset] = useState('vietnam-airlines');
  const [arScale, setArScale] = useState(70);
  const [arRotate, setArRotate] = useState(-5);
  const [customPhotoSelected, setCustomPhotoSelected] = useState<string | null>(null);

  // QR Code Scanner Sub-features states
  const [arSubTab, setArSubTab] = useState<'visualizer' | 'qr_scanner'>('visualizer');
  const [cameraActive, setCameraActive] = useState(false);
  const [targetMockItem, setTargetMockItem] = useState<'vietnam-airlines' | 'vinfast' | 'coffee' | 'masan'>('vietnam-airlines');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [scannerFlash, setScannerFlash] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);
  const [showScannerTooltip, setShowScannerTooltip] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (cameraActive && activeTab === 'studio' && arSubTab === 'qr_scanner') {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then(stream => {
            streamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.warn("Camera blocked or unavailable inside iframe/system context, falling back to gorgeous scanning simulation: ", err);
            setCameraActive(false);
          });
      } else {
        setCameraActive(false);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive, activeTab, arSubTab]);

  const handleScanAction = () => {
    setIsScanningActive(true);
    setScanProgress(10);
    
    let progressVal = 10;
    const interval = setInterval(() => {
      progressVal += 15;
      if (progressVal >= 100) {
        setScanProgress(100);
        clearInterval(interval);
        
        // Find corresponding project from PORTFOLIO_DATA
        let targetId = "vietnam-airlines-green";
        if (targetMockItem === 'vinfast') targetId = "vinfast-electric-debut";
        if (targetMockItem === 'coffee') targetId = "premium-roastery-identity";
        if (targetMockItem === 'masan') targetId = "masan-impact-story";
        
        const matchedStudy = PORTFOLIO_DATA.find(proj => proj.id === targetId);
        setSelectedCaseStudy(matchedStudy || PORTFOLIO_DATA[0]);
        setIsScanningActive(false);
      } else {
        setScanProgress(progressVal);
      }
    }, 150);
  };

  // Tab 4: Android Build states
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [isBuildingAab, setIsBuildingAab] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildSuccess, setBuildSuccess] = useState(false);

  // Interactive Brand Sentinel Local Data Engine
  const executeSentinelAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentinelTerm.trim()) return;

    setSentinelLoading(true);
    setSentinelResult(null);

    setTimeout(() => {
      const term = sentinelTerm.toLowerCase();
      let positive = 72;
      let neutral = 18;
      let topics = ['#TruongTon', '#LegacyBrand', '#HALOStory'];
      let volume = 'High (8.4k mentions/24h)';
      
      if (term.includes('vin') || term.includes('car') || term.includes('xe')) {
        positive = 81;
        neutral = 12;
        topics = ['#VinFastSuites', '#XanhSM', '#KỷNguyênXanh', '#XeDienViet'];
        volume = 'Critical Volume (42.5k mentions/24h)';
      } else if (term.includes('air') || term.includes('bay') || term.includes('hang')) {
        positive = 88;
        neutral = 8;
        topics = ['#VietnamAirlines', '#HanhTrinhXanh', '#HanhXuyenViet', '#EcoSafety'];
        volume = 'Elevated Volume (18.1k mentions/24h)';
      } else if (term.includes('coffee') || term.includes('ca phe') || term.includes('house')) {
        positive = 76;
        neutral = 15;
        topics = ['#TheCoffeeHouse', '#NhaRangDiSan', '#LocalBrew', '#ArtisanalVN'];
        volume = 'Steady Volume (11.2k mentions/24h)';
      } else if (term.includes('masan') || term.includes('tieu dung') || term.includes('food')) {
        positive = 74;
        neutral = 21;
        topics = ['#MasanGroup', '#DinhDuongViet', '#PhucLongTea', '#GiaDinhYeu'];
        volume = 'High Volume (22.9k mentions/24h)';
      }

      setSentinelResult({
        term: sentinelTerm,
        sentiment: { positive, neutral, negative: 100 - positive - neutral },
        topics,
        volume,
        alertState: positive > 80 ? 'EXCELLENT BRAND HEALTH' : 'STABLE ENGAGEMENT',
        updateTime: new Date().toLocaleTimeString()
      });
      setSentinelLoading(false);
    }, 1500);
  };

  // AI Strategic Pitch local rules based engine (Fast, gorgeous, offline-safe, highly professional)
  const executeAIPitch = () => {
    setPitchLoading(true);
    setPitchResult(null);

    setTimeout(() => {
      // Formulate detailed campaign briefs based on inputs
      const resultData: any = {
        aviation: {
          trust: {
            title_en: "Project Gilded Skies: Sustainable Legacy",
            title_vi: "Chiến dịch Chân Mây Vàng: Di Sản Bền Vững",
            headline_en: "Sincerity is the Ultimate Luxury",
            headline_vi: "Sự Chân Thành Là Đỉnh Cao Của Xa Xỉ",
            slogan_en: "Vietnam Airlines // Safe Lanes, Green Horizons",
            slogan_vi: "Vietnam Airlines // Đường Bay An Lành, Chân Trời Xanh",
            phases_en: [
              "Phase 1: Translucent Reporting — Social media release of actual fuel-efficient metrics in styled geometric infographics.",
              "Phase 2: The Sincere Pilot Chronicles — Minimalist cinematic short films highlighting pilots detailing eco-navigating.",
              "Phase 3: Interactive Eco-Passports — Mobile users scan boarding passes to plant actual native mangrove trees in Central Vietnam."
            ],
            phases_vi: [
              "Phân kỳ 1: Truyền Thông Minh Bạch — Xuất bản số liệu tiết kiệm xăng dưới dạng các biểu đồ hình học tối giản cuốn hút.",
              "Phân kỳ 2: Ký Sự Người Phi Công — Chuỗi video ngắn điện ảnh chân thực lột tả trách nhiệm sinh thái phía sau cabin.",
              "Phân kỳ 3: Tích Hợp Hộ Chiếu Xanh — Khách hàng quét thẻ lên tàu để tự động đóng góp một cây ngập mặn thực tế tại miền Trung."
            ],
            outlets: "VnExpress (PR Premium), Forbes Vietnam (Legacy Profile), VTV1 Social Features"
          },
          reposition: {
            title_en: "The Ascended Cabin Experience",
            title_vi: "Nâng Tầm Không Gian Bay Thương Gia",
            headline_en: "Arrive Recomposed",
            headline_vi: "Chăm Sóc Giác Quan, Khởi Đầu Hành Trình",
            slogan_en: "A Signature Polish in the Skies",
            slogan_vi: "Một Bản Sắc Tinh Tế Trên Tầng Mây",
            phases_en: [
              "Phase 1: Silent Luxury Teasers — Ambient macro visual panels showing custom cabin fabrics and quiet typography.",
              "Phase 2: Elite Influencer Salon — High-trust alignment with boutique entrepreneurs reviewing the composition of long-haul rest.",
              "Phase 3: The Sensory Boarding Suite — Custom digital ambient audio tracks published on streaming portals."
            ],
            phases_vi: [
              "Phân kỳ 1: Bản Sắc Tĩnh Lặng — Các lát cắt hình ảnh vĩ mô phô diễn chất liệu ghế da thủ công và phông chữ chuẩn mực.",
              "Phân kỳ 2: Trải Nghiệm Thượng Khách — Liên kết cùng các doanh nhân có phong cách sống tinh lọc để cảm thụ giá trị nghỉ dưỡng.",
              "Phân kỳ 3: Thanh Âm Khoang Bay — Phát hành bộ nhạc hiệu thư thái đặc quyền trên các nền tảng số."
            ],
            outlets: "Elle Decoration (Aesthetic Focus), Tuoi Tre Journal, Luxury VN"
          }
        },
        automobile: {
          trust: {
            title_en: "Eco-Drive Vietnam: The Zero-Emission Vibe",
            title_vi: "Kỷ Nguyên Xanh: Chuyển Động Thuần Khiết",
            headline_en: "Pioneering Without Apologies",
            headline_vi: "Tiên Phong Bứt Phá, Không Ngại Thách Thức",
            slogan_en: "VinFast EV // Local Genius, Global Standard",
            slogan_vi: "VinFast EV // Trí Tuệ Bản Địa, Tiêu Chuẩn Toàn Cầu",
            phases_en: [
              "Phase 1: The Battery Blueprint — Direct, high-trust documentation explaining local recycling safety guidelines.",
              "Phase 2: Eco-Street Sprints — Digital engagement where users complete virtual clean mileage maps for awards.",
              "Phase 3: High-Society Gala — Exclusive carbon-neutral launch event with key sustainable founders in HCMC."
            ],
            phases_vi: [
              "Phân kỳ 1: Giải Mã Điện Năng — Minh bạch quy chuẩn tái chế vỏ pin và hệ thống an toàn năng lượng Việt Nam sản xuất.",
              "Phân kỳ 2: Vạn Dặm Thuần Chay — Tiện ích trực tuyến cho phép người dùng quy đổi dặm ảo thành các đóng góp xanh thực tế.",
              "Phân kỳ 3: Đại Tiệc Carbon-Trung Tính — Buổi tụ họp danh giá của các thủ lĩnh tiên phong lối sống xanh tại TP.HCM."
            ],
            outlets: "Zing News, VnExpress Tech Features, Hanoi TV News"
          },
          reposition: {
            title_en: "Project Eclipse: Next Generation Premium EVs",
            title_vi: "Chiến Dịch Eclipse: Điểm Tựa Đẳng Cấp Mới",
            headline_en: "Mastery in Motion",
            headline_vi: "Lĩnh Hội Đẳng Cấp Trong Từng Chuyển Động",
            slogan_en: "Luxurious Sustainability Redecorated",
            slogan_vi: "Bản Sắc Sang Trọng Kỷ Nguyên Di Động Mới",
            phases_en: [
              "Phase 1: Shadows of Silence — Cinematic trailer emphasizing vehicle acoustic isolation in absolute quietness.",
              "Phase 2: High-End Sound Lab — Interactive acoustic experience highlighting spatial audio engineered for local cities.",
              "Phase 3: Elite Test Pilot Program — Digital private previews booked exclusively for premium app members."
            ],
            phases_vi: [
              "Phân kỳ 1: Bóng Đêm Tĩnh Lặng — Thước phim lột tả độ cách âm vượt trội của xe chạy dọc phố đêm Sài Gòn không tiếng động.",
              "Phân kỳ 2: Trải Nghiệm Thính Giác — Công cụ âm thanh tương tác phô diễn vòm loa sinh động thiết kế riêng.",
              "Phân kỳ 3: Chuyến Đi Độc Bản — Chương trình lái thử riêng tư đặt chỗ bảo mật thông qua ứng dụng di động."
            ],
            outlets: "AutoPro Vietnam, Vietcetera, Saigoneer Editorials"
          }
        },
        f_b: {
          trust: {
            title_en: "Local Harvest: High-Trust Agriculture",
            title_vi: "Bản Địa Nguyên Bản: Sự Thành Thừa Truyền Thống",
            headline_en: "Grown in Trust, Shared in Sincerity",
            headline_vi: "Chăm Từ Đất Mẹ, Trọn Vẹn Niềm Tin",
            slogan_en: "The Coffee House // Traceable Sincerity, Handpicked",
            slogan_vi: "The Coffee House // Hành Trình Chân Thành, Tận Tâm Từng Hạt",
            phases_en: [
              "Phase 1: Farm-to-Mobile Records — QR codes placed on packaging that show the actual farmer who gathered the beans.",
              "Phase 2: Interactive Taste Maps — Educating on regional coffee attributes through sensory interactive app displays.",
              "Phase 3: Zero-Waste Barista Hub — Physical and digital guidelines demonstrating complete composting patterns."
            ],
            phases_vi: [
              "Phân kỳ 1: Mã Định Danh Nông Hộ — Mã QR trên ly cà phê hiển thị hình ảnh chân thực về người nông dân thu hoạch.",
              "Phân kỳ 2: Bản Đồ Hương Vị — Hướng dẫn trẻ hóa gu thưởng thức bằng giao diện cảm quan các nốt hương vùng cao Tây Nguyên.",
              "Phân kỳ 3: Trạm Barista Không Rác Thải — Tiêu chuẩn hóa quy tắc tái chế bã cà phê thành phân hữu cơ sinh học."
            ],
            outlets: "Vietcetera (Food & Beverage Features), Youth Newspaper (Tuoi Tre), VN Social Creators"
          },
          reposition: {
            title_en: "Artisanal Heritage Roast",
            title_vi: "Bản Sắc Kiến Tạo: Điểm Hẹn Nhà Rang",
            headline_en: "Craft is Our Coordinated Rhythm",
            headline_vi: "Nghệ Thuật Bản Sắc Trong Từng Giọt Lắng",
            slogan_en: "Quiet Spaces, Deep Flavors",
            slogan_vi: "Không Gian Tĩnh Lặng, Ý Niệm Sâu Sắc",
            phases_en: [
              "Phase 1: The Design Blueprint — Video showcase detailing the architectural copper design of flagship roasteries.",
              "Phase 2: Minimalist Aroma Guides — Digital aesthetic sheets teaching espresso balance and pour-over standards.",
              "Phase 3: Private Cupping Club — Members-only invites sent via notification push for monthly regional roast tasting."
            ],
            phases_vi: [
              "Phân kỳ 1: Bản Vẽ Thiết Kế — Thước phim kiến thuật kiến trúc, lột tả nghệ thuật dùng đồng thau nguyên bản trong điểm bán.",
              "Phân kỳ 2: Cẩm Nang Hương Vị Tối Giản — Các trang đồ họa tinh xảo hướng dẫn cách cảm thụ cà phê phin cao cấp thế hệ mới.",
              "Phân kỳ 3: Câu Lạc Bộ Thành Viên Thượng Hạng — Thư mời đẩy tự động trên điện thoại tham dự ngày hội thử nếm mẻ rang đặc biệt."
            ],
            outlets: "Lofficiel Vietnam, Harper's Bazaar Art, Heritage Magazine"
          }
        }
      };

      // Fallback fallback if keys mismatch
      const selectedInd = pitchIndustry as any;
      const selectedGoal = (pitchGoal === 'trust' ? 'trust' : 'reposition') as any;
      const baseObj = resultData[selectedInd] || resultData['aviation'];
      const brief = baseObj[selectedGoal] || baseObj['trust'];

      setPitchResult({
        title: language === 'en' ? brief.title_en : brief.title_vi,
        headline: language === 'en' ? brief.headline_en : brief.headline_vi,
        slogan: language === 'en' ? brief.slogan_en : brief.slogan_vi,
        phases: language === 'en' ? brief.phases_en : brief.phases_vi,
        outlets: brief.outlets,
        metrics: ["Est. Reach: 2.4M+", "Target ROI: 4.2x", "Recommended Budget: Premium Mid-Tier"],
        timestamp: new Date().toLocaleDateString()
      });
      setPitchLoading(false);
    }, 1500);
  };

  // Capacitor Gradle build simulation sequences
  const startAndroidBuildSimulation = () => {
    setIsBuildingAab(true);
    setBuildSuccess(false);
    setBuildProgress(10);
    setDiagnosticLogs(["$ npm run build", "Bundling React UI client into static assets..."]);

    const logSteps = [
      { prg: 25, log: "Vite client built successfully to /dist (assets: 48, critical css: 1)" },
      { prg: 40, log: "$ npx cap sync android" },
      { prg: 55, log: "Syncing Android native directory framework in /android..." },
      { prg: 70, log: "Integrating Capacitor core plug-ins: Geolocation, Storage, Native Web-Engine" },
      { prg: 82, log: "$ ./gradlew bundleRelease" },
      { prg: 90, log: "Compiling Gradle architectures with release signing keys (HALO_KEYSTORE)..." },
      { prg: 97, log: "Resolving ProGuard optimizers. Securing app resources..." },
      { prg: 100, log: "[SUCCESS] bundleRelease completed. Output: /build/outputs/bundle/release/app-release.aab (2.41 MB)" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setBuildProgress(logSteps[currentStep].prg);
        setDiagnosticLogs(prev => [...prev, logSteps[currentStep].log]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsBuildingAab(false);
        setBuildSuccess(true);
      }
    }, 900);
  };

  // Pre-load logs
  useEffect(() => {
    setDiagnosticLogs([
      "System initialized // CAPACITOR CORE 5.4.0",
      "Package path matched: agency.halo.app",
      "Ready for SDK verification..."
    ]);
  }, []);

  const t_app = (enVal: string, viVal: string) => {
    return language === 'en' ? enVal : viVal;
  };

  return (
    <div className="w-full h-full bg-[#0F172A] text-slate-100 font-sans flex flex-col justify-between overflow-hidden relative">
      
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#7BA7D9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-[#5C7FA3]/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP STATUS BAR MOCKUP */}
      <div className="bg-[#0b0f19] px-4 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800/50 shrink-0 select-none z-10">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-3 h-3 text-[#5C7FA3]" />
          <span className="font-bold tracking-wider text-slate-300">HALO PORTAL CLIENT v1.2</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-[#7BA7D9]" />
            <span className="text-[9px]">LTE // SECURE</span>
          </div>
          <span className="text-slate-200 font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* HEADER BAR FOR WEB SIMULATION */}
      {isSimulated && (
        <div className="bg-slate-900/90 border-b border-slate-800 p-2 px-3 flex items-center justify-between shrink-0 text-left z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[9px] text-slate-400 font-bold tracking-wider">
              {t_app("PREVIEW: ANDROID WEBVIEW PORT", "BẢN THỬ NGHIỆM: ANDROID WEBVIEW PORT")}
            </span>
          </div>
          {onExitSimulator && (
            <button 
              onClick={onExitSimulator}
              className="px-2.5 py-1 rounded bg-[#5C7FA3] hover:bg-[#1D2B3D] transition-colors text-white font-mono text-[9px] tracking-wider uppercase font-bold cursor-pointer"
            >
              x {t_app("WEB MODE", "CHẾ ĐỘ WEB")}
            </button>
          )}
        </div>
      )}

      {/* MAIN VIEWPORT SCROLLABLE CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 relative z-10 scrollbar-thin scrollbar-thumb-slate-800">
        
        {/* TAB ANIMATED CONTAINER */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="tab-dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 text-left"
            >
              {/* Profile Card */}
              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
                <div className="absolute right-3 top-3 w-16 h-16 bg-[#5C7FA3]/5 rounded-full border border-[#5C7FA3]/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-[#5C7FA3] animate-pulse" />
                </div>
                <span className="font-mono text-[8px] text-[#7BA7D9] tracking-widest block mb-0.5 uppercase font-bold">// VN NODE ACTIVE</span>
                <h3 className="font-sans font-light text-lg text-white mb-0.5 uppercase">
                  {t_app("WELCOME, STRATEGIC PARTNER", "XIN CHÀO, ĐỐI TÁC CHIẾN LƯỢC")}
                </h3>
                <p className="font-mono text-[9px] text-slate-400 uppercase">
                  {t_app("AUTHORIZATION: ELEVATED BRAND SUITE", "ỦY QUYỀN TRUY CẬP: THƯƠNG HIỆU HẠNG SANG")}
                </p>
              </div>

              {/* Status Campaign Quick Tiles */}
              <div>
                <span className="font-mono text-[8px] text-slate-400 tracking-wider block mb-2 uppercase font-bold">// ACTIVE MONITORED ROSTER</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-300 font-bold block truncate">Vietnam Airlines</span>
                    <span className="text-[9px] text-[#7BA7D9] font-mono block mb-1">An Ecological Promise</span>
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2">
                      <span>{t_app("Sync Status:", "Đồng bộ:")}</span>
                      <span className="text-emerald-400 font-bold">82% LIVE</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-300 font-bold block truncate">VinFast Global</span>
                    <span className="text-[9px] text-[#7BA7D9] font-mono block mb-1">Electric Revolution</span>
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2">
                      <span>{t_app("Sync Status:", "Đồng bộ:")}</span>
                      <span className="text-emerald-400 font-bold">94% LIVE</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-300 font-bold block truncate">The Coffee House</span>
                    <span className="text-[9px] text-[#7BA7D9] font-mono block mb-1">Heritage Reborn</span>
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-2">
                      <span>{t_app("Sync Status:", "Đồng bộ:")}</span>
                      <span className="text-slate-400 font-bold">100% DONE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BRAND SENTINEL ENGINE MODULE */}
              <div className="bg-slate-900/60 rounded-2xl p-4 md:p-5 border border-slate-800">
                <div className="flex items-center gap-2 mb-3.5">
                  <div className="w-5 h-5 rounded-lg bg-[#5C7FA3]/20 flex items-center justify-center border border-[#5C7FA3]/30">
                    <TrendingUp className="w-3 h-3 text-[#7BA7D9]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-white tracking-wider">
                      {t_app("LIVE BRAND SENTINEL LISTENER", "HỆ THỐNG GIÁM SÁT THỜI GIAN THỰC SENTINEL")}
                    </h4>
                    <p className="font-sans text-[10px] text-slate-400 font-light">
                      {t_app("Monitor real-time social sentiment indexes across Vietnam media outlets.", "Phân tích chỉ số cảm quan thảo luận xã hội trên các mặt báo mạng tại Việt Nam.")}
                    </p>
                  </div>
                </div>

                <form onSubmit={executeSentinelAnalysis} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t_app("Enter brand keyword (e.g., VinFast, Airline, Coffee)...", "Nhập từ khóa thương hiệu (ví dụ: VinFast, Airline, Coffee)...")}
                    value={sentinelTerm}
                    onChange={(e) => setSentinelTerm(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-[#7BA7D9] placeholder:text-slate-600 font-sans"
                  />
                  <button
                    type="submit"
                    disabled={sentinelLoading}
                    className="px-4 rounded-xl bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer disabled:bg-slate-800"
                  >
                    {sentinelLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </form>

                {/* Sentinel Result Render */}
                {sentinelResult && !sentinelLoading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-slate-800/60 space-y-3"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 uppercase font-bold">&gt; ANALYZED TARGET: "{sentinelResult.term}"</span>
                      <span className="text-emerald-400 font-bold bg-emerald-950/40 p-1 px-2.5 rounded-full border border-emerald-900/30">
                        {sentinelResult.alertState}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center py-1">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-emerald-400 font-bold block">{sentinelResult.sentiment.positive}%</span>
                        <span className="text-[8px] text-slate-400 block uppercase tracking-wider">{t_app("Positive", "Tích cực")}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold block">{sentinelResult.sentiment.neutral}%</span>
                        <span className="text-[8px] text-slate-500 block uppercase tracking-wider">{t_app("Neutral", "Trung lập")}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-rose-400 font-bold block">{sentinelResult.sentiment.negative}%</span>
                        <span className="text-[8px] text-slate-500 block uppercase tracking-wider">{t_app("Critical", "Hạn chế")}</span>
                      </div>
                    </div>

                    {/* Progress sentiment bar */}
                    <div className="h-1.5 w-full bg-slate-950 rounded-full flex overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${sentinelResult.sentiment.positive}%` }}></div>
                      <div className="bg-slate-500 h-full" style={{ width: `${sentinelResult.sentiment.neutral}%` }}></div>
                      <div className="bg-rose-500 h-full" style={{ width: `${sentinelResult.sentiment.negative}%` }}></div>
                    </div>

                    <div className="space-y-1.5 font-mono text-[9px] bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">SENTIMENT FLOW SPEED...</span>
                        <span className="text-[#7BA7D9]">{sentinelResult.volume}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-slate-500">HOT TAGS:</span>
                        {sentinelResult.topics.map((tag: string) => (
                          <span key={tag} className="text-slate-300 font-bold">{tag}</span>
                        ))}
                      </div>
                      <div className="text-[8px] text-slate-600 text-right pt-1">
                        LAST SECURE UPDATE: {sentinelResult.updateTime}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {sentinelLoading && (
                  <div className="py-8 flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="w-6 h-6 text-[#5C7FA3] animate-spin" />
                    <span className="font-mono text-[10px] text-[#7BA7D9] tracking-wider animate-pulse">// INTEGRATING DEEP SOCIAL SENTINEL PARSING...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: AI STRATEGIC PITCH BUILDER */}
          {activeTab === 'pitch' && (
            <motion.div
              key="tab-pitch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 text-left"
            >
              <div className="bg-slate-900/60 rounded-2xl p-4 md:p-5 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-[#5C7FA3]/20 flex items-center justify-center border border-[#5C7FA3]/30">
                    <Sparkles className="w-3 h-3 text-[#7BA7D9]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-white tracking-wider">
                      {t_app("AI CAMPAIGN PITCH ARCHITECT", "CÔNG CỤ KIẾN TẠO CHIẾN DỊCH AI")}
                    </h4>
                    <p className="font-sans text-[10px] text-slate-400 font-light">
                      {t_app("Synthesize premium corporate pitches and localization roadmaps.", "Khởi tạo nhanh các đề xuất ý tưởng truyền thông cao cấp tùy biến.")}
                    </p>
                  </div>
                </div>

                {/* Form parameters */}
                <div className="space-y-3.5 pt-2">
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-wider">{t_app("1. SELECT TARGET ENTERPRISE TIER", "1. LỰA CHỌN PHÂN KHÚC NGÀNH HÀNG")}</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'aviation', val: t_app("Aviation", "Hàng Không") },
                        { id: 'automobile', val: t_app("Automobile", "Xe Hơi EV") },
                        { id: 'f_b', val: t_app("Premium F&B", "Ẩm Thực") }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setPitchIndustry(item.id)}
                          className={`p-2 rounded-xl text-[10px] font-sans transition-all cursor-pointer border ${
                            pitchIndustry === item.id 
                              ? 'bg-[#5C7FA3] text-white border-[#5C7FA3] font-semibold' 
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {item.val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-wider">{t_app("2. ESTABLISH CORE STRATEGIC GOAL", "2. THIẾT LẬP MỤC TIÊU CỐT LÕI")}</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'trust', val: t_app("Trust & Bio Sincerity", "Chân Thành & Gắn Kết Niềm Tin") },
                        { id: 'reposition', val: t_app("Aesthetic Repositioning", "Tái Định Vị Bản Sắc Thẩm Mỹ") }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setPitchGoal(item.id)}
                          className={`p-2 rounded-xl text-[10px] font-sans transition-all cursor-pointer border ${
                            pitchGoal === item.id 
                              ? 'bg-[#5C7FA3] text-white border-[#5C7FA3] font-semibold' 
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {item.val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={executeAIPitch}
                    disabled={pitchLoading}
                    className="w-full bg-[#5C7FA3] hover:bg-[#1D2B3D] active:scale-98 text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#5C7FA3]/10"
                  >
                    {pitchLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkle className="w-3.5 h-3.5 animate-pulse" />
                    )}
                    {pitchLoading ? t_app("SYNTHESIZING CAMPAIGN DATA...", "ĐANG ĐỒNG BỘ TIẾN TRÌNH...") : t_app("GENERATE CREATIVE BRIEF", "KHỞI TẠO TÓM TẮT SÁNG TẠO SƠ BỘ")}
                  </button>
                </div>
              </div>

              {/* Pitch Result Area */}
              {pitchResult && !pitchLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 md:p-5 text-left relative overflow-hidden space-y-4"
                >
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#7BA7D9]/5 rounded-bl-full pointer-events-none" />
                  
                  {/* Title Block */}
                  <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[8px] text-[#7BA7D9] uppercase tracking-widest font-bold">// HALO PROXIED CONCEPT</span>
                      <h4 className="font-sans text-white text-base font-semibold uppercase leading-tight mt-1">{pitchResult.title}</h4>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>

                  {/* Creative Core */}
                  <div className="space-y-3.5">
                    <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="font-mono text-[7px] text-slate-500 uppercase font-bold tracking-wider">{t_app("CAMPAIGN CORE SLOGAN", "THÔNG ĐIỆP CHỦ ĐẠO")}</span>
                      <p className="text-[#7BA7D9] text-xs font-bold font-sans italic">"{pitchResult.headline}"</p>
                      <p className="text-slate-400 text-[10px] font-sans mt-0.5">{pitchResult.slogan}</p>
                    </div>

                    {/* Operational Roadmap Phases */}
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-wider block">{t_app("EXECUTION MILESTONES", "LỘ TRÌNH TRIỂN KHAI PHÂN KỲ")}</span>
                      <div className="space-y-2">
                        {pitchResult.phases.map((phase: string, i: number) => (
                          <div key={i} className="flex gap-2.5 items-start text-[10px] leading-relaxed">
                            <span className="w-4 h-4 rounded bg-[#5C7FA3]/20 flex items-center justify-center text-[#7BA7D9] font-mono text-[8.5px] font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-slate-300 font-light">{phase}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Channel Allocation */}
                    <div className="grid grid-cols-2 gap-2 text-[9px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block mb-1">RECOMMENDED CHANNELS</span>
                        <span className="text-[#7BA7D9] font-bold uppercase truncate block">{pitchResult.outlets}</span>
                      </div>
                      <div className="border-l border-slate-805 pl-3">
                        <span className="text-slate-500 block mb-1">EXPECTED METRICS</span>
                        <span className="text-emerald-400 font-bold block">4.2x ROI // 2.4M+ Reach</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {pitchLoading && (
                <div className="py-12 bg-slate-900/40 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-8 h-8 text-[#5C7FA3] animate-spin" />
                  <span className="font-mono text-[10px] text-[#7BA7D9] tracking-wider animate-pulse uppercase">// Generating customized strategic blueprints...</span>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: AR LENS & PACKAGING VISUALIZER */}
          {activeTab === 'studio' && (
            <motion.div
              key="tab-studio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 text-left relative"
            >
              {/* IMMERSIVE SUB-TAB BAR */}
              <div className="flex bg-slate-950/80 p-0.5 rounded-xl border border-slate-805 select-none shrink-0">
                <button
                  onClick={() => setArSubTab('visualizer')}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    arSubTab === 'visualizer' 
                      ? 'bg-[#5C7FA3] text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  {t_app("Billboard Sandbox", "Layout Biển Quảng Cáo")}
                </button>
                <button
                  onClick={() => setArSubTab('qr_scanner')}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    arSubTab === 'qr_scanner' 
                      ? 'bg-[#5C7FA3] text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  {t_app("Case Study Scanner", "Quét QR Thương Hiệu")}
                </button>
              </div>

              {/* AR BILLBOARD VISUALIZER VIEW */}
              {arSubTab === 'visualizer' && (
                <div className="bg-slate-900/60 rounded-2xl p-4 md:p-5 border border-slate-805 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-[#5C7FA3]/25 flex items-center justify-center border border-[#5C7FA3]/30">
                      <ScanLine className="w-3 h-3 text-[#7BA7D9]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase text-white tracking-wider">
                        {t_app("HALO AR CAMPAIGN GRAPHICS STUDIO", "GIAO DIỆN KIỂM QUAN HÌNH ẢNH AR")}
                      </h4>
                      <p className="font-sans text-[10px] text-slate-400 font-light">
                        {t_app("Overlay campaign graphic boards over simulated physical backdrops.", "Trình mô phỏng trực quan hình ảnh bảng biển quảng cáo trong không gian thực tế.")}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Lens Viewport Canvas */}
                  <div className="relative aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                    {/* Photo background represent street space */}
                    <img 
                      src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80" 
                      alt="city billboard landscape"
                      className="w-full h-full object-cover opacity-35 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Mockup Billboard overlay with sliding transforms */}
                    <motion.div 
                      className="absolute bg-white/10 backdrop-blur-md rounded border border-white/20 p-2 shadow-2xl flex flex-col items-center justify-center select-none cursor-pointer"
                      style={{ 
                        width: `${arScale * 1.8}px`,
                        rotate: `${arRotate}deg`
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      {/* Visual campaign rendering inside placeholder box */}
                      {arAsset === 'vietnam-airlines' && (
                        <div className="w-full h-12 bg-[#022A5C] flex flex-col justify-between p-1.5 text-left text-white overflow-hidden rounded">
                          <span className="text-[5px] font-mono tracking-widest text-[#7BA7D9] block">// SUSTAINABILITY 2026</span>
                          <div className="text-[7.5px] font-sans font-light leading-none">An Ecological Promise</div>
                          <div className="flex justify-between items-center text-[4px] font-mono text-slate-404 mt-1">
                            <span>VIETNAM AIRLINES</span>
                            <span>HALO AGENCY</span>
                          </div>
                        </div>
                      )}
                      
                      {arAsset === 'vinfast' && (
                        <div className="w-full h-12 bg-slate-950 flex flex-col justify-between p-1.5 text-left text-white overflow-hidden rounded border border-blue-500/20">
                          <span className="text-[5px] font-mono tracking-widest text-emerald-400 block">// ELECTRIC DEBUT</span>
                          <div className="text-[7.5px] font-sans font-light leading-none">Zero Emissions, Total Power</div>
                          <div className="flex justify-between items-center text-[4px] font-mono text-slate-505 mt-1">
                            <span>VINFAST GLOBAL</span>
                            <span>STABLE ENGINE</span>
                          </div>
                        </div>
                      )}

                      {arAsset === 'coffee' && (
                        <div className="w-full h-12 bg-[#FAF8F5] flex flex-col justify-between p-1.5 text-left text-medium-dark overflow-hidden rounded border border-amber-900/15 text-slate-800">
                          <span className="text-[5px] font-mono tracking-widest text-amber-800 block">// ROASTERY LEGACY</span>
                          <div className="text-[7.5px] font-sans font-light leading-none text-amber-950">Pure Vietnamese Brew</div>
                          <div className="flex justify-between items-center text-[4px] font-mono text-slate-404 mt-1">
                            <span>THE COFFEE HOUSE</span>
                            <span>HERITAGE REBORN</span>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Simulator guidelines */}
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/80 p-1.5 px-2.5 rounded-lg text-[8px] font-mono border border-slate-800 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-slate-300">AR CANVAS PREVIEW ACTIVE // MOCK RESOLUTION</span>
                    </div>
                  </div>

                  {/* Visualizer controls selectors */}
                  <div className="space-y-3.5 pt-1">
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-wider">{t_app("SELECT CAMPAIGN DESIGN GRAPHIC", "LỰA CHỌN THIẾT KẾ ĐỂ ĐỒNG BỘ")}</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'vietnam-airlines', val: "Vietnam Airlines" },
                          { id: 'vinfast', val: "VinFast Electric" },
                          { id: 'coffee', val: "Coffee House" }
                        ].map(item => (
                          <button
                            key={item.id}
                            onClick={() => setArAsset(item.id)}
                            className={`p-2 rounded-xl text-[10px] font-sans transition-all cursor-pointer border truncate ${
                              arAsset === item.id 
                                ? 'bg-[#5C7FA3] text-white border-[#5C7FA3] font-semibold' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {item.val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sliders for scale & rotate */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-mono text-slate-400">
                          <span>{t_app("ZOOM SCALE", "TỔNG TỶ LỆ KÍCH THƯỚC")}</span>
                          <span className="text-slate-200 font-bold">{arScale}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="40" 
                          max="120" 
                          value={arScale}
                          onChange={(e) => setArScale(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5C7FA3]" 
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-mono text-slate-400">
                          <span>{t_app("COMPASS ROTATE", "GÓC XOAY ĐỘ THẨM MỸ")}</span>
                          <span className="text-slate-200 font-bold">{arRotate}°</span>
                        </div>
                        <input 
                          type="range" 
                          min="-20" 
                          max="20" 
                          value={arRotate}
                          onChange={(e) => setArRotate(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5C7FA3]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AR PHYSICAL CAMPAIGN BRANDING QR SCANNER */}
              {arSubTab === 'qr_scanner' && (
                <div className="bg-slate-900/60 rounded-2xl p-4 md:p-5 border border-slate-805 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-orange-950/20 flex items-center justify-center border border-orange-900/40">
                      <QrCode className="w-3.5 h-3.5 text-amber-450 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase text-white tracking-wider">
                        {t_app("SINCERE QR CASE-STUDY DECODER", "HỆ THỐNG QUÉT QR CHÂN THÀNH")}
                      </h4>
                      <p className="font-sans text-[10px] text-slate-400 font-light">
                        {t_app("Scan high-end physical materials to unlock corresponding interactive project campaigns.", "Quét các ấn phẩm truyền thông thực tế của đối tác để mở khóa mã thiết kế chi tiết.")}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Lens Viewport Canvas */}
                  <div className="relative aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                    
                    {cameraActive ? (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      /* Elegant mock physical poster overlay */
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#040815] text-center p-3">
                        {targetMockItem === 'vietnam-airlines' && (
                          <div className="space-y-1 select-none flex flex-col items-center justify-center w-full">
                            <div className="w-8 h-8 rounded-full bg-[#022A5C]/20 border border-[#022A5C]/40 flex items-center justify-center text-[#7BA7D9] text-[10px] font-bold leading-none select-none">
                              VN
                            </div>
                            <span className="font-mono text-[7px] text-cyan-405 block uppercase tracking-widest leading-none">// CO-OPERATIVE REVOLUTION</span>
                            <h5 className="font-sans text-[10px] font-bold text-slate-205 uppercase tracking-wide leading-none">Vietnam Airlines Pass</h5>
                            
                            {/* Simulated mini physical ticket with custom visual barcode */}
                            <div className="bg-slate-900 border border-slate-850 p-2 rounded-lg flex items-center gap-3 w-4/5 shadow-2xs mt-1.5 relative overflow-hidden">
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#5C7FA3]" />
                              <div className="flex-1 text-left min-w-0">
                                <span className="block text-[5.5px] font-mono text-slate-500 font-bold tracking-wider">// BOARDING DESTINATION</span>
                                <span className="block text-[8.5px] font-sans font-extrabold text-white leading-none truncate">ECO SAIGON PASS</span>
                                <span className="block text-[6px] text-slate-450 mt-1 uppercase font-mono truncate">Flight VN-2026 // Biodegradable</span>
                              </div>
                              
                              {/* SVG representation of standard QR Code */}
                              <div className="w-10 h-10 bg-white p-1 rounded border border-slate-700 shrink-0 select-none">
                                <svg viewBox="0 0 29 29" className="w-full h-full" shapeRendering="crispEdges">
                                  <path fill="#ffffff" d="M0,0h29v29h-29z"/>
                                  <path fill="#0f172a" d="M0,0h7v7h-7z M22,0h7v7h-7z M0,22h7v7h-7z M9,3h1v1h-1z M12,3h2v2h-2z M17,2h3v1h-3z M20,4h2v1h-2z M3,9h2v1h-2z M10,9h3v1h-3z M15,9h2v2h-2z M18,8h3v1h-3z M25,9h3v1h-3z M8,12h2v4h-2z M14,13h4v1h-4z M22,12h4v1h-4z M1,14h5v1h-5z M11,16h4v3h-4z M18,17h3v1h-3z M23,16h3v1h-3z M5,18h1v3h-1z M10,19h3v1h-3z M18,20h2v1h-2z M24,20h2v1h-2z M3,23h2v3h-2z M11,24h4v1h-4z M18,23h3v2h-3z M25,23h3v1h-3z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {targetMockItem === 'vinfast' && (
                          <div className="space-y-1 select-none flex flex-col items-center justify-center w-full">
                            <div className="w-8 h-8 rounded-full bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-center text-emerald-400 text-[10px] font-bold leading-none select-none">
                              VF
                            </div>
                            <span className="font-mono text-[7px] text-emerald-400 block uppercase tracking-widest leading-none">// EV BROCHURE MANUAL</span>
                            <h5 className="font-sans text-[10px] font-bold text-slate-205 uppercase tracking-wide leading-none">VinFast Smart Leaflet</h5>
                            
                            {/* Mini book cover mockup */}
                            <div className="bg-[#0b101c] border border-emerald-500/20 p-2 rounded-lg flex items-center gap-3 w-4/5 shadow-2xs mt-1.5 relative overflow-hidden">
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500" />
                              <div className="flex-1 text-left min-w-0">
                                <span className="block text-[5.5px] font-mono text-emerald-500 font-bold tracking-wider">// ZERO CARBON FOOTPRINT</span>
                                <span className="block text-[8.5px] font-sans font-extrabold text-white leading-none truncate">VF9 LUX EV MANUAL</span>
                                <span className="block text-[6px] text-slate-450 mt-1 uppercase font-mono truncate">BATTERY DEBUT // 2026 EDITION</span>
                              </div>
                              
                              <div className="w-10 h-10 bg-white p-1 rounded border border-emerald-905 shrink-0 select-none">
                                <svg viewBox="0 0 29 29" className="w-full h-full" shapeRendering="crispEdges">
                                  <path fill="#ffffff" d="M0,0h29v29h-29z"/>
                                  <path fill="#0f172a" d="M0,0h7v7h-7z M22,0h7v7h-7z M0,22h7v7h-7z M8,2h3v3h-3z M13,1h4v3h-4z M19,3h1v1h-1z M4,8h2v2h-2z M9,9h4v1h-4z M15,8h3v1h-3z M24,8h3v1h-3z M1,12h5v1h-5z M10,12h2v1h-2z M17,12h3v3h-3z M23,13h4v1h-4z M5,16h2v3h-2z M11,16h3v1h-3z M20,17h3v1h-3z M25,16h3v1h-3z M3,21h1v1h-1z M9,20h4v2h-4z M17,21h3v1h-3z M24,21h2v1h-2z M10,24h4v4h-4z M18,25h3v1h-3z M24,24h4v1h-4z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {targetMockItem === 'coffee' && (
                          <div className="space-y-1 select-none flex flex-col items-center justify-center w-full">
                            <div className="w-8 h-8 rounded-full bg-amber-955/20 border border-amber-900/40 flex items-center justify-center text-amber-500 text-[10px] font-bold leading-none select-none">
                              CH
                            </div>
                            <span className="font-mono text-[7px] text-amber-400 block uppercase tracking-widest leading-none">// GEOMETRIC STYLING SLEEVE</span>
                            <h5 className="font-sans text-[10px] font-bold text-slate-205 uppercase tracking-wide leading-none">The Coffee House Cup</h5>
                            
                            {/* Mini cup sleeve mockup */}
                            <div className="bg-[#18110a] border border-amber-800/25 p-2 rounded-lg flex items-center gap-3 w-4/5 shadow-2xs mt-1.5 relative overflow-hidden">
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-700" />
                              <div className="flex-1 text-left min-w-0">
                                <span className="block text-[5.5px] font-mono text-amber-500/80 font-bold tracking-wider">// ARABICA CRAFT BEANS</span>
                                <span className="block text-[8.5px] font-sans font-extrabold text-white leading-none truncate font-semibold">HERITAGE SELECTION</span>
                                <span className="block text-[6px] text-slate-450 mt-1 uppercase font-mono truncate">TAY NGUYEN ORIGIN // ROAST</span>
                              </div>
                              
                              <div className="w-10 h-10 bg-white p-1 rounded border border-amber-950/20 shrink-0 select-none">
                                <svg viewBox="0 0 29 29" className="w-full h-full" shapeRendering="crispEdges">
                                  <path fill="#ffffff" d="M0,0h29v29h-29z"/>
                                  <path fill="#0f172a" d="M0,0h7v7h-7z M22,0h7v7h-7z M0,22h7v7h-7z M3,10h2v2h-2z M10,9h4v2h-4z M17,10h2v1h-2z M25,9h3v1h-3z M9,13h3v1h-3z M15,12h3v1h-3z M22,13h4v1h-4z M1,15h5v1h-5z M11,16h4v1h-4z M18,16h3v1h-3z M24,15h3v2h-3z M5,18h1v3h-1z M10,19h3v1h-3z M18,20h2v1h-2z M24,20h2v1h-2z M2,24h3v1h-3z M11,24h4v1h-4z M18,23h3v2h-3z M25,23h2v1h-2z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {targetMockItem === 'masan' && (
                          <div className="space-y-1 select-none flex flex-col items-center justify-center w-full">
                            <div className="w-8 h-8 rounded-full bg-rose-955/20 border border-rose-900/40 flex items-center justify-center text-rose-400 text-[10px] font-bold leading-none select-none">
                              MS
                            </div>
                            <span className="font-mono text-[7px] text-rose-450 block uppercase tracking-widest leading-none">// IMPACT ANNUAL REVIEW</span>
                            <h5 className="font-sans text-[10px] font-bold text-slate-205 uppercase tracking-wide leading-none">Masan Core Report</h5>
                            
                            {/* Mini financial folder cover */}
                            <div className="bg-[#170e10] border border-rose-800/25 p-2 rounded-lg flex items-center gap-3 w-4/5 shadow-2xs mt-1.5 relative overflow-hidden">
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-rose-700" />
                              <div className="flex-1 text-left min-w-0">
                                <span className="block text-[5.5px] font-mono text-rose-500 font-bold tracking-wider">// RURAL NUTRITIONAL LAB</span>
                                <span className="block text-[8.5px] font-sans font-extrabold text-white leading-none truncate">GENS OF NUTRITION</span>
                                <span className="block text-[6px] text-slate-450 mt-1 uppercase font-mono truncate">SUPPLY STABILITY REVIEW 2026</span>
                              </div>
                              
                              <div className="w-10 h-10 bg-white p-1 rounded border border-rose-950/20 shrink-0 select-none">
                                <svg viewBox="0 0 29 29" className="w-full h-full" shapeRendering="crispEdges">
                                  <path fill="#ffffff" d="M0,0h29v29h-29z"/>
                                  <path fill="#0f172a" d="M0,0h7v7h-7z M22,0h7v7h-7z M0,22h7v7h-7z M8,1h3v4h-3z M14,2h4v1h-4z M19,4h2v1h-2z M4,9h2v1h-2z M9,9h3v1h-3z M15,9h3v1h-3z M24,8h3v1h-3z M1,13h5v1h-5z M10,12h2v2h-2z M17,13h4v1h-4z M23,12h4v1h-4z M5,16h2v3h-2z M11,16h3v1h-3z M19,16h4v1h-4z M25,17h2v1h-2z M2,21h2v1h-2z M9,20h4v2h-4z M17,21h3v1h-3z M24,20h3v1h-3z M10,24h4v4h-4z M18,25h3v1h-3z M24,24h4v1h-4z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* High-tech targeting sights & crosshairs overlay */}
                    <div className="absolute inset-4 pointer-events-none z-10 border border-slate-705/30 rounded-lg">
                      {/* Retro Green Camera brackets */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                      {/* Laser scanning beam overlay */}
                      {isScanningActive && (
                        <motion.div 
                          className="absolute inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-405 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.95)] z-20"
                          animate={{ y: [10, 130, 10] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                      )}

                      {/* Center point target check reticle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="w-7 h-7 rounded-full border border-dashed border-cyan-405 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-405" />
                        </div>
                      </div>
                    </div>

                    {/* Viewfinder floating interactive toggle features */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
                      <button 
                        onClick={() => setScannerFlash(!scannerFlash)}
                        className={`p-1.5 rounded-lg border transition-all text-white cursor-pointer ${scannerFlash ? 'bg-amber-500/85 border-amber-400' : 'bg-slate-950/70 border-slate-800'}`}
                      >
                        {scannerFlash ? <Zap className="w-3.5 h-3.5 text-yellow-300" /> : <ZapOff className="w-3.5 h-3.5 text-slate-400" />}
                      </button>
                      <button 
                        onClick={() => setCameraActive(!cameraActive)}
                        className={`p-1.5 rounded-lg border transition-all text-white cursor-pointer ${cameraActive ? 'bg-[#5C7FA3]/85 border-[#7BA7D9]' : 'bg-slate-950/70 border-slate-800'}`}
                      >
                        <Camera className="w-3.5 h-3.5 animate-pulse" />
                      </button>
                    </div>

                    {/* Floating Info Guide Tooltip toggle */}
                    <div className="absolute top-2.5 right-2.5 z-20">
                      <button
                        onClick={() => setShowScannerTooltip(!showScannerTooltip)}
                        className={`p-1.5 rounded-lg border transition-all text-white cursor-pointer ${
                          showScannerTooltip
                            ? 'bg-[#5C7FA3] border-[#7BA7D9]'
                            : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 hover:text-cyan-405'
                        }`}
                        title={t_app("Alignment Guide", "Hướng Dẫn Căn Chỉnh")}
                      >
                        <Info className="w-3.5 h-3.5 animate-bounce" />
                      </button>
                    </div>

                    {/* Simulator banner check status */}
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/85 p-1 px-2.5 rounded text-[8px] font-mono border border-slate-800 flex items-center gap-1 inline-flex select-none leading-none z-10">
                      <span className={`w-1.5 h-1.5 rounded-full ${isScanningActive ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                      <span className="text-slate-300 uppercase">
                        {isScanningActive ? 'TUNING FREQUENCY...' : 'DECODER READY // SECURE'}
                      </span>
                    </div>

                    {/* Floating alignment guidelines tooltip details */}
                    <AnimatePresence>
                      {showScannerTooltip && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-x-3 top-11 bg-slate-950/95 backdrop-blur-md rounded-xl p-3 border border-slate-800 text-left space-y-2 z-25 max-h-[82%] overflow-y-auto scrollbar-none"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 font-sans">
                            <span className="font-sans font-bold text-[9px] uppercase text-cyan-405 flex items-center gap-1">
                              <Info className="w-3 h-3 text-cyan-405" />
                              {t_app("ALIGNMENT GUIDANCE SYSTEM", "HỆ THỐNG CĂN CHỈNH THƯƠNG HIỆU")}
                            </span>
                            <button
                              onClick={() => setShowScannerTooltip(false)}
                              className="text-slate-400 hover:text-white text-xs font-bold leading-none cursor-pointer p-0.5 hover:bg-slate-800 rounded"
                            >
                              &times;
                            </button>
                          </div>
                          
                          <div className="space-y-2 text-[8.5px] text-slate-300 leading-normal font-sans">
                            <div className="flex gap-1.5 items-start">
                              <span className="text-cyan-405 font-bold font-mono">1.</span>
                              <p>
                                <strong className="text-white">{t_app("Select Preset:", "Chọn mẫu phù hợp:")}</strong>{" "}
                                {t_app("Choose partner's material in campaign roster below (e.g. Flight ticket, brochure custom sleeve).", "Chọn loại ấn phẩm truyền thông tương ứng của đối tác ở danh sách phía dưới.")}
                              </p>
                            </div>
                            <div className="flex gap-1.5 items-start">
                              <span className="text-cyan-405 font-bold font-mono">2.</span>
                              <p>
                                <strong className="text-white">{t_app("Position Core Reticle:", "Khuôn tâm điểm:")}</strong>{" "}
                                {t_app("Align target physical material directly inside the active green viewfinder corner brackets.", "Căn chỉnh ấn phẩm thực tế trực diện vào góc khung hướng ngắm màu xanh lá.")}
                              </p>
                            </div>
                            <div className="flex gap-1.5 items-start">
                              <span className="text-cyan-405 font-bold font-mono">3.</span>
                              <p>
                                <strong className="text-white">{t_app("Enable Flash in Low Light:", "Bù sáng tối ưu:")}</strong>{" "}
                                {t_app("Toggle flash in bottom-right corner if scanning labels in shadowed or dim ambient settings.", "Nhấn biểu tượng nút bật đèn flash ở góc dưới để dò quét chuẩn xác hơn nếu ánh sáng yếu.")}
                              </p>
                            </div>
                            <div className="flex gap-1.5 items-start">
                              <span className="text-cyan-405 font-bold font-mono">4.</span>
                              <p>
                                <strong className="text-white">{t_app("Hold Steady for Decryption:", "Giữ máy ổn định:")}</strong>{" "}
                                {t_app("Hold camera steady as automatic sensor triggers deep linkage matching sequence.", "Giữ yên camera trong giây lát để thuật toán kích hoạt kết nối dữ liệu chiến dịch.")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-1.5 border-t border-slate-900 flex justify-end font-sans">
                            <button
                              onClick={() => setShowScannerTooltip(false)}
                              className="bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white px-3 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                            >
                              {t_app("Acknowledge Guide", "Tôi đã hiểu")}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Visual Flash effect simulation overlay */}
                    <AnimatePresence>
                      {scannerFlash && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.15 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white pointer-events-none z-15 mix-blend-overlay"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Decoding progress bar overlay */}
                  {isScanningActive && (
                    <div className="space-y-1.5 p-3.5 bg-slate-955/40 border border-slate-805 rounded-xl text-left">
                      <div className="flex justify-between items-center text-[8.5px] font-mono leading-none">
                        <span className="text-[#7BA7D9] font-bold uppercase animate-pulse">
                          {scanProgress < 30 ? t_app("> ACQUIRING RETICLE TARGET...", "> ĐANG KHỞI CHẠY CAMERA...") :
                           scanProgress < 60 ? t_app("> DECRYPTING GRID SHA256...", "> GIẢI MÃ CHỮ KÝ SHA...") :
                           scanProgress < 95 ? t_app("> LINKING AGENCY ARCHIVE...", "> ĐỒNG BỘ CƠ SỞ DỮ LIỆU...") :
                           t_app("> ENCRYPTED FILE MATCHED!", "> HOÀN TẤT ĐỒNG BỘ!")}
                        </span>
                        <span className="text-slate-300 font-bold font-mono">{scanProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="bg-[#5C7FA3] h-full transition-all duration-150" style={{ width: `${scanProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {/* Simulated Booklet Selector */}
                  {!isScanningActive && (
                    <div className="space-y-3.5 pt-1 text-left">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[8.5px] text-slate-400 uppercase font-bold tracking-wider block">
                          {t_app("CHOOSE PHYSICAL MODEL TO ALIGN", "CHỌN ẤN PHẨM KHUÔN MẪU")}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'vietnam-airlines', client: 'Vietnam Airlines', tag: t_app('Boarding Pass', 'Thẻ Lên Tàu') },
                            { id: 'vinfast', client: 'VinFast EV', tag: t_app('EV Brochure', 'Sách Hướng Dẫn') },
                            { id: 'coffee', client: 'The Coffee House', tag: t_app('Artisanal Cup', 'Cốc Sứ Di Sản') },
                            { id: 'masan', client: 'Masan Group', tag: t_app('Impact Report', 'Báo Cáo Thường Niên') }
                          ].map(item => (
                            <button
                              key={item.id}
                              onClick={() => setTargetMockItem(item.id as any)}
                              className={`p-2.5 rounded-xl border flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                                targetMockItem === item.id 
                                  ? 'bg-slate-900 border-[#5C7FA3] shadow-inner text-[#7BA7D9]' 
                                  : 'bg-slate-950/70 border-slate-805 text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0 w-full">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${targetMockItem === item.id ? 'bg-cyan-405 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-605'}`} />
                                <span className="text-[9px] font-bold font-sans tracking-wide truncate leading-none">{item.client}</span>
                              </div>
                              <span className="text-[7.5px] font-mono text-slate-500 font-bold tracking-tight uppercase select-none">// {item.tag}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Scanning execution buttons block */}
                      <button
                        onClick={handleScanAction}
                        className="w-full bg-[#5C7FA3] hover:bg-[#1D2B3D] active:scale-98 text-white p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/10"
                      >
                        <ScanLine className="w-4 h-4 text-[#7BA7D9]" />
                        <span>{t_app("TRIGGER SCAN AND RE-LINK", "QUÉT ẤN PHẨM & LIÊN KẾT")}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE UP CASE STUDY PANEL DRAWER */}
              <AnimatePresence>
                {selectedCaseStudy && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#090D16]/85 backdrop-blur-md z-30 flex flex-col justify-end"
                  >
                    {/* Dark backdrop element triggers exit */}
                    <div className="absolute inset-0" onClick={() => setSelectedCaseStudy(null)} />

                    {/* Bottom sheet layout */}
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="relative bg-[#0F172A] border-t border-slate-800 rounded-t-[32px] p-5 pb-6 max-h-[92%] overflow-y-auto scrollbar-none space-y-4.5 text-left z-40 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.8)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Drag bar indicator */}
                      <button 
                        onClick={() => setSelectedCaseStudy(null)} 
                        className="w-12 h-1 bg-slate-700/80 rounded-full mx-auto cursor-pointer block hover:bg-slate-600 transition-colors shrink-0 mb-1" 
                      />

                      {/* Decryption status header */}
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mt-1 select-none">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-mono text-[7px] text-emerald-400 tracking-widest block uppercase font-bold">
                              {t_app("BRAND AR MATCHED // DECODE SUCCESS", "KẾT NỐI CAMERA THÀNH CÔNG // ĐỒNG BỘ CHI TIẾT")}
                            </span>
                          </div>
                          <h4 className="font-sans font-extrabold text-[#7BA7D9] text-base leading-tight uppercase mt-0.5">
                            {selectedCaseStudy.client}
                          </h4>
                        </div>
                        <span className="text-[8px] font-mono text-slate-500 font-bold bg-slate-950 px-2 py-1.5 rounded border border-slate-800 uppercase tracking-widest select-none">
                          {selectedCaseStudy.year}
                        </span>
                      </div>

                      {/* Title & Core message */}
                      <div className="space-y-1">
                        <span className="font-mono text-[7.5px] text-slate-500 uppercase font-bold tracking-wider block leading-none">Campaign Identity Focus</span>
                        <h3 className="text-white text-base font-light uppercase tracking-tight leading-tight select-none mt-0.5">
                          {selectedCaseStudy.title}
                        </h3>
                        <p className="text-slate-400 text-[10px] leading-relaxed pt-1 font-light font-sans">
                          {selectedCaseStudy.longDescription}
                        </p>
                      </div>

                      {/* Quick statistical metrics bento grid */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[7.5px] text-slate-500 uppercase font-bold tracking-wider block">Operational Impact Scores</span>
                        <div className="grid grid-cols-3 gap-2 py-1 text-center">
                          {selectedCaseStudy.stats.map((st: any, i: number) => (
                            <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-805 flex flex-col justify-center">
                              <span className="text-[12px] text-emerald-400 font-extrabold block tracking-tight leading-none">{st.value}</span>
                              <span className="text-[7.5px] text-slate-400 font-sans mt-1 leading-normal block line-clamp-2">{st.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenge and Solutions timeline bullet lists */}
                      <div className="grid grid-cols-1 gap-3 pt-1 text-[9.5px]">
                        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-805 space-y-1.5">
                          <span className="font-mono text-[7.5px] text-rose-400 uppercase font-bold tracking-wider block">THE CHALLENGE</span>
                          <div className="space-y-1.5">
                            {selectedCaseStudy.challenges.map((ch: string, i: number) => (
                              <div key={i} className="flex gap-2 items-start leading-relaxed text-slate-300">
                                <span className="text-rose-400 select-none font-bold">×</span>
                                <p>{ch}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-805 space-y-1.5">
                          <span className="font-mono text-[7.5px] text-emerald-405 uppercase font-bold tracking-wider block">HALO STRATEGY & RESPONSE</span>
                          <div className="space-y-1.5">
                            {selectedCaseStudy.solutions.map((sol: string, i: number) => (
                              <div key={i} className="flex gap-2 items-start leading-relaxed text-slate-300">
                                <span className="text-emerald-405 select-none font-bold">✓</span>
                                <p>{sol}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Outcomes bottom callout box */}
                      <div className="bg-slate-955 p-3.5 rounded-xl border border-slate-805 text-[9.5px] leading-relaxed font-sans">
                        <span className="font-mono text-[7.5px] text-[#7BA7D9] uppercase font-bold tracking-wider block mb-1">FINAL PERFORMANCE REPORT</span>
                        <div className="text-slate-300 font-light italic">
                          "{selectedCaseStudy.outcome}"
                        </div>
                      </div>

                      {/* Close sheet button */}
                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={() => setSelectedCaseStudy(null)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-200 p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                        >
                          {t_app("CLOSE PORTAL", "ĐÓNG KIỂM QUAN")}
                        </button>
                        <a
                          href="#portfolio"
                          onClick={() => {
                            setSelectedCaseStudy(null);
                            if (onExitSimulator) onExitSimulator();
                            // scroll beautifully
                            setTimeout(() => {
                              const portElem = document.getElementById('portfolio');
                              if (portElem) portElem.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="flex-1 bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t_app("WEB PORTFOLIO", "KÊNH TRỰC TUYẾN")}</span>
                        </a>
                      </div>

                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 4: ANDROID GOOGLE PLAY BUILDER & DIAGNOSTICS */}
          {activeTab === 'settings' && (
            <motion.div
              key="tab-settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 text-left"
            >
              {/* Build Specs summary */}
              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-900/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </div>
                  <h4 className="font-sans font-bold text-xs uppercase text-white tracking-wider">
                    {t_app("CAPACITOR GOOGLE PLAY SPECS", "QUY CHUẨN ĐÓNG GÓI GOOGLE PLAY")}
                  </h4>
                </div>

                <div className="space-y-1.5 font-mono text-[9px] text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/65 pb-1">
                    <span className="text-slate-500">PACKAGE APPID</span>
                    <span className="text-slate-200 font-bold">agency.halo.app</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/65 pb-1">
                    <span className="text-slate-500">TARGET ANDROID SDK</span>
                    <span className="text-slate-200">API 34 (Android 14.0)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/65 pb-1">
                    <span className="text-slate-500">MINIMUM SUPPORTED SDK</span>
                    <span className="text-slate-200">API 22 (Android 5.1)</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-500">SIGNING CERTIFICATE</span>
                    <span className="text-slate-200 text-wrap font-bold truncate">SHA256: HALO_PLAY_STORE_KEY</span>
                  </div>
                </div>
              </div>

              {/* Build Simulation Button & Logs */}
              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 space-y-3.5">
                <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold block">// INTEGRATIVE GRADLE ENGINE</span>
                
                <button
                  onClick={startAndroidBuildSimulation}
                  disabled={isBuildingAab}
                  className="w-full py-3 bg-[#5C7FA3] hover:bg-[#1D2B3D] text-white text-xs font-bold uppercase tracking-wider transition-all rounded-xl cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-800"
                >
                  <Cpu className="w-4 h-4" />
                  {isBuildingAab ? t_app("COMPILING APK/AAB BUNDLE...", "ĐANG BẮT ĐẦU GRADLE COMPILING...") : t_app("EXECUTE GRADLE RELEASE BUILD", "KHỞI CHẠY BUILD GRADLE TIÊU CHUẨN")}
                </button>

                {/* Real-time progress bar */}
                {isBuildingAab && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>COMPILING AND BUNDLING ASSETS...</span>
                      <span>{buildProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-[#7BA7D9] h-full transition-all duration-300" style={{ width: `${buildProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Build status check */}
                {buildSuccess && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl flex items-center gap-2 text-[10px] text-emerald-400 font-medium">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>
                      {t_app("Release Bundle generated! Play AAB is ready for submission to Google Play Developer Console.", "File AAB bản thương mại đã sẵn sàng tải lên bảng điều khiển Google Play Console.")}
                    </span>
                  </div>
                )}

                {/* Terminal outputs panel */}
                <div className="space-y-1 text-left">
                  <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wider block">TERMINAL DIAGNOSTICS LOGS</span>
                  <div className="bg-[#050811] border border-slate-850 p-3 rounded-xl font-mono text-[8.5px] text-slate-300 space-y-1.5 max-h-40 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-900">
                    {diagnosticLogs.map((log, index) => (
                      <div key={index} className="flex gap-1.5 leading-relaxed text-wrap">
                        <span className="text-[#5C7FA3] select-none">&gt;</span>
                        <p className={log.includes('[SUCCESS]') || log.includes('[OK]') ? 'text-emerald-400' : 'text-slate-300'}>{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* BOTTOM TAB NAVIGATION BAR (CRITICAL FOR MOBILE PLATFORM UX) */}
      <div className="bg-[#0b0f19] border-t border-slate-800/60 p-1.5 px-3 flex items-center justify-around shrink-0 relative z-20 select-none">
        {[
          { id: 'dashboard', label: t_app("Sentinel", "Sentinel"), icon: TrendingUp },
          { id: 'pitch', label: t_app("Pitch AI", "Pitch AI"), icon: Sparkles },
          { id: 'studio', label: t_app("AR Preview", "Mockup AR"), icon: ScanLine },
          { id: 'settings', label: t_app("Play Build", "Đóng Gói"), icon: Settings }
        ].map(item => {
          const IconComponent = item.icon;
          const isAct = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className="flex flex-col items-center justify-center p-1 px-3.5 rounded-xl transition-all hover:bg-slate-900/60 cursor-pointer text-center group"
            >
              <div className={`p-1 px-3 rounded-full transition-colors flex items-center justify-center ${isAct ? 'bg-[#5C7FA3]/25 text-[#7BA7D9]' : 'text-slate-500 group-hover:text-slate-300'}`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <span className={`text-[8.5px] mt-0.5 tracking-wider font-light font-sans uppercase ${isAct ? 'text-[#7BA7D9] font-medium' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
