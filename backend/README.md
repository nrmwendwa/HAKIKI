# Hakiki Scanner API — Backend

A FastAPI service that validates images, text claims, and documents using Gemini (via an abstracted LLM gateway) and online source search.

## Features

- **Multimodal validation** — image, text, and document inputs routed through dedicated pipelines
- **Gemini-backed** — OCR, image analysis, claim extraction, and claim verification all go through the LLM gateway
- **Online source checking** — DuckDuckGo search + trusted-domain tagging feeds into the verification prompt
- **Deterministic decision engine** — signals are fused with fixed weights; verdict is threshold-based, not LLM-generated
- **CORS + Swagger** — ready for the React frontend at `/docs`

## Quick Start

### Prerequisites

- Python 3.10+
- A Gemini API key

### Installation

```bash
pip install -r requirements.txt
cp .env.example .env
# edit .env and set GEMINI_API_KEY and GEMINI_MODEL
python main.py
# or:
python -m uvicorn main:app --port 8000 --reload
```

API serves at `http://localhost:8000`.

- Interactive docs: http://localhost:8000/docs
- Health: `curl http://localhost:8000/health`
- Info: `curl http://localhost:8000/info`

## API Endpoints

### Health & Info

- **GET `/health`** — Health check
- **GET `/info`** — API and LLM config info

### Validation

- **POST `/validate`** — Upload an image or document (multipart `file`). Routes to image or document pipeline, runs Gemini-backed analysis + claim verification, returns a `DecisionResult`.

  ```bash
  curl -X POST -F "file=@photo.jpg" http://localhost:8000/validate
  curl -X POST -F "file=@report.pdf" http://localhost:8000/validate
  ```

- **POST `/validate-text`** — JSON body `{ "text": "..." }`. Extracts claims with Gemini, verifies each online, returns a `DecisionResult`.

  ```bash
  curl -X POST -H "Content-Type: application/json" \
    -d '{"text":"Claim to validate"}' \
    http://localhost:8000/validate-text
  ```

### Response shape (`DecisionResult`)

```json
{
  "verdict": "valid | suspicious | invalid",
  "confidence": 82.5,
  "reasoning": "Swahili explanation of the decision",
  "evidence": [ { "claim": "...", "matched_source": "...", "matched_url": "...", "similarity": 0.87, "verdict_contribution": "..." } ],
  "signals": { "claim_score": 0.9, "image_authenticity": null, "source_trust": 0.5, "weights_used": { ... }, "raw_score": 0.78 },
  "input_type": "text",
  "deepfake_scores": null,
  "pipeline_errors": [],
  "trace": { ... }
}
```

## Configuration

Environment variables (see `.env.example`):

```bash
# API
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
WORKERS=4

# Uploads
MAX_UPLOAD_SIZE_MB=10

# CORS
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://localhost:5173

# LLM (required)
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
LLM_PRIMARY_PROVIDER=gemini
LLM_ROUTE_OCR=gemini-vision
LLM_ROUTE_IMAGE_ANALYSIS=gemini-vision
LLM_ROUTE_CLAIM_EXTRACTION=gemini-text
LLM_ROUTE_CLAIM_VERIFICATION=gemini-text
LLM_ROUTE_REASONING=gemini-text
LLM_TIMEOUT_S=30
LLM_MAX_RETRIES=3
LLM_RETRY_BACKOFF_S=1.5

# Logging
LOG_LEVEL=INFO
```

## Architecture

```
backend/
├── main.py              # FastAPI app + /validate and /validate-text endpoints
├── config.py            # Settings (loads .env)
├── schemas.py
├── llm/                 # LLM gateway (Gemini provider, prompts, registry)
├── pipelines/           # image / text / document pipelines + router
├── validation/          # Decision engine (deterministic signal fusion)
└── verification/        # DDG search + online claim verification
```

### Request flow (text)
1. `/validate-text` → `run_text_pipeline(text)` → Gemini extracts claims
2. `decide(result)` → for each claim, `verify_claim_online` does DDG search + Gemini synthesis
3. Decision engine fuses `claim_score` and `source_trust`, thresholds to VALID / SUSPICIOUS / INVALID

### Request flow (image)
1. `/validate` routes upload → `run_image_pipeline(bytes)`
2. Pipeline: Pillow decode + EXIF + phash → Gemini OCR → Gemini image analysis → Gemini claim extraction from OCR text
3. `decide(result)` fuses `claim_score`, `image_authenticity`, and `source_trust`

## Production Deployment

### Gunicorn

```bash
pip install gunicorn
gunicorn main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --access-logfile - \
  --error-logfile -
```

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libmagic1 && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

### Nginx reverse proxy

```nginx
upstream fastapi_app { server 127.0.0.1:8000; }

server {
  listen 80;
  server_name yourdomain.com;
  client_max_body_size 10M;

  location / {
    proxy_pass http://fastapi_app;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Troubleshooting

**Pydantic `ValidationError` on `LLMSettings` at startup**
`GEMINI_MODEL` is unset. Set it in `.env` (e.g. `GEMINI_MODEL=gemini-2.5-flash`). Also ensure `GEMINI_API_KEY` is set.

**Port already in use**
```bash
lsof -ti:8000 | xargs kill -9
# or change API_PORT in .env
```

**CORS errors**
Update `CORS_ORIGINS` in `.env` to include your frontend URL.

## License

MIT — see LICENSE.
