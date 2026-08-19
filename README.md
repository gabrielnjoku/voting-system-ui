# Hackathon 3.0 Head of House Voting System

An interactive, responsive web application designed for managing and casting votes for the **Hackathon 3.0 Head of House** election. Built with HTML5, TypeScript, and Tailwind CSS.

**Live Demo:** [https://voting-system-ui-one.vercel.app/](https://voting-system-ui-one.vercel.app/)

---

## Features

- **Interactive Voting Form:** Easily cast your vote by entering your name and selecting your preferred candidate.
- **Dynamic Candidate Population:** Candidates list loaded and managed via TypeScript.
- **Real-time Leaderboard:** Track live vote counts for top candidates on the election dashboard.
- **Detailed Election Results Modal:** View candidate breakdown and declare the election winner via an interactive dialog modal.
- **Responsive Dark Theme:** Styled using modern Tailwind CSS with seamless mobile and desktop navigation.

---

## Tech Stack

- **Frontend:** HTML5, TypeScript (`script.ts`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/cli`)
- **Deployment:** Vercel

---

## Project Structure

```text
.
├── index.html          # Main HTML structure, navigation, voting form, and results modal
├── script.ts           # Core application logic, event listeners, and vote tallying
├── src/
│   ├── input.css       # Tailwind CSS entry file
│   └── output.css      # Compiled Tailwind CSS stylesheet
├── package.json        # Node dependencies and build scripts
└── tsconfig.json       # TypeScript configuration (ES2020 target)
```

---

## Getting Started Locally

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd voting-system-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Serve the project:**
   Open `index.html` in your browser, or use a local static server like `Live Server` / `npx serve`.

---

## Available Scripts

In the project directory, you can run:

- `npm run build:css` – Compiles and minifies Tailwind CSS (`src/input.css` → `src/output.css`).
- `npm run build:js` – Compiles TypeScript (`script.ts` → `script.js`).
- `npm run build` – Runs both CSS and JS build scripts sequentially.

---

## Deployment on Vercel

This project is deployed on Vercel. 

### Build & Output Settings on Vercel:

- **Framework Preset:** `Other`
- **Build Command:** `npm run build`
- **Output Directory:** `.` *(Root Directory)*

Live Deployment Link: [https://voting-system-ui-one.vercel.app/](https://voting-system-ui-one.vercel.app/)
