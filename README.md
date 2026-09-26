#  **Project name:**
FitLog — Workout Library

##  **Short description:**
FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of lifts, drill into full instructions and specs for each one, and build out today's training plan — all state-driven, responsive, and persisted across reloads.

##  **Technologies used:**
- Next.js (App Router) — UI and page navigation
- React — component architecture and state management
- Tailwind CSS — styling and responsive layout
- lucide-react — icon set
- localStorage — persists plan/saved data across reloads

**5 key features of the project:**
1. Responsive workout library grid (3×4 on desktop) with category tags, equipment, and duration/calories/rating stats on every card
2. Two-column workout detail pages with a full specs panel and numbered step-by-step instructions
3. Add to today's plan / Save for later, with live navbar badge counts, toast notifications, and a 5-lift cap
4. My Plan dashboard with live metrics (Exercises/Minutes/Calories), Today's Plan vs. Saved tabs, and Mark as Done / Remove actions
5. Sort by Duration/Calories/Rating, search by name or tag, and localStorage persistence so nothing is lost on reload

##  Requirements Checklist



**Basic Requirements**
- [x] Works on mobile, tablet, and desktop screen sizes
- [x] 8+ Git commits with clear, meaningful messages
- [x] Runs without errors after deployment (App Router, no static-export issues)
- [x] This README — project name, description, technologies, 5 features

**Main Requirements (1–8)**
- [x] **Navbar** — logo left, Workout/My Plan links centered with active-link
      highlight, filled "Plan" badge + outlined "Saved" badge on the right,
      both linking to `/my-plan` and reflecting live counts
- [x] **Hero/Banner** — eyebrow, uppercase display heading, subtitle, "Browse
      Workouts" CTA that anchor-scrolls to `#library`, hero image on the right
- [x] **Library section** — "The Library" heading + subtitle, all workouts in
      a responsive 3×4 grid, each card with image, category pills, name,
      equipment, and duration/calories/rating stats; click → detail page
- [x] **Workout Details page** — two-column layout: image left, and on the
      right a title, description, category tags, full specs panel, numbered
      instructions, plus Add-to-plan / Save-for-later buttons
- [x] **Button functionality** — Add-to-plan and Save-for-later update the My
      Plan tabs, increment the navbar badges, and show toast notifications;
      My Plan cards have a "View Details" button back to the detail page
- [x] **My Plan page (`/my-plan`)** — title/subtitle, live metrics row,
      Today's Plan / Saved tabs, "Loading workouts…" state, full workout
      cards list, and an empty state with a "Go to workouts" CTA
- [x] **Footer** — logo + FITLOG on the left, copyright line on the right
- [x] **Responsive design** — grid, navbar, and hero all adapt correctly
      across breakpoints

**Extra Requirements**
- [x] Custom 404 page for unknown/invalid routes (`app/not-found.js`)
- [x] Loading animation while data fetches on the Home page
- [x] Toast notifications on every detail-page button action
- [x] Reloading any page after deployment causes no errors (App Router
      handles this natively on Vercel/Netlify/Cloudflare Pages)

**Challenge Requirements (10 Marks)**
- [x] **C1 — Sort dropdown** (`components/SortDropdown.jsx`): "Sort By" with
      Duration / Calories / Rating options, default Duration, chevron icon;
      re-sorts the current list instantly on both Library and My Plan
- [x] **C2 — This README**, including project name, description, technologies
      used, and 5 key features
- [x] **C3 — Mark as Done / Remove** on each My Plan card: check-icon "Mark as
      Done" button and an X "Remove" button, each with its own toast

**Optional (implemented)**
- [x] **localStorage persistence** — plan/saved data survives a page reload
- [x] **Search** — My Plan and Library entries filterable by name or tag
- [x] **5-lift cap** — "Add to today's plan" disables once the plan has 5
      lifts, matching the "Cap of five lifts for today" subtitle

