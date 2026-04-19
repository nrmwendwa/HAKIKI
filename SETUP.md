# HAKIKI SCANNER — Full Stack Setup Guide

Complete setup for running the frontend and backend together.

## Project Structure

```
hakiki-scanner/
├── backend/                 # FastAPI backend (Python)
│   ├── main.py              # API app + /validate and /validate-text endpoints
│   ├── config.py            # Settings (loads .env)
│   ├── schemas.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── llm/                 # LLM gateway (Gemini provider, prompts, registry)
│   ├── pipelines/           # image / text / document pipelines + router
│   ├── validation/          # Decision engine (deterministic fusion)
│   └── verification/        # DDG search + online claim verification
├── frontend/                # React/Vite web app
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
└── data/                    # Reference datasets
    └── tanzania_publicinfo_dataset.csv
```

## Quick Start

### 1. Backend

```bash
cd backend
pip install -r requirements.txt --prefer-binary
cp .env.example .env
# IMPORTANT: edit .env and set GEMINI_API_KEY and GEMINI_MODEL
# (the server will fail to start with a pydantic validation error if these are unset)

python main.py
# or
python -m uvicorn main:app --port 8000 --reload
```

Backend: **http://localhost:8000**

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend: **http://localhost:8080**

## Configuration

### Backend (`backend/.env`)

```bash
# API
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False

# CORS — frontend URLs
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://localhost:5173

# LLM (required — server will not start without these)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
LLM_PRIMARY_PROVIDER=gemini
```

### Frontend (`frontend/.env.local`)

```bash
VITE_API_URL=http://localhost:8000
```

## Testing the Integration

1. Open http://localhost:8080 — HAKIKI SCANNER landing page.
2. Open http://localhost:8000/docs — Swagger UI. Try `/validate` or `/validate-text`.
3. From the app, submit a text claim or upload an image — should get a `DecisionResult` back.

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/health
```

### Validate (image or document upload)
```bash
curl -X POST -F "file=@photo.jpg" http://localhost:8000/validate
curl -X POST -F "file=@report.pdf" http://localhost:8000/validate
```

### Validate Text
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"text": "Claim to validate"}' \
  http://localhost:8000/validate-text
```

### Interactive Docs
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Troubleshooting

### Backend won't start

**Pydantic `ValidationError` on `LLMSettings`:**
- `GEMINI_MODEL` is unset. Set it in `backend/.env` (e.g. `GEMINI_MODEL=gemini-2.5-flash`).
- Also ensure `GEMINI_API_KEY` is set.

**Port already in use:**
```bash
lsof -ti:8000 | xargs kill -9
# or change API_PORT in backend/.env
```

### Frontend won't connect to backend
- Check `VITE_API_URL` in `frontend/.env.local`.
- Ensure backend is running at that URL.
- Check browser console for CORS errors; verify `CORS_ORIGINS` in `backend/.env`.

## Development Workflow

### Terminal 1 — Backend
```bash
cd backend
python main.py
```

### Terminal 2 — Frontend
```bash
cd frontend
npm run dev
```

### Making Changes
- **Backend**: hot reload enabled when `DEBUG=True`. Otherwise restart with `Ctrl+C` then `python main.py`.
- **Frontend**: Vite HMR auto-applies changes.

## Production Deployment

See [backend/README.md](backend/README.md) for Gunicorn, Docker, and Nginx setup.

## Response Format

`/validate` and `/validate-text` both return a `DecisionResult`:

```json
{
  "verdict": "valid | suspicious | invalid",
  "confidence": 82.5,
  "reasoning": "Swahili explanation",
  "evidence": [ { "claim": "...", "matched_source": "...", "matched_url": "...", "similarity": 0.87, "verdict_contribution": "..." } ],
  "signals": { "claim_score": 0.9, "image_authenticity": null, "source_trust": 0.5, "weights_used": {}, "raw_score": 0.78 },
  "input_type": "text",
  "deepfake_scores": null,
  "pipeline_errors": [],
  "trace": {}
}
```
