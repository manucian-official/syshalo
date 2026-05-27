import { Service, Project, WorkflowStep, Testimonial, TeamMember } from './types';

export const HERO_BANNER_IMG = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

export const SERVICES_DATA: Service[] = [
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

export const PORTFOLIO_DATA: Project[] = [
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

export const WORKFLOW_STEPS: WorkflowStep[] = [
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

export const TESTIMONIALS_DATA: Testimonial[] = [
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

export const TEAM_MEMBERS: TeamMember[] = [
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
