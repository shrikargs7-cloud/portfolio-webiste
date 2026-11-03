# 🌐 Shrikar's Interactive Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Site-portfolio--webiste--ruddy.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-webiste-ruddy.vercel.app/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance, visually immersive developer portfolio featuring custom micro-interactions, smooth physics-based scrolling, dynamic letter animations, and interactive project cards.

[Explore Live Demo →](https://portfolio-webiste-ruddy.vercel.app/)

</div>

---

## 🏗️ Architecture & Interaction Flow

```mermaid
graph TD
    User([User Browser]) --> Lenis[Lenis Smooth Scroll Engine]
    Lenis --> ReactRoot[React 18 Component Tree]
    
    subgraph UI Layout & Viewport
        ReactRoot --> Hero[Hero with Dancing Letters & Dynamic Heading]
        ReactRoot --> About[About Me & Technical Arsenal]
        ReactRoot --> Projects[Projects Showcase Modal & Stack Cards]
        ReactRoot --> Achievements[Hackathon Honors & Trophy Showcase]
        ReactRoot --> Contact[Interactive Contact & Social Links]
    end

    subgraph Animation & Motion Engine
        Hero -.-> GSAP[GSAP Micro-Interactions]
        Projects -.-> Framer[Framer Motion Transitions]
        About -.-> Radix[Radix UI Accessible Primitives]
    end

    subgraph Hosting & Delivery
        ReactRoot --> VercelCDN[Vercel Global Edge Network]
    end
```

---

## ✨ Key Features

- **Kinetic Typography**: Custom `dancing-letters` canvas and text physics engine that reacts to cursor position.
- **Lenis Smooth Scrolling**: Decoupled momentum scrolling for 60 FPS buttery-smooth navigation across sections.
- **Interactive Project Modal**: Filterable project showcases with live architecture highlights and demo links.
- **Responsive & Accessible**: Fully responsive grid built with Tailwind CSS and Radix UI accessible headless primitives.
- **Edge Optimized**: Sub-second initial page load with Vite 5 code splitting and asset pre-fetching.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **Smooth Scroll**: [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
# Clone repository
git clone https://github.com/shrikargs7-cloud/portfolio-webiste.git
cd portfolio-webiste

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License © [Shrikar G S](https://github.com/shrikargs7-cloud)
