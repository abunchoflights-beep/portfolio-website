export type ProjectFilter = "all" | "ai" | "marketplace" | "infra" | "experience";

export type ProjectScreen = {
  src: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  filter: Exclude<ProjectFilter, "all">;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  image: string;
  screens?: ProjectScreen[];
  link: string;
  domain: string;
  accent: string;
  surface: "light" | "dark" | "violet" | "mauve";
  poweredByBeliv?: boolean;
};

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All Cases" },
  { id: "ai", label: "AI & Automation" },
  { id: "marketplace", label: "Marketplaces & B2B" },
  { id: "infra", label: "Infrastructure & CLI" },
  { id: "experience", label: "Digital Experiences" },
];

export const PROJECTS: Project[] = [
  {
    id: "xbeliv",
    title: "xBeliv Platform",
    category: "AI CRM & Sales Automation · Founder",
    filter: "ai",
    tagline: "CRM with autonomous AI agents built to accelerate commercial closing cycles.",
    description:
      "My own company. A unified AI CRM where autonomous agents contextualize incoming messages, remember every contact's history, and reply across Instagram, Snapchat, WhatsApp, and the web in seconds.",
    challenge:
      "Lead fragmentation across WhatsApp, Instagram, Snapchat, and web channels caused delayed responses and lost conversions during peak hours.",
    solution:
      "Centralized omnichannel platform with 60-second AI onboarding, autonomous agents that retain full contact memory, and pinned global client threads.",
    impact:
      "Response times cut from hours to seconds and a substantial lift in close rates without adding headcount.",
    tags: ["Next.js", "AI Automations", "CRM Engine", "Supabase"],
    image: "/images/xbeliv-platform.jpg",
    link: "https://xbeliv.com",
    domain: "xbeliv.com",
    accent: "#7C3AED",
    surface: "light",
    poweredByBeliv: true,
  },
  {
    id: "lacuraduria",
    title: "La Curaduría",
    category: "Art Marketplace & Payment Gateway",
    filter: "marketplace",
    tagline: "Contemporary art and electronic culture platform with an integrated payment gateway.",
    description:
      "A full-scale digital marketplace and editorial hub for Bogotá's contemporary art and club scene — interactive catalog, artist profiles, event curation, and embedded checkout.",
    challenge:
      "Needed a specialized digital platform with secure payment processing to commercialize independent art works, events, and curatorial projects globally.",
    solution:
      "End-to-end web marketplace with an integrated payment gateway, interactive editorial catalog, artist directories, and a collector-optimized checkout flow.",
    impact:
      "Deployed and active in production at lacuraduria.net, processing live art and event transactions daily.",
    tags: ["Marketplace", "Payment Gateway", "Next.js", "Supabase"],
    image: "/images/lacuraduria.png",
    link: "https://lacuraduria.net",
    domain: "lacuraduria.net",
    accent: "#E11D48",
    surface: "dark",
  },
  {
    id: "relinkdata",
    title: "Relink:Data",
    category: "Data Infrastructure & Sales Engine",
    filter: "infra",
    tagline: "Data infrastructure and automated sales engine keeping client calendars at 100% capacity.",
    description:
      "An automated outbound and booking engine powered by xBeliv paired with an interactive ReLinkOS CLI terminal environment and real-time sonic data visualizer.",
    challenge:
      "Scaling technical client acquisition and keeping the commercial calendar packed with qualified closing meetings without manual friction or SDR burnout.",
    solution:
      "Implemented an automated xBeliv sales machine to keep the call calendar completely booked, alongside an interactive ReLinkOS terminal CLI and data-flow environment.",
    impact:
      "Client calendar at 100% commercial capacity, 99.9% uptime, and sub-100ms processing latency.",
    tags: ["Sales Engine", "React", "Vite", "Terminal CLI"],
    image: "/images/relinkdata.png",
    screens: [
      { src: "/images/relinkdata.png", label: "01 · Sonic Data Hub" },
      { src: "/images/relinkdata-2.png", label: "02 · ReLinkOS tty1" },
      { src: "/images/relinkdata-3.png", label: "03 · CLI Shell" },
    ],
    link: "https://relinkdata.com",
    domain: "relinkdata.com",
    accent: "#7C3AED",
    surface: "violet",
    poweredByBeliv: true,
  },
  {
    id: "braquile",
    title: "Dotaciones Braquile",
    category: "B2B Lead Engine & Corporate Catalog",
    filter: "marketplace",
    tagline: "Automated B2B client generation system and high-conversion corporate catalog.",
    description:
      "A production-grade B2B acquisition engine and dynamic digital catalog for a corporate apparel leader, replacing static PDFs with instant GSAP-animated quote flows.",
    challenge:
      "Manual prospecting and quoting over static PDF catalogs created critical delays and bottlenecks when acquiring new corporate accounts.",
    solution:
      "Designed and shipped an automated B2B lead-generation engine paired with a dynamic web catalog and GSAP micro-interactions for instant corporate quotes.",
    impact:
      "Continuous pipeline of qualified corporate buyers and a 60% reduction in quote-to-close time.",
    tags: ["Lead Engine", "Next.js", "GSAP", "B2B Catalog"],
    image: "/images/braquile.png",
    link: "https://dotacionesbraquile.com",
    domain: "dotacionesbraquile.com",
    accent: "#8B6584",
    surface: "mauve",
  },
  {
    id: "byrons",
    title: "Byron's Landscaping",
    category: "Dynamic Portfolio & Custom CMS",
    filter: "experience",
    tagline: "Precision landscape architecture showcase with a custom mobile-ready CMS.",
    description:
      "An organic, editorial web experience with GSAP scroll transitions and a protected custom admin dashboard so the team can publish new residential projects from their phone.",
    challenge:
      "Showcasing high-ticket residential landscape architecture without relying on rigid third-party templates or developer intervention for content updates.",
    solution:
      "High-impact visual showcase with fluid GSAP animations and a custom-built admin dashboard for instant image and copy updates from any device.",
    impact:
      "Higher direct residential quote requests and 100% autonomous content ownership for the client.",
    tags: ["Next.js", "React", "GSAP", "Admin CMS"],
    image: "/images/byrons.png",
    link: "https://byron-s-landscaping.vercel.app/",
    domain: "byron-s-landscaping.vercel.app",
    accent: "#10B981",
    surface: "light",
  },
  {
    id: "embodyink",
    title: "Embody Ink",
    category: "Studio Booking & Management System",
    filter: "experience",
    tagline: "End-to-end appointment system with a calm, Apple-inspired administrative suite.",
    description:
      "A complete booking platform for a premier tattoo studio — dynamic artist availability calendar, guided reservation flow, and a minimalist control center.",
    challenge:
      "Chaotic manual coordination of appointments, deposits, and multi-artist inquiries across Instagram DMs.",
    solution:
      "Full-stack application with real-time calendar availability, guided client booking, and a distraction-free Apple-inspired admin dashboard.",
    impact:
      "Eliminated 80% of manual coordination time and reduced double bookings to zero.",
    tags: ["Next.js", "Scheduling API", "Admin Dashboard", "Apple UI"],
    image: "/images/embodyink.png",
    link: "https://embodyink.vercel.app",
    domain: "embodyink.vercel.app",
    accent: "#A1A1AA",
    surface: "dark",
  },
  {
    id: "domo",
    title: "Domo Burguer",
    category: "AI Gastronomic Ecosystem",
    filter: "ai",
    tagline: "Conversational AI ordering assistant with interactive Leaflet delivery zoning.",
    description:
      "A full MERN delivery ecosystem featuring an AI conversational agent for guided orders, custom Leaflet geographic zone mapping, and real-time kitchen dispatch.",
    challenge:
      "Lost orders during peak delivery hours and repetitive menu questions overwhelming messaging channels.",
    solution:
      "MERN stack platform with a conversational AI agent that guides orders, validates delivery zones via Leaflet maps, and dispatches tickets in real time.",
    impact:
      "24/7 automated order capture with zero dedicated staff and error-free geographic routing.",
    tags: ["MERN Stack", "AI Agent", "Leaflet Maps", "Realtime Orders"],
    image: "/images/domo.jpg",
    link: "https://full-stack-smart-restaurant-ecosystem-davids-projects-b21f3f2a.vercel.app/",
    domain: "domo-burguer.vercel.app",
    accent: "#E11D48",
    surface: "light",
  },
  {
    id: "wayra",
    title: "Wayra Music",
    category: "Record Label Multimedia Platform",
    filter: "experience",
    tagline: "Immersive audiovisual environment with GSAP motion and full-stack architecture.",
    description:
      "An editorial multimedia home for an independent record label — showcasing releases, artist rosters, and interactive audio with a Railway-hosted Express + MongoDB backend.",
    challenge:
      "Translating the label's artistic identity and exclusivity into an immersive web experience beyond standard social feeds.",
    solution:
      "Interactive platform with fluid audio/visual transitions, release catalogs, artist profiles, and a scalable Express + MongoDB backend on Railway.",
    impact:
      "Editorial-grade audiovisual presence driving measurable growth in streams and artist bookings.",
    tags: ["React", "Express", "TypeScript", "MongoDB"],
    image: "/images/wayra.png",
    link: "https://wayra.space",
    domain: "wayra.space",
    accent: "#7C3AED",
    surface: "dark",
  },
];
