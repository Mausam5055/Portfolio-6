# Mausam’s Lucid Dreams · Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-blueviolet?style=for-the-badge)](https://turbo.build/)

> An award-winning, interactive narrative portfolio built for **Mausam Kar** — Product Designer & Art Director based in Assam, India. Features a single-timeline GSAP ScrollTrigger experience, Lenis smooth scrolling, Web Audio API ambient soundscape, canvas particle simulations, and deep-linked case study presentations.

---

## 🌟 Highlights & Core Experiences

- **Narrative Scroll Engine**: Single continuous timeline controlled via **GSAP ScrollTrigger**, orchestrating multi-layer depth shifts, 3D concentric tunnel dives, custom typography transforms, and an animated highway auto-rickshaw journey.
- **Ambient Soundscape & Equalizer**: Procedural ambient audio synthesizer crafted with the **Web Audio API** and paired with a 4-bar reactive equalizer indicator.
- **Procedural Canvas Dust & Film Grain**: HTML5 2D canvas simulation rendering floating microscopic dust motes combined with an SVG noise texture overlay.
- **Interactive Case Study Modal**: Isolated iframe viewing experiences with deep-linked hash routing (`#work/:slug` and `#resume`), custom loading spinners, and download capabilities.
- **Zero-Scrollbar Layout**: Fluid, distraction-free reading experience with browser scrollbars universally hidden across Chrome, Firefox, Safari, and Edge.
- **Timeline Ruler**: Fixed interactive navigation ruler displaying current chapter position and allowing instant scrub jumps between scenes.

---

## 🚀 Selected Case Studies

| Case Study | Category | Focus |
| :--- | :--- | :--- |
| **upGrad: Three Doors In** | Product & Motion | Interactive web concept exploring degree, certificate, and bootcamp pathways. |
| **upGrad: Design System** | Systems & Architecture | Scalable component system, typography scale, and foundation tokens. |
| **Malayali Kada** | Brand & Full Stack | Artisan regional food store spanning identity, web app, and logistics. |
| **Temple** | Internal Tooling | Real-time operations, inventory, and order fulfillment application. |
| **Corridor TMS** | Enterprise Software | High-density logistics and transport management freight platform. |
| **The Local Project** | Spatial Architecture | Editorial curation and architectural storytelling with fluid media grids. |

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Animation & Motion**:
  - [GSAP 3.12](https://greensock.com/) (ScrollTrigger, TweenLite)
  - [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) (Momentum smooth scroll)
- **Audio Engine**: Custom Web Audio API ambient sound generator with harmonic gain nodes
- **Styling Architecture**: Vanilla CSS with comprehensive CSS custom variables (design tokens, color themes, fluid typography clamps)

---

## 📂 Project Architecture

```
nesilnoble.com/
├── public/
│   ├── audio/              # Soundscape assets and audio loops
│   ├── fonts/              # Custom web fonts (Exposit, Big Shoulders, Bricolage, Jost)
│   ├── resume/             # Downloadable resume documents
│   └── work/               # Standalone interactive case study experiences & media
│       ├── media/          # Case study imagery, photography, and illustrations
│       │   ├── the-local-project/
│       │   ├── malayali-kada/
│       │   ├── temple/
│       │   └── upgrad-design-system/
│       ├── corridor-tms.html
│       ├── malayali-kada.html
│       ├── temple.html
│       ├── the-local-project.html
│       ├── upgrad-design-system.html
│       └── upgrad-three-doors.html
├── src/
│   ├── app/
│   │   ├── globals.css     # Unified design system & responsive layout styling
│   │   ├── layout.tsx      # OpenGraph tags, metadata, and root layout structure
│   │   └── page.tsx        # Single-page narrative orchestration
│   ├── components/
│   │   ├── Background/     # Procedural dust particle canvas & grain overlays
│   │   ├── Header/         # Dynamic brand header, availability badge, sound toggle
│   │   ├── Hero/           # Opening tunnel & woodtype typography marquee
│   │   ├── Modals/         # CaseStudyModal, NoticeModal
│   │   ├── Ruler.tsx       # Timeline scrub ruler
│   │   └── Scenes/         # Modular narrative chapters
│   │       ├── HelloSection.tsx    # "I am Mausam" bold opening
│   │       ├── SystemsSection.tsx  # Product design philosophy
│   │       ├── BeliefsSection.tsx  # "3+ years" core convictions
│   │       ├── BasedSection.tsx    # "Based in Assam" road animation
│   │       ├── WorkSection.tsx     # Horizontal project showcase
│   │       └── AboutSection.tsx    # Background, facts, tools & contact
│   ├── data/
│   │   └── projects.ts     # Case studies catalogue and metadata
│   ├── hooks/
│   │   ├── useAudioController.ts       # Web Audio API ambient sound manager
│   │   └── usePortfolioExperience.ts   # Master GSAP timeline & Lenis sync hook
│   └── types/
│       └── portfolio.ts    # TypeScript interfaces and schema definitions
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- `npm` or `pnpm` / `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mausamkar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live portfolio.

---

## 📦 Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

To run the production server locally:

```bash
npm run start
```

This project is optimized for deployment on [Vercel](https://vercel.com/) or any modern static/hybrid Node.js hosting platform.

---

## 👤 About Mausam Kar

- **Role**: Product Designer & Art Director
- **Accolades**: 5x Hackathon Winner
- **Background**: Ex-Intern at FOSSEE, IIT Bombay
- **Experience**: 3+ years across product strategy, design systems, UI/UX, AI, and creative technology
- **Location**: Assam, India

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
All case study materials, design work, and intellectual property belong to their respective creators.
