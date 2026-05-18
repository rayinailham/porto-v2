/**
 * Single source of content data for the home page + case studies.
 * All marketing copy lives here so design and content stay decoupled.
 */

export type WorkTag =
  | "all"
  | "go"
  | "ai"
  | "microservice"
  | "fullstack"
  | "frontend"
  | "python";

export interface Pillar {
  index: string;
  kicker: string;
  title: string;
  body: string;
  proof: { label: string; project: string };
  stack: string[];
}

export interface FeaturedProject {
  slug: string;
  index: string;
  title: string;
  status: "active" | "shipped" | "ongoing";
  oneLiner: string;
  description?: string;
  role: string;
  stack: string[];
  metric?: { value: string; label: string };
  href: string;
  size: "lg" | "tall" | "sm";
  emphasis?: "warm" | "cool" | "neutral";
  tags: WorkTag[];
  /** When set, links to the local case study page instead of GitHub. */
  caseStudy?: boolean;
}

export interface StackGroup {
  category: string;
  caption: string;
  items: { name: string; note?: string }[];
}

export interface CodeSnippet {
  file: string;
  language?: string;
  href?: string;
  caption?: string;
  code: string;
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  oneLiner: string;
  status: "active" | "shipped" | "ongoing";
  year: string;
  role: string;
  team: string;
  duration: string;
  stack: string[];
  links: { label: string; href: string }[];
  emphasis: "warm" | "cool" | "neutral";
  problem: { lead: string; body: string[] };
  decisions: { title: string; body: string }[];
  architectureDiagram: { code: string; caption?: string };
  challenges: Challenge[];
  outcome: { lead: string; metrics: { value: string; label: string }[] };
  codeHighlights: CodeSnippet[];
}

export interface AllProject {
  slug: string;
  title: string;
  oneLiner: string;
  stack: string[];
  tags: WorkTag[];
  href: string;
  status?: "active" | "shipped" | "ongoing";
  caseStudy?: boolean;
}

export const pillars: Pillar[] = [
  {
    index: "01",
    kicker: "Microservice Architect",
    title: "Multi-service ecosystems, end to end.",
    body:
      "API gateway, message broker, observability — designed and shipped as cohesive product surfaces, not loose services glued at deploy time.",
    proof: { label: "Reference build", project: "WIS-FutureGuide · 9 services" },
    stack: ["Go", "RabbitMQ", "Postgres", "uber-go/fx"],
  },
  {
    index: "02",
    kicker: "AI Engineer",
    title: "Practical AI in production paths.",
    body:
      "RAG with pgvector, multi-LLM orchestration, vision and audio pipelines tuned to real hardware budgets. Demos that survive the demo day.",
    proof: { label: "Reference build", project: "Rumi-Talk · streaming RAG + TTS" },
    stack: ["pgvector", "OpenRouter", "WhisperX", "YOLOv8"],
  },
  {
    index: "03",
    kicker: "Go-first Backend",
    title: "Clean architecture, opinionated stack.",
    body:
      "Go 1.24+ with uber-go/fx, sqlx, viper, slog. Layered config, structured errors, and migrations that make ops boring on purpose.",
    proof: { label: "Reference build", project: "Tetra Engine · warehouse engine" },
    stack: ["Go 1.24", "fx", "sqlx", "slog"],
  },
];

export const featured: FeaturedProject[] = [
  {
    slug: "tetra-engine",
    index: "F.01",
    title: "Tetra Engine",
    status: "shipped",
    oneLiner: "Warehouse package recommendation engine.",
    description:
      "Originally AnterAja's technical entrance challenge — shipped as a working microservice with a 4-stage idempotent scheduler, auto-schema migration, and a glassmorphism monitoring dashboard.",
    role: "Architect · Backend · Dashboard",
    stack: ["Go 1.24", "uber-go/fx", "sqlx", "Postgres", "Vue 3", "Vite"],
    metric: { value: "4-stage", label: "idempotent scheduler" },
    href: "/work/tetra-engine",
    size: "lg",
    emphasis: "warm",
    tags: ["go", "microservice", "fullstack"],
    caseStudy: true,
  },
  {
    slug: "futureguide",
    index: "F.02",
    title: "WIS-FutureGuide",
    status: "active",
    oneLiner: "Career guidance, fully microservice.",
    description:
      "Nine cooperating Go services — auth, assessment, analysis-worker, chat, payment, admin, notification — built clean-architecture top to bottom.",
    role: "Lead architect",
    stack: ["Go", "Clean Arch", "RabbitMQ", "Postgres"],
    metric: { value: "9", label: "services in production path" },
    href: "/work/futureguide",
    size: "tall",
    emphasis: "cool",
    tags: ["go", "microservice"],
    caseStudy: true,
  },
  {
    slug: "rumi-talk",
    index: "F.03",
    title: "Rumi-Talk",
    status: "shipped",
    oneLiner: "AI that answers as Jalaluddin Rumi.",
    description:
      "Nuxt 4 fullstack monorepo with Supabase pgvector retrieval, streaming LLM responses, and synthesised TTS. Niche concept, modern execution.",
    role: "Solo build",
    stack: ["Nuxt 4", "TypeScript", "pgvector", "Supabase"],
    metric: { value: "RAG + TTS", label: "streaming pipeline" },
    href: "/work/rumi-talk",
    size: "lg",
    emphasis: "neutral",
    tags: ["ai", "fullstack"],
    caseStudy: true,
  },
  {
    slug: "anevia",
    index: "F.04",
    title: "Anevia",
    status: "shipped",
    oneLiner: "Healthcare AI · two-step anemia detection.",
    role: "Backend + AI",
    stack: ["Hapi.js", "FastAPI", "YOLOv8", "TF"],
    href: "https://github.com/Anevia-Capstone",
    size: "sm",
    emphasis: "neutral",
    tags: ["ai", "fullstack", "python"],
  },
  {
    slug: "clip-autosubs",
    index: "F.05",
    title: "Clip-Autosubs",
    status: "shipped",
    oneLiner: "GPU-accelerated dynamic captions, RTX-tuned.",
    role: "Solo build",
    stack: ["Python", "WhisperX", "FFmpeg", "CUDA"],
    href: "https://github.com/rayinailham/Clip-Autosubs",
    size: "sm",
    emphasis: "warm",
    tags: ["ai", "python"],
  },
  {
    slug: "mydoomscroll",
    index: "F.06",
    title: "mydoomscroll",
    status: "shipped",
    oneLiner: "Vertical video feed · OLED + glassmorphism UX.",
    role: "Fullstack",
    stack: ["CodeIgniter 4", "PHP", "MySQL", "YouTube IFrame"],
    href: "https://github.com/rayinailham/mydoomscroll",
    size: "sm",
    emphasis: "cool",
    tags: ["fullstack", "frontend"],
  },
];

export const stackGroups: StackGroup[] = [
  {
    category: "Daily Go stack",
    caption: "Microservice work, 2026",
    items: [
      { name: "Go 1.24+", note: "primary language" },
      { name: "Gin", note: "HTTP" },
      { name: "uber-go/fx", note: "DI + lifecycle" },
      { name: "sqlx + lib/pq", note: "data layer" },
      { name: "spf13/viper", note: "layered config" },
      { name: "samber/oops", note: "errors" },
      { name: "slog + tint", note: "logging" },
      { name: "golang-migrate", note: "schema" },
    ],
  },
  {
    category: "TypeScript stack",
    caption: "Edge + frontend, when Go isn't the fit",
    items: [
      { name: "Bun", note: "runtime" },
      { name: "ElysiaJS / Hono", note: "frameworks" },
      { name: "Drizzle ORM", note: "type-safe SQL" },
      { name: "Nuxt 4 / Vue 3", note: "fullstack frontend" },
      { name: "Next.js 15", note: "marketing + utility" },
      { name: "Tailwind", note: "styling" },
    ],
  },
  {
    category: "AI stack",
    caption: "Practical, RAG-first",
    items: [
      { name: "Supabase + pgvector", note: "RAG store" },
      { name: "OpenRouter", note: "multi-LLM" },
      { name: "WhisperX", note: "ASR" },
      { name: "SpeechBrain", note: "audio ML" },
      { name: "YOLOv8", note: "vision" },
      { name: "FastAPI", note: "AI service shell" },
    ],
  },
];

export const allProjects: AllProject[] = [
  // Tier S — case studies
  {
    slug: "tetra-engine",
    title: "Tetra Engine",
    oneLiner: "Warehouse package recommendation engine for AnterAja.",
    stack: ["Go", "uber-go/fx", "sqlx", "Postgres", "Vue 3"],
    tags: ["go", "microservice", "fullstack"],
    href: "/work/tetra-engine",
    status: "shipped",
    caseStudy: true,
  },
  {
    slug: "futureguide",
    title: "WIS-FutureGuide",
    oneLiner: "9-service career guidance microservice ecosystem.",
    stack: ["Go", "RabbitMQ", "Postgres", "Clean Arch"],
    tags: ["go", "microservice"],
    href: "/work/futureguide",
    status: "active",
    caseStudy: true,
  },
  {
    slug: "rumi-talk",
    title: "Rumi-Talk",
    oneLiner: "Streaming RAG + TTS persona chat in Nuxt 4.",
    stack: ["Nuxt 4", "TypeScript", "pgvector", "Supabase"],
    tags: ["ai", "fullstack"],
    href: "/work/rumi-talk",
    status: "shipped",
    caseStudy: true,
  },
  // Tier A
  {
    slug: "petatalenta",
    title: "PetaTalenta",
    oneLiner: "Talent platform · 9-service TS microservice ecosystem.",
    stack: ["TypeScript", "Node.js", "Postgres"],
    tags: ["microservice", "fullstack"],
    href: "https://github.com/PetaTalenta",
    status: "shipped",
  },
  {
    slug: "anevia",
    title: "Anevia",
    oneLiner: "Healthcare AI · dual-model anemia detection from conjunctiva.",
    stack: ["Hapi.js", "FastAPI", "YOLOv8", "TensorFlow"],
    tags: ["ai", "fullstack", "python"],
    href: "https://github.com/Anevia-Capstone",
    status: "shipped",
  },
  {
    slug: "clip-autosubs",
    title: "Clip-Autosubs",
    oneLiner: "Hormozi-style dynamic captions, GPU-accelerated.",
    stack: ["Python", "WhisperX", "FFmpeg", "CUDA"],
    tags: ["ai", "python"],
    href: "https://github.com/rayinailham/Clip-Autosubs",
    status: "shipped",
  },
  {
    slug: "mydoomscroll",
    title: "mydoomscroll",
    oneLiner: "Community vertical-video feed with OLED dark mode + glassmorphism.",
    stack: ["CodeIgniter 4", "PHP", "MySQL"],
    tags: ["fullstack", "frontend"],
    href: "https://github.com/rayinailham/mydoomscroll",
    status: "shipped",
  },
  // Tier B
  {
    slug: "wis-pptgenerator",
    title: "WIS-pptgenerator",
    oneLiner: "AI PPT generator with Xendit payment flow.",
    stack: ["TypeScript", "Python", "Xendit"],
    tags: ["ai", "microservice"],
    href: "https://github.com/WIS-pptgenerator",
    status: "shipped",
  },
  {
    slug: "prodiplan",
    title: "prodiplan",
    oneLiner: "Education grading platform · session, grading, admin, auth.",
    stack: ["TypeScript", "Bun", "Hono"],
    tags: ["microservice", "fullstack"],
    href: "https://github.com/prodiplan",
    status: "shipped",
  },
  {
    slug: "micro-chatbot",
    title: "micro-chatbot",
    oneLiner: "Production-ready chatbot microservice boilerplate.",
    stack: ["Bun", "ElysiaJS", "Postgres", "OpenRouter"],
    tags: ["ai", "microservice"],
    href: "https://github.com/rayinailham/micro-chatbot",
    status: "shipped",
  },
  {
    slug: "micro-auth",
    title: "micro-auth",
    oneLiner: "Microservice auth boilerplate with Firebase + Zod.",
    stack: ["Bun", "Hono", "Firebase", "Zod"],
    tags: ["microservice"],
    href: "https://github.com/rayinailham/micro-auth",
    status: "shipped",
  },
  {
    slug: "vocal-trainer",
    title: "vocal-trainer",
    oneLiner: "Real-time pitch detection + vocal range analysis.",
    stack: ["Next.js 15", "Meyda.js", "Web Audio API"],
    tags: ["frontend", "fullstack"],
    href: "https://github.com/rayinailham/vocal-trainer",
    status: "shipped",
  },
  {
    slug: "av-frontend",
    title: "AureaVoice frontend",
    oneLiner: "English accent training SPA with View Transitions API.",
    stack: ["Vanilla JS", "Vite", "IndexedDB"],
    tags: ["frontend"],
    href: "https://github.com/rayinailham/av-frontend",
    status: "shipped",
  },
  {
    slug: "ldtp-media",
    title: "ldtp-media",
    oneLiner: "Travel story SPA with interactive map.",
    stack: ["Vanilla JS", "MapTiler", "Leaflet", "Vite"],
    tags: ["frontend"],
    href: "https://github.com/rayinailham/ldtp-media",
    status: "shipped",
  },
  {
    slug: "rayin-translation",
    title: "rayin-translation",
    oneLiner: "Novel translation reading site with Supabase backend.",
    stack: ["Vue", "Vite", "Supabase"],
    tags: ["frontend", "fullstack"],
    href: "https://github.com/rayinailham/rayin-translation",
    status: "shipped",
  },
];

export const tagOptions: { id: WorkTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "go", label: "Go" },
  { id: "ai", label: "AI" },
  { id: "microservice", label: "Microservice" },
  { id: "fullstack", label: "Fullstack" },
  { id: "frontend", label: "Frontend" },
  { id: "python", label: "Python" },
];
