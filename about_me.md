# About Me — Rayina Ilham

> Sumber data: GitHub `@rayinailham` + organisasi yang diikuti (WIS-futureguide, PetaTalenta, prodiplan, WIS-pptgenerator). Disusun sebagai sumber tunggal untuk konten v2-porto.

---

## 1. Identitas Singkat

| Field | Value |
|---|---|
| Nama | Rayina Ilham |
| Handle | `rayinailham` (juga akun `Chhrone`) |
| Email | rayinailham9@gmail.com |
| LinkedIn | https://linkedin.com/in/rayinailham |
| GitHub | https://github.com/rayinailham |
| Lokasi | Indonesia |
| Status | Hireable |
| Public repos | 46 |
| Member since | Mei 2023 |

---

## 2. Role & Positioning

Multi-role dengan satu benang merah: **membangun ekosistem microservice production-grade dengan AI di dalamnya**, dari konsep produk sampai deploy.

- **Product Manager / Product Developer** — memimpin tim IT lintas Frontend, Backend, Database, dan ML.
- **Microservice Architect** — arsitektur clean architecture, multi-service, message broker, API gateway.
- **AI Engineer** — RAG (pgvector), LLM orchestration, image/audio AI pipeline (YOLOv8, WhisperX, SpeechBrain).
- **Go Backend Engineer** — fokus utama saat ini, microservice dengan Go + clean architecture.
- **Full-stack support** — Vue/Nuxt/Next/vanilla JS untuk dashboard internal.

Tagline yang dipakai sendiri di profile README:
> *"Product Developer | Microservice Architect | AI Engineer | Go Backend Engineer | Hoshiyomi | Isaki Rengo | Clipper"*

---

## 3. Tech Stack — Yang Sedang Dipakai (2026)

Diurutkan dari yang paling intens dipakai di repo aktif (April–Mei 2026).

### 🥇 Primary Stack (gacor, dipakai harian)
- **Go 1.24+** — bahasa utama untuk backend microservice
- **Gin** — HTTP framework
- **uber-go/fx** — compile-time DI + lifecycle management
- **sqlx + lib/pq** — data access layer ke PostgreSQL
- **spf13/viper** — layered config
- **samber/oops** — structured error handling
- **log/slog + tint** — structured logging
- **golang-migrate** — schema migration

### 🥈 Secondary Stack (sering dipakai)
- **TypeScript** + **Bun** runtime
- **ElysiaJS** / **Hono** — framework microservice TS
- **Drizzle ORM** — type-safe ORM
- **Nuxt 4** + **Vue 3** + **Vite** — frontend modern
- **Next.js 15** (App Router) + **Tailwind CSS** — landing & utility apps
- **Supabase** (Postgres + pgvector) — database + auth + RAG
- **PostgreSQL 16** — primary RDBMS
- **OpenRouter API** — multi-LLM orchestration

### 🥉 Specialized Stack (per use case)
- **Python + FastAPI** — AI service (WhisperX, SpeechBrain, YOLOv8, OpenCV, PyTorch, TensorFlow)
- **Firebase Auth** — authentication provider
- **Redis** — cache & session
- **RabbitMQ / Apache Kafka** — message broker
- **Docker + Docker Compose** — containerization
- **AWS (EC2)** — deployment
- **PHP / CodeIgniter 4** — occasional (mydoomscroll)
- **Laravel Filament** — admin panel
- **Kotlin (Jetpack Compose)** — Android learning track (lama, 2024)
- **Flutter** — single experimental project (2024)

### 🛠 Tooling
- **AI Coding Skills**: cc-skills-golang, taste-skills (dipakai end-to-end di Tetra Engine)
- **Adobe After Effects / Premiere / OBS** — content creation (Clipper side hustle)

---

## 4. Repo Paling Keren — Featured Projects

Diurutkan berdasarkan kombinasi: keaktifan, kompleksitas, dan kekuatan storytelling untuk portofolio.

### Tier S — Hero Projects

#### 1. `tetra-engine` ⭐ flagship saat ini
- **Repo**: https://github.com/rayinailham/tetra-engine
- **Apa**: Package recommendation engine untuk operasi gudang **AnterAja**. Sync order dari Flux WMS, hitung carton optimal (volume/weight/per-item fit), push balik ke Flux.
- **Stack**: Go 1.24+, Gin, uber-go/fx, sqlx, PostgreSQL, Vue 3, Vite (glassmorphism dashboard)
- **Kenapa keren**: real-world warehouse system, scheduler 4-stage idempotent, auto-schema migration, full observability, premium monitoring dashboard.
- **Status**: Active (push terakhir Mei 2026)

#### 2. `WIS-futureguide` (org) — Microservice Ecosystem
- **Repo**: https://github.com/WIS-futureguide
- **Apa**: Career guidance platform full microservice (9 services).
- **Services**: ecosystem-futureguide, auth-service, assessment-service, analysis-worker, chat-service, payment-service, admin-service, notification-service, shared
- **Stack**: Go, Clean Architecture, Microservices
- **Kenapa keren**: ekosistem lengkap, semua Go, masih aktif dipush Mei 2026. Ini bukti kemampuan arsitektur skala produk.

#### 3. `Rumi-Talk`
- **Repo**: https://github.com/rayinailham/Rumi-Talk
- **Apa**: AI chat yang merespons sebagai Jalaluddin Rumi pakai RAG dengan Supabase pgvector + TTS audio + streaming LLM.
- **Stack**: Nuxt 4, TypeScript, Supabase pgvector, LLM
- **Kenapa keren**: konsep niche tapi eksekusi modern (RAG + streaming + audio), nuxt 4 fullstack monorepo dengan boundary frontend/backend yang jelas.

### Tier A — Strong Showcases

#### 4. `Clip-Autosubs`
- **Repo**: https://github.com/rayinailham/Clip-Autosubs
- **Apa**: GPU-accelerated "Hormozi-style" dynamic captions. WhisperX transcription dengan word-level timestamps + animated ASS subtitle rendering.
- **Stack**: Python, WhisperX, FastAPI, FFmpeg, CUDA (RTX 3060 6GB int8 quantization)
- **Kenapa keren**: hardware-tuned, end-to-end pipeline upload → transcribe → render.

#### 5. `PetaTalenta` (org)
- **Repo**: https://github.com/PetaTalenta
- **Apa**: Talent management platform, microservice ecosystem (api-gateway, auth, assessment, chatbot, notification, analysis-worker, archive, admin, documentation).
- **Stack**: TypeScript, JavaScript, Node.js
- **Kenapa keren**: ekosistem TS pertama yang nge-prove konsistensi pola microservice di luar Go.

#### 6. `Anevia` ekosistem (Capstone — Anevia-Capstone org)
- **Backend**: Node.js (Hapi.js) + PostgreSQL + Firebase + Google Gemini
- **AI Model**: Python FastAPI + TensorFlow + YOLOv8 + OpenCV — dual-model anemia detection dari conjunctiva mata
- **Kenapa keren**: healthcare AI, two-step model pipeline, full-stack capstone.

#### 7. `mydoomscroll`
- **Repo**: https://github.com/rayinailham/mydoomscroll
- **Apa**: Community vertical-video feed (YouTube Shorts-style) dengan autoplay, auto-scroll setelah 2x replay, category filtering, OLED dark mode + glassmorphism.
- **Stack**: PHP, CodeIgniter 4.7, MySQL, YouTube IFrame API
- **Kenapa keren**: bukti versatility — bisa keluar dari comfort zone Go/TS dan tetap menghasilkan UX premium.

### Tier B — Supporting Projects

| Project | Apa | Stack |
|---|---|---|
| `WIS-pptgenerator` | AI PPT generator + Xendit payment, microservice | TS + Python + Xendit |
| `prodiplan` | Education grading platform microservice (session, grading, admin, auth) | TS + Bun + Hono |
| `micro-chatbot` | Production-ready chatbot microservice boilerplate | Bun + ElysiaJS + PostgreSQL + OpenRouter |
| `micro-auth` | Microservice auth boilerplate | Bun + Hono + Firebase + Zod |
| `vocal-trainer` | Real-time pitch detection + vocal range analysis | Next.js 15 + Meyda.js + Web Audio API |
| `python-network` | Serverless P2P LAN chat (TCP/UDP, encrypted SQLite, native notif) | Python + Tkinter |
| `av-frontend` (AureaVoice) | English accent training SPA, MVP architecture, View Transitions API | Vanilla JS + Vite + IndexedDB |
| `ldtp-media` | Travel story SPA dengan interactive map | Vanilla JS + MapTiler + Leaflet + Vite |
| `rayin-translation` | Novel translation reading site | Vue + Vite + Supabase |
| `image-griddy` / `image-grid` / `image-pixel` | Image utility tools | Next.js + TS |
| `steganography` | Image steganography tool | Next.js + TS |

---

## 5. Activity Snapshot

- **Push activity**: sangat aktif Mei 2026 (Tetra Engine + WIS-futureguide ecosystem 9 services).
- **Pattern**: rilis project baru tiap 2–4 minggu, banyak yang fully-shipped (README rapi, README + docs/ folder).
- **Konsistensi**: dari 2024 (Kotlin/Flutter belajar Android) → 2025 (capstone Anevia, microservice eksperimen) → 2026 (Go-first + microservice ecosystem matang).

---

## 6. Narrative Hooks untuk Portfolio

Tiga sudut pandang yang bisa dipakai untuk hero copy:

1. **"From product idea to production microservice ecosystem"** — fokus jurnal end-to-end (Tetra Engine real client AnterAja, FutureGuide 9-service ecosystem).
2. **"Go-first backend engineer who also ships AI"** — kombinasi rare: Go clean architecture + AI pipeline (RAG, vision, audio).
3. **"Builder yang multi-stack tapi opinionated"** — punya stack favorit (Go + Bun/Elysia + Nuxt) tapi bisa keluar zona (PHP CodeIgniter, Python ML, Kotlin).

---

## 7. Catatan Personal (boleh masuk easter egg)

- Hololive fan: **Hoshimachi Suisei** + **Isaki Riona** (sudah jelas terlihat dari profile README dengan GIF + badge YouTube). Bisa dipakai sebagai easter egg di footer atau /hidden route.
- Bahasa: Indonesia (native), English (business fluent), Japanese (basic, 日本語).
- "Code better when listening to Hololive streams" — tone of voice yang santai tapi competent.
