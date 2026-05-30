import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Lightbulb, Send, CheckCircle2, RefreshCw, Bot, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AIProposal {
  slogans: string[];
  positioningSummary: string;
  creativeConcept: string;
  campaignInitiatives: { title: string; description: string }[];
  isMock?: boolean;
}

export default function AIBrandStrategist() {
  const { language, t } = useLanguage();
  
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [style, setStyle] = useState('Minimalist Luxury');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<AIProposal | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  const styleOptions = language === 'en' 
    ? ['Minimalist Luxury', 'Technopoetic / High Tech', 'Avant-Garde/Artistic', 'Bold Corporate', 'Eco-Sustainable']
    : ['Sang Trọng Tối Giản', 'Kỹ Thuật Số / Công Nghệ Cao', 'Nghệ Thuật Đột Phá', 'Doanh Nghiệp Uy Tín', 'Thương Hiệu Xanh/Bền Vững'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!brandName || !industry) return;

    setLoading(true);
    setProposal(null);
    setSavedStatus(false);
    
    try {
      const res = await fetch('/api/ai/brand-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brandName,
          industry,
          style,
          description
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setProposal(data);
      }
    } catch (err) {
      console.error("AI Brand Strategy Consultation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLockInquiry = async () => {
    if (!proposal) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${brandName} (AI Generated Brief)`,
          email: "inbound@halo.concept",
          concept: `AI BRIEF DETAILS: \nPositioning: ${proposal.positioningSummary}\nCreative Concept: ${proposal.creativeConcept}\nInitiatives: ${proposal.campaignInitiatives.map(i => i.title).join(", ")}\nUser Input Description: ${description}`,
          services: ['Brand Strategy Consulting', 'AI Strategic Planning Campaign']
        })
      });

      if (res.ok) {
        setSavedStatus(true);
      }
    } catch (err) {
      console.error("Failed locking proposal brief:", err);
    }
  };

  return (
    <section id="ai-strategist" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-[#E6EEF8]/10 text-left">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Input Configuration Console */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-[#5C7FA3]/30"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" /> {language === 'en' ? 'COGNITIVE PLATFORM' : 'KHOA HỌC TRÍ TUỆ'}
              </span>
            </div>
            
            <h2 className="font-sans font-light text-3xl sm:text-4.5xl text-[#1D2B3D] tracking-tight leading-[1.1] uppercase">
              {language === 'en' ? 'HALO COGNITIVE' : 'CÔNG CỤ PHÂN TÍCH'}<br />
              <span className="text-[#5C7FA3] font-semibold">{language === 'en' ? 'BRAND CONSULTANT' : 'CHIẾN LƯỢC THƯƠNG HIỆU'}</span>
            </h2>

            <p className="font-sans text-slate-500 text-sm font-light leading-relaxed max-w-md">
              {language === 'en' 
                ? 'Cocreate customized campaigns instantly. Enter your vision below to invoke Gemini AI for high-impact positioning slogans, brand concepts, and localized communications pipelines.'
                : 'Đồng sáng tạo tức thì các chiến dịch định vị xuất sắc. Nhập thông tin thương hiệu của bạn để kích hoạt hệ thống AI Gemini phân tích câu khẩu hiệu, ý tưởng chiến dịch và phác thảo định hướng phát triển.'}
            </p>

            <form onSubmit={handleSubmit} className="p-7 rounded-[32px] border border-[#7BA7D9]/15 bg-white shadow-xs space-y-4">
              <div>
                <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">// {language === 'en' ? 'BRAND WORKPLACE NAME' : 'TÊN THƯƠNG HIỆU / DOANH NGHIỆP'}</label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? "e.g., Satori Fashion, CyberCore Labs" : "Ví dụ: Thời trang Satori, CyberCore Labs"}
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 font-semibold outline-none transition-all placeholder:text-slate-350"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">// {language === 'en' ? 'INDUSTRY CATEGORY' : 'LĨNH VỰC HOẠT ĐỘNG'}</label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? "e.g., Sustainable Fashion, AI Blockchain" : "Ví dụ: Thời trang Bền vững, Blockchain AI"}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 font-semibold outline-none transition-all placeholder:text-slate-350"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">// {language === 'en' ? 'CREATIVE VIBE' : 'PHONG CÁCH NGHỆ THUẬT'}</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 font-semibold outline-none transition-all"
                  >
                    {styleOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">// {language === 'en' ? 'INBOUND PRIORITY' : 'MỤC TIÊU ƯU TIÊN'}</label>
                  <div className="w-full h-11 px-4 rounded-2xl border border-slate-100 bg-slate-50/55 flex items-center justify-center font-mono text-[9px] text-[#5C7FA3] font-bold tracking-widest uppercase">
                    GEMINI-3.5-FLASH
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">// {language === 'en' ? 'VALUE PROPOSITION (OPTIONAL)' : 'SỨ MỆNH CỐT LÕI (KHÔNG BẮT BUỘC)'}</label>
                <textarea
                  placeholder={language === 'en' ? "Scale our local Vietnamese craftsmanship to European minimalist consumers..." : "Phát triển nghề thủ công Việt Nam tiếp cận tệp khách hàng tối giản ở châu Âu..."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 outline-none transition-all placeholder:text-slate-350 resize-none font-light leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#7BA7D9] hover:bg-[#5C7FA3] text-white disabled:bg-slate-100 disabled:text-slate-400 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs border-0"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {language === 'en' ? 'ANALYZING MARKET INTEGRATION...' : 'DỮ LIỆU ĐANG ĐƯỢC XỬ LÝ...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {language === 'en' ? 'GENERATE STRATEGIC BRIEF' : 'XUẤT BẢN CHIÊN LƯỢC MIỄN PHÍ'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Output Proposals Display Container */}
          <div className="lg:col-span-12 xl:col-span-7 h-full">
            <div className="border border-[#7BA7D9]/15 rounded-[32px] bg-white shadow-xs p-8 flex flex-col justify-between relative overflow-hidden min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {proposal ? (
                  <motion.div
                    key="proposal"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 text-left"
                  >
                    {/* Header Spec Tag */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#5C7FA3]" />
                        <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest font-bold uppercase">
                          // CO-CREATED DOCUMENT FOR {brandName.toUpperCase()}
                        </span>
                      </div>
                      {proposal.isMock && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-150 text-[8px] font-mono text-slate-400 font-semibold uppercase leading-none">
                          SIMULATED ACTIVE
                        </span>
                      )}
                    </div>

                    {/* S_1: Slogans Branding Tiers */}
                    <div>
                      <h4 className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase mb-2">
                        TIER 1 // SOVEREIGN BRAND SLOGANS
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {proposal.slogans.map((s, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-[#E6EEF8]/40 border border-[#7BA7D9]/10 text-center flex items-center justify-center min-h-[70px]">
                            <p className="font-sans font-semibold text-[#1D2B3D] text-[11.5px] leading-snug tracking-tight">
                              "{s}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* S_2: Positioning summary */}
                    <div>
                      <h4 className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase mb-2">
                        TIER 2 // POSITIONAL STRATEGIC NARRATIVE
                      </h4>
                      <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-[#2C3E50] text-xs font-light leading-relaxed italic">
                          {proposal.positioningSummary}
                        </p>
                      </div>
                    </div>

                    {/* S_3: Creative metaphor */}
                    {proposal.creativeConcept && (
                      <div>
                        <h4 className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                          TIER 3 // CORPORATE METAPHOR CONCEPT
                        </h4>
                        <div className="flex items-start gap-2 text-xs leading-relaxed text-[#2C3E50]/85 font-light pl-1">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p>{proposal.creativeConcept}</p>
                        </div>
                      </div>
                    )}

                    {/* S_4: Campaign Initiatives */}
                    <div>
                      <h4 className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase mb-3">
                        TIER 4 // HIGH-IMPACT COMMUNICATIONS PIPELINE
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        {proposal.campaignInitiatives.map((init, index) => (
                          <div key={index} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-2xs text-left">
                            <h5 className="font-sans font-bold text-[#1D2B3D] text-[11px] uppercase tracking-tight mb-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7D9]"></span>
                              {init.title}
                            </h5>
                            <p className="text-slate-500 text-[10px] leading-relaxed font-light">
                              {init.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                      <p className="text-[9px] text-slate-400 font-light max-w-xs leading-tight">
                        {language === 'en'
                          ? "We can submit your personalized AI strategic guidelines directly to our advisory group to lock in your agency proposal."
                          : "Chúng tôi có thể gửi chi tiết chiến lược AI này đến đội ngũ HALO, để lên phương án triển khai tối ưu cho bạn."}
                      </p>
                      <button
                        onClick={handleLockInquiry}
                        disabled={savedStatus}
                        className={`w-full md:w-auto px-6 py-3 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-0 ${
                          savedStatus 
                            ? 'bg-emerald-500 text-white cursor-default' 
                            : 'bg-[#1D2B3D] hover:bg-[#5C7FA3] text-white shadow-xs'
                        }`}
                      >
                        {savedStatus ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            {language === 'en' ? 'BRIEF TRANSMITTED!' : 'ĐÃ GỬI CHIẾN LƯỢC!'}
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            {language === 'en' ? 'TRANSMIT BRIEF TO GROUP' : 'GỬI ĐỀ XUẤT CHO HALO'}
                          </>
                        )}
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E6EEF8]/60 border border-[#7BA7D9]/15 flex items-center justify-center mb-4">
                      <Bot className="w-7 h-7 text-[#5C7FA3]" />
                    </div>
                    <h4 className="font-sans font-semibold text-[#1D2B3D] text-[13px] uppercase tracking-wide mb-1 leading-snug">
                      {language === 'en' ? 'AWAITING CONCEPT PARAMETERS' : 'ĐANG CHỜ THIẾT LẬP THƯƠNG HIỆU'}
                    </h4>
                    <p className="text-slate-400 text-[11px] max-w-xs leading-normal font-light">
                      {language === 'en'
                        ? 'Fill out your business profile on the left side to trigger our live Gemini strategist formulation system.'
                        : 'Hoàn thiện hồ sơ doanh nghiệp của bạn ở cột bên trái để kích hoạt mô hình tư vấn tối ưu hóa của Gemini.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
