# 🧠 HabitOS – Project Task Board
> **Run your life like software.**
> AI-powered habit tracking, analytics, and life intelligence platform.
> 🎬 **Design Goal: Every element breathes. Every scroll tells a story.**

---

## 🗂️ Project Phases Overview

| Phase | Name | Priority |
|-------|------|----------|
| **1** | **Project Setup + Animation System** | 🟢 Start Here |
| **2** | **Landing Page** (full scroll experience) | 🟢 Frontend |
| **3** | **Auth Pages** | 🟢 Frontend |
| **4** | **Dashboard UI** | 🟢 Frontend |
| **5** | **Habits Management UI** | 🟢 Frontend |
| **6** | **Daily Logs UI** | 🟢 Frontend |
| **7** | **Analytics & Reports UI** | 🟢 Frontend |
| **8** | **Heatmap Calendar UI** | 🟢 Frontend |
| **9** | **AI Insights UI** | 🟢 Frontend |
| **10** | **Achievements & Gamification UI** | 🟢 Frontend |
| **11** | **Settings UI** | 🟢 Frontend |
| **12** | **Global Animation Pass & UI Polish** | 🟢 Frontend |
| **13** | **Backend: Project Setup & DB** | 🔵 Backend |
| **14** | **Backend: Authentication API** | 🔵 Backend |
| **15** | **Backend: Habits & Logs API** | 🔵 Backend |
| **16** | **Backend: Analytics API** | 🔵 Backend |
| **17** | **Backend: AI Intelligence API** | 🔵 Backend |
| **18** | **Backend: Email & Automation** | 🔵 Backend |
| **19** | **Frontend ↔ Backend Integration** | 🟡 Integration |
| **20** | **Testing & Deployment** | 🔴 Final |

---z

## 🎬 Animation Philosophy

> Every screen, every component, every interaction must feel **alive**. Animations are not decoration — they are the UX.

### Core Animation Principles
- **Enter animations** – Every page and component animates in (never pops)
- **Scroll-reveal** – Elements appear as the user scrolls down (staggered)
- **Parallax** – Background layers move at different speeds from foreground
- **Micro-interactions** – Every clickable element responds with motion
- **State transitions** – Loading → data, empty → filled, off → on all animate
- **Exit animations** – Modals, toasts, and pages animate out smoothly
- **Spring physics** – Use spring-based easing (not linear) for natural feel
- **Reduced motion** – All animations respect `prefers-reduced-motion`

### Animation Libraries & Tools
| Tool | Use Case |
|------|----------|
| **Framer Motion** | Page transitions, component enter/exit, gesture animations |
| **CSS @keyframes** | Looping animations (flame, pulse, float, glow) |
| **Intersection Observer API** | Scroll-triggered reveals via custom `useScrollReveal` hook |
| **CSS scroll-timeline** | Parallax and scroll-progress-linked animations |
| **canvas-confetti** | Celebration effects (habit completion, badge unlock) |
| **react-spring** | Physics-based toggle, drag, and bounce animations |
| **GSAP (optional)** | Complex timeline animations if needed |

---

## ⚙️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + custom CSS animations
- **Charts:** Recharts (animated draw-on-mount)
- **Animations:** Framer Motion + CSS @keyframes + Intersection Observer + react-spring
- **HTTP Client:** Axios (mocked with static data during frontend phase)
- **Font:** Google Fonts – **Outfit** (headings) + **Inter** (body)

### Backend (Later – Phase 13+)
- **Runtime:** Node.js / Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Scheduler:** node-cron
- **Email:** Nodemailer / SendGrid
- **AI:** OpenAI API (GPT-4o)

---

## 📁 Folder Structure

```
Habit_OS/
├─ client/
│   ├─ app/
│   │   ├─ layout.jsx
│   │   ├─ page.jsx                  # Landing
│   │   ├─ (auth)/login/page.jsx
│   │   ├─ (auth)/register/page.jsx
│   │   ├─ dashboard/page.jsx
│   │   ├─ habits/page.jsx
│   │   ├─ logs/page.jsx
│   │   ├─ analytics/page.jsx
│   │   ├─ heatmap/page.jsx
│   │   ├─ insights/page.jsx
│   │   ├─ achievements/page.jsx
│   │   └─ settings/page.jsx
│   ├─ components/
│   │   ├─ ui/                       # Button, Card, Modal, Input, Badge, Toast
│   │   ├─ layout/                   # Navbar, Sidebar, Footer
│   │   ├─ animations/               # ScrollReveal, ParallaxLayer, CountUp, TypeWriter
│   │   ├─ dashboard/
│   │   ├─ habits/
│   │   ├─ logs/
│   │   ├─ analytics/
│   │   ├─ heatmap/
│   │   ├─ insights/
│   │   └─ settings/
│   ├─ hooks/
│   │   ├─ useScrollReveal.js        # Intersection Observer scroll animation hook
│   │   ├─ useParallax.js            # Parallax offset calculation hook
│   │   ├─ useCountUp.js             # Animated number counter hook
│   │   ├─ useTheme.js
│   │   └─ useMockData.js
│   ├─ lib/
│   │   ├─ mockData.js
│   │   ├─ animations.js             # Framer Motion variants library
│   │   └─ utils.js
│   ├─ styles/
│   │   ├─ globals.css               # CSS variables, dark/light theme
│   │   ├─ animations.css            # @keyframes definitions
│   │   └─ scrollbar.css
│   └─ public/
├─ server/                           # Backend (Phase 13+)
├─ TASK.md
└─ .env.example
```

---

## ✅ PHASE 1 – Project Setup + Animation System

### Next.js & Dependencies
- [x] Initialize: `npx create-next-app@latest client --js --tailwind --app`
- [x] Install: `framer-motion react-spring @react-spring/web canvas-confetti`
- [x] Install: `recharts lucide-react clsx tailwind-merge axios`
- [x] Install: `@radix-ui/react-dialog @radix-ui/react-tooltip` (accessible primitives)

### Tailwind Config
- [x] Extend colors: `primary`, `accent`, `surface`, `glass` palette (HSL-based)
- [x] Extend animations: `float`, `pulse-glow`, `shimmer`, `flicker`
- [x] Add `backgroundImage` gradients: hero-gradient, card-gradient, aurora
- [x] Configure `darkMode: 'class'`

### CSS Animation System (`animations.css`)
- [x] `@keyframes fadeInUp` – translate Y(20px)→0 + opacity 0→1
- [x] `@keyframes fadeInLeft / fadeInRight` – horizontal entry
- [x] `@keyframes slideInScale` – scale(0.95)→1 + opacity 0→1
- [x] `@keyframes float` – subtle Y oscillation (infinite loop, 3s)
- [x] `@keyframes glow` – box-shadow pulse (infinite loop)
- [x] `@keyframes flicker` – flame effect
- [x] `@keyframes shimmer` – skeleton loading gradient sweep
- [x] `@keyframes spin-slow` – 8s full rotation for decorative elements
- [x] `@keyframes aurora` – background color shift (landing hero)
- [x] `@keyframes countUp` – counter roll animation
- [x] `@keyframes morphBlob` – background blob shape morphing
- [x] `@keyframes typewriter` – cursor blink
- [x] `@keyframes progressFill` – width 0% → N%
- [x] `@keyframes ripple` – button click ripple effect

### Framer Motion Variants Library (`lib/animations.js`)
- [x] `fadeInUp` variant (delay configurable)
- [x] `staggerContainer` variant (staggerChildren: 0.1s)
- [x] `scaleIn` variant (scale 0→1 with spring)
- [x] `slideInLeft / slideInRight` variant
- [x] `pageTransition` variant (for AnimatePresence route changes)
- [x] `cardHover` variant (y: -4, shadow increase on hover)
- [x] `buttonTap` variant (scale 0.96 on tap)
- [x] `modalOverlay` variant (fade in backdrop)
- [x] `modalContent` variant (scale + fade in)
- [x] `toastSlide` variant (slide in from right, slide out)

### Custom Hooks
- [x] `useScrollReveal(threshold?)` – returns `ref + isVisible`, triggers Framer entry animation
- [x] `useParallax(speed)` – returns Y offset tied to scroll position via `scroll-timeline`
- [x] `useCountUp(target, duration)` – animates a number from 0 to target when in view
- [x] `useTypewriter(text, speed)` – character-by-character string reveal
- [x] `useStickyHeader()` – tracks scroll Y to add blur/shadow to navbar after 50px

### Theme System
- [x] CSS variables for all colors (dark + light mode)
- [x] Theme context provider + `useTheme` hook
- [x] Theme toggle button with animated sun/moon icon transition
- [x] Persist theme in `localStorage`
- [x] Smooth color transition on theme switch (300ms `transition: background-color, color`)

### Mock Data
- [x] `mockHabits[]` – 8 sample habits with names, colors, icons, streaks
- [x] `mockLogs{}` – 90 days of log entries per habit
- [x] `mockAnalytics{}` – weekly/monthly aggregated stats
- [x] `mockInsights[]` – 5 AI insight messages
- [x] `mockAchievements[]` – 10 badges (mix of locked/unlocked)
- [x] `mockUser{}` – profile data

---

## ✅ PHASE 2 – Landing Page (`/`) – Full Scroll Experience

> **Goal:** A cinematic, immersive scroll journey that converts visitors into users.

### 🔴 Navbar
- [x] Fixed transparent navbar → frosted glass on scroll (transition: `backdrop-blur + bg-opacity`)
- [x] Logo + nav links + CTA button
- [x] Mobile: hamburger → full-screen animated menu (slide + stagger links)
- [x] Active link underline animation (sliding indicator)

### 🟡 Hero Section
- [x] **Full-screen** viewport height section
- [x] **Aurora gradient background** – animated blob mesh (CSS `@keyframes morphBlob`)
- [x] Floating particle dots (CSS + JS, subtle, not distracting)
- [x] **Headline** – Word-by-word `fadeInUp` with stagger (Framer Motion)
- [x] **Subtitle** – Typewriter reveal after headline completes
- [x] **CTA Buttons** – Framer `scaleIn` with stagger delay; hover: lift + glow
- [x] **Dashboard Preview Mockup** – Floating app window image with:
  - `float` CSS animation (gentle up-down)
  - Soft drop shadow that pulses with glow
  - Scroll-linked: gently scales up as user scrolls past hero
- [x] Scroll indicator arrow (bounce animation, fades out on scroll)

### 🟡 Features Section
- [x] Section title: `fadeInUp` on scroll enter
- [x] **6 Feature Cards** in responsive grid:
  - Each card: glassmorphism, icon + title + description
  - Scroll-triggered: `staggerContainer` → cards enter `fadeInUp` one by one
  - Hover: card lifts (`y: -8px`), border glow appears, icon scales up
- [x] Decorative background: large blurred gradient circle (slow rotation)

### 🟡 Stats / Social Proof Section
- [x] Background: dark gradient with subtle dot grid pattern
- [x] **4 stat counters** (e.g., "50K+ users", "2M+ habits") in a row:
  - Triggered on scroll enter: numbers animate from 0 → target (`useCountUp`)
  - Each counter has a glowing accent underline that animates in after count
- [x] Staggered entry: left to right

### 🟡 How It Works Section
- [x] **3 Steps** displayed as vertical timeline on mobile, horizontal on desktop
- [x] Animated connecting line that **draws itself** as user scrolls (SVG stroke-dashoffset)
- [x] Each step icon: `scaleIn` animation as line reaches it
- [x] Step cards: `slideInLeft` for odd, `slideInRight` for even (alternating)

### 🟡 Heatmap Preview Section
- [x] Showcase the heatmap component as a live preview (using mock data)
- [x] Scroll-triggered: heatmap cells animate in row by row (staggered `fadeIn`)
- [x] Section fades in while slightly parallax-shifted from background text

### 🟡 AI Insights Preview Section
- [x] 3 rotating insight cards on an angled plane (CSS `perspective + rotateX`)
- [x] Auto-cycling every 3s with smooth crossfade
- [x] Background: gradient mesh in purple/indigo tones

### 🟡 Testimonials Section
- [x] Infinite auto-scroll marquee (horizontal, no buttons needed)
- [x] Cards: avatar circle + name + quote + rating stars
- [x] On hover: marquee pauses smoothly

### 🟡 CTA / Final Section
- [x] Full-width section with animated gradient background
- [x] Big headline + subtext + button (all animate in on scroll)
- [x] Decorative orbiting rings animation in background

### 🟡 Footer
- [x] Logo + links + socials
- [x] Fade-in on scroll
- [x] Links: hover underline slide-in animation

---

## ✅ PHASE 3 – Auth Pages

### Login (`/login`)
- [x] **Split-screen layout**: Left panel = animated brand visual, Right = form
- [x] Left panel: aurora gradient background + floating HabitOS brand elements + motivational quote cycling
- [x] Form card: glassmorphism with subtle border glow
- [x] **Floating label inputs**: label transitions from inside → above on focus/fill
- [x] Input focus: border color transitions + soft glow
- [x] Password toggle: eye icon fade swaps
- [x] Submit button: hover glow → loading spinner (scale transition) → success checkmark ✓
- [x] Error state: card shake animation + red error messages `fadeInDown`
- [x] Link to register: hover underline animation
- [x] **"Continue with Google" button**:
  - [x] Google branded button (white pill with Google logo + text)
  - [x] Hover: subtle lift + shadow
  - [x] Click: loading shimmer while OAuth redirects
  - [x] Divider: `--- or continue with ---` between social and form
- [ ] Show "Invalid email domain" error if Google account email is rejected

### Register (`/register`)
- [x] Same split-screen layout
- [x] **Multi-step form** (2 steps) with animated step transition:
  - [x] Step 1: Name + Email
  - [x] Step 2: Password + Confirm + Terms
  - [x] Progress bar between steps animates
- [x] **Password strength bar**: width animates 0→100% with color change (red→yellow→green)
- [x] Confetti burst on successful register
- [x] **"Sign up with Google" button** (same styling as login, above the form)
  - [ ] If Google OAuth succeeds: skip password step entirely, jump to profile setup
  - [ ] Show Google avatar + name pre-filled after OAuth

### OAuth Callback Page (`/auth/callback`)
- [x] Full-screen centered loading spinner with brand logo
- [x] Animated status text: "Authenticating with Google..."
- [x] Success: redirect to `/dashboard` with welcome toast
- [x] Error: redirect to `/login` with error message toast

---

## ✅ PHASE 4 – Dashboard UI (`/dashboard`)

### Layout
- [x] **Sidebar** (fixed desktop, drawer mobile):
  - [x] Collapsed state: icon-only with tooltip (width animation)
  - [x] Expanded: icon + label (Framer `AnimatePresence` for label text)
  - [x] Active item: animated background pill that slides to match active route
  - [x] Hover: items scale slightly with color transition
- [x] **Top header**: frosted glass, notification bell with badge pulse animation
- [x] **Page enter**: staggered card grid entrance (all cards `fadeInUp` with 0.1s interval)

### Widget Animations
- [x] **Greeting strip** – typewriter "Good morning, Harshit 👋"
- [x] **Daily Score Ring** – SVG circle stroke-dashoffset animates from 0 to score on mount
- [x] **Streak Flame** – animated `@keyframes flicker` on flame SVG icon; number `countUp`
- [x] **Quick Habit Toggles** – spring bounce on toggle; green glow appears when ON
- [x] **Quote Card** – fade in; refresh icon spins 360° on click → new quote fades in
- [x] **Mini Line Chart** – Recharts `isAnimationActive` draws line on mount
- [x] **Activity Feed** – items slide in from right with stagger (newest first)
- [x] **Mini Heatmap** – cells `fadeIn` left-to-right with stagger

---

## ✅ PHASE 5 – Habits Management UI (`/habits`)

- [x] **Page header**: `fadeInDown`; "New Habit" button pulses gently until first habit created
- [x] **Habit Grid**: cards `fadeInUp` staggered on load
- [x] **Habit Card**:
  - [x] Hover: `y: -6px`, border accent glow, progress bar brightens
  - [x] Color accent bar on left animates in (height 0→100%)
  - [x] Streak number: `countUp` on mount
  - [x] Complete toggle: spring bounce, green ripple effect
- [x] **Create Modal**:
  - [x] Backdrop: `fadeIn` blur overlay
  - [x] Card: `scaleIn` from center
  - [x] Icon picker grid: icons `fadeIn` with stagger
  - [x] Color picker: dots scale up on hover/select with ripple
  - [x] Exit: `scaleOut` + backdrop fades
- [x] **Archive slide-out**: card `slideOutLeft` + shrink to 0 height
- [x] **Delete**: card shake animation → confirmation → `fadeOut + scale(0.8)`
- [x] **Drag reorder**: `react-beautiful-dnd` or Framer drag with drag shadow

---

## ✅ PHASE 6 – Daily Logs UI (`/logs`)

- [x] **Date bar**: slide transition between days (prev slides left, next slides right)
- [x] **Log list**: items `fadeInUp` staggered on date change
- [x] **Boolean toggle**: custom animated switch (pill slides left/right, color morphs)
- [x] **Numeric stepper**: +/- buttons with press-down scale; value flips like a counter
- [x] **Note field**: expands smoothly with `max-height` transition
- [x] **Progress bar**: `progressFill` animates whenever count changes
- [x] **"All Done!" confetti** burst via `canvas-confetti` when all habits logged
- [x] **Auto-save toast**: slides in from bottom-right → "Saved ✓" → slides out after 2s

---

## ✅ PHASE 7 – Analytics & Reports UI (`/analytics`)

- [x] **Tab filter**: animated underline indicator slides between tabs
- [x] **Stat Cards Row**: `staggerContainer` → cards `fadeInUp`; numbers `countUp`
- [x] **Line Chart**: Recharts animated draw + custom dot pulse on hover
- [x] **Bar Chart**: bars grow from bottom on mount (Recharts animation)
- [x] **Donut Chart**: arc animates from 0° to full on mount
- [x] **Streak Timeline**: cells fade in left-to-right with stagger
- [x] **Habit selector dropdown**: animated open/close with `scaleY`
- [x] **CSV Export**: button click → spinner → success icon

---

## ✅ PHASE 8 – Heatmap Calendar UI (`/heatmap`)

- [x] **Grid cells load**: left-to-right, row-by-row `fadeIn` with `staggerChildren`
  - 364 cells total, stagger delay: ~3ms per cell = ~1.1s total entrance
- [x] **Cell hover**: scale(1.3) + tooltip `fadeIn` + glow border
- [x] **Tooltip**: positioned above cell, appears with `scaleIn` from bottom
- [x] **Sidebar panel** (on cell click): slides in from right (`x: 100%` → `x: 0`)
- [x] **Habit filter change**: grid cells cross-fade to new color intensity
- [x] **Year switch**: entire grid slides out left, new year slides in from right
- [x] **Color theme switch**: all cells transition color with `transition: background-color 400ms`

---

## ✅ PHASE 9 – AI Insights UI (`/insights`)

- [x] **Page enter**: section title `fadeInUp` → cards stagger in
- [x] **Insight Cards**: `slideInLeft` with stagger; confidence bar animates `progressFill`
- [x] **Gauge Chart**: needle animates 0 → score on mount (SVG rotation)
- [x] **Skeleton shimmer**: while "loading" state active, cards show animated shimmer
- [x] **Quote refresh**: current quote `fadeOut` → new quote `fadeIn`
- [x] **Suggestion chips**: `scaleIn` with stagger; hover: slight lift + border glow
- [x] **Weekly narrative**: collapsed by default, expand with smooth `max-height` transition

---

## ✅ PHASE 10 – Achievements UI (`/achievements`)

- [x] **Badge grid**: `staggerContainer` → badges `scaleIn` from center
- [x] **Locked badges**: greyscale + `opacity: 0.4` + lock icon overlay
- [x] **Unlocked badges**: full color + glow animation on hover
- [x] **Unlock animation** (triggered on earn): badge glows → burst of particles → pop scale effect
- [x] **Progress bars**: `progressFill` animated on mount
- [x] **Leaderboard**: rows slide in from bottom with stagger; rank numbers count up

---

## ✅ PHASE 11 – Settings UI (`/settings`)

- [x] **Section nav**: animated active indicator slides vertically between sections
- [x] **Toggle switches**: spring-physics pill transition (left↔right, color morphs)
- [x] **Avatar upload**: hover overlay fades in with camera icon
- [x] **Color picker**: circles scale on hover/select + ripple on select
- [x] **Save button**: press-down scale → loading spinner → success checkmark

---

## ✅ PHASE 12 – Global Animation Pass & UI Polish

### 🟣 Scroll Reveal System (All Pages)
- [x] Wrap all section blocks with `<ScrollReveal>` component
- [x] Config options: `direction` (up/left/right), `delay`, `threshold`
- [x] Stagger lists automatically when `stagger` prop passed
- [x] Ensure all analytics cards, insight cards, habit cards use scroll-reveal

### 🟣 Route Transitions (All Pages)
- [x] Wrap `app/layout.js` children with `<AnimatePresence mode="wait">`
- [x] Each page exports `motion.div` with `pageTransition` variant
- [x] Transition: `opacity: 0, y: 10` → `opacity: 1, y: 0` (200ms) → `opacity: 0, y: -10`

### 🟣 Parallax Layers (Landing + Dashboard)
- [x] Hero: background blobs move at 0.3× scroll speed, foreground content at 1×
- [x] Dashboard: background gradient shifts subtly on mouse move (`useMousePosition` hook)

### 🟣 Toast Notification System
- [x] Global toast context (bottom-right stack)
- [x] Variants: success (green), error (red), info (blue), warning (yellow)
- [x] Enter: `slideInRight`; Exit: `slideOutRight + fadeOut`
- [x] Auto-dismiss: 3s with visible countdown progress bar

### 🟣 Loading & Skeleton States
- [x] Global `<Skeleton>` component with shimmer animation
- [x] Skeleton variants: text line, card, chart, heatmap cell
- [x] Apply to all data-dependent components

### 🟣 Performance & Accessibility
- [x] `will-change: transform` on frequently animated elements
- [x] `prefers-reduced-motion` media query → disable all motion, show instant transitions
- [x] Ensure animations don't block main thread (use GPU-composited properties only: `transform`, `opacity`)
- [x] Test on 60fps and 30fps devices

### 🟣 Final Design Audit
- [x] Consistent border radius (`rounded-2xl` for cards, `rounded-full` for pills)
- [x] Shadow scale: `sm / md / lg / glow` — applied consistently
- [x] Spacing audit (8px base grid)
- [x] Font scale: Display / H1 / H2 / H3 / Body / Caption
- [x] All interactive elements have `:focus-visible` ring
- [x] Custom scrollbar: thin, accent-colored, both light + dark modes
- [x] Responsive: 375px / 768px / 1024px / 1280px / 1920px

---

## 🔵 PHASE 13 – Backend: Project Setup, Architecture & Database

### 13.1 Server Initialization
- [x] Initialize Node.js + JavaScript project in `server/`
- [x] Install core: `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `compression`, `morgan`
- [x] Install dev: `nodemon`, `eslint`, `jest`, `supertest`
- [x] Install validation: `zod`, `express-validator`, `xss-clean`, `express-mongo-sanitize`
- [x] Configure `jsconfig.json` (strict mode, paths, outDir: `dist/`)
- [x] `src/index.js` – server listen + graceful shutdown on `SIGTERM`
- [x] `src/app.js` – Express app factory (middleware + routes assembled here)

### 13.2 Backend Folder Structure
```
server/src/
├─ config/
│   ├─ db.js               # MongoDB connect with retry + exponential backoff
│   ├─ env.js              # Zod-validated env schema (crash if missing vars)
│   └─ constants.js        # JWT expiries, rate limits, score weights
├─ models/                 # Mongoose schemas + TS interfaces
├─ routes/                 # Express routers (one per resource)
├─ controllers/            # Thin handlers → delegate to services
├─ services/               # Business logic (habits, streak, score, ai, email)
├─ middleware/             # auth, validate, errorHandler, rateLimiter, requestId
├─ utils/
│   ├─ ApiResponse.js      # Standard success envelope
│   ├─ ApiError.js         # Structured error class
│   ├─ asyncHandler.js     # Eliminates try/catch boilerplate
│   ├─ logger.js           # Winston (console + file, levels)
│   └─ paginate.js         # Offset + cursor pagination helper
├─ jobs/                   # node-cron scheduled jobs
├─ emails/                 # Templates + sender service
└─ types/                  # Shared TS types/interfaces
```

### 13.3 Middleware Stack (in order)
- [x] `requestId` – attach `x-request-id` UUID to each request (for tracing)
- [x] `helmet()` – secure HTTP headers (CSP, HSTS, X-Frame-Options)
- [x] `cors()` – whitelist `CLIENT_URL` (dev + prod)
- [x] `compression()` – gzip all responses
- [x] `express-mongo-sanitize()` – strip `$` and `.` from inputs (NoSQL injection)
- [x] `xss-clean()` – sanitize HTML/script from string fields
- [x] `morgan` – HTTP logger (colorized in dev, JSON in prod)
- [x] `express.json({ limit: '10kb' })` – body size cap
- [x] `rateLimiter` – global 200 req / 15min window per IP
- [x] Global `errorHandler` middleware (catches all `next(err)` calls)
- [x] `notFound` catch-all (404 with `ApiError`)

### 13.4 Utility Classes & Helpers
- [x] `ApiResponse` class – `{ success: true, data, message, pagination? }`
- [x] `ApiError` class – `statusCode`, `message`, `errors[]`, `isOperational`, `stack`
- [x] `asyncHandler(fn)` – wraps async controller, forwards errors to `next(err)`
- [x] `logger` – Winston with daily rotate file transport; levels: error/warn/info/http/debug
- [x] `paginate(model, query, options)` – returns `{ data, total, page, totalPages, hasNext }`

### 13.5 Environment Validation (Zod)
- [x] Required: `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `PORT`, `CLIENT_URL`
- [x] Required: `OPENAI_API_KEY`, `SENDGRID_API_KEY`, `EMAIL_FROM`
- [x] Optional: `REDIS_URL` (for future caching), `LOG_LEVEL`, `AI_ENABLED`
- [x] Server crashes on startup with descriptive message if any required var missing

### 13.6 MongoDB Schemas & Indexes

#### `User`
```
_id, name, email (unique), passwordHash, avatar?, timezone (default: 'UTC'),
role ('user'|'admin'), isVerified, verificationToken?, passwordResetToken?,
passwordResetExpires?, preferences: { theme, accentColor, weekStartDay },
createdAt, updatedAt
```
- [x] Pre-save hook: bcrypt hash password (cost: 12) if modified
- [x] Instance method: `comparePassword(plain) → boolean`
- [x] Index: `email` (unique)

#### `Habit`
```
_id, userId (ref: User), name, description?, icon (emoji), color (hex),
type ('boolean'|'numeric'), unit?, goal?, goalPeriod ('daily'|'weekly'|'monthly'),
tags[], archived (bool, default: false), order (number),
frequency ('daily'|'weekly'|'custom'), frequencyDays? (0-6[]),
createdAt, updatedAt
```
- [x] Index: `{ userId, archived }`, `{ userId, order }`
- [x] Validation: `name` max 100 chars, `color` valid hex regex

#### `Log`
```
_id, userId (ref: User), habitId (ref: Habit),
date (Date stored as UTC midnight), value (Mixed: bool|number),
note (string, max 500 chars), createdAt, updatedAt
```
- [x] Compound unique index: `{ userId, habitId, date }` (one log per habit per day)
- [x] Index: `{ userId, date }` (dashboard), `{ habitId, date }` (analytics)

#### `Mood`
```
_id, userId, date, score (1-10), emoji, note (max 300 chars), createdAt
```
- [x] Compound unique index: `{ userId, date }`

#### `Achievement`
```
_id, userId, type (enum: badge key strings), earnedAt, metadata?
```
- [x] Compound unique index: `{ userId, type }`

#### `RefreshToken`
```
_id, userId, tokenHash (SHA-256), expiresAt, createdAt
```
- [x] TTL index on `expiresAt` (MongoDB auto-deletes expired docs)

#### `EmailSettings`
```
_id, userId (unique), enabled, dailySummaryEnabled, dailySummaryTime ('HH:MM'),
weeklyReportEnabled, weeklyReportDay (0-6), streakReminderEnabled,
motivationalQuoteEnabled, missedHabitAlertEnabled, timezone, lastEmailSentAt
```

#### `AiCache`
```
_id, userId, type ('insight'|'quote'|'suggestion'|'summary'|'predict'),
promptHash (MD5), response (string), expiresAt, createdAt
```
- [x] TTL index on `expiresAt` (24h auto-expiry)

### 13.7 Database Seed Script
- [x] `npm run seed` – populates dev DB with 1 test user + 8 habits + 90 days of logs

---

## 🔵 PHASE 14 – Backend: Authentication, Google OAuth & Security

### 14.1 Google OAuth Setup

#### Google Cloud Console Configuration
- [ ] Create project in [Google Cloud Console](https://console.cloud.google.com)
- [ ] Enable **Google OAuth 2.0 API** + **Google People API**
- [ ] Create OAuth 2.0 credentials (Web Application type)
- [ ] Add Authorized Redirect URIs:
  - Dev: `http://localhost:5000/api/auth/google/callback`
  - Prod: `https://yourdomain.com/api/auth/google/callback`
- [ ] Add env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

#### Passport.js Google Strategy (`services/googleAuth.service.js`)
- [ ] Install: `passport`, `passport-google-oauth20`, `passport-local`
- [ ] Initialize `passport.use(new GoogleStrategy({ clientID, clientSecret, callbackURL }, verify))`
- [ ] **Verify callback logic**:
  1. Extract `profile.emails[0].value` (verified email from Google)
  2. **Email domain validation** – check if domain is in allowed list (or all domains if open)
  3. If user exists with this email → link Google account (`googleId`) to existing user
  4. If new user → create `User` doc with `googleId`, name from `profile.displayName`, avatar from `profile.photos[0].value`, `isVerified: true` (Google already verified)
  5. Create `EmailSettings` doc for new OAuth users
  6. Send welcome email for brand-new users

#### Email Domain Validation (Optional Allowlist)
- [x] `ALLOWED_EMAIL_DOMAINS` env var (comma-separated, e.g., `gmail.com,company.com`, or `*` for all)
- [ ] If domain not in allowlist → reject with friendly error message
- [ ] Reject disposable email domains (optional: use `disposable-email-domains` npm package)

#### Google OAuth Routes
- [ ] `GET /api/auth/google` – initiates OAuth flow
  - Passport redirect to Google with scopes: `profile`, `email`
  - Set `prompt=select_account` so user can choose Google account
- [ ] `GET /api/auth/google/callback` – handles Google redirect back
  - On success: generate JWT pair → redirect to `CLIENT_URL/auth/callback?token=<accessToken>`
  - On failure: redirect to `CLIENT_URL/login?error=oauth_failed`
- [ ] `GET /api/auth/google/disconnect` – remove `googleId` from user (only if password exists as fallback)

#### Updated User Schema (add OAuth fields)
- [x] Add `googleId` (string, optional, sparse unique index)
- [x] Add `authProvider` enum: `'local' | 'google' | 'both'`
- [x] `passwordHash` now optional (Google-only users have no password)
- [x] `isVerified: true` auto-set for all Google OAuth users
- [x] `avatar` auto-populated from Google profile photo

### 14.2 Standard Auth Endpoints

#### `POST /api/auth/register`
- [x] Block if email already registered via Google OAuth (return 409 with "Use Google Sign-In")
- [x] Validate: name (3-50 chars), email (valid format), password (8+ chars, 1 uppercase, 1 number)
- [x] Check email uniqueness (return 409 if taken)
- [x] Hash password (`bcrypt`, cost 12)
- [x] Create `User` + `EmailSettings` documents atomically
- [x] Generate access token (JWT, 15min) + refresh token (JWT, 30d)
- [x] Store hashed refresh token in `RefreshToken` collection
- [ ] Send welcome email (async, non-blocking)
- [x] Return: `{ user, accessToken }` + set `refreshToken` httpOnly cookie

#### `POST /api/auth/login`
- [ ] Rate limit: 10 attempts / 15min per IP + per email address (separate counters)
- [ ] Account lockout: after 10 failed → lock 15min, return 423 with unlock time
- [x] If user has `authProvider: 'google'` and no password → return 400 "Please use Google Sign-In"
- [x] Find user, run `comparePassword()`, return 401 on mismatch (generic message)
- [x] Generate + store new token pair
- [x] Return: `{ user, accessToken }` + set cookie

#### `POST /api/auth/refresh`
- [x] Read refresh token from httpOnly cookie
- [x] Hash it, find matching `RefreshToken` doc (check not expired)
- [x] Delete old token + generate new pair (token rotation)
- [x] Return new `accessToken` + set new cookie

#### `POST /api/auth/logout`
- [x] Delete `RefreshToken` document from DB
- [x] Clear `refreshToken` cookie
- [x] Return 200

#### `GET /api/auth/me`
- [x] Requires `authenticate` middleware
- [x] Return user object (omit `passwordHash`, tokens)
- [x] Include `authProvider` so frontend knows to hide "Change Password" for Google users

#### `PUT /api/auth/profile`
- [x] Update: name, avatar URL, timezone, preferences
- [x] Validate each field individually

#### `PUT /api/auth/change-password`
- [x] Block if `authProvider === 'google'` (no password to change)
- [x] Verify current password with `comparePassword()`
- [x] Validate new password strength
- [x] Hash + save new password, set `authProvider: 'both'`
- [x] Invalidate ALL existing refresh tokens for user

#### `POST /api/auth/forgot-password`
- [x] If email belongs to Google-only user → respond with "Please use Google Sign-In" (don't send reset email)
- [x] Otherwise: generate signed reset token, store hash + 1h expiry, send email

#### `POST /api/auth/reset-password`
- [x] Verify token hash + expiry
- [x] Hash new password + save
- [x] Clear `passwordResetToken` + `passwordResetExpires`
- [x] Invalidate all refresh tokens

### 14.3 Auth Middleware
- [x] `authenticate` – verify access JWT, attach `req.user`, return 401 if invalid/expired
- [x] `optionalAuth` – attach user if token valid, silently skip if absent
- [x] `authorize(roles[])` – check `req.user.role`, return 403 if unauthorized
- [x] `rateLimiter(max, windowMs)` – configurable per-route rate limiter factory

### 14.4 Security Hardening
- [x] Access token: **15 min** expiry (short-lived, refresh silently)
- [x] Refresh token: **30 days** expiry, httpOnly + secure + sameSite=strict cookie
- [x] Refresh token rotation: old invalidated on every use
- [x] HTTPS-only cookie in production (`secure: process.env.NODE_ENV === 'production'`)
- [x] Input sanitization applied globally before all routes
- [x] SQL/NoSQL injection prevention via `express-mongo-sanitize`
- [ ] CSRF protection for OAuth state parameter (`state` param in Google redirect)
- [ ] Google ID token verification via `google-auth-library` for any future mobile/web token flows

### 14.5 Google OAuth Email Flow
- [ ] Welcome email sent on first Google login (same template as email/password register)
- [x] Email confirmed as verified automatically (Google guarantees it)
- [x] Daily summary, streak reminders, and all automation emails work identically for OAuth users
- [x] `EmailSettings` auto-created with defaults on first Google sign-in
- [x] No "Email Verification" step required for Google users

---

## 🔵 PHASE 15 – Backend: Habits, Logs & Streaks API

### 15.1 Habits Endpoints
- [ ] `GET /api/habits` – all habits for user sorted by `order`; `?archived=true` includes archived
- [ ] `GET /api/habits/:id` – single habit (verify `userId` ownership, 403 if mismatch)
- [ ] `POST /api/habits` – create; validate all fields; auto-set `order = max + 1`
- [ ] `PUT /api/habits/:id` – full replace (ownership check)
- [ ] `PATCH /api/habits/:id` – partial update (any subset of fields)
- [ ] `PATCH /api/habits/:id/archive` – toggle `archived`; return updated doc
- [ ] `DELETE /api/habits/:id` – hard delete habit + cascade-delete all its logs (session transaction)
- [ ] `PATCH /api/habits/reorder` – bulk update: accept `[{ id, order }]`, use `bulkWrite`

### 15.2 Logs Endpoints
- [ ] `GET /api/logs?date=YYYY-MM-DD` – all logs for one day; populate habit name + color
- [ ] `GET /api/logs?start=&end=` – date range (max 365 days); map by `habitId` for fast lookup
- [ ] `POST /api/logs` – upsert (same userId+habitId+date = update value); validate value type against habit type
- [ ] `PUT /api/logs/:id` – update `value` or `note` (ownership check)
- [ ] `DELETE /api/logs/:id` – remove log entry
- [ ] `GET /api/logs/streak/:habitId` – return `{ current, longest, atRisk }`

### 15.3 Streak Service (`services/streak.service.js`)
- [ ] `calculateCurrentStreak(userId, habitId)` – walk backwards from today counting consecutive logged days; frequency-aware (weekly habits skip unscheduled days)
- [ ] `calculateLongestStreak(userId, habitId)` – scan all logs, track max consecutive run
- [ ] `isStreakAtRisk(userId, habitId)` – today not logged AND current streak > 0
- [ ] Batch streak calculator for dashboard: process all habits in parallel with `Promise.all`

### 15.4 Achievement Trigger Service (`services/achievement.service.js`)
- [ ] Called asynchronously after every log creation
- [ ] Achievement types:
  | Badge | Trigger Condition |
  |-------|------------------|
  | `first-log` | Total logs === 1 |
  | `7-day-streak` | Any habit streak === 7 |
  | `30-day-streak` | Any habit streak === 30 |
  | `100-day-streak` | Any habit streak === 100 |
  | `perfect-week` | All habits logged every day this week |
  | `perfect-month` | All habits logged every day this month |
  | `10-habits` | User has 10+ active habits |
  | `100-logs` | Total log count === 100 |
  | `night-owl` | 5+ logs created after 10pm |
  | `early-bird` | 5+ logs created before 7am |
- [ ] Upsert `Achievement` doc (don't duplicate if already earned)
- [ ] Return newly earned achievement(s) in API response for frontend notification

### 15.5 Mood Endpoints
- [ ] `GET /api/mood?date=YYYY-MM-DD` – mood for single date
- [ ] `POST /api/mood` – upsert mood (score 1-10, emoji, note)
- [ ] `GET /api/mood/range?start=&end=` – mood history array for chart

---

## 🔵 PHASE 16 – Backend: Analytics API

### 16.1 Dashboard Stats Endpoint
- [ ] `GET /api/analytics/dashboard` – single optimized call returning:
  - Today: `habitsLogged`, `totalHabits`, `completionRate`, `dailyScore`
  - Streaks: `{ habitId, name, current, longest }[]` for all habits
  - Last 7 days: `[{ date, score }]` (mini chart data)
  - All-time: `bestStreak`, `totalLogs`, `currentScore`

### 16.2 Detailed Analytics
- [ ] `GET /api/analytics/summary?range=7d|30d|90d&start=&end=`
  - Returns: `avgDailyScore`, `bestDay`, `worstDay`, `totalLogs`, `completionRate`, `longestStreak`, `mostConsistentHabit`
- [ ] `GET /api/analytics/habits/:id?range=` – single habit stats: completion %, avg value, streak history
- [ ] `GET /api/analytics/daily?start=&end=` – `[{ date, score, habitsLogged, total }]` for line chart
- [ ] `GET /api/analytics/weekly?weeks=12` – `[{ week, startDate, score, completions }]` for bar chart
- [ ] `GET /api/analytics/heatmap?year=2026` – `[{ date, score, count }]` x 365 days
- [ ] `GET /api/analytics/comparison?habitIds=a,b,c&range=30d` – side-by-side stats array
- [ ] `GET /api/analytics/patterns` – best day of week per habit (aggregation by `$dayOfWeek`)

### 16.3 Productivity Score Algorithm
```
base          = (habitsCompleted / totalHabits) * 60        // max 60 pts
streakBonus   = Math.min(totalActiveStreakDays * 0.5, 20)   // max 20 pts
consistency   = (7dayAvgCompletionRate * 15)                 // max 15 pts
moodBonus     = moodScore ? (moodScore / 10) * 5 : 0        // max 5 pts
score         = Math.round(base + streakBonus + consistency + moodBonus)
```
- [ ] Purely computed from logs + mood (no stored field, calculated on demand)
- [ ] Memoized per-user per-day in `AiCache` with 6h TTL

### 16.4 MongoDB Aggregation Pipelines
- [ ] **Daily logs pipeline**: `$match date range → $group by date → $count completions`
- [ ] **Weekly totals pipeline**: `$match → $addFields { week: $isoWeek } → $group by week → $sum`
- [ ] **Completion rate pipeline**: `$group by habitId → $divide completions/totalDays`
- [ ] **Best/worst day pipeline**: `$group by $dayOfWeek → $avg score → $sort`
- [ ] **Heatmap pipeline**: `$match year → $group by date → $project score field`
- [ ] **Streak history**: JavaScript service (aggregations don't easily handle consecutive-day logic)

### 16.5 Export
- [ ] `GET /api/analytics/export?format=csv` – stream CSV via `json2csv` (pipe to response)
- [ ] `GET /api/analytics/export?format=json` – full data JSON dump
- [ ] Rate limit: 5 exports / hour per user (store counter in memory / Redis)
- [ ] Include all habits + all logs + analytics summary in export

---

## 🔵 PHASE 17 – Backend: AI Intelligence API

### 17.1 OpenAI Service (`services/openai.service.js`)
- [ ] Initialize `openai` client with `OPENAI_API_KEY`
- [ ] `callOpenAI({ model, systemPrompt, userPrompt, maxTokens, temperature })` base wrapper
- [ ] Retry: 3 attempts with exponential backoff on 429 (rate limit) and 500+ errors
- [ ] Token usage tracked per call (log `prompt_tokens + completion_tokens`)
- [ ] Daily token budget guard: if user exceeds `AI_DAILY_TOKEN_LIMIT`, return fallback
- [ ] Feature flag: if `AI_ENABLED=false`, all endpoints return pre-written fallback responses

### 17.2 AI Cache Layer (`services/aiCache.service.js`)
- [ ] `getCached(userId, type, inputHash)` – look up `AiCache` where `expiresAt > now`
- [ ] `setCache(userId, type, inputHash, response, ttlHours)` – store with expiry
- [ ] `inputHash = md5(JSON.stringify(sortedInput))` – deterministic hash
- [ ] Cache TTLs: insights (24h), quote (6h), suggestions (24h), summary (7d), predict (12h)

### 17.3 AI Endpoints

#### `GET /api/ai/insights`
- [ ] Build prompt from last 90 days of log + habit data aggregated by day-of-week + time
- [ ] Output: `[{ title, description, type ('positive'|'warning'|'tip'), confidence (0-1) }]` (5-8 items)
- [ ] Example: "You complete Meditation 3× more likely on weekdays"
- [ ] Cache: 24h per user

#### `POST /api/ai/quote`
- [ ] Input: `{ moodScore, productivityScore, streakCount }`
- [ ] Prompt: "Generate a motivational quote for someone who has a mood of X/10 and productivity score of Y today"
- [ ] Output: `{ quote, author, theme ('encouragement'|'challenge'|'celebration') }`
- [ ] Fallback: curated local quotes JSON file (50 quotes)
- [ ] Cache: 6h per user

#### `GET /api/ai/suggestions`
- [ ] Input: existing habit categories (derived from tags + names) + completion rates
- [ ] Prompt: identify gaps in habit portfolio (sleep/nutrition/exercise/mindfulness/social/learning)
- [ ] Output: `[{ habitName, reason, suggestedIcon, category, difficulty }]` (3 items)
- [ ] Cache: 24h per user

#### `GET /api/ai/summary`
- [ ] Input: week's aggregated stats (score, top habit, streak, achievements)
- [ ] Output: 2-3 sentence narrative paragraph about the week's performance
- [ ] Cache: 7 days (keyed to ISO week number)

#### `GET /api/ai/predict`
- [ ] Input: last 90 days of logs grouped by day-of-week per habit
- [ ] Output: `[{ habitId, name, predictions: { Mon: 0.8, Tue: 0.3, ... } }]` (probability 0-1)
- [ ] Use statistical calculation (% of that weekday historically completed) — optionally enhance with GPT
- [ ] Cache: 12h per user

---

## 🔵 PHASE 18 – Backend: Email Automation & Notifications

### 18.1 Email Transport Setup
- [ ] **Primary**: SendGrid (`@sendgrid/mail`) with API key
- [ ] **Fallback**: Nodemailer + Gmail SMTP (dev/staging)
- [ ] `sendEmail({ to, subject, html, text, attachments? })` base function
- [ ] Retry failed sends: 3 retries with 5min spacing
- [ ] Email send log: store `{ userId, type, sentAt, status }` in DB for audit
- [ ] Unsubscribe token: signed JWT included in every email footer link

### 18.2 HTML Email Templates
- [ ] Base layout: header (logo + brand), body slot, footer (unsubscribe link, address)
- [ ] All templates: responsive (max 600px), inline CSS, dark-mode friendly
- [ ] **Welcome Email** – onboarding checklist, "Create first habit" CTA button
- [ ] **Daily Summary** – score (large colored number), completion bar, top streak habit, quote, CTA
- [ ] **Weekly Report** – week score, best day, most consistent habit, achievements earned, "View Analytics" CTA
- [ ] **Streak Reminder** – flame icon, streak count, unlogged habits list, urgency message, direct log CTA
- [ ] **Achievement Unlocked** – badge image + name + description, "View Achievements" CTA
- [ ] **Missed Habit Alert** – habits not logged in 2+ days, gentle nudge
- [ ] **Password Reset** – reset button with time limit notice, security disclaimer
- [ ] Template engine: `handlebars` or `mjml` for maintainable template syntax

### 18.3 Email Settings API
- [ ] `GET /api/settings/email` – fetch user's `EmailSettings` document
- [ ] `PUT /api/settings/email` – update preferences (validate time format, day 0-6)
- [ ] `POST /api/settings/email/test` – send a sample daily summary to user's address
- [ ] `GET /api/settings/email/unsubscribe?token=` – one-click unsubscribe (verify JWT, set `enabled: false`)

### 18.4 Cron Jobs (`jobs/`)
- [ ] **`dailySummary.job.js`** – `0 * * * *` (hourly tick)
  - For each user: check if `dailySummaryTime` matches current UTC hour considering timezone
  - Compute today's analytics → generate email → send → update `lastEmailSentAt`
  - Skip if `dailySummaryEnabled: false` or `enabled: false`
- [ ] **`weeklyReport.job.js`** – `0 8 * * 0` (Sundays 8am UTC)
  - Fetch users with `weeklyReportEnabled: true`
  - Run weekly aggregation → send report email
- [ ] **`streakReminder.job.js`** – `0 18 * * *` (6pm UTC daily)
  - Find users where any habit has `isStreakAtRisk: true`
  - Respect user timezone (send at 6pm local)
  - Send streak-at-risk email
- [ ] **`missedHabitAlert.job.js`** – `0 20 * * *` (8pm UTC daily)
  - Find habits not logged in 2+ consecutive days for each user
  - Send gentle reminder (max once per habit per 3 days)
- [ ] **`achievementCheck.job.js`** – `*/30 * * * *` (every 30 min)
  - Run achievement checks for users who logged in last 30min
- [ ] **`aiCacheCleanup.job.js`** – `0 3 * * *` (3am daily)
  - Delete expired `AiCache` docs (backup for TTL index)
- [ ] **Graceful shutdown**: all jobs stopped cleanly on `SIGTERM` before process exits

---

## 🟡 PHASE 19 – Frontend ↔ Backend Integration

- [ ] Replace all `mockData` with Axios API calls
- [ ] JWT auth flow (httpOnly cookie)
- [ ] Protected routes (Next.js middleware)
- [ ] Real loading states replace skeleton mocks
- [ ] Optimistic UI updates for habit toggles

---

## 🔴 PHASE 20 – Testing & Deployment

- [ ] Unit tests: API (Jest + Supertest)
- [ ] Component tests (React Testing Library)
- [ ] E2E: Playwright (auth, dashboard, log flow)
- [ ] Frontend → **Vercel**
- [ ] Backend → **Railway / Render**
- [ ] DB → **MongoDB Atlas**
- [ ] Email → **SendGrid**
- [ ] CI/CD: GitHub Actions
- [ ] Custom domain + SSL

---

## 📱 Page Map

| Route | Page | Phase |
|-------|------|-------|
| `/` | Landing | 2 |
| `/login` | Login | 3 |
| `/register` | Register | 3 |
| `/dashboard` | Dashboard | 4 |
| `/habits` | Habits | 5 |
| `/logs` | Daily Logs | 6 |
| `/analytics` | Analytics | 7 |
| `/heatmap` | Heatmap | 8 |
| `/insights` | AI Insights | 9 |
| `/achievements` | Achievements | 10 |
| `/settings` | Settings | 11 |

---

## 📅 Development Timeline

| Week | Focus |
|------|-------|
| Week 1 | Phase 1 – Setup + Full Animation System |
| Week 2 | Phase 2 – Landing Page (scroll journey) |
| Week 3 | Phase 3–4 – Auth + Dashboard |
| Week 4 | Phase 5–6 – Habits + Logs |
| Week 5 | Phase 7–8 – Analytics + Heatmap |
| Week 6 | Phase 9–10 – Insights + Achievements |
| Week 7 | Phase 11–12 – Settings + Global Polish |
| Week 8 | Phase 13–15 – Backend Core |
| Week 9 | Phase 16–18 – Backend AI + Email |
| Week 10 | Phase 19–20 – Integration + Deploy |

---

*Last updated: 2026-02-26*
