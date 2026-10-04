# 🎓 AKTU Connect (Student Academic Portal)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-emerald?style=for-the-badge&logo=vercel)](https://aktu-connect.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20JS%20%7C%20Gemini_AI-1b4332?style=for-the-badge)]()
[![AKTU Curriculum](https://img.shields.io/badge/Curriculum-AKTU_Sem_1--8-amber?style=for-the-badge)](https://aktu.ac.in)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)]()

> **AKTU Connect** is a centralized, gamified, and AI-powered academic platform custom-tailored for engineering students affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU). From comprehensive unit-wise notes to real-time Gemini AI tutoring and exam simulations, AKTU Connect transforms semester preparation into an interactive, structured experience.

---

## 🌟 Key Features

### 📖 1. Study Hub & Syllabus Tracker
- **Complete Academic Matrix:** Covers **Semesters 1 through 8** across 5 core engineering streams (`CSE`, `CSE AI & ML`, `AIDS`, `IT`, `ECE`).
- **Interactive Unit Progress:** Visual progress rings and dynamic indicators tracking 5 units per subject.
- **Curated Learning Resources:** Instant one-click links to verified syllabus summaries and curated video lectures.
- **Real-Time XP Rewards:** Complete units to earn `+20 XP` with synchronized local persistence.

### 📄 2. PYQ Trend & Repetition Analyser
- **Predictive Frequency Engine:** Analyzes past university question papers (2021–2024 sessions) to identify recurring 7-mark and 10-mark questions.
- **High-Yield Tags:** Real-time probability ratings (e.g., *95% Probable*, *Repeated 4 Times*).
- **Direct AI Integration:** Instant "Ask Zen to Solve" redirects questions directly to the tutor for structured solutions.

### 🎯 3. Exam Arena & Dynamic Practice Quests
- **Powered by Gemini Flash AI:** Generates real-time, context-aware Section-A MCQs (2 Marks) and Section-B/C Subjective questions (7 Marks) for any selected subject & unit.
- **Dynamic Asynchronous Fallback Pool:** Resilient question banks ensuring zero screen downtime during network latency.
- **Gamified XP Scoring:** Instant feedback evaluation awarding `+10 XP` on correct attempts.

### 🏆 4. University Leaderboard
- **Olympic-Style Podium:** Responsive, elevated podium highlighting top student performers.
- **Live XP Benchmarks:** Real-time synchronization of student XP ranks against peer benchmarks.
- **Adaptive Mobile Layout:** Clean horizontal podium card grid built to prevent unnecessary vertical scrolling on mobile viewports.

### 🤖 5. Zen – AI Academic Mentor
- **Conversational Tutor:** Step-by-step mathematical proofs, derivation breakdowns, and exam presentation hacks.
- **Markdown & Code Rendering:** Formatted response rendering via `marked.js` supporting code blocks, mathematical formulations, and lists.
- **Contextual Suggestions:** Quick-prompt chips for repetitive AKTU high-score concepts (DBMS Normalization, Master Theorem, DAA algorithms).

### 👤 6. Profile & Identity System
- **Custom Avatar Management:** Instant photo uploads (`Base64`) synchronized instantly across navigation bars and dashboard cards.
- **Gamified Badges:** Dynamic milestones (*Bronze*, *Silver*, *Gold*, *Diamond*, *Conqueror*).
- **Authentication:** Integrated with EmailJS for 6-digit OTP verification and in-browser state handling.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5, JavaScript (ES6+) | Semantic layout and dynamic DOM manipulation |
| **Styling & Design** | Tailwind CSS, Custom CSS3 | Modern responsive design with custom glassmorphism and animations |
| **AI Engine** | Google Gemini API (Gemini Flash) | Live question generation and academic query resolution |
| **Authentication & Mail** | EmailJS, Web Storage API | Client-side OTP verification and local state synchronization |
| **Markdown Parsing** | Marked.js | Formatted rendering of AI tutor explanations |
| **Typography** | Plus Jakarta Sans | Modern typography tailored for dashboard interfaces |
| **Deployment** | Vercel | Production-grade hosting and CI/CD pipelines |

---

## 📱 Device Optimization & Architecture

AKTU Connect features strict layout parity between desktop workstations and mobile screens:

- **Desktop Experience:** Expanded two-column dashboard with fixed navigation, persistent sidebar stats, and widescreen curriculum matrices.
- **Mobile Experience:** 
  - Dynamic slide-out navigation drawer with quick-access logout functionality.
  - Whiteboard authentication frame optimized for touchscreens.
  - Single-tier mobile action headers with unified hamburger navigation (`☰`).

---

## 🚀 Getting Started Locally

### Prerequisites
- Modern web browser (Chrome, Edge, Firefox, Brave)
- A local HTTP server (Live Server extension on VS Code or Python HTTP server)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd aktu-connect
   Launch with a local server:

Using Python 3:

Bash
python -m http.server 5500
Using VS Code: Right-click index.html and click "Open with Live Server".

Access the portal:
Open your browser and navigate to:

[http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html)
📂 Project Structure
aktu-connect/
├── index.html          # Authentication portal (Sign In / Sign Up interactive board)
├── study.html          # Study Hub, unit syllabus tracker & lecture links
├── pyq.html            # PYQ Vault & recurring question analyser
├── quest.html          # Exam Arena powered by Gemini AI
├── leaderboard.html    # State-wide university standings & dynamic podium
├── chat.html           # Zen AI Tutor conversational interface
├── profile.html        # Student credentials, custom avatar & achievements
├── nav.js              # Global state manager, avatar synchronizer & mobile drawer
├── style.css           # Global color themes, glassmorphism, responsive media queries
└── study-data.js       # Master academic curriculum database (Sem 1-8)
📄 License
This project is open-source and available under the MIT License.