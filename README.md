# Cool Session Booking

Responsive booking flow built with Next.js 15 (App Router) and TypeScript. The UI mirrors the provided design: a hero card on the left and a booking card on the right that lets visitors pick a date within the next six weeks, choose a 15-minute slot in 12-hour format, and confirm the reservation. The selected slot is logged to the browser console as a Unix timestamp (example: `{ timestamp: 1714583670 }`).

## Why these tools?

- **Next.js 15 + React 19 RC** – Latest App Router features, great DX, effortless deployment to Vercel.
- **TypeScript** – Static typing keeps the date/time logic honest.
- **Tailwind CSS** – Rapidly recreates the Figma visuals while keeping the bundle lean.
- **date-fns** – Lightweight utilities for generating the six-week window and formatting 12-hour times, without touching heavy moment-style libraries.

## Getting started

```bash
# install dependencies
npm install

# start dev server (http://localhost:3000)
npm run dev
```

The booking logic lives in `src/app/page.tsx` and styles are handled via Tailwind utilities declared in `src/app/globals.css`.

## Available scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Starts Next.js in development mode          |
| `npm run build` | Creates an optimized production build       |
| `npm run start` | Runs the built app locally (after build)    |
| `npm run lint`  | Checks the project with ESLint/Airbnb rules |

## Deployment

1. **Vercel (recommended)**  
   - Push the repo to GitHub.  
   - In Vercel, “Import Project”, select the repo, keep defaults (`npm run build` / `npm run start`).  
   - Each push to `main` redeploys automatically.

2. **GitHub Pages or any static host** (app is fully static)  
   - Run `npm run build && npx next export`.  
   - Deploy the generated `out` directory (e.g., with GitHub Pages via the `gh-pages` branch).

## Verification checklist

- [x] Six-week rolling calendar with weekday labels.  
- [x] Time slots unlocked only after choosing a date; 15-minute cadence, 12-hour format.  
- [x] Past slots are disabled based on the user’s current time.  
- [x] “Confirm” activates after selecting both a date and time and logs the Unix timestamp.  
- [x] Fully responsive layout (iPhone SE → 4K).

Happy booking! 🚀
