# 🌌 HALO AGENCY & COMMUNICATIONS PLATFORM
> **Enterprise Brand Positioning, Responsive Client Estimators & Active Security Audit Consoles**

[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript v5](https://img.shields.io/badge/TypeScript-v5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite v6](https://img.shields.io/badge/Vite-v6.2-646cff?style=flat-square&logo=vite)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

*An elite full-stack branding & communication agency portal designed for high-performance scale, client onboarding, and direct campaign administration. Built entirely on single-view performance paradigms, robust custom state machinery, and high-contrast professional design systems.*

---

## 📖 Mục Lục (Table of Contents)
*   [✨ High-End Features](#-high-end-features)
*   [🛠️ Tech Stack & Ecosystem](#%EF%B8%8F-tech-stack--ecosystem)
*   [📦 Architecture & Directory Map](#-architecture--directory-map)
*   [🚀 Quickstart & Installation](#-quickstart--installation)
*   [⚙️ Development Guidelines](#%EF%B8%8F-development-guidelines)
*   [🔒 Administrative Security Shield](#-administrative-security-shield)
*   [🤝 Contributions & Community](#-contributions--community)

---

## ✨ High-End Features

### 1. 🧮 Interactive Budget Estimator (Công Cụ Ước Tính Ngân Sách)
*   **EN**: Clients can orchestrate custom communication packages by selecting media formats, localization tiers, and continuous deliverables. The algorithm calculates live developer workload, regional complexity coefficients, and outputs a highly polished brief.
*   **VI**: Cho phép đối tác tự cấu trúc gói dịch vụ truyền thông (độ phủ báo chí, mật độ sản xuất, bản địa hóa Nam-Bắc). Thuật toán tính toán ngay lập tức số giờ làm việc, hệ số phức tạp vùng miền và xuất mẫu tóm tắt ngân sách hoàn chỉnh.

### 2. 🛡️ Security Console & Active Audits (Bảng Điều Khiển Bảo Mật)
*   **EN**: Complete vulnerability index reporting on Cookie Consent setup, dynamic IP lockdowns, and active DDoS screening shields. Simulates administrative protection metrics in real-time.
*   **VI**: Trình quét độ nhạy tối ưu đo lường tính tuân thủ GDPR, chính sách lưu vết cookie an toàn, cơ chế khóa IP khẩn cấp và hiệu năng bộ lọc DDoS.

### 3. v7 Hard Purge Shield (Quy Chuẩn Reset Khu Vực VII)
*   **EN**: Hard disk recovery safeguard ensuring absolute confidentiality. Requires entering a highly secured key pass (`RESET`) to authoritatively wipe local CMS drifts, mock client registries, and administrator log databases.
*   **VI**: Lá chắn bảo mật cấp cao giúp giải phóng tức thì mọi cấu hình tạm thời, thông tin đối tác thử nghiệm và nhật ký quản trị về nguyên bản của nhà máy khi gõ khóa bảo mật cam kết.

### 4. 📖 Core Knowledge Dictionary (Từ Điển Hỏi Đáp Tương Tác)
*   **EN**: Integrated interactive atlas containing core guidelines, typography rules, branding templates, and security guidelines. Powered by structured keyword filter states for snappy discovery.
*   **VI**: Bản đồ tra cứu thông minh chứa toàn bộ định nghĩa, văn hóa thương hiệu, cẩm nang thị giác và nguyên tắc kỹ thuật của HALO dựa trên hệ thống gán từ khóa tiện lợi.

---

## 🛠️ Tech Stack & Ecosystem

```
  ┌─────────────────────────────────────────────────────────────┐
  │                        React 19 SPA                         │
  └──────────────┬──────────────────────────────┬───────────────┘
                 │                              │
  ┌──────────────▼──────────────┐┌──────────────▼──────────────┐
  │     Tailwind CSS v4 &       ││      Dynamic Motion v12     │
  │     Space Grotesk Font      ││     Responsive Animation    │
  └─────────────────────────────┘└─────────────────────────────┘
                 │                              │
  ┌──────────────▼──────────────┐┌──────────────▼──────────────┐
  │        Lucide Icons         ││       Recharts Engine       │
  │      Premium Branding       ││       Interactive Data      │
  └─────────────────────────────┘└─────────────────────────────┘
```

*   **Framework**: [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org) for absolute type-safety.
*   **Build Bundler**: [Vite 6](https://vite.dev) guaranteeing instantaneous Hot Module Replacement.
*   **Styling System**: [Tailwind CSS v4](https://tailwindcss.com) utilizing modern `@import "tailwindcss";` variables, yielding ultra-light CSS assets.
*   **Animations**: [Motion 12](https://motion.dev) for luxurious layout shifts, micro-accordion physics, and transition entrances.
*   **Charts & Visualizers**: [Recharts](https://recharts.org) for state-of-the-art interactive data representations in security diagnostics and estimation trends.

---

## 📦 Architecture & Directory Map

Explore the professional repository layout to quickly navigate the codebase:

```bash
halo-agency-platform/
├── .env.example             # Configuration placeholders for environment variables
├── .gitignore               # Strict exclusion policy for assets & local cache files
├── index.html               # Main single-page HTML container (Space Grotesk imported)
├── package.json             # Core dependency manifest and platform launch scripts
├── vite.config.ts           # Highly optimized Vite development and compilation engine
├── src/
│   ├── main.tsx             # Application entry-point booting React
│   ├── App.tsx              # Primary layout router and state coordinator
│   ├── index.css            # Tailind V4 stylesheet, visual typography theme configuration
│   ├── types.ts             # Global TypeScript type contracts for complete structural safety
│   ├── components/          # High-cohesion modular interactive interfaces
│   │   ├── FAQ.tsx          # Real-time search-driven Knowledge Dictionary atlas
│   │   ├── AdminPanel.tsx   # Core security simulation, hard resets, and CMS managers
│   │   ├── Contact.tsx      # High-fidelity project registration forms
│   │   ├── Portfolio.tsx    # Interactive layout galleries of landmark projects
│   │   ├── Services.tsx     # Specialized communication pricing structure details
│   │   └── ParticleBackground.tsx # High-end canvas asset creating premium cosmic vibes
│   └── context/
│       └── LanguageContext.tsx # Context managing multi-language (EN/VI) translations & settings
```

---

## 🚀 Quickstart & Installation

Follow these steps to host, develop, or compile the HALO Agency repository on your local computer:

### 1. Prerequisites (Yêu Cầu Hệ Thống)
Ensure you have **Node.js v18.0+** and **npm v9.0+** installed on your workstation.

### 2. Clone & Install Dependencies (Tải Mã Nguồn & Cài Đặt)
```bash
# Clone the repository
git clone https://github.com/manucian-official/syshalo.git
cd halo-agency-platform

# Install the premium package registry
npm install
```

### 3. Launch the Local Dev Server (Khởi Động Trình Phát Triển)
To boot the lightning-fast development server on `port 3000`:
```bash
npm run dev
```
Open your web browser and navigate directly to `http://localhost:3000` to interact with the system live.

### 4. Build for Production Server (Biên Dịch Sản Phẩm)
To compile compact, optimized HTML, JS, and CSS files ready for global Cloud CDN deployments:
```bash
npm run build
```
The production-optimized static files will be neatly generated inside the `/dist` directory.

---

## ⚙️ Development Guidelines

### 💡 High-Quality React Habits
To keep the source code highly professional, clean, and maintainable, always abide by these core directives:
*   **No State body updates**: Avoid calling React state changes directly inside a component's rendering flow to prevent infinite re-render loops.
*   **Safe useEffect dependencies**: Only feed primitive values (strings, numbers, booleans) into your dependency parameters. Never insert direct object, array, or functional variables without strict stabilizers like `useMemo`.
*   **Unique HTML Identifiers**: To facilitate automated end-to-end user tests, ensure any interactive component (`button`, `input`, `form`, `card`) features a unique `id` attribute.

### 📝 Translation Model Mapping
To append custom bilingual descriptors, update the dictionary schemes directly in `/src/context/LanguageContext.tsx`:
```typescript
// Define clean standard translation records inside your context map
{
  keyName: "unique-key",
  en: "Your pristine English documentation line",
  vi: "Thông tin bàn giao tiếng Việt đẳng cấp tương xứng"
}
```

---

## 🔒 Administrative Security Shield

To guard configurations and safeguard administrative access during previews:
1.  Navigate directly to the **Admin Shield Panel** by clicking the Shield/Key toggle floating on of the viewport page.
2.  Review active telemetry, mock target server IP white-lists, and simulation metrics.
3.  Utilize the **Static Scanner** to automatically identify vulnerabilities. It computes our system integrity score instantly.

---

## 🤝 Contributions & Community

We celebrate elite craftsmanship and tidy development! If you want to refine strategies, customize styling tokens, or add new dictionary items:
1.  Review our structured `CONTRIBUTING.md` guidelines.
2.  Maintain standard **Semantic Commits**:
    *   `feat: add new high-performance search capability`
    *   `fix: resolve micro-accordion rendering flickers`
    *   `docs: update dictionary guidelines`
3.  Open a Pull Request with complete details.

---

*“Crafting clear, authentic, and legendary digital landmarks for progressive global leaders.”*  
**© 2026 HALO Agency Platform. Executed under premium architectural parameters.**
