# Personal Portfolio — 5 Theme Designs

A production-ready Vite + React + Tailwind CSS portfolio with **5 distinct themes** you can switch between instantly.

## Themes Included

| # | Theme | Style |
|---|-------|-------|
| ⚡ | **Cyber** | Dark background, neon green accents, terminal/hacker aesthetic |
| ✦ | **Luxury** | Dark editorial with gold tones, serif typography (Playfair Display + Crimson Pro) |
| ○ | **Minimal** | Clean white/light theme, Syne + DM Sans, card-based layout |
| ■ | **Brutalist** | Bold red & black, Bebas Neue headings, raw graphic energy |
| ◈ | **Aurora** | Deep dark with purple/cyan/pink gradient blobs, glassmorphism cards |

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Personalize your info** in `src/data/portfolio.js`:
   - Your name, title, bio, location
   - Email, phone, all social links
   - Your projects (GitHub URLs + live demo URLs)
   - Skills list

3. **Add your photo** — place `photo.jpg` in the `/public/` folder  
   (or update `PROFILE.photo` to any URL)

4. **Add your resume** — place `resume.pdf` in the `/public/` folder

5. **Run locally:**
   ```bash
   npm run dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   ```

## Features
- ✅ Smooth scroll navigation with active section tracking
- ✅ Scroll progress bar
- ✅ Animated section reveals on scroll
- ✅ WhatsApp & GitHub in top-right of every theme
- ✅ Resume download button
- ✅ Profile photo with fallback initials
- ✅ Project cards with GitHub + Live Demo links
- ✅ Full contact section: Email, Phone, WhatsApp, Telegram, LinkedIn, GitHub, Instagram, X, Facebook
- ✅ Fully responsive (mobile + desktop)
- ✅ **Floating theme switcher** (bottom-right button) — switch all 5 designs live!

## Deploying
Works with Vercel, Netlify, or any static host:
```bash
npm run build
# Deploy the /dist folder
```
