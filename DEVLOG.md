## Day 1 2026-05-20
**Hours worked:** 3
**What I did:**
- Bootstrapped the project using React + TypeScript via Vite. 
- Generated the 12 mandatory root markdown files to immediately satisfy the automated reviewer's structural requirements.
- Researched and compiled the latest vendor pricing data (Cursor, Copilot, Claude, ChatGPT, etc.) into `PRICING_DATA.md` with official source URLs.
- Configured a GitHub Actions CI pipeline (`ci.yml`) to automatically run linting and tests on every push to main.
- Pushed the initial commit to the public GitHub repo and set up continuous deployment to Vercel to secure the live URL requirement early.

**What I learned:**
- I ran into a Node.js version incompatibility right out of the gate (`styleText` missing in Node v20.11.0 when running the latest Vite version). I learned how to debug ESM loader errors and resolved it by forcing npm cache clearance and utilizing a highly stable Vite version to bypass the experimental feature requirement.

**Blockers / what I'm stuck on:**
- Unblocked. CI pipeline is green and Vercel is auto-deploying smoothly.

**Plan for tomorrow:**
- Build the core `auditEngine.ts` logic using hardcoded financial math.
- Set up Vitest and write the 5 mandatory tests to prove the engine's logic.
- Build the initial spend input form with `localStorage` state persistence.


## Day 2 2026-05-21
**Hours worked:** 4
**What I did:**
- Built the core `auditEngine.ts` with hardcoded financial logic, strictly avoiding AI for the math calculations to ensure defensibility. 
- Set up Vitest and wrote the 5 mandatory tests covering the audit engine (overkill plans, alternatives, math calculations). All tests are passing locally.
- Built the `SpendForm.tsx` component with `localStorage` state persistence.
- Built the `AuditResults.tsx` UI to dynamically display the hero savings and recommended actions.
- Debugged and resolved a critical pipeline issue where Vite was failing to compile Tailwind CSS.

**What I learned:**
- Tailwind v4 recently released and uses a new PostCSS architecture that breaks standard Vite configurations out of the box. Downgrading to the highly stable v3 was the most efficient engineering decision to unblock the UI pipeline under a tight deadline.
- Vite caches dependencies aggressively. When terminal executables fail to link properly on Windows/Bash, a hard cache clean (`rm -rf node_modules` and `npm cache clean --force`) is required to flush the corrupted state.

**Blockers / what I'm stuck on:**
- Unblocked. The CSS is rendering flawlessly and the core logic engine is fully operational.

**Plan for tomorrow:**
- Integrate the Anthropic/OpenAI API for the 100-word personalized summary.
- Set up the backend (Supabase/Firebase) for lead capture and configure the transactional email service.
- Conduct my second user interview.

## Day 3 2026-05-22
**Hours worked:** 4
**What I did:**
- Built secure Vercel Serverless Functions (`api/`) to act as a backend, ensuring no API keys are exposed to the client browser.
- Integrated the Anthropic API (Claude 3 Haiku) to dynamically generate a 100-word personalized audit summary based on the frontend's JSON output. Implemented a text fallback for API timeouts.
- Set up a Supabase PostgreSQL database to capture user emails and total savings. Implemented a hidden UI honeypot to protect the database from bot spam.
- Integrated the Resend SDK to automatically dispatch a transactional confirmation email to the user upon successful database insertion.
- Conducted and documented my second user interview with a startup founder to validate the problem space.

**What I learned:**
- Vite's default dev server (`npm run dev`) only serves frontend code and will throw 404 errors for backend API routes. I learned how to utilize the Vercel CLI (`npx vercel dev`) to run a local simulator that bridges the React frontend with the Node.js serverless backend.
- Supabase strictly enforces Row Level Security (RLS) by default, which blocks anonymous API inserts. I had to manage database policies to securely allow the frontend to write to the `leads` table.

**Blockers / what I'm stuck on:**
- Unblocked. The end-to-end data pipeline is fully operational.

**Plan for tomorrow:**
- Implement the PDF/CSV export functionality for the audit report.
- Polish the UI state handling (loading spinners, error toasts) to make the app feel like a premium SaaS product.

## Day 4 2026-05-23
**Hours worked:** 3
**What I did:**
- Implemented client-side PDF generation using `jspdf` and `html2canvas` to fulfill MVP Feature 6 (Export Data).
- Replaced native browser alerts with `react-hot-toast` for premium, non-blocking UI notifications and loading states.
- Refactored `AuditResults.tsx` by extracting the UI into single-responsibility components (`HeroSavings`, `AuditBreakdown`, and `LeadCaptureForm`) to improve maintainability and strictly separate concerns.

**What I learned:**
- Client-side PDF generation relies heavily on DOM refs to capture the visual state of the application. I learned how to isolate specific components inside a React `useRef` to exclude interactive elements (like forms and buttons) from the printed report.

**Blockers / what I'm stuck on:**
- No blockers. The application logic is sound, and the architecture is clean.

**Plan for tomorrow:**
- Finalize the responsive mobile design tweaks and begin overall polish for deployment readiness.

## Day 5 2026-05-24
**Hours worked:** 3
**What I did:**
- Installed and configured `react-router-dom` to transition the application from a single-page layout to a multi-route architecture (`/` for the public tool, `/admin` for the internal dashboard).
- Built a secure internal Admin Dashboard to fetch, parse, and display captured leads directly from the Supabase `leads` table.
- Implemented a lightweight, state-based passcode gateway to protect the `/admin` route from unauthorized access.
- Resolved strict TypeScript interface errors (`toolId`, `annualSavings`, `credexEligible`) during the component refactoring, ensuring the mock data perfectly matched the expected payload.

**What I learned:**
- I learned how to transition a monolithic React app into a scalable, multi-page routing structure. I also learned how to execute read queries (`.select()`) in Supabase and order the returned data by timestamps to build an effective internal data table.

**Blockers / what I'm stuck on:**
- Unblocked. Encountered a few TypeScript strict-typing errors during the refactor, but it reinforced the value of TS in preventing incomplete data payloads from crashing the UI at runtime.

**Plan for tomorrow:**
- Implement edge-case protections: a custom 404 Catch-All route, "Skeleton" loading states for the admin dashboard, and logical handlers for "$0 savings" edge cases.