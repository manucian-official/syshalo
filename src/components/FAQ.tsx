import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Minus, HelpCircle, ChevronRight } from 'lucide-react';

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
  const [activeId, setActiveId] = useState<string | null>('q1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      id: 'q1',
      categoryEn: 'Strategy',
      categoryVi: 'Chiến Lược',
      questionEn: "What is HALO Agency's core branding and communication philosophy?",
      questionVi: "Triết lý cốt lõi của HALO Agency trong định hướng chiến lược thương hiệu là gì?",
      answerEn: "At HALO, we believe that strategic storytelling coupled with high-end visual aesthetics represents the ultimate mode of corporate growth. We don't just run ads; we build legendary brand landmarks by combining rigorous research, media ecosystem mapping, and high-performance press systems focused on Vietnam's dynamic demographic.",
      answerVi: "Tại HALO, chúng tôi coi việc kết hợp giữa nghệ thuật kể chuyện chiến lược với thiết kế thị giác đẳng cấp là chìa khóa bứt phá của doanh nghiệp. HALO không chạy quảng cáo ngắn hạn; chúng tôi kiến tạo các biểu tượng thương hiệu trường tồn thông qua nghiên cứu bài bản, lập bản đồ hệ sinh thái truyền thông và triển khai hệ thống báo chí hiệu suất cao."
    },
    {
      id: 'q2',
      categoryEn: 'Operations',
      categoryVi: 'Vận Hành',
      questionEn: "How do you measure and report the performance of a public relations campaign?",
      questionVi: "HALO đo lường và báo cáo hiệu quả của một chiến dịch PR truyền thông như thế nào?",
      answerEn: "We move far beyond simple vanity metrics (such as page views or gross impressions). HALO measures Share of Voice (SOV), audience sentiment shift, key message penetration, qualified digital referral traffic, and brand authority uplift. Each campaign features a real-time, interactive performance console reflecting live publications and verified feedback reports.",
      answerVi: "Chúng tôi không chỉ dựa vào các chỉ số bề nổi như lượt xem trang hay lượt hiển thị ước tính. HALO đo lường sâu hơn thông qua tỷ lệ chiếm lĩnh thảo luận (Share of Voice - SOV), dịch chuyển cảm xúc công chúng, tỷ lệ thâm nhập thông điệp cốt lõi, lưu lượng truy cập giới hạn chất lượng và uy tín thương hiệu. Mỗi chiến dịch đều có bảng theo dõi tương tác thời gian thực."
    },
    {
      id: 'q3',
      categoryEn: 'Strategy',
      categoryVi: 'Chiến Lược',
      questionEn: "Can we configure Vietnamese regional campaigns and localized marketing deliverables?",
      questionVi: "HALO có hỗ trợ cấu hình chiến dịch theo vùng miền và bản địa hóa nội dung tại Việt Nam?",
      answerEn: "Absolutely. Vietnam is a highly vibrant but fragmented media landscape. What resonates in the southern commercial hubs requires precise creative adaptations to achieve momentum in Hanoi and northern provinces. We translate global communication codes into regional subcultures, securing maximum resonance.",
      answerVi: "Chắc chắn. Việt Nam là một thị trường truyền thông năng động và phân hóa mạnh. Một thông điệp gây sốt ở miền Nam cần được tinh chỉnh tinh tế về ngôn từ và thói quen tiêu dùng để tiếp cận tối đa công chúng tại Hà Nội và miền Bắc. Chúng tôi bản địa hóa mã văn hóa toàn cầu thành các thông điệp vùng miền có sức chạm mạnh mẽ."
    },
    {
      id: 'q4',
      categoryEn: 'Digital',
      categoryVi: 'Giải Pháp Số',
      questionEn: "What digital solutions are integrated within the branding process?",
      questionVi: "Những giải pháp kỹ thuật số nào được tích hợp trong gói thiết kế và phát triển thương hiệu?",
      answerEn: "A modern brand demands pixel-perfect digital touchpoints. We augment class-defining brand guides with hyper-performant SPA portfolio systems, custom countdown mechanics, dynamic pricing models, interactive web applications, and enterprise security layers (such as TLS checks, CSRF protection, and DDoS mitigation) to guard your digital legacy.",
      answerVi: "Thương hiệu hiện đại đòi hỏi điểm chạm số mượt mà từng pixel. Bên cạnh bộ nhận diện cốt lõi, chúng tôi mang tới hệ thống web danh mục hiệu năng cao (SPA), đồng hồ đếm ngược sự kiện trực quan, mô hình định giá động và lớp bảo mật doanh nghiệp đa điểm (TLS, CSRF, chống DDoS) nhằm bảo vệ uy tín số của bạn."
    },
    {
      id: 'q5',
      categoryEn: 'Operations',
      categoryVi: 'Vận Hành',
      questionEn: "How does the interactive Budget Estimator translate into client proposals?",
      questionVi: "Bảng tính chi phí ước tính (Budget Estimator) được chuyển đổi thành đề xuất thực tế như thế nào?",
      answerEn: "Our online interactive estimator calculates real-time agency workload and complexity standards tailored for Vietnamese campaigns. Selections made in the estimator form a pristine draft containing specialized media deliverables, timeline requirements, and pricing tier estimations. This baseline brief helps accelerate onboarding and kickstart initial strategy workshops immediately.",
      answerVi: "Bảng tính chi phí trực tuyến của chúng tôi tự động tính toán khối lượng công việc và mức độ phức tạp tiêu chuẩn cho các chiến dịch tại Việt Nam. Các lựa chọn của bạn trong bảng tính sẽ tạo ra một bản tóm tắt tinh gọn chứa thông số kỹ thuật, mốc thời gian và khoảng giá tối ưu. Dự thảo này giúp xúc tiến nhanh quy trình hợp tác và triển khai workshop chiến lược ban đầu."
    },
    {
      id: 'q6',
      categoryEn: 'Support',
      categoryVi: 'Hỗ Trợ',
      questionEn: "What is the typical engagement duration for corporate identity overhauls?",
      questionVi: "Thời gian thông thường cho một dự án đại tu toàn bộ nhận diện thương hiệu doanh nghiệp là bao lâu?",
      answerEn: "Comprehensive corporate identity development and positioning shifts usually span 8 to 12 weeks. This includes internal stakeholder interviews, competitive audit matrixes, visual vocabulary design, guidelines composition, custom high-performance digital touchpoints rollout, and localized launch campaign preparation.",
      answerVi: "Dự án thiết kế nhận diện doanh nghiệp toàn diện và tái định vị chiến lược thường kéo dài từ 8 đến 12 tuần. Quy trình bao gồm phỏng vấn cổ đông, nghiên cứu đối thủ, thiết kế ngôn ngữ thị giác mới, xây dựng cẩm nang thương hiệu, khởi tạo điểm chạm số bảo mật và chuẩn bị kế hoạch truyền thông ngày ra mắt."
    }
  ];

  const categories = [
    { value: 'all', labelEn: 'ALL TOPICS', labelVi: 'TẤT CẢ CHỦ ĐỀ' },
    { value: 'Strategy', labelEn: 'STRATEGY', labelVi: 'CHIẾN LỢC' },
    { value: 'Operations', labelEn: 'OPERATIONS', labelVi: 'VẬN HÀNH' },
    { value: 'Digital', labelEn: 'DIGITAL DEPLOY', labelVi: 'GIẢI PHÁP SỐ' }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.categoryEn === activeCategory);

  const toggleActive = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/20 text-left overflow-hidden">
      <div className="absolute inset-0 bg-[#E6EEF8]/10 pointer-events-none" />
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        <center className="mb-16">
          <span className="font-mono text-[10px] text-[#5C7FA3] tracking-[0.3em] uppercase block mb-3 font-bold">
            // {language === 'en' ? 'COMMON CLARIFICATIONS' : 'THẮC MẮC PHỔ BIẾN'}
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase max-w-2xl">
            {language === 'en' ? 'Frequently Asked Questions' : 'Câu Hỏi Thường Gặp'}
          </h2>
          <p className="text-[#2C3E50]/70 text-xs sm:text-sm font-light leading-relaxed mt-4 max-w-lg">
            {language === 'en' 
              ? "Discover deep technical insights about our communication framework, customized brand design strategies, and media delivery metrics."
              : "Tìm hiểu các thông tin chi tiết về phương thức tiếp cận truyền thông, quy trình thiết kế thương hiệu và cách tính toán chi phí thông minh tại HALO."}
          </p>
        </center>

        {/* Dynamic Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  // Open first item of the category by default for nice visuals
                  const catItems = cat.value === 'all' ? faqs : faqs.filter(f => f.categoryEn === cat.value);
                  if (catItems.length > 0) {
                    setActiveId(catItems[0].id);
                  }
                }}
                className={`px-4 py-2 rounded-full border text-[10px] font-bold font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1D2B3D] text-white border-[#1D2B3D] shadow-sm'
                    : 'bg-white/60 text-[#2C3E50]/75 border-slate-200/80 hover:bg-white hover:text-[#5C7FA3]'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelVi}
              </button>
            );
          })}
        </div>

        {/* High-Contrast Interactive Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white border-[#7BA7D9]/40 shadow-sm' 
                    : 'bg-white/50 border-slate-150 hover:bg-white/80 hover:border-slate-300'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  type="button"
                  onClick={() => toggleActive(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-4 items-center pr-4">
                    {/* Tiny category indicator badge */}
                    <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[8px] font-mono font-bold uppercase tracking-wider py-1 px-2.5 bg-slate-50 border border-slate-100 rounded text-slate-400">
                      <HelpCircle className="w-2.5 h-2.5 text-[#5C7FA3]" />
                      <span>{language === 'en' ? faq.categoryEn : faq.categoryVi}</span>
                    </div>

                    <h3 className="font-sans font-medium text-sm sm:text-base text-[#1D2B3D] leading-snug">
                      {language === 'en' ? faq.questionEn : faq.questionVi}
                    </h3>
                  </div>

                  {/* Icon toggler wrapper */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen ? 'bg-[#5C7FA3]/15 border-[#5C7FA3]/25 text-[#5C7FA3]' : 'bg-slate-50 border-slate-100 text-slate-450'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 transition-transform duration-300 rotate-180" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform duration-300" />
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
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-0 border-t border-slate-100/80">
                        {/* Bullet styling line on wide view ports */}
                        <div className="flex gap-4 items-start text-xs sm:text-[13px] text-[#2C3E50]/80 leading-relaxed font-light font-sans pt-4">
                          <ChevronRight className="w-4 h-4 text-[#5C7FA3] shrink-0 mt-0.5 hidden sm:inline" />
                          <p>{language === 'en' ? faq.answerEn : faq.answerVi}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footnote guidance */}
        <p className="text-center font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-12 animate-pulse">
          // {language === 'en' 
            ? "Crafting clear and authentic media legacies for progressive industry leaders." 
            : "Thiết lập danh tiếng truyền thông chân thực cho các doanh nghiệp tiên phong."}
        </p>
      </div>
    </section>
  );
}
