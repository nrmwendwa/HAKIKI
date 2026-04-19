# HAKIKI SCANNER

Combating misinformation in Tanzania.

HAKIKI SCANNER is a full-stack application that verifies the authenticity of images, text claims, and documents. It uses Gemini for OCR, image analysis, and claim extraction, combined with DuckDuckGo source search and a deterministic decision engine.

## Components

- **Backend** ([backend/](backend/)) — FastAPI service with Gemini-backed image, text, and document validation pipelines.
- **Frontend** ([frontend/](frontend/)) — React/Vite web app.
- **Data** ([data/](data/)) — Reference datasets.

## Quick Start

See [SETUP.md](SETUP.md) for full instructions.

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env        # then fill in GEMINI_API_KEY and GEMINI_MODEL
python -m uvicorn main:app --port 8000 --reload

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

- Backend: http://localhost:8000 (docs at `/docs`)
- Frontend: http://localhost:8080
