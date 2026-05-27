import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, Project, WorkflowStep, Testimonial, TeamMember } from '../types';

export type Language = 'en' | 'vi';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof uiTranslations['en']) => string;
  servicesData: Service[];
  portfolioData: Project[];
  workflowSteps: WorkflowStep[];
  testimonialsData: Testimonial[];
  teamMembers: TeamMember[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const uiTranslations = {
  en: {
    // Nav
    home: "HOME",
    about: "ABOUT",
    services: "SERVICES",
    portfolio: "PORTFOLIO",
    process: "PROCESS",
    team: "TEAM",
    contact: "CONTACT",
    startProject: "Start a project",
    estimatorCalculator: "Estimator Calculator",

    // Hero
    established: "ESTABLISHED 2016 // VIETNAM",
    strategicComm: "Strategic Communication",
    forModernBrands: "For Modern Brands.",
    heroSub: "HALO Agency delivers impactful media solutions with over a decade of creative experience. We synthesize strategic storytelling, custom digital solutions, and creative design to construct legendary brand landmarks.",
    exploreServices: "Explore Services",
    contactUs: "Contact Us",
    estimatorConsole: "ESTIMATOR CONSOLE",
    foundedIn: "FOUNDED IN",
    experience: "EXPERIENCE",
    yearsActive: "10+ YEARS ACTIVE",
    strategies: "STRATEGIES",
    campaignsCountText: "200+ CAMPAIGNS",
    aestheticStatus: "AESTHETIC STATUS",
    minimalStandard: "MINIMAL STANDARD",

    // About
    philosophy: "Corporate Philosophy",
    strategicMediatext: "STRATEGIC MEDIA",
    forVnBrands: "FOR VIETNAMESE BRANDS",
    aboutText: "At HALO Agency, we believe that ordinary communication is a disservice to powerful brands. With over a decade of hands-on expertise across Vietnam, our mission is to translate complex brand challenges into legendary media campaigns and high-performance communication solutions that capture attention and drive sustainable market impact.",
    sincerityTitle: "Strategic Sincerity",
    sincerityDesc: "We formulate authentic, high-trust narratives, protecting brand legacy with methodical public relations systems.",
    focusTitle: "Creative Focus",
    focusDesc: "We focus strictly on premium visual aesthetics, delivering high-end layouts and elite copy tailored for Vietnam.",
    years: "Years",
    experienceLabel: "Experience",
    campaignsLabel: "Campaigns",
    clientsLabel: "Clients",
    evolutionTimeline: "HALO EVOLUTION TIMELINE",
    trustedByLeaders: "Trusted by Industry Leaders",
    trustedSub: "Orchestrating sustainable, high-impact legacy strategies.",

    // Services
    capabilities: "Strategic Capabilities",
    suiteTitle: "OUR SERVICE SUITE",
    suiteSub: "We deliver premium media campaigns and branding guidelines. Select any capability card to explore internal specifications and detailed deliverables.",
    analyze: "ANALYZE",
    estimatorTitle: "HALO AGENCY ESTIMATOR",
    estimatorDesc: "Calculate custom media planning and branding campaign budgets using our interactive calculator.",
    launchCalculator: "Launch Cost Calculator",
    estimatorTitleOverlay: "ESTIMATION CALCULATOR",
    estimatorSubOverlay: "Construct your custom media campaign parameter specifications dynamically.",
    selectCapabilities: "SELECT APPLICABLE CAPABILITIES",
    complexitySetting: "CAMPAIGN COMPLEXITY TIER",
    tierStandard: "Standard Performance",
    tierPremium: "Elite Premium Scope",
    tierAward: "Award-Grade Masterpiece",
    prioritySetting: "DELIVERY PRIORITY HORIZON",
    horizonStandard: "Standard Operations (2-3 Months)",
    horizonPriority: "Priority Deployment (1 Month) (+25%)",
    horizonWarp: "Accelerated Sprint (2 Weeks) (+50%)",
    selectedServicesCount: "Selected Services",
    estimatedTotal: "ESTIMATED TOTAL BUDGET",
    oneTimeFee: "Estimated investment fee",
    noServicesSelected: "Please select one or more capabilities to formulate a budget proposal.",
    confirmSelections: "PROMPT COOPERATIVE BRIEF",
    deliverablesLabel: "DELIVERABLES INCLUDED",
    keySpecs: "KEY SPEC DATA",
    closeModal: "Close Page",

    // Portfolio
    caseStudies: "Case Studies // Showcase",
    pioneeringMilestones: "PIONEERING MILESTONES",
    viewAll: "View All",
    filterAll: "All Cases",
    statsAndMetrics: "STATS & METRICS",
    theChallenge: "THE CHALLENGE",
    theSolution: "THE AGENCY SOLUTION",
    campaignOutcome: "CAMPAIGN OUTCOME",
    projectSpecifications: "PROJECT SPECIFICATIONS",
    client: "Client",
    year: "Year",
    duration: "Duration",
    engagementScope: "Engagement Scope",
    closeCaseStudy: "Close Case Study",

    // Process
    frameworkLabel: "Our Operational Framework",
    pathExcellence: "A METICULOUS PATH TO EXCELLENCE",
    strategicMilestones: "STRATEGIC MILESTONES",
    envisionedCapabilities: "ENVISIONED CAPABILITIES",
    processFlowMilestones: "PROCESS FLOW MILESTONES",
    phaseDeliverables: "PHASE DELIVERABLES GUARANTEED AT 100%",

    // Testimonials
    clientTestimonials: "Client Testimonials",
    trustedByLeadersTitle: "TRUSTED BY LEADERS",

    // Team
    ourLeadership: "Our Core Leadership",
    creativeBrains: "MEET THE CREATIVE BRAINS",
    viewInsights: "VIEW INSIGHTS >",
    teamWindowHeader: "TEAM INSIGHTS // LEADERSHIP PROFILE",
    keyExpertise: "KEY EXPERTISE CORE",

    // Contact & Chatbot
    contactChannel: "Direct Communication Channel",
    brandStorytelling: "LET'S SHAPE YOUR BRAND STORY TELLING",
    contactSub: "Reach out to our branding experts. Or schedule a consultation directly via our workspace tools.",
    emailEnquiries: "EMAIL ENQUIRIES",
    telephone: "TELEPHONE",
    headquarters: "HEADQUARTERS",
    regionalHq: "COGNITIVE REGIONAL HEADQUARTERS",
    hanoiCoords: "LAT 10.7916° N // LON 106.6749° E // VN EXECUTIVE NODE",
    enquirySpec: "ENQUIRY SPECIFICATION",
    fullNameOrg: "Your Full Name & Organization",
    placeholderName: "e.g., Katherine Mitchell // Masan Group",
    emailPlaceholder: "e.g., katherine@masangroup.com",
    briefStrategy: "Brief Strategy / Campaign Brief",
    briefPlaceholder: "Describe target objectives, market categories, or timeline targets...",
    directCoop: "DIRECT COOPERATION SECURED BY ENCRYPTION",
    submitEnquiry: "SUBMIT ENQUIRY",
    producingBrief: "PRODUCING BRIEF...",
    successfulSubmit: "CONVERSATION INITIATED",
    successSubText: "Thank you. Your campaign information has been received. One of our Senior Partners will connect with you within 24 hours.",
    submitNewEnquiry: "SUBMIT NEW ENQUIRY",

    // Chatbot Overlay
    botTitle: "HALO VIRTUAL ASSISTANT",
    minBot: "[MIN]",
    botInitMsg: "Xin chào! I am the HALO virtual consultant. How can we support your branding or communication strategy today?",
    pricingPres: "Retrieve pricing benchmark estimation...",
    pricingUser: "Tell me about your cooperation models and campaign budgets.",
    pricingAgent: "We scale our campaigns to suit premium mid-to-large enterprises in Vietnam. Strategic consults and media planning packages are customized to deliver measured ROI.",
    aiPres: "Describe our marketing automation models...",
    aiUser: "How does HALO integrate digital marketing or content automation?",
    aiAgent: "We leverage programmatic advertising and AI-driven social listening engines to monitor real-time audience sentiments and target localized campaigns across Vietnam.",
    brandPres: "View branding deliverable specs...",
    brandUser: "What deliverables are included in a brand refresh?",
    brandAgent: "We compile cohesive corporate systems, localized language tone-guides, full typography licenses, and standard media communication press sets for Vietnam outlets.",
    typing: "Typing...",
    paths: "CONVERSATIONAL PATHS",

    // Footer
    footerSub: "Leading Vietnamese professional media and communication agency delivering integrated solutions for brands with over a decade of excellence.",
    engageLabel: "ENGAGE",
    allRightsReserved: "© 2026 HALO MEDIA & COMMUNICATION Agency. ALL RIGHTS RESERVED."
  },
  vi: {
    // Nav
    home: "TRANG CHỦ",
    about: "GIỚI THIỆU",
    services: "DỊCH VỤ",
    portfolio: "DỰ ÁN",
    process: "QUY TRÌNH",
    team: "ĐỘI NGŨ",
    contact: "LIÊN HỆ",
    startProject: "Bắt đầu dự án",
    estimatorCalculator: "Công cụ Ước tính",

    // Hero
    established: "THÀNH LẬP TỪ 2016 // VIỆT NAM",
    strategicComm: "Truyền Thông Chiến Lược",
    forModernBrands: "Cho Thương Hiệu Hiện Đại.",
    heroSub: "HALO Agency mang lại các giải pháp truyền thông đột phá với hơn một thập kỷ kinh nghiệm sáng tạo. Chúng tôi kết hợp kể chuyện chiến lược, giải pháp số tùy biến và thiết kế sáng tạo để xây dựng những dấu ấn thương hiệu vượt thời gian.",
    exploreServices: "Khám Phá Dịch Vụ",
    contactUs: "Liên Hệ Ngay",
    estimatorConsole: "BẢNG TÍNH CHI PHÍ",
    foundedIn: "THÀNH LẬP",
    experience: "KINH NGHIỆM",
    yearsActive: "10+ NĂM HOẠT ĐỘNG",
    strategies: "CHIỂN DỊCH CHUYÊN SÂU",
    campaignsCountText: "200+ CHIẾN DỊCH THÀNH CÔNG",
    aestheticStatus: "PHONG CÁCH THẨM MỸ",
    minimalStandard: "CHUẨN TỐI GIẢN CAO CẤP",

    // About
    philosophy: "Triết Lý Doanh Nghiệp",
    strategicMediatext: "TRUYỀN THÔNG CHIẾN LƯỢC",
    forVnBrands: "CHO THƯƠNG HIỆU VIỆT NAM",
    aboutText: "Tại HALO Agency, chúng tôi tin rằng truyền thông thông thường là sự hạn chế đối với các thương hiệu lớn. Với hơn một thập kỷ kinh nghiệm thực tế sâu rộng tại Việt Nam, sứ mệnh của chúng tôi là chuyển đổi các thách thức phức tạp của thương hiệu thành các chiến dịch truyền thông mang tính biểu tượng và các giải pháp truyền thông hiệu suất cao giúp thu hút sự chú ý và thúc đẩy tác động thị trường bền vững.",
    sincerityTitle: "Sự Chân Thành Chiến Lược",
    sincerityDesc: "Chúng tôi xây dựng những câu chuyện chân thực, có độ tin cậy cao, bảo vệ di sản thương hiệu bằng các hệ thống quan hệ công chúng bài bản.",
    focusTitle: "Sự Tập Trung Sáng Tạo",
    focusDesc: "Chúng tôi tập trung nghiêm ngặt vào thẩm mỹ thị giác cao cấp, mang lại các thiết kế tinh tế và nội dung xuất sắc được đo ni đóng giày cho thị trường Việt Nam.",
    years: "Năm",
    experienceLabel: "Kinh nghiệm",
    campaignsLabel: "Chiến dịch",
    clientsLabel: "Khách hàng",
    evolutionTimeline: "LỊCH SỬ PHÁT TRIỂN HALO",
    trustedByLeaders: "Được tin dùng bởi các nhà lãnh đạo",
    trustedSub: "Kiến tạo các chiến lược di sản bền vững và có tác động mạnh mẽ.",

    // Services
    capabilities: "Năng Lực Chiến Lược",
    suiteTitle: "HỆ THỐNG DỊCH VỤ CỦA CHÚNG TÔI",
    suiteSub: "Chúng tôi cung cấp các chiến dịch truyền thông cao cấp và bộ nhận diện thương hiệu chuẩn mực. Chọn bất kỳ thẻ dịch vụ nào để khám phá các thông số kỹ thuật chi tiết.",
    analyze: "PHÂN TÍCH CHUYÊN SÂU",
    estimatorTitle: "CÔNG CỤ ƯỚC TÍNH CHI PHÍ HALO",
    estimatorDesc: "Tính toán ngân sách chiến dịch truyền thông và định vị thương hiệu tùy biến bằng công cụ tương tác thông minh.",
    launchCalculator: "Khởi Chạy Trình Tính Chi Phí",
    estimatorTitleOverlay: "KHỞI TẠO DỰ TRÙ CHI PHÍ",
    estimatorSubOverlay: "Thiết lập cấu trúc ngân sách truyền thông của bạn một cách trực quan và cá nhân hóa.",
    selectCapabilities: "LỰA CHỌN CÁC GÓI DỊCH VỤ",
    complexitySetting: "CẤP ĐỘ PHỨC TẠP CỦA CHIẾN DỊCH",
    tierStandard: "Tiêu Chuẩn Đột Phá",
    tierPremium: "Cao Cấp & Tối Ưu Toàn Diện",
    tierAward: "Tuyệt Tác Nghệ Thuật (Đoạt Giải)",
    prioritySetting: "ĐỘ ƯU TIÊN VÀ TIẾN ĐỘ BÀN GIAO",
    horizonStandard: "Tiến độ Tiêu chuẩn (2-3 Tháng)",
    horizonPriority: "Triển khai Ưu tiên (1 Tháng) (+25%)",
    horizonWarp: "Chiến dịch Tốc hành (2 Tuần) (+50%)",
    selectedServicesCount: "Dịch vụ đã chọn",
    estimatedTotal: "TỔNG NGÂN SÁCH DỰ KIẾN",
    oneTimeFee: "Mức đầu tư dự toán đề xuất",
    noServicesSelected: "Vui lòng chọn một hoặc nhiều dịch vụ để thiết lập đề xuất ngân sách chi tiết.",
    confirmSelections: "YÊU CẦU TƯ VẤN & HỢP TÁC",
    deliverablesLabel: "CÁC DANH MỤC BÀN GIAO BAO GỒM",
    keySpecs: "THÔNG SỐ QUAN TRỌNG",
    closeModal: "Đóng Trang",

    // Portfolio
    caseStudies: "Dự Án Tiêu Biểu // Trực Quan",
    pioneeringMilestones: "DẤU ẤN TIÊN PHONG",
    viewAll: "Xem Tất Cả",
    filterAll: "Tất Cả Dự Án",
    statsAndMetrics: "CHỈ SỐ & HIỆU SUẤT",
    theChallenge: "THÁCH THỨC ĐẶT RA",
    theSolution: "GIẢI PHÁP TỪ HALO",
    campaignOutcome: "KẾT QUẢ ĐẠT ĐƯỢC",
    projectSpecifications: "THÔNG SỐ CHI TIẾT DỰ ÁN",
    client: "Khách hàng",
    year: "Năm",
    duration: "Thời gian",
    engagementScope: "Phạm vi hợp tác",
    closeCaseStudy: "Đóng Dự Án",

    // Process
    frameworkLabel: "Quy Trình Hoạt Động",
    pathExcellence: "CON ĐƯỜNG KIÊN ĐỊNH ĐẾN SỰ HOÀN HẢO",
    strategicMilestones: "MỐC LỘ TRÌNH CHIẾN LƯỢC",
    envisionedCapabilities: "NĂNG LỰC ƯỚC TÍNH",
    processFlowMilestones: "TIẾN TRÌNH QUY TRÌNH",
    phaseDeliverables: "SẢN PHẨM PHÂN KỲ ĐƯỢC ĐẢM BẢO 100%",

    // Testimonials
    clientTestimonials: "Ý Kiến Khách Hàng",
    trustedByLeadersTitle: "ĐỐI TÁC TIN CẬY",

    // Team
    ourLeadership: "Ban Lãnh Đạo Cốt Lõi",
    creativeBrains: "NHỮNG BỘ ÓC SÁNG TẠO",
    viewInsights: "XEM CHI TIẾT >",
    teamWindowHeader: "THÔNG TIN THÀNH VIÊN // HỒ SƠ LÃNH ĐẠO",
    keyExpertise: "LĨNH VỰC CHUYÊN MÔN CỐT LÕI",

    // Contact & Chatbot
    contactChannel: "Kênh Liên Hệ Trực Tiếp",
    brandStorytelling: "HÃY ĐỂ CHÚNG TÔI KỂ CÂU CHUYỆN THƯƠNG HIỆU CỦA BẠN",
    contactSub: "Liên hệ trực tiếp với các chuyên gia thương hiệu của chúng tôi hoặc lên lịch tư vấn thông qua các công cụ.",
    emailEnquiries: "EMAIL LIÊN HỆ",
    telephone: "ĐIỆN THOẠI",
    headquarters: "TRỤ SỞ CHÍNH",
    regionalHq: "TRỤ SỞ TRUYỀN THÔNG VÙNG",
    hanoiCoords: "TỌA ĐỘ 10.7916° N // 106.6749° E // ĐIỂM ĐIỀU HÀNH VN",
    enquirySpec: "CHI TIẾT YÊU CẦU",
    fullNameOrg: "Họ và Tên & Đơn vị công tác",
    placeholderName: "Ví dụ: Phạm Quang Huy // Giám đốc Sáng tạo",
    emailPlaceholder: "Ví dụ: huy.pham@vietnamairlines.vn",
    briefStrategy: "Mô tả Sơ lược Dự án / Yêu cầu Chiến dịch",
    briefPlaceholder: "Mô tả mục tiêu chiến dịch, các nhóm thị trường trọng điểm hoặc mốc thời gian kỳ vọng...",
    directCoop: "LIÊN HỆ KHÉP KÍN ĐƯỢC BẢO MẬT TUYỆT ĐỐI",
    submitEnquiry: "TIẾP NHẬN YÊU CẦU",
    producingBrief: "XỬ LÝ THÔNG TIN TRÌNH DUYỆT SƠ BỘ...",
    successfulSubmit: "HỘI THOẠI ĐÃ ĐƯỢC THIẾT LẬP",
    successSubText: "Xin cảm ơn bạn. Thông tin yêu cầu chiến dịch của bạn đã được tiếp nhận thành công. Chuyên gia tư vấn cấp cao từ HALO sẽ chủ động liên hệ lại trong vòng 24 giờ tới.",
    submitNewEnquiry: "GỬI THÊM YÊU CẦU MỚI",

    // Chatbot Overlay
    botTitle: "TRỢ LÝ ẢO HALO",
    minBot: "[ĐÓNG]",
    botInitMsg: "Xin chào! Tôi là trợ lý ảo HALO. Chúng tôi có thể hỗ trợ gì cho chiến lược thương hiệu hoặc kế hoạch truyền thông của bạn hôm nay?",
    pricingPres: "Tìm hiểu mức phân bổ ngân sách mẫu...",
    pricingUser: "Hãy cho tôi biết về các mô hình hợp tác và định mức ngân sách chiến dịch.",
    pricingAgent: "Chúng tôi tùy chỉnh quy mô chiến dịch để phù hợp với các doanh nghiệp cao cấp vừa và lớn tại Việt Nam. Các gói tư vấn chiến lược và lập kế hoạch truyền thông được tối ưu hóa để mang lại hiệu quả ROI thực tế đo lường được.",
    aiPres: "Tìm hiểu về mô hình tự động hóa tiếp thị...",
    aiUser: "HALO tích hợp tiếp thị số hoặc tự động hóa nội dung truyền thông như thế nào?",
    aiAgent: "Chúng tôi tận dụng quảng cáo lập trình (programmatic advertising) và các công cụ lắng nghe mạng xã hội dựa trên AI để theo dõi phản ứng của khán giả theo thời gian thực và nhắm mục tiêu chiến dịch chính xác tại thị trường Việt Nam.",
    brandPres: "Tìm hiểu các hạng mục bàn giao tái định vị...",
    brandUser: "Những hạng mục bàn giao nào thường bao gồm trong một đợt tái định vị thương hiệu?",
    brandAgent: "Chúng tôi biên soạn các hệ thống nhận diện doanh nghiệp đồng bộ, cẩm nang hướng dẫn giọng điệu ngôn ngữ bản địa, bản quyền phông chữ hợp chuẩn và bộ thông cáo báo chí truyền thông mẫu cho các kênh báo chí hàng đầu tại Việt Nam.",
    typing: "Đang nhập...",
    paths: "CÁC DANH MỤC THẢO LUẬN",

    // Footer
    footerSub: "Công ty tư vấn truyền thông hàng đầu tại Việt Nam, mang đến các giải pháp quảng bá tích hợp trọn gói cho doanh nghiệp với hơn một thập kỷ uy tín vượt trội.",
    engageLabel: "KẾT NỐI",
    allRightsReserved: "© 2026 Bản quyền thuộc về HALO Agency. MỌI QUYỀN ĐƯỢC BẢO LƯU."
  }
};

// EN and VI arrays for dynamic blocks
export const TIMELINE_EVENTS_EN = [
  {
    year: "2016",
    title: "Agency Founding",
    desc: "Begun as a boutique creative studio focused on brand strategy and visual mark development in Ho Chi Minh City."
  },
  {
    year: "2019",
    title: "Media Expansion",
    desc: "Launched a dedicated PR and media relations division, establishing connections with major national journals and digital publications."
  },
  {
    year: "2022",
    title: "Automated Marketing",
    desc: "Integrated advanced programmatic ad tech, social listening architectures, and AI content planning frameworks for leading brands."
  },
  {
    year: "2025",
    title: "Eco Campaign Pioneers",
    desc: "Selected by Vietnam Airlines and VinFast to lead national sustainability campaigns, proving the power of strategic sincerity."
  }
];

export const TIMELINE_EVENTS_VI = [
  {
    year: "2016",
    title: "Thành Lập Tại TP.HCM",
    desc: "Khởi đầu từ một studio sáng tạo chất lượng cao chuyên nghiên cứu chiến lược thương hiệu và thiết kế nhận diện đồ họa tại Sài Gòn."
  },
  {
    year: "2019",
    title: "Mở Rộng Kênh Truyền Thông",
    desc: "Chính thức thành lập phòng Quan hệ Báo chí & Kênh truyền thông chuyên nghiệp kết nối chặt chẽ cùng các tòa soạn hàng đầu."
  },
  {
    year: "2022",
    title: "Công Nghệ Tiếp Thị Số",
    desc: "Tích hợp giải pháp quảng cáo lập trình, công cụ lắng nghe mạng xã hội AI và phễu tự động hóa cho các tập đoàn lớn."
  },
  {
    year: "2025",
    title: "Tiên Phong Chiến Dịch Sinh Thái",
    desc: "Được chọn bởi Vietnam Airlines và VinFast để thực hiện chiến dịch truyền thông xanh, kiến tạo tiêu chuẩn mới cho PR di sản."
  }
];

export const SERVICES_EN: Service[] = [
  {
    id: "branding",
    title: "Branding",
    description: "High-end corporate naming, sophisticated typography systems, and legacy-focused brand identity design.",
    icon: "Award",
    features: [
      "Custom premium corporate voice & messaging blueprints",
      "Minimalist identity systems & scalable vector marks",
      "Premium digital style guides & typography systems",
      "Physical material texture & packaging alignment"
    ],
    color: "soft-blue",
    intensity: "from-[#7BA7D9]/10 to-transparent",
    details: "We don't just design marks; we build complete brand ecosystems. By embedding custom typographic structures and clean visual languages, we elevate corporate visions into recognizable industry standards across Vietnam."
  },
  {
    id: "media-communication",
    title: "Media Communication",
    description: "Strategic storytelling, targeted press relations, and crisis management with absolute composure.",
    icon: "MessageSquare",
    features: [
      "High-impact localized PR distribution & placement",
      "Strategic journalistic storytelling & brand angles",
      "Media briefing architectures & training modules",
      "Proactive crisis and corporate reputation monitoring"
    ],
    color: "light-navy",
    intensity: "from-[#5C7FA3]/10 to-transparent",
    details: "Your narrative is your most critical asset. We craft clean, transparent press relationships and brand stories that resonate powerfully with key audiences, securing trust and establishing market authority."
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Highly optimized media planning, performance funnels, and organic brand amplification guides.",
    icon: "TrendingUp",
    features: [
      "Targeted demographic studies & market segmentation",
      "High-conversion multi-stage user acquisition plans",
      "Transparent multi-platform tracking & analytical hubs",
      "SEO alignment & organic search positioning guides"
    ],
    color: "slate-dark",
    intensity: "from-slate-400/5 to-transparent",
    details: "We build data-informed engines for brilliant brands. By combining structured media placements, precise performance metrics, and organic storytelling, we maximize exposure while ensuring premium cost efficiency."
  },
  {
    id: "creative-strategy",
    title: "Creative Strategy",
    description: "Disruptive communication guidelines, campaign concept planning, and comprehensive brand direction.",
    icon: "Target",
    features: [
      "Competitive positioning audits & whitespace diagnostics",
      "Interactive strategy mockups & focus labs",
      "Complete market entry strategy & timing guides",
      "Strategic partnership framework mapping"
    ],
    color: "soft-blue",
    intensity: "from-[#7BA7D9]/10 to-transparent",
    details: "A beautiful design without an underlying strategy is merely decoration. We map out precise brand positioning roadmaps, defining exactly where, when, and how your message should break through the noise."
  },
  {
    id: "content-production",
    title: "Content Production",
    description: "Editorial photography, premium visual cinematic videos, and polished copywriting.",
    icon: "Video",
    features: [
      "High-fidelity brand presentation & corporate reels",
      "Curated editorial lifestyle photo session mapping",
      "Persuasive copywriting & corporate speech writing",
      "Highly sensory brand audio design synchronization"
    ],
    color: "light-navy",
    intensity: "from-[#5C7FA3]/10 to-transparent",
    details: "Form and aesthetics represent the tangible gateway of your communication. We produce world-class videos, photography, and written copy that embody the elegant details and standards of premium corporate entities."
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Polished community engagement, curated organic layouts, and premium brand storytelling formats.",
    icon: "Share2",
    features: [
      "Curated modular content calendars & grid design",
      "Short-form brand vertical reels with editorial pace",
      "Active community interaction & tone guidance",
      "Influencer alignment & strategic relationship suites"
    ],
    color: "slate-dark",
    intensity: "from-slate-400/5 to-transparent",
    details: "We treat social platforms as dynamic living extensions of your brand's style guide. We craft highly aesthetic, engaging, and localized campaigns that convert casual users into long-term brand advocates."
  }
];

export const SERVICES_VI: Service[] = [
  {
    id: "branding",
    title: "Xây dựng Thương hiệu",
    description: "Đặt tên doanh nghiệp cao cấp, thiết kế hệ thống hiển thị đồ họa chữ tinh tế và sáng tạo bản sắc thương hiệu di sản.",
    icon: "Award",
    features: [
      "Cẩm nang định vị giọng nói & định hướng thông điệp độc quyền",
      "Hệ thống nhận diện tối giản & thiết kế biểu trưng vector tối ưu",
      "Quy chuẩn hiển thị kỹ thuật số & phông chữ thương hiệu đặc thù",
      "Định chuẩn chất liệu in ấn thiết thực & giải pháp bao bì đồng nhất"
    ],
    color: "soft-blue",
    intensity: "from-[#7BA7D9]/10 to-transparent",
    details: "Chúng tôi không chỉ phác họa các ký tự; chúng tôi kiến tạo cả một hệ sinh thái thương hiệu hoàn toàn đồng bộ. Bằng việc tích hợp các quy chuẩn phông chữ hiện đại và ngôn ngữ thị giác thuần khiết, chúng tôi giúp nâng tầm các giá trị cốt lõi thành tiêu chuẩn đẳng cấp của ngành tại Việt Nam."
  },
  {
    id: "media-communication",
    title: "Truyền thông & Báo chí",
    description: "Kể câu chuyện thương hiệu truyền cảm hứng, thiết kế quan hệ báo chí mục tiêu và xử lý khủng hoảng truyền thông điềm tĩnh.",
    icon: "MessageSquare",
    features: [
      "Bộ thông cáo báo chí & kế hoạch bao phủ truyền thông diện rộng",
      "Góc nhìn kể chuyện đa chiều thu hút độc giả thị trường",
      "Hội thảo chia sẻ giải pháp truyền thông & huấn luyện phát ngôn viên",
      "Giám sát thông tin đa chiều và bảo vệ hình ảnh thương hiệu 24/7"
    ],
    color: "light-navy",
    intensity: "from-[#5C7FA3]/10 to-transparent",
    details: "Câu chuyện của bạn chính là kênh tương tác có tầm ảnh hưởng lớn nhất. Chúng tôi kiến tạo những kênh giao tiếp báo chí minh bạch, bền vững bảo vệ chất lượng cốt lõi và khẳng định mạnh mẽ vị thế thương hiệu trên các phương tiện truyền thông."
  },
  {
    id: "digital-marketing",
    title: "Tiếp thị Kỹ thuật số",
    description: "Lập kế hoạch truyền thông tích hợp hiệu quả cao, xây dựng phễu định hướng chuyển đổi và thúc đẩy chỉ số hữu cơ.",
    icon: "TrendingUp",
    features: [
      "Nghiên cứu nhân khẩu học & phân khúc thị trường mục tiêu sâu",
      "Thiết kế phễu tiếp cận đa tầng nâng cao hiệu suất đặt hàng",
      "Hệ thống theo dõi đa kênh & báo cáo đo lường tự động tập trung",
      "Định chuẩn SEO từ khóa hữu cơ giúp tối ưu vị trí tìm kiếm tự nhiên"
    ],
    color: "slate-dark",
    intensity: "from-slate-400/5 to-transparent",
    details: "Chúng tôi vận hành các chiến dịch quảng cáo thông qua phân tích dữ liệu hiệu quả thực tế. Bằng việc hòa hợp giữa phân bổ kênh số thông minh, giải pháp kỹ thuật theo dõi chặt chẽ và thông điệp chạm đúng nhu cầu, chúng tôi tối ưu tối đa chi phí quảng bá doanh nghiệp."
  },
  {
    id: "creative-strategy",
    title: "Chiến lược Sáng tạo",
    description: "Sáng tạo định hướng chiến dịch phá cách, thiết kế ngân sách truyền thống toàn diện và định hình thương hiệu vượt trội.",
    icon: "Target",
    features: [
      "Kiểm toán định vị cạnh tranh & xác lập khoảng trống cơ hội",
      "Phòng Lab thử nghiệm ý tưởng sáng tạo độc đáo",
      "Kế hoạch gia nhập thị trường tổng thể & thời gian tối ưu",
      "Cấu trúc kết nối đối tác chiến lược lâu dài"
    ],
    color: "soft-blue",
    intensity: "from-[#7BA7D9]/10 to-transparent",
    details: "Một thiết kế thẩm mỹ nếu không có hệ thống chiến lược cơ bản nâng đỡ sẽ chỉ là một bức tranh trang trí. Chúng tôi vạch rõ bản đồ định hướng định vị, xác định chính xác thời điểm, không gian và cách thức thương hiệu tỏa sáng."
  },
  {
    id: "content-production",
    title: "Sản xuất Nội dung",
    description: "Nhiếp ảnh phong cách ấn tượng, sản xuất video điện ảnh tinh tế và biên soạn nội dung xuất sắc đầy thuyết phục.",
    icon: "Video",
    features: [
      "Sản xuất phim tự giới thiệu doanh nghiệp & TVC chất lượng điện ảnh",
      "Thiết kế buổi chụp ảnh lối sống thời thượng định hướng thương hiệu",
      "Biên dịch nội dung bài phát biểu & thông cáo báo chí sắc sảo",
      "Thiết kế nhạc hiệu & đồng bộ âm thanh thương hiệu đặc trưng"
    ],
    color: "light-navy",
    intensity: "from-[#5C7FA3]/10 to-transparent",
    details: "Nội dung hình ảnh và ngôn từ là cánh cửa chạm đến giác quan của khách hàng. Chúng tôi thiết lập đội ngũ sản xuất chất lượng cao, tạo ra các sản phẩm hình ảnh và nội dung viết đạt độ chuẩn mực sắc sảo và mang lại sự đồng bộ toàn mỹ cho doanh nghiệp."
  },
  {
    id: "social-media",
    title: "Phát triển Mạng xã hội",
    description: "Đột phá tương tác khách hàng thông minh, thiết kế lưới bài đăng thẩm mỹ và tạo lập nội dung chia sẻ hấp dẫn.",
    icon: "Share2",
    features: [
      "Thiết kế lịch nội dung lưới chia sẻ đồng bộ & khoa học",
      "Định dạng video dọc đón đầu xu hướng thời lượng ngắn cuốn hút",
      "Điều hướng bình luận & tương tác đúng văn phong chuẩn mực",
      "Tuyển lựa và gắn kết KOL/KOC cùng giá trị thương hiệu"
    ],
    color: "slate-dark",
    intensity: "from-slate-400/5 to-transparent",
    details: "Chúng tôi định hướng hoạt động mạng xã hội là chi nhánh mở rộng đầy hơi thở cuộc sống của thương hiệu. Bằng việc lên kế hoạch hình ảnh cao cấp và các thông điệp có tính lan tỏa, chúng tôi gia tăng mức độ trung thành của khách hàng."
  }
];

export const PORTFOLIO_EN: Project[] = [
  {
    id: "vietnam-airlines-green",
    title: "An Ecological Promise",
    client: "Vietnam Airlines",
    category: "Media Communication",
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive multi-channel sustainability report and corporate trust campaign.",
    longDescription: "HALO Agency designed and orchestrated Vietnam Airlines' major decade-marking trust campaign, highlighting fuel-efficient modern fleets, waste-reduction protocols, and eco-conscious flight lanes. Through premium strategic storytelling, responsive interactive digital hubs, and nationwide PR features, we converted structural corporate milestones into understandable and emotional customer experiences.",
    year: "2025",
    duration: "4 Months",
    tags: ["Media Strategy", "Public Relations", "Corporate Writing", "Interactive Hub"],
    stats: [
      { label: "Domestic Pride Sentiment", value: "93%" },
      { label: "Targeted Multi-Chambers Press Reach", value: "4.8M+" },
      { label: "Active Digital Platform Hub Actions", value: "420,000+" }
    ],
    challenges: [
      "Translating highly technical environmental fuel and weight metrics into emotionally clear consumer-facing communication.",
      "Ensuring massive nationwide communication felt personal, genuine, and authentic without smelling of greenwashing corporate patterns."
    ],
    solutions: [
      "Re-styled scientific environmental graphs into a minimalist, gorgeous custom interactive interface with human-scale comparisons.",
      "Undertook structured video interviews with pilots, engineers, and cabin crews showcasing authentic behind-the-scenes milestones."
    ],
    outcome: "Described as a major benchmark in Vietnamese aviation public relations. The campaign successfully shifted local ecological awareness while significantly boosting organic airline premium seat bookings."
  },
  {
    id: "premium-roastery-identity",
    title: "Heritage Reborn Legacy",
    client: "The Coffee House",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description: "A luxury brand repositioning and typography system for Vietnam's elite roastery chain.",
    longDescription: "Faced with rapid market saturation, HALO redesigned and elevated the visual aesthetic of selected signature roasteries. We engineered a quiet, Scandinavian-inspired typography system, paired with warm local textures, handcrafted bronze signage, and an ultra-premium digital application, positioning the roastery experience at a luxurious level.",
    year: "2024",
    duration: "6 Months",
    tags: ["Identity System", "High-End Typography", "Material Craft", "Brand Architecture"],
    stats: [
      { label: "Brand Distinction Metrics", value: "+135%" },
      { label: "Average Customer Basket Spend", value: "+42%" },
      { label: "Media Brand Mentions Index", value: "A+" }
    ],
    challenges: [
      "Creating an identity that felt fundamentally modern and minimal while remaining deeply rooted in the historical coffee cultures of Vietnam.",
      "Transitioning the brand from mass-market visual codes to an elite, calm, and exclusive aesthetic."
    ],
    solutions: [
      "Pared back cluttering logos to a custom-drawn geometric serif mark combined with extensive breathable negative space in physical stores.",
      "Developed custom coffee tasting booklets, premium minimalist take-away packaging, and a fluid mobile ordering canvas."
    ],
    outcome: "The physical and digital brand system went viral organically across local design circles. Two flagship locations posted record-breaking revenue figures during month one of implementation."
  },
  {
    id: "vinfast-electric-debut",
    title: "The Electric Revolution",
    client: "VinFast",
    category: "Digital Marketing",
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    description: "Launch marketing campaign and high-performance interactive booking systems.",
    longDescription: "HALO Agency was appointed as a creative digital architect to coordinate pre-order launches for modern ecological electric vehicles. We programmed optimized, high-speed multi-stage booking websites combined with premium lifestyle video placements, targeted local influencer alignment, and localized digital funnels.",
    year: "2025",
    duration: "5 Months",
    tags: ["UX Architecture", "Media Campaign", "Targeted Placement", "Performance Flow"],
    stats: [
      { label: "Complete Pre-Order Target Hit", value: "118%" },
      { label: "Conversion Funnel Bounce Drop", value: "-35%" },
      { label: "Organic Local Social Actions", value: "2.1M+" }
    ],
    challenges: [
      "Minimizing booking checkout drop-offs over heavy local mobile data and older devices across multi-regional Vietnam networks.",
      "Communicating advanced vehicle features like localized cellular digital assistance simply and clearly in a high-conversion environment."
    ],
    solutions: [
      "Engineered a ultra-clean, lightweight pre-order page with lazy-loaded asset buffers, resulting in sub-second load scores.",
      "Structured a clear interactive visual configurator allowing clients to pair car shades and view local price differences seamlessly."
    ],
    outcome: "The launch system established unprecedented reservation counts inside 48 hours, receiving immense local praise for bringing world-class user-experience performance metrics to Vietnam."
  },
  {
    id: "masan-impact-story",
    title: "Generations of Nutrition",
    client: "Masan Group",
    category: "Creative Strategy",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "An elegant strategic narrative, corporate reports, and community impact positioning.",
    longDescription: "How do you render corporate metrics inspiring? Masan asked HALO to redesign their traditional annual corporate reports into an immersive journey of social impact and agricultural progress in Vietnam. We spent weeks in local fields producing high-resolution editorial photography, writing quiet narrative copy, and structuring it in a modern digital canvas.",
    year: "2025",
    duration: "3 Months",
    tags: ["Strategic Alignment", "Editorial Copywriting", "Corporate Design", "Impact Video"],
    stats: [
      { label: "Favorable Public Reputation Index", value: "+28pt" },
      { label: "Annual Shareholder Review Time", value: "-45%" },
      { label: "Community Grant Approvals", value: "100%" }
    ],
    challenges: [
      "Balancing essential, strict financial and logistical data points with the creative storytelling layout desired by brand executives.",
      "Presenting large agricultural supply chain steps in a clear, digestible, and highly engaging manner to foreign institutional shareholders."
    ],
    solutions: [
      "Employed an elegant bento-grid data layout with vast white spaces, placing photos and bold metrics dynamically next to tabular listings.",
      "Produced a stunning accompanying short film highlighting rural Vietnamese farmers and modern clean laboratory standards."
    ],
    outcome: "Voted the most transparent and creative corporate review of the year by key national investor agencies, drastically increasing brand loyalty scores among local Vietnamese consumers."
  }
];

export const PORTFOLIO_VI: Project[] = [
  {
    id: "vietnam-airlines-green",
    title: "Lời Hứa Sinh Thái",
    client: "Vietnam Airlines",
    category: "Truyền thông & Báo chí",
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    description: "Chiến dịch báo cáo sự phát triển bền vững đa kênh kết hợp phát triển chỉ số tin cậy doanh nghiệp.",
    longDescription: "HALO Agency tự hào thiết kế và điều phối chiến dịch tạo dựng niềm tin mang mốc dấu ấn của hãng Hàng không Quốc gia Vietnam Airlines, truyền tải câu chuyện khai thác đội tàu bay hiện đại phục vụ tiết kiệm nhiên liệu, tối ưu hóa giảm thiểu rác thải và kế hoạch mở rộng các hành trình sinh thái. Bằng nghệ thuật truyền thông chiến thuật, kết hợp cổng phân tích số liệu trực quan và thông điệp PR nhất quán trên các đầu báo uy tín quốc gia, chúng tôi đã chuyển hóa các dữ kiện số liệu khô khan của doanh nghiệp thành trải nghiệm cảm xúc gắn kết với khách hàng.",
    year: "2025",
    duration: "4 Tháng",
    tags: ["Chiến lược Truyền thông", "Quan hệ Công chúng (PR)", "Sản xuất Biên tập", "Cổng thông tin Tương tác"],
    stats: [
      { label: "Tỷ lệ Đồng thuận Toàn quốc", value: "93%" },
      { label: "Độ phủ Phương tiện Truyền thông", value: "4.8 Triệu+" },
      { label: "Lượt tương tác Cổng thông tin Số", value: "420,000+" }
    ],
    challenges: [
      "Chuyển đổi các định mức kỹ thuật chuyên sâu về tiêu hao nhiên liệu tàu bay và khối lượng cất cánh thành ngôn từ gắt kết cảm xúc, dễ hiểu đối với hành khách.",
      "Đảm bảo mức độ phủ sóng trên diện rộng toàn quốc nhưng vẫn mang màu sắc chân thực, đáng tin cậy và không tạo cảm xúc tô vẽ truyền thông thông thường."
    ],
    solutions: [
      "Tái định vị các đồ thị khô khan thành giao diện tương tác tối giản, thanh lịch, kết nối trực quan các chỉ số với các hành động đời sống thường ngày của hành khách.",
      "Tổ chức chuỗi thước phim ghi dấu thực tế đồng hành cùng phi công, kỹ thuật viên và tổ tiếp viên, lột tả chân thật nỗ lực bảo vệ môi trường phía sau hậu trường."
    ],
    outcome: "Được ghi nhận là chiến dịch điểm sáng trong lĩnh vực quan hệ công chúng hàng không tại Việt Nam. Dự án đạt hiệu quả kép trong việc định hướng ý thức bảo vệ môi trường và thúc đẩy doanh số đặt chỗ khoang thương gia tăng trưởng vượt bậc."
  },
  {
    id: "premium-roastery-identity",
    title: "Di Sản Tái Sinh",
    client: "The Coffee House",
    category: "Xây dựng Thương hiệu",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    description: "Tái định vị phân khúc thương hiệu danh giá đi kèm thiết kế hệ thống hiển thị chữ cao cấp cho chuỗi nhà rang biểu tượng.",
    longDescription: "Trong bối cảnh thị trường đồ uống nội địa cạnh tranh mạnh mẽ, HALO đã đồng hành tái định nghĩa toàn diện phong cách thẩm mỹ cho chuỗi nhà rang cao cấp của đối tác. Chúng tôi nghiên cứu hệ thống phông chữ serif mang hơi hướng Bắc lãng mạn kết hợp cùng chất liệu mây tre tinh tế đặc thù của Việt Nam, chạm khắc bảng biển đồng thủ công nguyên khối và xây dựng giao diện ứng dụng số vô cùng trang nhã, chính thức chuyển dịch trải nghiệm không gian cà phê sang phân khúc đặc trưng sang trọng.",
    year: "2024",
    duration: "6 Tháng",
    tags: ["Hệ thống Nhận diện", "Thiết kế Chữ Cao cấp", "Sản xuất Chất liệu Vật lý", "Kiến trúc Thương hiệu"],
    stats: [
      { label: "Chỉ số Bản sắc Đặc trưng", value: "+135%" },
      { label: "Giá trị Chi tiêu Đơn hàng Trung bình", value: "+42%" },
      { label: "Chỉ số Phân tích Danh giá Báo chí", value: "A+" }
    ],
    challenges: [
      "Kiến tạo một bộ nhận diện mang tính thẩm mỹ tối giản, hội nhập hiện đại nhưng vẫn mang cốt cách văn hóa cà phê lâu đời của đất nước.",
      "Chuyển dịch ấn tượng cảm quan từ đối tượng khách hàng đại chúng sang không gian nghệ thuật tinh chọn và độc quyền."
    ],
    solutions: [
      "Tối giản hóa các yếu tố đồ họa rườm rà thành một biểu trưng phông chữ vẽ hình học sang trọng phối hợp tinh tế cùng khoảng trắng rộng rải tại các điểm bán lẻ thực tế.",
      "Thiết kế trọn vẹn sổ tay cảm quan hương vị, hệ thống bao bì tái chế tối giản cao cấp và xây dựng trải nghiệm đặt món di động cực mượt mà."
    ],
    outcome: "Cả hệ thống nhận diện số và không gian vật lý đã tạo nên làn sóng thảo luận lớn trên các diễn đàn sáng tạo uy tín Việt Nam. Hai cửa hàng tiên phong đạt kỷ lục doanh thu vượt chuẩn ngay trong tháng đầu vận hành."
  },
  {
    id: "vinfast-electric-debut",
    title: "Kỷ Nguyên Xe Điện",
    client: "VinFast",
    category: "Tiếp thị Kỹ thuật số",
    thumbnail: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    description: "Chiến dịch tiếp thị bùng nổ ngày ra mắt tích hợp hệ thống đặt chỗ trực quan hiệu năng siêu tốc.",
    longDescription: "HALO vinh dự đảm nhận vai trò kiến trúc sư trải nghiệm số hóa phục vụ đợt mở cổng đặt hàng trước cho dòng sản phẩm ô tô điện thân thiện môi trường thế hệ mới. Chúng tôi lập trình trang web đặt hàng siêu tốc tối ưu mọi cấu hình mạng kết hợp đồng bộ các chiến dịch video lối sống ấn tượng, kết hợp danh sách KOL tầm ảnh hưởng hàng đầu và xây dựng các phễu quảng cáo thông minh.",
    year: "2025",
    duration: "5 Tháng",
    tags: ["Kiến trúc Trải nghiệm (UX)", "Chiến dịch Truyền thông tích hợp", "Quảng cáo Đúng mục tiêu", "Phễu Hiệu năng cao"],
    stats: [
      { label: "Tỷ lệ Đạt Chỉ tiêu Đặt hàng trước", value: "118%" },
      { label: "Tỷ lệ Bounce Rate Trang thanh toán giảm", value: "-35%" },
      { label: "Tổng Lượt tương tác mạng xã hội", value: "2.1 Triệu+" }
    ],
    challenges: [
      "Hạn chế tối đa tỷ lệ hủy thao tác giữa chừng trong điều kiện kết nối mạng di động không ổn định ở các khu vực địa phương xa trung tâm tại Việt Nam.",
      "Giải thích tính năng trợ lý ảo cá nhân hóa nâng cao và thông tin kỹ thuật pin sạc phức tạp thật ngắn gọn, lôi cuốn nhằm thuyết phục chuyển đổi trong tích tắc."
    ],
    solutions: [
      "Xây dựng dòng mã nguồn trang đặt hàng siêu nhẹ với các tệp hiển thị phân vùng đệm tải chậm, đạt tốc độ phản hồi tối ưu dưới 1 giây.",
      "Kiến tạo giao diện tương tác phối màu sơn 3D trực quan cùng thông số mức giá lăn bánh hiển thị theo từng khu vực tỉnh thành rõ ràng."
    ],
    outcome: "Cổng đặt trước ghi nhận khối lượng đơn hàng kỷ lục chỉ sau 48 giờ mở cổng, định hình tiêu chuẩn mới cho hiệu năng trải nghiệm khách hàng đẳng cấp quốc tế tại thị trường Việt Nam."
  },
  {
    id: "masan-impact-story",
    title: "Dinh Dưỡng Qua Các Thế Hệ",
    client: "Masan Group",
    category: "Chiến lược Sáng tạo",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "Chiến lược câu chuyện thương hiệu quốc dân cao cấp, kết nối giá trị cộng đồng và báo cáo tích hợp hiện đại.",
    longDescription: "Làm thế nào để chuyển hóa các bảng dữ liệu báo cáo tài chính thường niên trở nên giàu cảm hứng doanh nghiệp? Masan Group đề xuất HALO thiết lập lại giao diện truyền tải báo cáo tích hợp thành hành trình cống hiến vì dòng chảy dinh dưỡng nông nghiệp và kinh tế Việt Nam. Đội ngũ sản xuất của chúng tôi đã thực nghiệm tại khắp các nông trường để ghi lại các bức ảnh chân thực, biên tập các bài viết sâu sắc và biên soạn trên nền tảng kỹ thuật số tinh tế.",
    year: "2025",
    duration: "3 Tháng",
    tags: ["Định vị Giá trị Cốt lõi", "Biên tập Nội dung Cao cấp", "Đồ họa Báo cáo Hiện đại", "Thước phim Hành trình tác động"],
    stats: [
      { label: "Chỉ số Cảm xúc Thương hiệu", value: "+28pt" },
      { label: "Thời gian Đọc báo cáo trung bình giảm", value: "-45%" },
      { label: "Chỉ số Chấp thuận Đầu tư từ Quỹ ngoại", value: "100%" }
    ],
    challenges: [
      "Bảo đảm cân bằng tuyệt đối giữa các chỉ số kiểm toán, tài chính nghiêm ngặt bắt buộc cùng định hướng thiết kế phá cách, truyền dẫn cảm hứng thương hiệu từ Ban lãnh đạo.",
      "Trình diễn chuỗi dây chuyền cung ứng nông nghiệp toàn quốc liền mạch, dễ đón nhận và đầy uy tín trước các quỹ đầu tư lớn của nước ngoài."
    ],
    solutions: [
      "Tận dụng lối bố cục bento-grid hiện đại phối hợp cùng khoảng trắng mượt mà, đặt ảnh chân dung người nông dân và biểu đồ tài chính song hành tương hợp.",
      "Sản xuất thước phim tư liệu quý giá lột tả những nỗ lực thầm lặng của người nông dân và tính quy chuẩn trong các phòng thí nghiệm hiện đại đạt chuẩn khép kín."
    ],
    outcome: "Được bình chọn là tác phẩm báo cáo thường niên minh bạch và giàu tính nghệ thuật nhất năm do các Hiệp hội bình chọn uy tín vinh danh, củng cố danh tiếng thương hiệu và mức độ trung thành của công chúng đối với doanh nghiệp."
  }
];

export const WORKFLOW_EN: WorkflowStep[] = [
  {
    number: "01",
    title: "Discovery & Blueprint",
    subtitle: "Understanding Brand Nuances",
    description: "We dive deep into your market positioning, research local communication challenges in Vietnam, and define key audience personas.",
    details: [
      "Complete brand diagnostic & Vietnamese media placement audit",
      "Focused stakeholder workshops to formulate precise message positioning",
      "Structured narrative blueprinting and channel selection maps"
    ],
    techUsed: ["Figma Strategy Labs", "Notion Databases", "Local Consumer Index"]
  },
  {
    number: "02",
    title: "Aesthetic Direction",
    subtitle: "Crafting Premium Moods",
    description: "We design signature moodboards, compose tailored typography system architectures, and define responsive, elegant colors.",
    details: [
      "Creation of a unique, custom-tailored brand voice manual",
      "Drafting elegant typographical layouts and custom grid architectures",
      "Designing beautiful color harmonies aligned with Nordic minimal codes"
    ],
    techUsed: ["Figma Enterprise", "Adobe Suite", "Minimalist Tone Guides"]
  },
  {
    number: "03",
    title: "High-Fidelity Design",
    subtitle: "Orchestrating Brand Touchpoints",
    description: "We refine layouts to focus purely on elegant whitespace, beautiful headings, and high-fidelity local content.",
    details: [
      "Creation of balanced mobile/desktop layouts with thin borders",
      "Drafting pixel-perfect interface screens and corporate layouts",
      "Mapping slow, subtle entrance transitions and responsive grids"
    ],
    techUsed: ["Figma Design", "Prototyping Rooms", "Typography Scales"]
  },
  {
    number: "04",
    title: "Sleek Digital Assembly",
    subtitle: "Clean Programmatic Execution",
    description: "Our engineers construct your digital portals using clean TypeScript, securing absolute loading speed and security.",
    details: [
      "Fast-loading responsive web formats optimized for all networks",
      "Integration of interactive forms, pricing panels, and maps",
      "Adding subtle hover transitions and seamless page flows"
    ],
    techUsed: ["React with Vite", "Framer Motion", "TailwindCSS Engine"]
  },
  {
    number: "05",
    title: "Premium Launch & Tuning",
    subtitle: "Inaugurating Brand Landmarks",
    description: "We release your communication channels, performing rigorous checks to ensure flawless delivery on all viewports.",
    details: [
      "Edge-optimizations and speed calibration across Vietnam networks",
      "Post-launch media tracking and conversion analytics setup",
      "Continuous optimization feedback loops for premium brand positioning"
    ],
    techUsed: ["Cloud Run Docker", "Cloudflare DNS Speed", "Vercel Analytics"]
  }
];

export const WORKFLOW_VI: WorkflowStep[] = [
  {
    number: "01",
    title: "Khảo sát & Bản thảo",
    subtitle: "Thấu hiểu Đặc thù Sâu sắc",
    description: "Chúng tôi phân tích toàn diện vị thế thị trường của bạn, khảo cứu thói quen tiêu dùng và rào cản truyền thông nội địa tại Việt Nam làm nền tảng định vị nhóm chân dung khách hàng.",
    details: [
      "Đánh giá sức khỏe thương hiệu tổng thể & bản đồ phủ sóng truyền thông Việt Nam",
      "Tổ chức hội thảo chiến lược chuyên sâu cùng Ban lãnh đạo để thống nhất tầm nhìn bản sắc",
      "Cấu trúc hệ thống sơ đồ thông tin cốt lõi & lập lộ trình phân bổ đa kênh thông minh"
    ],
    techUsed: ["Figma Strategy Labs", "Notion Databases", "Hệ Chỉ số Tiêu dùng Việt"]
  },
  {
    number: "02",
    title: "Định hướng Thẩm mỹ",
    subtitle: "Kiến tạo Cảm xúc Cao cấp",
    description: "Chúng tôi lên bảng moodboard phong cách đặc trưng, thiết lập hệ giải pháp Typography (chữ hiển thị) chuẩn xác và định dạng bảng phối màu trang nhã nâng tầm thương hiệu.",
    details: [
      "Biên soạn bộ hướng dẫn Giọng văn thương hiệu (Brand Voice Manual) độc bản",
      "Thiết lập mạng lưới lưới đồ họa (grid system) & phông chữ thương hiệu sắc nét",
      "Tạo lập hệ thống màu sắc nhận diện chuẩn mực tối giản lấy cảm hứng thẩm mỹ Bắc Âu"
    ],
    techUsed: ["Figma Enterprise", "Adobe Creative Suite", "Cẩm nang Định hướng Giọng điệu"]
  },
  {
    number: "03",
    title: "Thiết kế Sắc nét (High-Fidelity)",
    subtitle: "Hài hòa Mọi Điểm Chạm",
    description: "Chúng tôi trau chuốt từng điểm chạm đồ họa tập trung tối đa vào khoảng trắng thanh lịch, tiêu đề thanh lịch và hình ảnh sản xuất thực tế cao cấp.",
    details: [
      "Kiến tạo bố cục thích ứng di động và máy tính siêu cân đối với các đường viền mảnh nhẹ",
      "Thực hiện giao diện tương tác chi tiết cho tất cả các trang web và biểu mẫu hiển thị",
      "Kiến thiết hệ thống chuyển cảnh siêu mượt và hiệu ứng tương tác tinh tế nâng tầm đẳng cấp"
    ],
    techUsed: ["Figma Design Suite", "Studio Thử nghiệm UX/UI", "Bản đồ Tỷ lệ Chữ Đồ họa"]
  },
  {
    number: "04",
    title: "Phát triển Công nghệ Mượt mà",
    subtitle: "Lập trình Chuẩn mực Sắc sảo",
    description: "Hệ thống lập trình viên của chúng tôi lắp ráp các nền tảng kỹ thuật số bằng TypeScript chất lượng cao, tối ưu tuyệt đối tốc độ phản hồi dưới giây và bảo mật an toàn.",
    details: [
      "Tối ưu hóa mã nguồn phản hồi nhanh thích hợp hoàn toàn với cơ sở hạ tầng mạng 4G/5G nội địa",
      "Tích hợp các trường dữ liệu tương tác thông minh, trình tính dự toán và bản đồ vị trí",
      "Cài đặt chuỗi tương tác di chuột tinh chọn và dòng chảy nội dung liền mạch không gián đoạn"
    ],
    techUsed: ["React & Vite Engine", "Framer Motion", "TailwindCSS Utility Library"]
  },
  {
    number: "05",
    title: "Khởi chạy Danh giá & Tinh chỉnh",
    subtitle: "Xác lập Dấu ấn Vượt bậc",
    description: "Chúng tôi đồng hành khởi chạy toàn diện các cổng tương tác truyền thông, thực thi kiểm thử toàn bộ thiết bị để bảo đảm hình ảnh đồng bộ sắc nét tuyệt đối.",
    details: [
      "Tối ưu truyền tải CDN biên và cân bằng tải giúp tăng tốc tải trang tuyệt đối trên các nền tảng mạng trong nước",
      "Cài đặt hệ phân tích tích hợp phục vụ đo lường lượng truy cập và đánh giá chuyển đổi sau ngày khởi chạy",
      "Điều phối các chu kỳ tiếp thu phản hồi cải tiến giúp nâng cao vị thế và uy tín thương hiệu lâu dài"
    ],
    techUsed: ["Cloud Run Containers", "Cloudflare Smart Routing", "Vercel Analytics Platform"]
  }
];

export const TESTIMONIALS_EN: Testimonial[] = [
  {
    id: "test-1",
    quote: "HALO doesn't just deliver campaigns; they build lasting brand monuments. Their elegant repositioning of our corporate narrative completely disrupted local market perceptions, boosting consumer trust in Vietnam within the first month.",
    author: "Pham Quang Huy",
    role: "VP of Brand Innovation",
    company: "Vietnam Airlines",
    rating: 5,
    avatarSeed: "huy"
  },
  {
    id: "test-2",
    quote: "Their clean Scandinavian styling combined with structured, powerful media placements is unmatched in Southeast Asia. Our web configurations load instantly and convey absolute prestige.",
    author: "Mai Linh Nguyen",
    role: "Director of Digital Affairs",
    company: "The Coffee House",
    rating: 5,
    avatarSeed: "linh"
  },
  {
    id: "test-3",
    quote: "Our global debut system had to perform flawlessly. HALO re-engineered our booking logic, delivering a highly polished, aesthetic checkout that surpassed all conversion pre-order targets.",
    author: "Minh Duc Tran",
    role: "Launch Operations Director",
    company: "VinFast Electric",
    rating: 5,
    avatarSeed: "duc"
  }
];

export const TESTIMONIALS_VI: Testimonial[] = [
  {
    id: "test-1",
    quote: "HALO không chỉ đơn thuần triển khai các chiến dịch quảng bá; họ thực sự dựng nên các cột mốc thương hiệu vững chắc. Sự định vị sắc sảo trong câu chuyện thương hiệu của chúng tôi đã thay đổi hoàn toàn cảm nhận của công chúng, gia tăng tối đa sự gắn kết niềm tin chỉ sau tháng đầu vận hành.",
    author: "Phạm Quang Huy",
    role: "Phó Chủ tịch Phát triển Thương hiệu",
    company: "Vietnam Airlines",
    rating: 5,
    avatarSeed: "huy"
  },
  {
    id: "test-2",
    quote: "Phong cách thiết kế trang nhã tối giản Bắc Âu hòa quyện xuất sắc cùng kế hoạch truyền thông nội địa mục tiêu của họ là giải pháp ưu việt hàng đầu khu vực. Tất cả hệ thống cổng số hóa của chúng tôi vận hành nhanh ấn tượng và mang hơi thở chất lượng cao cấp.",
    author: "Nguyễn Mai Linh",
    role: "Giám đốc Phát triển Kỹ thuật số",
    company: "The Coffee House",
    rating: 5,
    avatarSeed: "linh"
  },
  {
    id: "test-3",
    quote: "Hệ thống đăng ký của chúng tôi bắt buộc phải chạy mượt mà tuyệt đối đêm ra mắt toàn cầu. HALO đã kiến trúc lại hoàn toàn các dòng mã hoạt động, mang lại cổng đặt hàng trước cuốn hút và giúp vượt xa mọi mục tiêu doanh số.",
    author: "Trần Minh Đức",
    role: "Giám đốc Vận hành Ngày ra mắt",
    company: "VinFast Electric",
    rating: 5,
    avatarSeed: "duc"
  }
];

export const TEAM_EN: TeamMember[] = [
  {
    id: "team-1",
    name: "Aria Thorne",
    role: "Chief Executive & Creative Lead",
    specialty: "Brand Vision & Strategic Storytelling",
    avatarSeed: "aria",
    bio: "Aria coordinates creative design with robust communication strategies, pairing high-end Scandinavian aesthetics with Vietnam's local market intelligence to build premium agency milestones.",
    skills: ["Creative Strategy", "Identity Blueprinting", "Narrative Tone"],
    hackerCode: "Founding Partner // 12+ Years Experience"
  },
  {
    id: "team-2",
    name: "Kaelen Mercer",
    role: "Director of Media Strategy",
    specialty: "Public Relations & Media Placements",
    avatarSeed: "kaelen",
    bio: "Kaelen spending the last decade refining journalistic placements across leading business formats, translating complex brand messages into readable, high-trust press releases.",
    skills: ["Press Relations", "Media Audits", "Crisis Architecture"],
    hackerCode: "Media Council Advisor // 10+ Years Experience"
  },
  {
    id: "team-3",
    name: "Zora Vance",
    role: "Principal Brand Architect",
    specialty: "Digital Marketing & Performance Flows",
    avatarSeed: "zora",
    bio: "Zora maps out high-conversion marketing funnels, integrating elegant editorial content with precise tracking structures to maximize customer retention scores.",
    skills: ["Analytics Audits", "Growth Engineering", "Campaign Frameworks"],
    hackerCode: "Digital Strategy Lead // 9+ Years Experience"
  }
];

export const TEAM_VI: TeamMember[] = [
  {
    id: "team-1",
    name: "Aria Thorne",
    role: "Chủ tịch Điều hành & Định hướng Sáng tạo",
    specialty: "Tầm nhìn Thương hiệu & Nghệ thuật Bản sắc",
    avatarSeed: "aria",
    bio: "Aria đồng hành định hình các giải pháp đồ họa cao cấp song hành cùng kế hoạch truyền thông chính thống vững vàng, kết hợp khéo léo gu thẩm mỹ tối giản chuẩn quốc tế cùng sự thấu cảm thị trường sâu rộng tại Việt Nam.",
    skills: ["Phổ quát Chiến lược", "Bản thiết kế Nhận diện", "Hài hòa Ngôn phong"],
    hackerCode: "Thành viên Sáng lập // Hơn 12 Năm Thực Chiến"
  },
  {
    id: "team-2",
    name: "Kaelen Mercer",
    role: "Giám đốc Kế hoạch Truyền thông & Báo chí",
    specialty: "Quan hệ Báo chí & Phủ sóng Kênh PR",
    avatarSeed: "kaelen",
    bio: "Kaelen dành trọn tâm huyết hơn một thập kỷ vừa qua để thiết lập quan hệ hữu nghị khăng khít cùng các tòa soạn kinh tế, tài chính tầm cỡ, tinh tuyển mọi chỉ số doanh nghiệp phức tạp thành thông điệp PR dễ đón nhận.",
    skills: ["Quan hệ Báo chí", "Kiểm toán Truyền thông", "Cấu trúc Đối thoại Khủng hoảng"],
    hackerCode: "Cố vấn Hội đồng PR // Hơn 10 Năm Kinh Nghiệm"
  },
  {
    id: "team-3",
    name: "Zora Vance",
    role: "Kiến trúc sư Trải nghiệm Kỹ thuật số",
    specialty: "Chiến dịch Tiếp thị số & Tối ưu Chuyển đổi",
    avatarSeed: "zora",
    bio: "Zora nghiên cứu xây dựng các cấu trúc phễu quảng cáo thông minh thích ứng cao, cộng hưởng nhịp nhàng nội dung biên tập thanh lịch cùng các công cụ đo lường tự động giúp tối đa hiệu suất khách hàng.",
    skills: ["Kiểm toán Đo lường", "Lập trình Tăng trưởng", "Kiến trúc Chiến dịch Số"],
    hackerCode: "Trưởng nhóm Chiến dịch số // Hơn 9 Năm Kinh Nghiệm"
  }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('halo_lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('halo_lang', lang);
  };

  const t = (key: keyof typeof uiTranslations['en']): string => {
    return uiTranslations[language][key] || uiTranslations['en'][key] || '';
  };

  const servicesData = language === 'en' ? SERVICES_EN : SERVICES_VI;
  const portfolioData = language === 'en' ? PORTFOLIO_EN : PORTFOLIO_VI;
  const workflowSteps = language === 'en' ? WORKFLOW_EN : WORKFLOW_VI;
  const testimonialsData = language === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_VI;
  const teamMembers = language === 'en' ? TEAM_EN : TEAM_VI;

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      servicesData,
      portfolioData,
      workflowSteps,
      testimonialsData,
      teamMembers
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
