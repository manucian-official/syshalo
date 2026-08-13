import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Plus, Minus, HelpCircle, ChevronRight, Search, X, 
  BookOpen, ShieldAlert, Zap, Sparkles, Filter 
} from 'lucide-react';

interface FAQItem {
  id: string;
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
  categoryEn: string;
  categoryVi: string;
}

export default function FAQ() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>('d1');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive Authentic HALO Knowledge Dictionary
  const faqs: FAQItem[] = [
    {
      id: 'd1',
      categoryEn: 'Branding & Design',
      categoryVi: 'Thương Hiệu & Thiết Kế',
      questionEn: "Core Philosophical Blueprint: What is the HALO Brand Creed?",
      questionVi: "Cẩm nang Triết lý Cốt lõi: Tuyên ngôn Thương hiệu HALO là gì?",
      answerEn: "HALO operates on a single architectural premise: Premium brands are not decorated, they are calculated. Sound visual composition paired with high-end typography (like Space Grotesk and Inter) represents the ultimate vector of enterprise scaling. We build monumental digital touchpoints, avoiding any superficial 'AI slop' or system telemetry clutter in favor of absolute functional dignity.",
      answerVi: "HALO hoạt động trên một tiền đề kiến trúc duy nhất: Thương hiệu cao cấp không được trang trí ngẫu hứng, chúng được tối ưu toán học. Bố cục trực quan tinh tế đi đôi với nghệ thuật chữ đỉnh cao (như Space Grotesk và Inter) là bệ phóng chuyển đổi doanh nghiệp. Chúng tôi xây dựng sản phẩm số thanh lịch, loại bỏ các chi tiết thừa thãi để hướng tới sự sang trọng tối giản."
    },
    {
      id: 'd2',
      categoryEn: 'Media & PR',
      categoryVi: 'Truyền Thông & Báo Chí',
      questionEn: "Media Ecosystem Access: How does HALO deploy its legendary press network?",
      questionVi: "Tiếp cận Hệ sinh thái Truyền thông: HALO triển khai mạng lưới báo chí độc quyền ra sao?",
      answerEn: "HALO maintains direct, high-speed tunnels into Vietnam’s premier media conglomerates (including VnExpress, Tuổi Trẻ, Thanh Niên, and specialized business reviews). From scheduling Vietnamese national campaign directives to distributing localized regional press packages, we engineer top-tier narrative authority with guaranteed message consistency, high SEO index scores, and organic audience engagement.",
      answerVi: "HALO duy trì kết nối trực tiếp, tốc độ cao tới các cơ quan báo chí chính thống hàng đầu Việt Nam (bao gồm VnExpress, Tuổi Trẻ, Thanh Niên và các tạp chí tài chính chuyên ngành). Từ việc lên kế hoạch quảng chiến dịch quy mô quốc gia tới đóng gói các ấn phẩm tin tức vùng miền, chúng tôi đảm bảo tỷ lệ thâm nhập thông điệp tối đa và hiệu suất tối ưu hóa SEO."
    },
    {
      id: 'd3',
      categoryEn: 'Operations & Tech',
      categoryVi: 'Vận Hành & Kỹ Thuật',
      questionEn: "Strategic Pricing: How are campaign investments and quotes determined?",
      questionVi: "Định giá Chiến lược: Chi phí đầu tư chiến dịch được xác định như thế nào?",
      answerEn: "We provide bespoke financial proposals custom-tailored to each client's unique scope, creative complexity, and target timeline. By conducting an initial discovery call, our senior brand analysts gauge your exact deliverables—from high-impact PR distribution to full-scale creative production—and deliver an optimized, comprehensive quotation aligned perfectly with your goals.",
      answerVi: "HALO cung cấp các đề xuất tài chính được may đo riêng dựa trên quy mô đặc thù, mức độ phức tạp sáng tạo và tiến độ yêu cầu của từng doanh nghiệp. Qua buổi làm việc khám phá định hướng ban đầu, đội ngũ chuyên gia phân thiết kế thương hiệu của HALO sẽ xây dựng báo giá tối ưu và đồng bộ nhất với mục tiêu tài chính của bạn."
    },
    {
      id: 'd4',
      categoryEn: 'Security & Audits',
      categoryVi: 'Bảo Mật & Kiểm Tra',
      questionEn: "Core Application Shield: How is port 3000 and the administrative console secured?",
      questionVi: "Giáp Phòng Thủ Ứng Dụng: Cổng 3000 và bảng điều khiển quản trị được bảo vệ thế nào?",
      answerEn: "Security is non-negotiable in digital campaigns. HALO applications run behind an advanced reverse-proxy layer on port 3000, bolstered by an active Edge DDoS Screening Shield that scrubs and filters high-velocity flood vectors live. Administrators are shielded by encrypted 2FA keys, dynamic IP Whitelists, and on-demand static/dynamic integrity scanners reporting live vulnerability scores.",
      answerVi: "Bảo mật là điều khoản bất khả xâm phạm tại HALO. Hệ thống ứng dụng được vận hành sau lớp cổng trung gian 3000 ổn định, gia cố bằng Giáp phòng thủ Edge DDoS chặn và làm sạch toàn bộ các lượt truy vấn giả lập tần suất cao. Khách quản trị được nhận diện với mã khóa bảo mật 2 lớp 2FA, Danh sách IP trắng và Máy quét lỗ hổng hệ thống báo cáo chính xác thời gian thực."
    },
    {
      id: 'd5',
      categoryEn: 'Branding & Design',
      categoryVi: 'Thương Hiệu & Thiết Kế',
      questionEn: "The North-South Creative Formula: How is content localized for Vietnamese regions?",
      questionVi: "Sự phân hóa Nam-Bắc trong Sáng tạo: HALO bản địa hóa thông điệp vùng miền thế nào?",
      answerEn: "Vietnam's retail and corporate spheres are beautifully complex. While southern commercial campaigns thrive on lively, immediate, conversion-driven prompts, northern campaigns demand hierarchical prestige, literary composure, and subtle intellectual depth. HALO creates dual-layered content directories to command attention across Hanoi, Da Nang, and Ho Chi Minh City with native cultural accuracy.",
      answerVi: "Thị trường tiêu dùng Việt Nam vô cùng đa dạng và sâu sắc. Nếu các chiến dịch thương mại miền Nam đề cao tính trực quan sôi nổi và kêu gọi hành động trực tiếp, thì nhóm công chúng miền Bắc lại trân trọng sự chuẩn mực, chỉnh chu ngôn từ và tính trang trọng cao. HALO thiết kế nội dung đa tầng giúp tối ưu tiếp cận tại cả Hà Nội, Đà Nẵng và TP.HCM."
    },
    {
      id: 'd6',
      categoryEn: 'Operations & Tech',
      categoryVi: 'Vận Hành & Kỹ Thuật',
      questionEn: "Corporate Identity Overhauls: What is the typical deployment timeline?",
      questionVi: "Tái cấu trúc Nhận diện Doanh nghiệp: Quy trình và lộ trình triển khai chuẩn là gì?",
      answerEn: "A full brand transformation ranges from 8 to 12 weeks. Phase 1 (Weeks 1-3) covers competitive brand matrix audits, brand positioning logic, and executive interviews. Phase 2 (Weeks 4-7) defines the visual grammar: customized wordmarks, modern color palettes, typography standards, and mock assets. Phase 3 (Weeks 8-12) rollouts secure responsive digital touchpoints, custom web configurations, and PR launch direction.",
      answerVi: "Một chiến dịch đại tu toàn diện kéo dài từ 8 đến 12 tuần. Pha 1 (Tuần 1-3) khảo sát nội bộ, phân tích đối thủ cạnh tranh. Pha 2 (Tuần 4-7) kiến tạo kiến trúc thị giác gồm thiết kế logo, định hướng tông màu chủ đạo, cẩm nang phông chữ độc quyền. Pha 3 (Tuần 8-12) đồng bộ hệ thống điểm chạm số, công cụ đo lường và triển khai họp báo ra mắt."
    },
    {
      id: 'd7',
      categoryEn: 'Security & Audits',
      categoryVi: 'Bảo Mật & Kiểm Tra',
      questionEn: "Vulnerability Matrix & Audits: How does the Static+Dynamic Scanner verify compliance?",
      questionVi: "Kiểm tra Lỗ hổng Hệ thống: Máy quét Tĩnh & Động vận hành chống rủi ro ra sao?",
      answerEn: "The integrated administrative scanner analyzes cookie consent setups, secures session telemetry records against session hijack vectors, and tracks whether IP Lockdown is active. Running this scanner recalculates our platform integrity score dynamically, guaranteeing full compliance with active GDPR rules and cybersecurity directives.",
      answerVi: "Bảng vá lỗi quản trị tích hợp trong ứng dụng tự động kiểm tra cookie chấp thuận, ngăn chặn các nguy cơ khai thác chiếm đoạt phiên làm việc và cảnh báo trạng thái khóa IP. Máy quét cung cấp điểm số Integrity Index trực quan giúp chuyên viên kịp thời gia cố cấu hình bảo mật thông tin."
    },
    {
      id: 'd8',
      categoryEn: 'Security & Audits',
      categoryVi: 'Bảo Mật & Kiểm Tra',
      questionEn: "The Zone VII Purge Rule: What happens during a Hard Factory Reset?",
      questionVi: "Quy chuẩn Khu vực bảo mật VII: Thực tế thao tác Reset Cài đặt gốc diễn ra thế nào?",
      answerEn: "To safeguard our absolute client confidentiality, HALO is built with a Zone VII Hard Purge. Executing the 'Restore Factory' operation completely wipe local drafts, reset custom mock lead registrations, clear CMS database schema adjustments, and clean down operational audit logs back to the original source templates. It requires entering a specialized safeguard 'RESET' key to authorize execution.",
      answerVi: "Nhằm tối ưu hóa tính riêng tư tuyệt đối, ứng dụng HALO trang bị tính năng Reset Cài Đặt Gốc (Zone VII Purge). Khi kích hoạt, hệ thống sẽ dọn sạch toàn bộ các bản lưu CMS tạm thời, danh sách khách hàng đăng ký ảo, các dòng lịch sử truy vết hệ thống và đặt lại trạng thái nguyên bản. Thao tác yêu cầu nhập mã xác thực bảo mật 'RESET'."
    }
  ];

  // Primary Category Mapping
  const categories = [
    { value: 'all', labelEn: 'ALL KNOWLEDGE', labelVi: 'TẤT CẢ TỪ ĐIỂN' },
    { value: 'Branding & Design', labelEn: 'BRANDING & DESIGN', labelVi: 'THƯƠNG HIỆU & THIẾT KẾ' },
    { value: 'Media & PR', labelEn: 'MEDIA & PR', labelVi: 'TRUYỀN THÔNG & BÁO CHÍ' },
    { value: 'Operations & Tech', labelEn: 'OPERATIONS & TECH', labelVi: 'VẬN HÀNH & KỸ THUẬT' },
    { value: 'Security & Audits', labelEn: 'SECURITY & AUDITS', labelVi: 'BẢO MẬT & KIỂM TRA' }
  ];

  // Multi-tier search computation
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter((faq) => {
      // Category containment filter
      const matchesCategory = activeCategory === 'all' || faq.categoryEn === activeCategory;

      if (!q) return matchesCategory;

      // Text search match parameters
      const matchesSearch = 
        faq.questionEn.toLowerCase().includes(q) ||
        faq.questionVi.toLowerCase().includes(q) ||
        faq.answerEn.toLowerCase().includes(q) ||
        faq.answerVi.toLowerCase().includes(q) ||
        faq.categoryEn.toLowerCase().includes(q) ||
        faq.categoryVi.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Global search fallback query checklist
  const globalMatchesCount = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return 0;
    return faqs.filter((faq) => {
      return (
        faq.questionEn.toLowerCase().includes(q) ||
        faq.questionVi.toLowerCase().includes(q) ||
        faq.answerEn.toLowerCase().includes(q) ||
        faq.answerVi.toLowerCase().includes(q)
      );
    }).length;
  }, [searchQuery]);

  const toggleActive = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  const handleSuggestionClick = (keyword: string) => {
    setSearchQuery(keyword);
    // If we're on a deep category, make sure they search globally or find matches nicely
    setActiveId(null);
  };

  // Search keyword pills for swift discovery
  const suggestedKeywords = [
    { label: "Satoshi", q: "Satoshi" },
    { label: "DDoS Shield", q: "DDoS" },
    { label: "Pricing", q: "Pricing" },
    { label: "Zone VII Reset", q: "Zone VII" },
    { label: "North-South", q: "North-South" },
    { label: "Press network", q: "press" }
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/20 text-left overflow-hidden">
      <div className="absolute inset-0 bg-[#E6EEF8]/10 pointer-events-none" />
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* SECTION HEADER */}
        <center className="mb-14">
          <span className="font-mono text-[10px] text-[#5C7FA3] tracking-[0.3em] uppercase block mb-3 font-bold flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" style={{ height: '14px' }} />
            {language === 'en' ? 'HALO AGENCY DICTIONARY' : 'TỪ ĐIỂN TRI THỨC HALO'}
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase max-w-2xl">
            {language === 'en' ? 'Knowledge Base & FAQ' : 'Cơ Sở Tri Thức & Hỏi Đáp'}
          </h2>
          <p className="text-[#2C3E50]/70 text-xs sm:text-sm font-light leading-relaxed mt-4 max-w-xl">
            {language === 'en' 
              ? "Your instant interactive atlas to everything about HALO. Search specific algorithms, legal boundaries, PR standards, core typography values, and enterprise security policies."
              : "Bản đồ tương tác đầy đủ về mọi quy chuẩn của HALO. Tra cứu các thuật toán định giá, mạng lưới quan hệ công chúng, nguyên tắc thiết kế Satoshi và cơ chế bảo mật tối cao."}
          </p>
        </center>

        {/* INTERACTIVE SEARCH CODES MODULE */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            {/* Ambient Background Glow on active search */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7BA7D9]/20 to-[#5C7FA3]/20 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
            
            {/* Primary Input Panel */}
            <div className="relative bg-white border border-slate-200/80 rounded-2xl flex items-center shadow-sm focus-within:border-[#7BA7D9] transition-all overflow-hidden">
              <div className="pl-4 text-slate-400 shrink-0">
                <Search className="w-4 h-4 text-[#5C7FA3]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveId(null); // Close active question during search key changes
                }}
                placeholder={language === 'en' ? "Search topics, parameters, rules or guidelines..." : "Tìm kiếm từ khóa, thuật ngữ hoặc quy luật..."}
                className="w-full pl-3 pr-4 py-3.5 bg-transparent text-slate-800 text-xs sm:text-sm font-sans focus:outline-none placeholder-slate-400/80"
              />
              
              {/* Clear button indicator */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="pr-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* QUICK DICTIONARY SUGGESTIONS */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 select-none text-[10px]">
            <span className="text-[#2C3E50]/55 font-semibold shrink-0 uppercase tracking-wider font-mono">
              {language === 'en' ? "Dictionary Keys:" : "Từ khóa gán:"}
            </span>
            {suggestedKeywords.map((kw, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(kw.q)}
                className="px-2.5 py-0.5 bg-slate-100/70 hover:bg-[#5C7FA3]/10 text-slate-650 hover:text-[#5C7FA3] border border-slate-200/40 rounded transition-all cursor-pointer font-mono text-[9px]"
              >
                {kw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10 select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setActiveId(null); // Reset open states for optimal clean UI
                }}
                className={`px-4 py-2 rounded-full border text-[9.5px] font-mono tracking-wider font-bold uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1D2B3D] text-white border-[#1D2B3D] shadow-sm'
                    : 'bg-white/60 text-[#2C3E50]/75 border-slate-200/85 hover:bg-white hover:text-[#5C7FA3] hover:border-slate-300'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelVi}
              </button>
            );
          })}
        </div>

        {/* Search status updates banner */}
        {searchQuery && (
          <div className="max-w-4xl mx-auto mb-6 px-4 py-2 bg-[#7BA7D9]/5 border border-[#7BA7D9]/10 rounded-xl flex justify-between items-center text-[10.5px] font-mono text-[#5C7FA3]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5C7FA3] animate-pulse" />
              <span>
                {language === 'en' 
                  ? `Found ${filteredFaqs.length} record(s) matching "${searchQuery}"`
                  : `Tìm thấy ${filteredFaqs.length} hồ sơ khớp với từ khóa "${searchQuery}"`}
              </span>
            </div>
            {filteredFaqs.length === 0 && globalMatchesCount > 0 && activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-[10px] underline hover:text-[#1D2B3D] uppercase font-extrabold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Filter className="w-3 h-3" />
                {language === 'en' ? `Expand to all topics (${globalMatchesCount})` : `Mở rộng tất cả chủ đề (${globalMatchesCount})`}
              </button>
            )}
          </div>
        )}

        {/* High-Contrast Interactive Accordion List */}
        <div className="space-y-3.5 max-w-4xl mx-auto min-h-[160px]">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  layout="position"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? 'bg-white border-[#7BA7D9]/35 shadow-md shadow-slate-100/40' 
                      : 'bg-white/45 border-slate-150 hover:bg-white/85 hover:border-slate-300'
                  }`}
                >
                  {/* Accordion Toggle Header */}
                  <button
                    type="button"
                    onClick={() => toggleActive(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex gap-4 items-center pr-4">
                      {/* Unique serial reference code */}
                      <span className="font-mono text-[#5C7FA3] font-bold text-[10.5px] select-none shrink-0 bg-slate-50 border border-slate-200/50 rounded-lg w-7 h-7 flex items-center justify-center">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Tiny category indicator badge */}
                      <div className="hidden sm:flex items-center gap-1 shrink-0 text-[7.5px] font-mono font-bold uppercase tracking-wider py-1 px-2 bg-slate-50 border border-slate-150 rounded text-slate-400 select-none">
                        <HelpCircle className="w-2.5 h-2.5 text-[#5C7FA3]" style={{ scale: '0.9' }} />
                        <span>{language === 'en' ? faq.categoryEn : faq.categoryVi}</span>
                      </div>

                      <h3 className="font-sans font-medium text-xs sm:text-sm text-[#1D2B3D] leading-snug">
                        {language === 'en' ? faq.questionEn : faq.questionVi}
                      </h3>
                    </div>

                    {/* Icon toggler wrapper */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen ? 'bg-[#5C7FA3]/10 border-[#5C7FA3]/20 text-[#5C7FA3]' : 'bg-slate-50/80 border-slate-200/60 text-slate-400'
                    }`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 transition-transform duration-350" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 transition-transform duration-350" />
                      )}
                    </div>
                  </button>

                  {/* Animated content drawer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                          {/* Bullet styling line on wide view ports */}
                          <div className="flex gap-3 items-start text-[11.5px] sm:text-xs text-[#2C3E50]/80 leading-relaxed font-light font-sans pt-4">
                            <ChevronRight className="w-4 h-4 text-[#5C7FA3] shrink-0 mt-0.5" />
                            <p className="flex-1 text-[#2C3E50]/85">
                              {language === 'en' ? faq.answerEn : faq.answerVi}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* EMPTY RESULT PLACEHOLDER */}
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 rounded-2xl bg-white/50 border border-slate-200/60 text-center flex flex-col items-center justify-center space-y-3.5 shadow-inner"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-250/20 text-amber-500 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-amber-500 animate-bounce" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-tight text-[#1D2B3D]">
                    {language === 'en' ? "Atlas Reference Not Found" : "Hồ Sơ Từ Điển Chứa Trả Về Trống"}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 max-w-sm mx-auto leading-relaxed font-light">
                    {language === 'en'
                      ? "Zero records matched your search filters. Try switching the categories scope, or type general terms like 'Satoshi', 'DDoS' or 'Pricing'."
                      : "Không có dữ liệu tri thức nào khớp với bộ lọc của bạn. Hãy thử thay đổi bộ lọc chủ đề hoặc gõ các từ rộng hơn như 'Bảo mật', 'Định giá'."}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-1.5 bg-[#5C7FA3] hover:bg-[#46698C] text-white text-[9.5px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    {language === 'en' ? "Clear Search Query" : "Xóa Tìm Kiếm"}
                  </button>
                  {activeCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('all')}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9.5px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      {language === 'en' ? "Show All Topics" : "Xem Tất Cả Chủ Đề"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footnote guidance */}
        <p className="text-center font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-12 animate-pulse">
          // {language === 'en' 
            ? "Establishing secure and authentic media legacies for Vietnam's digital frontiers." 
            : "Thiết lập danh tiếng truyền thông chân thực và bảo mật cao tại thị trường Việt Nam."}
        </p>
      </div>
    </section>
  );
}

