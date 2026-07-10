export const projectsData = {
  dboss: {
    title: "D'Boss Coffee",
    subtitle: "A modern digital presence and QRIS ordering system for a premium cafe in Subang.",
    description: "Architected a high-performance web platform for D'Boss Coffee featuring a seamless 'Scan & Pay' flow (QRIS & Midtrans) so customers can order instantly from their tables.<br><br><strong>Architecture Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Real-time Sync:</strong> Live CouchDB database syncs directly with the physical café POS for instant price and inventory updates.</li><li><strong>Edge Performance:</strong> Next.js Incremental Static Regeneration (ISR) ensures instant page loads without sacrificing data accuracy.</li><li><strong>Millisecond Validation:</strong> Live inventory checks fire instantly before checkout, ensuring a flawless cart-to-kitchen pipeline.</li></ul>",
    role: "Lead Full-Stack Consultant",
    year: "2026",
    tags: ["F&B", "QRIS", "Point of Sale", "Web"],
    techStack: ["React", "TypeScript", "Next.js", "Vite", "CouchDB"],
    liveLink: "https://dbosscoffee.co.id",
    accentGradient: "linear-gradient(135deg, #d4af37, #8a6327)",
    image: "/dboss_logo_transparent.png",
    invertLogo: true
  },
  tifakafe: {
    title: "Tifa Kafe",
    subtitle: "A premium digital presence and VIP booking platform in Medan.",
    description: "Designed a high-performance web platform for Tifa Kafe in Medan, blending a premium aesthetic with robust functionality.<br><br><strong>Technical Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>VIP Reservation Engine:</strong> Custom booking system allowing guests to secure VIP rooms seamlessly.</li><li><strong>Dynamic Content Delivery:</strong> Headless CMS integration for instant updates to menus and seasonal promotions.</li><li><strong>Optimized Performance:</strong> Next.js and edge caching for sub-second load times.</li></ul>",
    role: "Lead Full-Stack Consultant",
    year: "2025",
    tags: ["F&B", "VIP Booking", "Web"],
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma"],
    liveLink: "https://tifakafe.co.id",
    accentGradient: "linear-gradient(135deg, #8B5A2B, #301b0d)",
    image: "/tifakafe_logo.png",
    invertLogo: true
  },
  alpha: {
    title: "OrionOrbit",
    subtitle: "Multi-Tenant F&B ERP & Omnichannel POS",
    description: "Architected a comprehensive Enterprise Resource Planning (ERP) and Point of Sale platform from the ground up to power multi-tenant food & beverage operations. Built on a resilient offline-first sync engine (CouchDB/PouchDB), the system guarantees zero downtime for in-store operations.<br><br>Going far beyond standard order processing, the platform serves as the central nervous system for the business. It features a complete financial ledger (Cashflow, Expenses, Drawer Deposits), a fully-integrated Human Resources module (Payroll, Shift Tracking, Cash Advances), and complex Multi-Tenant revenue routing for sub-vendors.<br><br>The core ERP seamlessly integrates with a real-time Kitchen Display System (KDS) and a dynamic public-facing web platform, providing a true end-to-end operational hub for modern hospitality management.",
    role: "Lead Full-Stack Consultant",
    year: "2025",
    tags: ["ERP", "Omnichannel POS", "Multi-Tenant", "Enterprise"],
    techStack: ["React 19", "TypeScript", "Go", "CouchDB", "PouchDB", "Tailwind CSS"],
    architectureMermaid: `
      graph LR
        classDef default fill:transparent,stroke:transparent;
        
        subgraph Client [Client & Edge]
          SPA["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/react.svg' class='tech-icon' /><div class='node-title'>Local Edge POS</div><div class='node-sub'>React SPA: Cashier, KDS</div></div>"]
          Portal["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/nextdotjs.svg' class='tech-icon' /><div class='node-title'>Public Portals</div><div class='node-sub'>Next.js ISR & 3D Web</div></div>"]
        end

        subgraph Core [Logic & Routing]
          Pouch["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/javascript.svg' class='tech-icon' /><div class='node-title'>Offline-First Engine</div><div class='node-sub'>PouchDB Local Commits</div></div>"]
          Gateway["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/go.svg' class='tech-icon' /><div class='node-title'>High-Speed Gateway</div><div class='node-sub'>Go Gin & Legacy Stitch</div></div>"]
        end

        subgraph Data [Data & Infrastructure]
          Couch["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/apachecouchdb.svg' class='tech-icon' /><div class='node-title'>Cloud Data Master</div><div class='node-sub'>CouchDB Bidirectional Sync</div></div>"]
          Int["<div style='text-align:center; min-width: 140px;'><div style='display:flex;justify-content:center;gap:0.5rem;margin-bottom:0.5rem;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/vercel.svg' class='tech-icon inline' /><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/railway.svg' class='tech-icon inline' /></div><div class='node-title'>Ecosystem Integrations</div><div class='node-sub'>QRIS, Vercel & Railway</div></div>"]
        end

        SPA <-->|Local Sync| Pouch
        Pouch <-->|Background Sync| Gateway
        Portal -->|REST / GraphQL| Gateway
        Gateway <-->|Distributed Read/Write| Couch
        Gateway -->|Webhooks| Int
    `,
    accentGradient: "linear-gradient(135deg, #4b6cb7, #182848)",
    liveLink: "#",
    isPrivate: true,
    image: "/orion_logo.png",
    invertLogo: true
  },
  pegadaian: {
    title: "Pegadaian Digital Syariah",
    subtitle: "Digital platform for Sharia-compliant pawnshop services and gold investments.",
    description: "Started by contributing to the legacy Pegadaian Digital Syariah application before spearheading a massive architectural revamp. Led the migration of legacy Java codebases to modern Kotlin with Coroutines, and transitioned iOS development from UIKit to Swift, while enforcing strict clean code principles and MVVM architecture. As Mobile Team Lead, I personally drove the engineering culture by conducting rigorous Merge Request reviews.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Fintech Security:</strong> Hardened application security by implementing SSL Certificate Pinning, Root/Jailbreak detection, Biometric Auth, and AES/SHA-256 data encryption.</li><li><strong>Design Systems:</strong> Engineered a reusable custom UI Kit based strictly on the internal UI/UX guidelines to drastically accelerate feature delivery.</li><li><strong>DevOps & Quality:</strong> Deployed microservices via Managed OCP (OpenShift Container Platform) and integrated SonarQube directly into the Jenkins CI/CD pipeline to automate code analysis.</li><li><strong>Data & Growth:</strong> Enabled the full Firebase ecosystem (Crashlytics, Analytics, Remote Config, A/B testing) alongside MoEngage for targeted marketing automation.</li></ul>",
    role: "Mobile App Developer - Mobile Team Lead",
    year: "2021 - 2024",
    tags: ["Fintech", "Sharia-compliant", "Gold Investment"],
    techStack: ["Native Android", "iOS", "Spring Boot", "Microservices", "PostgreSQL", "Jenkins", "OpenShift"],
    liveLink: "https://pegadaiansyariah.co.id/web/",
    accentGradient: "linear-gradient(135deg, #008f39, #004d1a)",
    image: "/pegadaian_emblem_only.png",
    invertLogo: false
  },
  triing: {
    title: "Tring! by Pegadaian",
    subtitle: "A digital ecosystem and lifestyle application by Pegadaian.",
    description: "Developed and maintained Triing by Pegadaian, a modern digital lifestyle application designed to engage users through gamification and integrated financial services.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Gamification:</strong> Built interactive features and rewards systems to increase daily user engagement.</li><li><strong>Seamless Integration:</strong> Connected with core Pegadaian services to allow easy access to investments and loans.</li><li><strong>Modern Architecture:</strong> Ensured a scalable and responsive backend to handle concurrent users during campaigns.</li></ul>",
    role: "Mobile Lead Developer",
    year: "2024 - 2025",
    tags: ["Fintech", "Lifestyle App", "Digital Ecosystem", "High Availability"],
    techStack: ["Native Android", "iOS", "Spring Boot", "Microservices"],
    liveLink: "https://pegadaian.co.id/tring",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.pegadaiandigital&hl=id",
    iosLink: "https://apps.apple.com/us/app/tring-by-pegadaian/id1350501409",
    accentGradient: "linear-gradient(135deg, #ffffff, #e6f4ea)",
    image: "/TRING_by_Pegadaian.svg",
    invertLogo: false
  },
  agen_pegadaian: {
    title: "Agen Pegadaian Syariah",
    subtitle: "Platform for official Pegadaian Syariah agents to manage transactions.",
    description: "Built the backend infrastructure for Agen Pegadaian Syariah, empowering individuals and small businesses to become official agents and offer Sharia-compliant financial services.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Agent Dashboard:</strong> Developed a comprehensive dashboard for agents to track transactions, commissions, and performance.</li><li><strong>Secure Transactions:</strong> Implemented robust security protocols for handling third-party financial transactions.</li><li><strong>API Gateway:</strong> Designed the API architecture to serve thousands of agents nationwide efficiently.</li></ul>",
    role: "Mobile App Developer",
    year: "2021 - 2022",
    tags: ["Fintech", "Agent Dashboard", "B2B"],
    techStack: ["Native Android", "Spring Boot", "Microservices", "PostgreSQL"],
    liveLink: "https://pegadaian.co.id",
    playStoreLink: "https://play.google.com/store/apps/details?id=co.pegadaian.syariah.agen&hl=id",
    accentGradient: "linear-gradient(135deg, #10b981, #047857)",
    image: "/pegadaian_emblem_only.png",
    invertLogo: false
  },
  babysheduler: {
    title: "BabyScheduler",
    subtitle: "A smart scheduling and tracking platform for infant care routines.",
    description: "Developed BabyScheduler, an intuitive web application designed to help new parents meticulously track and manage their infant's sleep, feeding, and care schedules.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Routine Tracking:</strong> Built a comprehensive dashboard for real-time logging of daily baby activities.</li><li><strong>Smart Reminders:</strong> Implemented customizable alerts for feeding and sleep cycles.</li><li><strong>Data Visualization:</strong> Created intuitive charts to help parents understand patterns in their child's development.</li></ul>",
    role: "Full Stack Developer",
    year: "2026",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://orionmonitor.vercel.app/",
    accentGradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    image: "/babyscheduler_line_art.png",
    invertLogo: false
  },
  soiltracker: {
    title: "Soil Tracker",
    subtitle: "Agricultural tracking and management system.",
    description: "Consulted on and contributed to the development of Soil Tracker, a platform designed for monitoring and managing soil metrics.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>System Architecture:</strong> Provided technical consulting to shape the project's foundation.</li><li><strong>Open Source:</strong> Available on GitHub for community collaboration.</li></ul>",
    role: "IT Consultant",
    year: "2025",
    tags: ["Transport", "Tracker", "ERP"],
    techStack: ["Git", "System Architecture", "Web Technologies"],
    liveLink: "https://github.com/gindaa/soil-tracker",
    accentGradient: "linear-gradient(135deg, #10b981, #047857)",
    image: "/soil_tracker_logo.png",
    invertLogo: false
  },
  studious: {
    title: "Studious",
    subtitle: "Comprehensive college management and student information system.",
    description: "Developed Studious, an integrated college management application designed to streamline academic operations. The platform provides robust tools for administrators and students to manage daily educational workflows.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Attendance Tracking:</strong> Engineered a reliable module for real-time attendance logging and academic reporting.</li><li><strong>Schedule Management:</strong> Built an intuitive class scheduling system for seamless course management.</li><li><strong>Mobile Integration:</strong> Expanded the enterprise web application into a native mobile client for on-the-go access.</li></ul>",
    role: "Mobile Application Developer",
    year: "2020",
    tags: ["Education", "Management System", "Mobile App"],
    techStack: ["Android", "Java", "REST APIs", "SQLite"],
    liveLink: "",
    accentGradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    image: "/studious_logo.png",
    invertLogo: false
  },
  smarttb: {
    title: "SmartTB",
    subtitle: "Tuberculosis data collection app for Nias Regency.",
    description: "Developed SmartTB, a dedicated data collection application designed to track and manage tuberculosis cases in the Nias Regency. The app empowers field workers to seamlessly gather patient data even in remote areas with poor connectivity.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Offline-First Architecture:</strong> Built a robust local caching system that allows users to collect data without internet access.</li><li><strong>Auto-Synchronization:</strong> Engineered background services that automatically push cached data to the central server the moment a connection is re-established.</li><li><strong>Targeted Deployment:</strong> Specifically tailored for healthcare workers operating in Nias Regency.</li></ul>",
    role: "Android Developer",
    year: "2019",
    tags: ["Healthcare", "Offline-First", "Data Collection"],
    techStack: ["Android", "Java", "SQLite", "REST APIs"],
    liveLink: "",
    accentGradient: "linear-gradient(135deg, #ef4444, #991b1b)",
    image: "/smarttb_logo.png",
    invertLogo: false
  }
};

export const experiencesData = [
  {
    id: "gingetsu",
    role: "Independent Technical Consultant",
    company: "GingetsuOrbit",
    date: "Oct 2025 - Present",
    shortDesc: "Architected and deployed custom POS and ERP systems. Engineered robust backend services (Go/React) with offline-first synchronization.",
    responsibilities: [
      "System Architecture & Development: Architected and deployed OrionOrbit, a custom Point of Sale (POS) and Enterprise Resource Planning (ERP) system, alongside a customer-facing landing page for a commercial client in the food and beverage industry.",
      "Full-Stack Engineering & Payment Integration: Engineered robust backend services utilizing Go and a responsive React frontend. Successfully integrated a secure online payment gateway into the web platform, synchronizing digital transactions directly with the POS application in real-time to ensure unified financial tracking.",
      "Offline-First Data Synchronization: Designed and implemented a resilient, offline-first data synchronization layer leveraging CouchDB and PouchDB, guaranteeing continuous operational uptime and zero data loss during network disruptions.",
      "Operational Problem Solving: Diagnosed field-level user bottlenecks and engineered targeted operational fixes, directly translating on-the-ground feedback into actionable system improvements to streamline adoption."
    ],
    relatedProjects: ["alpha", "dboss", "tifakafe", "babysheduler", "soiltracker"]
  },
  {
    id: "lead_pegadaian",
    role: "Lead Mobile Developer",
    company: "PT. Pegadaian",
    date: "Oct 2023 - Oct 2025",
    shortDesc: "Spearheaded architectural modernization to Native (Swift/Kotlin). Directed feature engineering pods enforcing Clean Architecture and MVVM standards.",
    responsibilities: [
      "Core Architecture & Strategy: Defined the foundational technical architecture for the Tring! by Pegadaian application. Conducted rigorous technical evaluations and secured stakeholder buy-in for a fully Native (Swift/Kotlin) development strategy over Hybrid frameworks, guaranteeing superior runtime performance, security, and scalability.",
      "Engineering Leadership: Led and mentored a cross-functional team of 6 engineers across frontend and backend disciplines. Standardized the development lifecycle by instituting strict Merge Request reviews, resulting in a 40% reduction in post-release defects and ensuring high-quality, maintainable code.",
      "Architectural Modernization: Spearheaded the end-to-end migration of Pegadaian Digital Syariah (Android: Java → Kotlin; iOS: UIKit → Swift), significantly reducing technical debt and improving app responsiveness.",
      "System Reliability & Monitoring: Integrated Firebase Crashlytics to proactively identify and resolve critical application faults, achieving and maintaining a strict <1% crash rate (over 99% crash-free sessions) across the active user base.",
      "Zero-Defect Release Management: Orchestrated rigorous deployment pipelines and post-release monitoring protocols in collaboration with QA and Product teams, achieving a 0% deployment rollback rate annually."
    ],
    relatedProjects: ["pegadaian", "triing"]
  },
  {
    id: "dev_pegadaian",
    role: "Mobile Application Developer",
    company: "PT. Pegadaian",
    date: "Jun 2021 - Oct 2023",
    shortDesc: "Developed core financial modules, implemented CI/CD pipelines, and drove a comprehensive data-driven UI/UX revamp.",
    responsibilities: [
      "End-to-End Feature Engineering: Developed and deployed core financial modules for Pegadaian Syariah Digital and Agen Pegadaian Syariah, including Rahn Tabungan Emas, Cicil Emas, and secure Data Consent workflows.",
      "CI/CD & Agile Delivery: Implemented CI/CD pipelines to automate application builds, testing, and deployment preparation. Orchestrated release management and app store rollouts, utilizing Jira to drive agile sprint cycles and align engineering output with strict product timelines.",
      "Analytics Integration & Data-Driven UI/UX: Integrated telemetry and event-tracking analytics into the application architecture to monitor user behavior. Leveraged these insights to execute a comprehensive interface revamp, ensuring modern accessibility standards and driving overall user retention.",
      "Quality Assurance & Stability: Engineered robust unit test suites utilizing JUnit, successfully elevating overall code coverage and effectively minimizing post-release regressions across business-critical releases."
    ],
    relatedProjects: ["agen_pegadaian"]
  },
  {
    id: "digicorp",
    role: "Mobile Application Developer",
    company: "Digicorp",
    date: "Sep 2019 - Dec 2020",
    shortDesc: "Engineered native Android clients and diagnosed core technical bottlenecks to improve application stability.",
    responsibilities: [
      "Mobile Translation: Engineered native Android clients for existing enterprise web applications, expanding platform accessibility for the corporate user base.",
      "Performance Optimization: Diagnosed and resolved core technical bottlenecks, improving application stability during critical internal beta testing phases."
    ],
    relatedProjects: ["studious"]
  },
  {
    id: "freelance",
    role: "Android Developer",
    company: "Freelance",
    date: "Jan 2018 - Aug 2019",
    shortDesc: "Architected and delivered bespoke Android applications for various independent clients.",
    responsibilities: [
      "Custom Solutions: Architected and delivered bespoke Android applications for various independent clients, managing the full software development lifecycle from initial requirements gathering to market deployment."
    ],
    relatedProjects: ["smarttb"]
  }
];
