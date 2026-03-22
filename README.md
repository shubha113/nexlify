# 🚀 Nexlify — Digital Studio Portfolio Website

A bold, futuristic portfolio website for Nexlify — a 3-person digital studio offering Web, Mobile, and AI solutions.

## ✨ Features
- **Custom cursor** with smooth ring animation
- **Animated hero** with floating cards, background blobs & grid
- **Services section** with hover effects
- **Portfolio/Work** with filter by category (Web / Mobile / AI)
- **Team section** with 3 member cards + process steps
- **Marquee ticker** strip
- **AI Assistant** powered by Google Gemini (chatbot)
- **Contact form** with success state
- **Footer** with links and socials
- Scroll-triggered **fade-in animations** throughout
- **CSS3 external stylesheets** for every section
- Fully **responsive** on all devices

## 🛠️ Tech Stack
- **React + Vite**
- **External CSS3** (one file per section)
- **Google Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono
- **Gemini API** for the AI assistant chatbot

## 🚦 Getting Started

```bash
npm install
npm run dev
```

## 🤖 Setting Up Gemini AI

1. Get a free API key from: https://makersuite.google.com/app/apikey
2. Open `src/components/AIAssistant.jsx`
3. Replace the `GEMINI_API_KEY` value with your actual key:
   ```js
   const GEMINI_API_KEY = 'YOUR_ACTUAL_KEY_HERE';
   ```

## 🎨 Customisation

### Change Team Members
Edit `src/components/Team.jsx` → update the `members` array with real names, bios, and skills.

### Change Projects
Edit `src/components/Work.jsx` → update the `projects` array with your real projects.

### Change Colors
Edit `src/styles/global.css` → update the CSS variables in `:root {}`.

### Change Company Name
Search & replace `Nexlify` across all files with your preferred name.

## 📦 Build for Production
```bash
npm run build
```
Output will be in `/dist` — ready to deploy on Vercel, Netlify, or any static host.
