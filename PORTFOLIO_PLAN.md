# v2-porto — Portfolio Plan (Final, Locked)

> Successor of `v1-porto`. Tujuan: portofolio yang mencerminkan posisi sekarang sebagai **Go-first Microservice Architect + AI Engineer**, bukan lagi student/capstone vibe.
>
> Sumber narasi: lihat `about_me.md` di repo ini.
>
> Dokumen ini sudah melewati grilling round 1 + 2. Semua open questions sudah terjawab. Section "Decisions Log" di bawah adalah single source of truth.

---

## 1. Strategic Positioning

### Hero tagline (final, English-first)
> *"Go-first microservice architect shipping AI in production."*

Sub-tagline / supporting line:
> *"Currently building Tetra Engine — a warehouse package recommendation system originally built as AnterAja's technical entrance challenge, now released as a working microservice."*

### Three pillars (5-second readability)
1. **Go-first Backend** — Go 1.24+, clean architecture, uber-go/fx, sqlx, layered config.
2. **Microservice Ecosystem Builder** — multi-service systems with API gateway, message broker, observability.
3. **AI Engineer (Practical)** — RAG (pgvector), LLM orchestration, vision (YOLOv8), audio (WhisperX, SpeechBrain).

### Anti-positioning
- ❌ "Aspiring developer" / "student portfolio" tone
- ❌ Generic full-stack template
- ❌ Skill icon grid 6×4 tanpa konteks
- ❌ AOS scroll generic, cursor trail generic

---

## 2. Target Audience

| Audience | Apa yang dicari | Konten prioritas |
|---|---|---|
| Tech recruiter senior | Bukti delivery, scale, stack relevan | Hero + Featured Work + Stack peek |
| Engineering manager | Arsitektur thinking, code quality | Tetra & FutureGuide deep dive |
| Founder / klien | Bisa bikin produk end-to-end | Real-world impact (Tetra) + AI showcases |
| Sesama dev | Personality + taste | Footer one-liner + konami easter egg + /sui |

---

## 3. Site Map (final)

```
/                  Home (hero, currently building, pillars, featured, stack peek, activity, closing CTA)
/work              Project index (filterable: all / go / ai / microservice / fullstack)
/work/[slug]       Case study per project
/about             Long-form about (career arc 2024 → 2026)
/stack             Opinionated stack page (kategori + alasan)
/uses              Daily tools, editor setup, AI skills
/contact           Email, LinkedIn, GitHub (no form)
/sui               Hidden Hololive tribute (noindex)
```

**Phase 1 + 2 launch (3 minggu)**: `/`, `/work`, 3 case study (Tetra, FutureGuide, Rumi-Talk), `/about`, `/contact`.
**Phase 3 (post-launch)**: `/stack`, `/uses`, `/sui`, GitHub activity feed, easter egg konami code.

---

## 4. Section Plan — Home Page

Order (AIDA-like):

1. **Hero** — typography-led big statement, 1 tagline, 2 CTA (See my work / GitHub).
2. **Currently Building** — strip 1 baris: live signal Tetra Engine.
3. **Three Pillars** — 3 kartu (Microservice / AI / Go Backend), 1 contoh project per pillar.
4. **Featured Work** — bento layout 3 large + 3 thumbnail (lihat section 9).
5. **Selected Stack** — opinionated list ("My daily Go stack", "My TS stack", "My AI stack"). No icon grid.
6. **Recent Activity** — feed GitHub commit dari API (Phase 3, server proxy via Cloudflare Worker).
7. **Closing CTA** — "Hireable. Let's talk." + email + LinkedIn.

### Texture mapping per section (locked)

| Section | Texture | Detail |
|---|---|---|
| Hero | Grid SVG + 2 blob lights | Grid 3% opacity, blob 400px blur (warm + accent), low-key parallax |
| Currently Building | None | Clean strip, beat sebelum pillars |
| Three Pillars | Dots radial pada card BG | 4% opacity, hanya di dalam card |
| Featured Work | Per-card blob corner | 1 blob kecil di setiap large card, gak di section level |
| Selected Stack | Halftone edge top | Fade transition dari section sebelumnya |
| Recent Activity | Grid 2% opacity | Mood data feed, monospace |
| Closing CTA | 1 large blob + grid corner | Final visual punch, accent warm |
| Footer | None | Quiet |

**Disiplin**: maksimum 1 texture per section, blob lights hanya di hero & closing. Tidak boleh layer dots+grid+blob bareng.

---

## 5. Case Study Template (per project)

Wajib untuk Tier S projects (Tetra, FutureGuide, Rumi-Talk).

```
1. Problem statement      — 1 paragraf, konteks bisnis/use case
2. Role                   — apa yang dikerjakan
3. Architecture diagram   — Mermaid runtime render
4. Tech decisions         — kenapa pilih Go + fx, kenapa pgvector dst
5. Key challenges         — minimum 2 challenge + solusi
6. Outcome / metric       — angka jika ada (jumlah service, throughput)
7. Code highlights        — 1–2 snippet terbaik dengan link `file:line`
8. Repo + live link
```

---

## 6. Tech Stack — v2-porto Itself (Final)

### Core
- **Vue 3** (Composition API, `<script setup>`)
- **Vite** — bundler
- **vite-ssg** — static prerender per route, SEO + OG share preview
- **TypeScript** — strict mode
- **Tailwind CSS v3** — utility-first
- **Radix Vue** — accessibility primitives (dialog, dropdown, tooltip) di-style sendiri
- **vue-router** — routing

### Motion & Scroll
- **Lenis** — smooth scroll, **desktop only (≥1024px)**, disabled on mobile dan `prefers-reduced-motion`
- **GSAP + ScrollTrigger** — scroll-driven animation, sync dengan Lenis via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(lenis.raf)`

### Content & Diagram
- **Markdown loader** (`unplugin-vue-markdown` + `markdown-it`) untuk case study
- **Mermaid runtime** — architecture diagram, theme override agar match dark editorial

### Typography
- **Plus Jakarta Sans** (display, 700/800)
- **Inter** (body, 400/500)
- **JetBrains Mono** (code, micro-detail)
- Loaded via `@fontsource-variable` dengan `font-display: swap` + preload subset.

### Icons
- **Lucide Vue** — clean, konsisten

### Hosting & Domain
- **Vercel** (default), Netlify sebagai fallback
- Domain: **`rayinailham.dev`**

### Tooling
- ESLint + Prettier
- `vite-plugin-inspect` untuk debug build

---

## 7. Design Direction

### Mood
**Premium dark editorial**, restrained tapi punya warmth. Referensi: vercel.com, linear.app, planetscale.com.

### Palette (locked)
```
--bg-base       : #0a0a0b   (near-black)
--bg-elevated   : #111114
--border        : #1f1f23
--text-primary  : #f5f5f7
--text-muted    : #8a8a93
--accent-primary: #0066ff   (signature blue, dipakai di profile typing SVG)
--accent-warm   : #ff6b35   (warm accent, dipakai di hero blob & CTA hover)
--success       : #10b981
```
> Note: `--accent-warm` adalah brand accent, bukan referensi Hololive Suisei (Suisei = teal). Hololive nuance hanya muncul di easter egg.

### Typography scale (proposed, akan di-tune)
```
display-xl : 88px / 0.95 lh / -0.04em   (hero)
display-lg : 64px / 1     / -0.03em
display-md : 48px / 1.05  / -0.02em
heading-lg : 32px / 1.1
heading-md : 24px / 1.2
body-lg    : 18px / 1.6
body-md    : 16px / 1.6
mono-sm    : 14px / 1.5  (chips, micro-detail)
```

### Layout principles
- **Asymmetric grid**, bukan card grid 3-kolom standar
- **Generous whitespace** — minimum 120px section padding desktop, 80px mobile
- **Bento featured work** — 3 large dengan ukuran variatif + 3 thumbnail kompak
- **Inline mono chips** — `Go`, `Vue 3`, `pgvector` sebagai pill mono
- **No stock illustrations** — screenshot real project, custom diagram, typography-led hero
- **No profile photo** — hero pakai big typography statement

### Motion rules
- GSAP scroll reveal: fade up + stagger, durasi 0.6–0.8s, ease `power3.out`
- Pinned hero scroll untuk Tier-S case study (ala apple.com product page)
- **Hindari** parallax berlebihan, cursor trail generic, mouse-follow effect
- Respect `prefers-reduced-motion` → matikan Lenis + skip semua reveal animation
- Lenis di mobile **disabled** (touch native iOS/Android)

### Easter Egg (full playful, disiplin)
- **Konami code** (`↑↑↓↓←→←→BA`) → overlay Suisei + Riona, 3-detik auto fade-out, tombol dismiss, **trigger sekali per session** (sessionStorage flag)
- **Hidden `/sui` route** → tribute page minimal (BG dark navy + 1 image + quote), `<meta name="robots" content="noindex">`
- **Footer one-liner**: *"🎵 Coded with Hololive on loop"*
- ❌ **Skip** cursor trail Suisei/Riona (terlalu generik)

---

## 8. Content Production Order (3 minggu)

### Week 1 — Foundation & Home
- Setup Vue + Vite + vite-ssg + Tailwind + TypeScript
- Adopt design system (palette, typography scale, base components button/chip/card)
- Texture utility (grid SVG, dots, halftone, blob light)
- Lenis + GSAP setup dengan reduced-motion guard
- Hero, Currently Building, Three Pillars, Selected Stack, Closing CTA

### Week 2 — Featured Work + Case Study Tetra
- Bento Featured Work (3 large + 3 thumbnail)
- Case study template + Mermaid theme override
- **Tetra Engine** full case study (problem → AnterAja entrance challenge → arsitektur → outcome)
- `/work` index dengan filter tag

### Week 3 — Case Study FutureGuide + Rumi-Talk + Polish
- **FutureGuide** case study + arsitektur diagram 9 services
- **Rumi-Talk** case study + demo embed (iframe / video loop)
- `/about` long-form
- `/contact` (links only, no form)
- Easter egg konami + `/sui`
- Lighthouse audit + fix
- Deploy ke Vercel + connect `rayinailham.dev`

### Post-launch (Phase 3, optional)
- GitHub recent activity feed (Cloudflare Worker proxy)
- `/stack` + `/uses`
- Blog/notes (kalau mau menulis technical writing)

---

## 9. Featured Project Layout — Home

Bento 3 large + 3 thumbnail:

```
┌──────────────────────────────┬─────────────────────┐
│  Tetra Engine     (large)    │  FutureGuide (tall) │
│  span 2 cols                 │  Microservice       │
│  Go + Microservice           │  ecosystem          │
├──────────────────────────────┤                     │
│  Rumi-Talk        (large)    │                     │
│  AI + RAG + Nuxt 4           │                     │
└──────────────────────────────┴─────────────────────┘
┌──────────┬──────────┬──────────────────────────────┐
│ Anevia   │ Clip-    │ mydoomscroll                 │
│ AI Vision│ Autosubs │ Fullstack craftsmanship      │
└──────────┴──────────┴──────────────────────────────┘
```

3 large = visual heavy (screenshot/diagram + 2-line summary).
3 thumbnail = title + 1-line + tag chips only.

Sisanya (PetaTalenta, prodiplan, WIS-pptgenerator, micro-auth, micro-chatbot, vocal-trainer, dst.) masuk di `/work` index dengan tag, bukan di home.

---

## 10. Don't List (anti-pattern dari v1-porto)

- ❌ Generic "Hi I'm X, a passionate developer" hero
- ❌ Skill icon grid 6×4 tanpa konteks
- ❌ Image trail mouse effect
- ❌ Tab project list "All / Web / Mobile" tanpa filter useful
- ❌ Long bio paragraph "I love coding since SMA"
- ❌ Testimonial palsu / lorem ipsum
- ❌ Dark mode toggle dengan FOUC
- ❌ Cards-inside-cards-inside-cards
- ❌ Layer dots+grid+blob bareng dalam satu section
- ❌ Lenis di mobile

---

## 11. Success Metrics

- ✅ Recruiter bisa identifikasi **role utama** dalam 5 detik
- ✅ Tetra Engine case study menjelaskan **arsitektur** dalam 90 detik baca
- ✅ Lighthouse home: 95+ semua metric (perf, a11y, SEO, best practice)
- ✅ Mobile-first responsive (375px → 1920px)
- ✅ FCP < 1.2s di 4G
- ✅ Total JS bundle < 200kb gzipped untuk home
- ✅ vite-ssg prerender semua route → OG image working di share preview

---

## 12. Decisions Log (Locked)

| # | Decision | Value |
|---|---|---|
| 1 | Stack inti | Vue 3 + Vite + vite-ssg + TypeScript + Tailwind |
| 2 | Components | Full custom (Tailwind + Radix Vue primitives) |
| 3 | Smooth scroll | Lenis, **desktop only** (≥1024px), reduced-motion respected |
| 4 | Animation | GSAP + ScrollTrigger, sync dengan Lenis |
| 5 | Texture | Grid + Dots + Halftone + Blob light, mapping per-section locked (section 4) |
| 6 | Theme | Dark only, palette locked (section 7) |
| 7 | Diagram | Mermaid runtime |
| 8 | Featured Work | 3 hero (Tetra/FutureGuide/Rumi-Talk) + 3 thumbnail (Anevia/Clip-Autosubs/mydoomscroll) |
| 9 | Tetra framing | "AnterAja technical entrance challenge, allowed to publish" — full nama, no anonymize |
| 10 | Bahasa konten | English-first |
| 11 | Easter egg | Konami code overlay (1x/session, auto fade 3s) + `/sui` hidden + footer one-liner. No cursor trail. |
| 12 | Contact | Links only (mailto + LinkedIn + GitHub). No form. |
| 13 | Resume | **Skip** — LinkedIn + GitHub sebagai resume hidup. |
| 14 | Foto profile | Skip — typography-led hero. |
| 15 | Domain | `rayinailham.dev` |
| 16 | Hosting | Vercel (Netlify fallback) |
| 17 | Launch target | ~3 minggu dari mulai dev (target ~9 Juni 2026) |
| 18 | Scope launch | Phase 1 + 2 sekaligus (home + work index + 3 case study + about + contact) |
| 19 | GitHub feed | Phase 3 post-launch, via Cloudflare Worker |
| 20 | Tone of voice | Professional but warm, no "passionate developer" cliché |

---

## 13. Implementation Notes (untuk dev)

### Lenis + GSAP integration pattern
```ts
// src/composables/useSmoothScroll.ts
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  if (window.innerWidth < 1024) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}
```

### Texture utility component
- `<TextureGrid opacity="0.03" />` — inline SVG, full absolute layer
- `<TextureDots opacity="0.04" />` — radial-gradient
- `<TextureHalftone position="top" />` — SVG mask gradient
- `<BlobLight color="warm" size="400" x="20%" y="30%" />` — radial-gradient blur

### vite-ssg prerender
- Generate route list dari `/work/*` glob saat build
- Set `<head>` per route untuk OG image (use `@vueuse/head` atau bawaan vite-ssg)

### Mermaid theme override
```ts
mermaid.initialize({
  theme: 'base',
  themeVariables: {
    primaryColor: '#111114',
    primaryTextColor: '#f5f5f7',
    primaryBorderColor: '#1f1f23',
    lineColor: '#8a8a93',
    fontFamily: 'JetBrains Mono, monospace',
  },
})
```

---

## 14. Definition of Done (per page)

**Home**
- [ ] Hero render < 1s, FCP < 1.2s
- [ ] Lenis smooth aktif desktop, native mobile
- [ ] Texture mapping sesuai section 4 table
- [ ] Featured Work bento responsive (1 col mobile, 2 col tablet, full bento desktop)
- [ ] Closing CTA dengan blob + grid corner

**Case study (Tetra/FutureGuide/Rumi-Talk)**
- [ ] Mermaid diagram render dengan dark theme
- [ ] Code snippet dengan link `file:line`
- [ ] Pinned hero scroll (desktop)
- [ ] Reading time estimate

**Global**
- [ ] Konami code easter egg working (sessionStorage 1x)
- [ ] `/sui` route accessible, noindex
- [ ] Footer one-liner present
- [ ] Lighthouse 95+ semua metric
- [ ] No FOUC, no layout shift

---

> Plan ini final. Mulai eksekusi → Week 1 setup foundation.
