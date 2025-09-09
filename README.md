## AI-Powered Knowledge Quiz – Local Setup

This guide walks you through running the app locally: a Python FastAPI backend (LLM quiz generation) and a React + TypeScript + Vite frontend.

### Prerequisites

- Node.js 22.12+ (Vite requires ≥ 20.19; recommended 22.12+)
- pnpm (via Corepack):
  - Enable: `corepack enable`
  - Activate latest pnpm: `corepack prepare pnpm@latest --activate`
- Python 3.11+

### 1) Start the backend (FastAPI)

The backend lives in a sibling folder: `../ai-quiz-backend`.

- Create and activate a virtualenv, then install deps:

```bash
cd "../ai-quiz-backend"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

- Create `.env` (pick ONE of the two options below):

  - Use Groq (free key):
    ```bash
    # get a key at https://console.groq.com/keys
    cat > .env <<'EOF'
    PROVIDER=groq
    GROQ_API_KEY=YOUR_GROQ_KEY
    USE_MOCK=false
    REQUEST_TIMEOUT_SECONDS=30
    EOF
    ```
  - Or run in mock mode (No Key needed but very lame quizes. This was used to test frontend in dev):
    ```bash
    cat > .env <<'EOF'
    PROVIDER=groq
    USE_MOCK=true
    REQUEST_TIMEOUT_SECONDS=30
    EOF
    ```

- Run the server:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`.

### 2) Start the frontend (Vite + React + TS)

This folder: `ai-quiz`.

- Install deps and set the backend URL:

```bash
pnpm install
# point frontend at the backend
printf "VITE_API_BASE_URL=http://localhost:8000\n" > .env.local
```

- Run the dev server:

```bash
pnpm dev
```

Open `http://localhost:5173`.

### 3) Use the app

- Enter a topic on the home page (e.g., "Neural Networks").
- The app generates a 5-question multiple-choice quiz.
- Answer and submit to see the score and correct answers.

### Troubleshooting

- Vite error about Node version:
  - Update Node to 22.12+: `asdf install nodejs 22.12.0 && asdf local nodejs 22.12.0`
- pnpm not found:
  - `corepack enable && corepack prepare pnpm@latest --activate`
- `uvicorn` not found:
  - Ensure venv active: `source ../ai-quiz-backend/.venv/bin/activate`
  - Or run directly: `../ai-quiz-backend/.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000`
- CORS:
  - Backend allows `http://localhost:5173` by default.

### Optional: Switch providers

Backend supports `PROVIDER=groq | openrouter | openai`. For OpenRouter/OpenAI, add the respective API key to `.env` and set `USE_MOCK=false`.
