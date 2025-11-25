# Portfolio Pro // The Interface

A high-performance personal brand platform engineered for the next generation of motorsport and embedded systems.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square) ![Gemini](https://img.shields.io/badge/AI-Gemini%202.5-8E75B2?style=flat-square) ![Status](https://img.shields.io/badge/Status-Nominal-success?style=flat-square)

## 🏎️ Core Directive

This is not a static resume. It is a **digital twin** of my professional capabilities, designed to demonstrate mastery in full-stack engineering, AI integration, and complex system visualization.

It serves a singular purpose: **To bridge the gap between embedded hardware engineering and modern web interactivity.**

## ⚡ System Capabilities

### 1. Neural Interface (J.A.R.V.I.S.)
An integrated LLM agent powered by **Google Gemini 2.5 Flash**.
- **Context-Aware**: Trained on my resume, skills, and specific F1 technical regulations.
- **Function Calling**: Can fetch live F1 standings, compare drivers, or filter my project database in real-time via the chat interface.
- **Local Fallback**: Includes a robust heuristic brain if the API connection is severed.

### 2. F1 Telemetry Hub
A specialized module for motorsport engineering analysis.
- **Aero Visualizer**: Custom HTML5 Canvas wireframe engine for interactive aerodynamic surface inspection.
- **Strategy Engine**: Monte Carlo-inspired logic for race strategy prediction (Tire Degradation vs. Pit Delta).
- **Pit Stop Sim**: React-based reflex testing tool modeled after actual F1 mechanic light systems.

### 3. "Reality Distortion" UI
Apple-inspired aesthetics meet Stark Industries utility.
- **Glassmorphism**: Heavy use of backdrop filters, alpha-blending, and noise textures.
- **Micro-Interactions**: Hover states, magnetic buttons, and scroll-triggered parallax.
- **Bento Grids**: Information density optimized for rapid visual scanning.

### 4. Mission Log (Events)
A dynamic tracking system for professional engagements.
- **Debrief Mode**: Detailed breakdowns of past conferences (SHPE, ALPFA) with key takeaways and strategic stats.
- **Upcoming Intel**: "Digital Ticket" style visuals for future mission objectives.

### 5. Network Synchronization
Background automation that simulates "syncing" with professional networks.
- **3D Digital Pass**: CSS3D transform-based holographic identity card.
- **Visual Feedback**: Matrix decoding effects and biometric scanning animations.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (JIT Mode)
- **AI/ML**: Google GenAI SDK (`@google/genai`)
- **Motion**: CSS3 Animations, Intersection Observer API
- **Visualization**: SVG, HTML5 Canvas

## 🚀 Deployment Sequence

```bash
# Clone the repository
git clone https://github.com/txniii/portfolio-pro.git

# Install dependencies
npm install

# Inject API Key (Required for Neural Interface)
# Create a .env file or export variable
export API_KEY="your_gemini_api_key"

# Ignite
npm run dev
```

## 📂 Architecture

```
src/
├── components/       # React UI Components (Modular & Atomic)
│   ├── F1.tsx        # Telemetry & Simulation Engines
│   ├── Events.tsx    # Conference Logistics & Debriefs
│   ├── Hero.tsx      # Warp Speed Animations
│   └── ...
├── services/         # API Layers
│   └── gemini.ts     # AI Agent Configuration & Tool Definitions
├── constants.ts      # Static Data (The "Hard Drive")
└── types.ts          # TypeScript Interfaces (The "Schema")
```

## 📜 License

Designed & Engineered by **Marco Antonio Bautista**.
Open source for educational purposes.

---
*"Speed has never killed anyone. Suddenly becoming stationary, that's what gets you."* — Jeremy Clarkson