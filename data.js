export const projectsData = {
  alpha: {
    title: "OrionOrbit",
    subtitle: "Multi-Tenant F&B ERP, Offline-First POS & Kitchen Display System",
    description: "<strong>Business Impact:</strong> Built to eliminate the three biggest profit killers in multi-outlet F&B operations: lost sales during internet outages, cashier revenue leakage, and disconnected spreadsheets between the kitchen, finance, and HR.<br><br><strong>How It Grows the Business:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>100% Offline Cashier Continuity:</strong> Powered by a local-first sync engine (CouchDB/PouchDB), cashiers keep taking orders and printing receipts even when store Wi-Fi drops—syncing automatically the second connectivity returns.</li><li><strong>Real-Time Kitchen & Sub-Vendor Routing:</strong> Orders route instantaneously to the Kitchen Display System (KDS) and automatically split revenue across multi-tenant food court vendors without manual reconciliation.</li><li><strong>Unified Financial Ledger & HR Payroll:</strong> Tracks drawer deposits, operational expenses, staff shift attendance, cash advances, and automated payroll in one central command center.</li></ul>",
    role: "Founder & Principal Architect",
    year: "2025",
    tags: ["Custom ERP", "Offline-First POS", "F&B Growth"],
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
    liveLink: "#",
    accentGradient: "linear-gradient(135deg, #0284c7, #0c4a6e)",
    image: "/orion_logo.png",
    invertLogo: false
  },
  aegis: {
    title: "Aegis Meridian",
    subtitle: "End-to-End Corporate Law Firm ERP, Matter Tracking & Partner Accounting",
    description: "<strong>Business Impact:</strong> Replaced fragmented spreadsheets and manual billing in a corporate law firm with a single, auditable Practice Management ERP—eliminating billable leakage, automating partner fee-share splits, and ensuring zero missed court deadlines.<br><br><strong>How It Elevates Firm Operations:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>End-to-End Matter & Journey Tracking:</strong> Gives Managing Partners real-time visibility into every active legal matter, milestone progression, and stakeholder assignment from client onboarding to case settlement.</li><li><strong>Automated Legal Accounting & Fee Splits:</strong> Tracks case budgets, operational disbursements, and automatically calculates complex internal/external partner fee-share settlements with full audit trails.</li><li><strong>Court & Client Calendar Sync:</strong> Bi-directional Google Calendar synchronization ensures every court hearing, filing deadline, and client briefing is automatically scheduled across the legal team.</li><li><strong>Strict Partner-Level Access Control:</strong> Role-Based Access Control (RBAC) isolates confidential client dossiers and sensitive financial ledgers by partner and associate clearance levels.</li></ul>",
    role: "Founder & Principal Architect",
    year: "2026",
    tags: ["LegalTech ERP", "Case & Billing", "B2B Automation"],
    techStack: ["Next.js", "TypeScript", "React 19", "Prisma", "PostgreSQL", "RBAC & JWT"],
    architectureMermaid: `
      graph LR
        classDef default fill:transparent,stroke:transparent;
        
        subgraph Frontend [Client Layer]
          UI["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/react.svg' class='tech-icon' /><div class='node-title'>Partner & Associate Portal</div><div class='node-sub'>Next.js App Router + React 19</div></div>"]
        end

        subgraph Backend [Logic & Security]
          API["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/nextdotjs.svg' class='tech-icon' /><div class='node-title'>Legal & Billing Engine</div><div class='node-sub'>RBAC + Encrypted Auth</div></div>"]
          ORM["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/prisma.svg' class='tech-icon' /><div class='node-title'>Prisma ORM</div><div class='node-sub'>Audited Transactions</div></div>"]
        end

        subgraph Data [Storage Layer]
          DB["<div style='text-align:center; min-width: 140px;'><img src='https://cdn.jsdelivr.net/npm/simple-icons@13/icons/postgresql.svg' class='tech-icon' /><div class='node-title'>Relational Ledger DB</div><div class='node-sub'>ACID Financial & Case Store</div></div>"]
        end

        UI -->|Encrypted Actions| API
        API -->|Query| ORM
        ORM <-->|Read/Write| DB
    `,
    liveLink: "#",
    accentGradient: "linear-gradient(135deg, #4f46e5, #1e1b4b)",
    image: "/aegis_logo.png",
    invertLogo: false
  },
  dboss: {
    title: "D'Boss Coffee",
    subtitle: "Automated QRIS Table Ordering & Live POS Sync that Accelerates Table Turnover",
    description: "<strong>Business Impact:</strong> Transformed peak-hour café operations in Subang by allowing guests to scan, order, and pay via QRIS directly from their tables—eliminating counter queues, reducing waiter workload, and routing paid orders straight to the kitchen POS.<br><br><strong>How It Drives Revenue:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Frictionless Scan-to-Pay (QRIS & Midtrans):</strong> Customers browse the live menu and complete payment in seconds from their phone without waiting for staff or physical bill settlement.</li><li><strong>Direct-to-POS Synchronization:</strong> Every digital order and menu price syncs live with the in-store POS database, removing manual cashier re-entry and order mistakes.</li><li><strong>Zero Sold-Out Refunds:</strong> Millisecond stock validation checks live kitchen inventory right before payment so guests never pay for an out-of-stock item.</li></ul>",
    role: "Lead Full-Stack Consultant",
    year: "2026",
    tags: ["QRIS Ordering", "POS Sync", "F&B Revenue"],
    techStack: ["Next.js", "React", "TypeScript", "Midtrans QRIS", "CouchDB"],
    liveLink: "https://dbosscoffee.co.id",
    accentGradient: "linear-gradient(135deg, #d4af37, #8a6327)",
    image: "/dboss_logo_transparent.png",
    invertLogo: true
  },
  tifakafe: {
    title: "Tifa Kafe",
    subtitle: "24/7 VIP Room Reservation Engine & High-Conversion Digital Storefront",
    description: "<strong>Business Impact:</strong> Elevated a flagship hospitality venue in Medan with a 24/7 online VIP room booking engine and digital menu experience—capturing corporate and group reservations automatically without manual WhatsApp admin delays.<br><br><strong>How It Grows Bookings:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Automated VIP Room Reservations:</strong> Guests check availability and lock in high-ticket VIP rooms online, reducing booking drop-off outside business hours.</li><li><strong>Instant Promo & Menu Publishing:</strong> Management updates seasonal campaigns, event packages, and pricing in real time without needing developer intervention.</li><li><strong>Sub-Second Mobile Load Speeds:</strong> Engineered for instant loading on mobile networks to maximize conversion from Instagram and Google Maps traffic.</li></ul>",
    role: "Lead Full-Stack Consultant",
    year: "2025",
    tags: ["VIP Booking", "Hospitality", "Conversion"],
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma"],
    liveLink: "https://tifakafe.co.id",
    accentGradient: "linear-gradient(135deg, #8B5A2B, #301b0d)",
    image: "/tifakafe_logo.png",
    invertLogo: true
  },
  pegadaian: {
    title: "Pegadaian Digital Syariah",
    subtitle: "National Sharia Fintech Platform for Gold Investment & Financing (99%+ Crash-Free)",
    description: "<strong>Business Impact:</strong> Spearheaded the native mobile modernization of Indonesia's flagship Sharia pawn and gold-investment platform—delivering <strong>99%+ crash-free sessions</strong>, a <strong>40% drop in post-release defects</strong>, and bank-grade transaction security across a national user base.<br><br><strong>Enterprise Engineering Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Full Legacy Modernization:</strong> Led the architectural migration from legacy Java/UIKit to modern Kotlin Coroutines and Swift (MVVM), dramatically improving checkout speed and app responsiveness.</li><li><strong>Fintech-Grade Security:</strong> Hardened financial transactions with SSL Certificate Pinning, Root/Jailbreak detection, Biometric Authentication, and AES/SHA-256 encryption.</li><li><strong>Marketing & Retention Automation:</strong> Integrated Firebase Analytics, Remote Config, and MoEngage to power targeted customer lifecycle campaigns and A/B tested conversion flows.</li><li><strong>Zero-Rollback CI/CD Delivery:</strong> Automated code quality gates via SonarQube, Jenkins, and OpenShift Container Platform (OCP).</li></ul>",
    role: "Mobile Team Lead",
    year: "2021 - 2024",
    tags: ["Enterprise Fintech", "99%+ Crash-Free", "iOS & Android"],
    techStack: ["Native Android", "Swift (iOS)", "Spring Boot", "Microservices", "PostgreSQL", "OpenShift"],
    liveLink: "https://pegadaiansyariah.co.id/web/",
    accentGradient: "linear-gradient(135deg, #008f39, #004d1a)",
    image: "/pegadaian_emblem_only.png",
    invertLogo: false
  },
  triing: {
    title: "Tring! by Pegadaian",
    subtitle: "High-Retention Financial Super-App with Gamified Customer Engagement",
    description: "<strong>Business Impact:</strong> Defined the core native mobile architecture for Pegadaian's next-generation lifestyle and financial super-app—combining gamified daily rewards with instant access to gold investments and financing to drive repeat customer retention.<br><br><strong>Key Outcomes:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Retention Through Gamification:</strong> Engineered interactive reward loops that incentivize daily app opens and cross-sell core financial products.</li><li><strong>Native Performance at National Scale:</strong> Secured executive buy-in for a 100% Native (Swift/Kotlin) architecture, guaranteeing smooth UI performance and rock-solid stability during high-traffic national campaigns.</li><li><strong>Unified Ecosystem Access:</strong> Seamlessly connected lifestyle features with core loan, pawn, and gold-saving ledgers.</li></ul>",
    role: "Lead Mobile Developer",
    year: "2024 - 2025",
    tags: ["Super-App", "Customer Retention", "Fintech"],
    techStack: ["Native Android", "Swift (iOS)", "Spring Boot", "Microservices"],
    liveLink: "https://pegadaian.co.id/tring",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.pegadaiandigital&hl=id",
    iosLink: "https://apps.apple.com/us/app/tring-by-pegadaian/id1350501409",
    accentGradient: "linear-gradient(135deg, #ffffff, #e6f4ea)",
    image: "/TRING_by_Pegadaian.svg",
    invertLogo: false
  },
  agen_pegadaian: {
    title: "Agen Pegadaian Syariah",
    subtitle: "B2B Agent Network Platform Scaling Nationwide Branchless Revenue",
    description: "<strong>Business Impact:</strong> Engineered the mobile and API platform that empowers thousands of independent businesses and individuals across Indonesia to operate as official branchless Pegadaian Syariah agents—expanding transaction volume without physical branch overhead.<br><br><strong>Key Capabilities:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Real-Time Commission & Volume Tracking:</strong> Gives partner agents instant visibility into daily transaction payouts, fee earnings, and customer history.</li><li><strong>High-Security Third-Party Processing:</strong> Enforced strict KYC, data consent, and encrypted transaction signing for partner-led gold and financing transactions.</li><li><strong>High-Throughput API Gateway:</strong> Built to serve thousands of concurrent field agents nationwide with minimal latency.</li></ul>",
    role: "Mobile Application Developer",
    year: "2021 - 2023",
    tags: ["B2B Distribution", "Agent Network", "Fintech"],
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
    tags: ["React", "Web"],
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://orionmonitor.vercel.app/",
    accentGradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    image: "/babyscheduler_line_art.png",
    invertLogo: false,
    archived: true
  },
  soiltracker: {
    title: "Soil Tracker",
    subtitle: "Agricultural tracking and management system.",
    description: "Consulted on and contributed to the development of Soil Tracker, a platform designed for monitoring and managing soil metrics.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>System Architecture:</strong> Provided technical consulting to shape the project's foundation.</li><li><strong>Open Source:</strong> Available on GitHub for community collaboration.</li></ul>",
    role: "IT Consultant",
    year: "2025",
    tags: ["AgriTech", "Tracker"],
    techStack: ["System Architecture", "Web Technologies"],
    liveLink: "https://github.com/gindaa/soil-tracker",
    accentGradient: "linear-gradient(135deg, #10b981, #047857)",
    image: "/soil_tracker_logo.png",
    invertLogo: false,
    archived: true
  },
  studious: {
    title: "Studious",
    subtitle: "Comprehensive college management and student information system.",
    description: "Developed Studious, an integrated college management application designed to streamline academic operations. The platform provides robust tools for administrators and students to manage daily educational workflows.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Attendance Tracking:</strong> Engineered a reliable module for real-time attendance logging and academic reporting.</li><li><strong>Schedule Management:</strong> Built an intuitive class scheduling system for seamless course management.</li><li><strong>Mobile Integration:</strong> Expanded the enterprise web application into a native mobile client for on-the-go access.</li></ul>",
    role: "Mobile Application Developer",
    year: "2020",
    tags: ["Education", "Mobile App"],
    techStack: ["Android", "Java", "REST APIs", "SQLite"],
    liveLink: "",
    accentGradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    image: "/studious_logo.png",
    invertLogo: false,
    archived: true
  },
  smarttb: {
    title: "SmartTB",
    subtitle: "Tuberculosis data collection app for Nias Regency with offline-first capabilities.",
    description: "Developed SmartTB, a dedicated data collection application designed to track and manage tuberculosis cases in the Nias Regency. The app empowers field workers to seamlessly gather patient data even in remote areas with poor connectivity.<br><br><strong>Key Highlights:</strong><ul style='margin-top: 0.8rem; margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;'><li><strong>Offline-First Architecture:</strong> Built a robust local caching system that allows users to collect data without internet access.</li><li><strong>Auto-Synchronization:</strong> Engineered background services that automatically push cached data to the central server the moment a connection is re-established.</li><li><strong>Targeted Deployment:</strong> Specifically tailored for healthcare workers operating in Nias Regency.</li></ul>",
    role: "Android Developer",
    year: "2019",
    tags: ["Healthcare", "Data Collection"],
    techStack: ["Android", "Java", "SQLite", "REST APIs"],
    liveLink: "",
    accentGradient: "linear-gradient(135deg, #ef4444, #991b1b)",
    image: "/smarttb_logo.png",
    invertLogo: false,
    archived: true
  }
};

export const experiencesData = [
  {
    id: "gingetsu",
    role: "Founder & Principal Solutions Architect",
    company: "PT Gingetsu Orbit System",
    date: "Oct 2025 - Present",
    shortDesc: "Partnering with businesses to replace manual bottlenecks with custom ERPs, offline-first POS ecosystems, and revenue-generating web & mobile platforms.",
    responsibilities: [
      "Corporate LegalTech ERP (Aegis Meridian): Architected an end-to-end Law Firm Practice Management and Legal Accounting platform that automates partner fee-share settlements, centralizes case tracking, and eliminates missed court deadlines.",
      "Multi-Tenant F&B ERP & Offline POS (OrionOrbit): Built a zero-downtime Point of Sale, Kitchen Display System (KDS), financial ledger, and HR payroll suite that keeps stores selling even during internet outages.",
      "Automated Table Ordering & VIP Booking Engines (D'Boss Coffee, Tifa Kafe): Delivered live QRIS table-ordering systems synced directly to kitchen POS terminals and 24/7 VIP reservation engines that accelerate table turnover and capture high-ticket bookings.",
      "End-to-End B2B Delivery: Lead every engagement from operational workflow audit and system architecture through to production deployment and team onboarding."
    ],
    relatedProjects: ["alpha", "aegis", "dboss", "tifakafe"]
  },
  {
    id: "lead_pegadaian",
    role: "Lead Mobile Developer",
    company: "PT. Pegadaian",
    date: "Oct 2023 - Oct 2025",
    shortDesc: "Led native mobile architecture (Swift/Kotlin) and engineering pods for national fintech platforms—achieving 99%+ crash-free reliability and a 40% reduction in defects.",
    responsibilities: [
      "Core Architecture & Strategy: Defined the foundational technical architecture for the Tring! by Pegadaian super-app, securing executive buy-in for a 100% Native (Swift/Kotlin) strategy that guaranteed peak performance and security at national scale.",
      "Engineering Leadership: Led and mentored a cross-functional squad of 6 engineers across mobile and backend, cutting post-release defects by 40% through rigorous code review and Clean Architecture standards.",
      "Legacy Modernization: Spearheaded the end-to-end migration of Pegadaian Digital Syariah (Java → Kotlin; UIKit → Swift), eliminating legacy bottlenecks and accelerating feature delivery.",
      "99%+ Crash-Free Reliability & Zero Rollbacks: Established proactive Crashlytics telemetry and automated CI/CD release gates, maintaining a <1% crash rate and a 0% annual deployment rollback rate."
    ],
    relatedProjects: ["pegadaian", "triing"]
  },
  {
    id: "dev_pegadaian",
    role: "Mobile Application Developer",
    company: "PT. Pegadaian",
    date: "Jun 2021 - Oct 2023",
    shortDesc: "Engineered core gold-financing modules, nationwide B2B agent dashboards, and data-driven UI/UX revamps that boosted customer retention.",
    responsibilities: [
      "Revenue & Financing Modules: Engineered core transactional workflows for Pegadaian Syariah Digital and Agen Pegadaian Syariah, including Rahn, Tabungan Emas, Cicil Emas, and nationwide B2B agent commission tracking.",
      "Data-Driven Conversion Revamp: Integrated user behavior telemetry to identify drop-off points and execute a full UI/UX overhaul that improved checkout completion and retention.",
      "CI/CD & Automated Quality Gates: Built automated build and unit-testing pipelines (JUnit, Jenkins, SonarQube) to protect business-critical financial releases."
    ],
    relatedProjects: ["agen_pegadaian"]
  }
];
