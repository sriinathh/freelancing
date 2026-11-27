# Portfolio Backend

This Express server provides two endpoints:

- `POST /api/contact` - stores messages in MongoDB and optionally emails notifications.
- `POST /api/ai` - proxies a question to OpenAI and returns the AI reply.

Setup:

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```bash
cd server
npm install
```

3. Run server:

```bash
npm start
```

Deployment notes: Use Render or Railway; set environment variables in the platform.
