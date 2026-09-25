# Memory Timeline Frontend

React 19 application for organizing memories into personal timelines, with account forms, timeline creation and dated memories with optional image URLs.

**Backend:** [memory-timeline-backend-](https://github.com/Lenin-Miranda/memory-timeline-backend-).

## Setup

Use Node.js 22.12+ and npm for the Vite 7 toolchain.

```bash
git clone https://github.com/Lenin-Miranda/memory-timeline-frontend.git
cd memory-timeline-frontend
npm install
cp .env.example .env
```

Set the backend origin in `.env`:

```dotenv
VITE_API_URL=http://localhost:3001
```

Do not append `/api`: the request helpers add route prefixes themselves.

```bash
npm run dev
```

Open the URL printed by Vite, configured as `http://localhost:3000` in `vite.config.js`. Start the backend separately.

## Usage

1. Sign up or log in.
2. Create a timeline for a relationship.
3. Open the timeline and add a memory with a date, description and optional image URL.
4. Navigate back to the timeline dashboard.

## Commands

- `npm run dev`: local development.
- `npm run lint`: ESLint.
- `npm run build`: production output in `dist/`.
- `npm run preview`: local preview of the build.

## Structure

- `src/components/`: forms, modals and shared UI.
- `src/pages/`: landing/about/dashboard pages.
- `src/context/` and `src/contexts/`: authentication and app state.
- `src/services/`: API requests.
- `src/hooks/` and `src/utils/`: reusable behavior and validation.

## Design

[Figma — Team3 Feb CodeJam](https://www.figma.com/design/vs85lkmwHGVVX0uaiq9V8B/Team3_Feb-CodeJam?node-id=307-1427)

## Troubleshooting

Check the backend port and remove a trailing `/api` from `VITE_API_URL` if requests reach duplicated paths. Restart Vite after changing the environment. No automated test script is configured.
