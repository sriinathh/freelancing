# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project: AI-powered Animated Portfolio

This repo contains a Vite + React frontend and an Express backend for a professional freelancing portfolio with an AI chatbot.

Quick start (frontend):

```bash
# from project root
npm install
# install tailwind + framer-motion
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion three
npx tailwindcss init -p
npm run dev
```

Quick start (backend):

```bash
cd server
npm install
cp .env.example .env
# fill .env with MONGODB_URI and OPENAI_API_KEY
npm start
```

Deployment:
- Frontend: deploy to Vercel (build command: `npm run build`, output: `dist`).
- Backend: deploy to Render or Railway; set environment variables from `.env` and start `node index.js`.

API endpoints:
- `POST /api/contact` saves contact messages to MongoDB.
- `POST /api/ai` proxies chat requests to OpenAI. Set `OPENAI_API_KEY` in environment.

See `server/README.md` for backend details.
