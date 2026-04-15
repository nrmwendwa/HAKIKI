# HAKIKI SCANNER - Full Stack Setup Guide

Complete setup for running both the frontend and backend together.

## Project Structure

```
hakiki-scanner/
├── backend/                 # FastAPI backend
│   ├── main.py
│   ├── config.py
│   ├── model_service.py
│   ├── requirements.txt
│   ├── .env.example
│   └── models/
│       └── efficientnet3class_full_model.pth
├── src/                     # React frontend
│   ├── components/
│   ├── pages/
│   └── App.tsx
├── package.json
├── vite.config.ts
└── .env.example
```

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt --prefer-binary

# Create environment file
cp .env.example .env

# Start the API server
python main.py
```

The backend will be available at: **http://localhost:8000**

### 2. Frontend Setup

In a **new terminal** from the root directory:

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be available at: **http://localhost:8080**

## Configuration

### Backend (.env)

Located in `backend/.env`:

```bash
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False

# Model Configuration
MODEL_PATH=models/efficientnet3class_full_model.pth
DEVICE=cuda  # or 'cpu' if no GPU

# CORS - Add frontend URLs here
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://localhost:5173
```

### Frontend (.env.local)

Located in root `.env.local`:

```bash
# API URL - Must match backend address
VITE_API_URL=http://localhost:8000
```

## Testing the Integration

1. **Open Frontend**
   - Navigate to http://localhost:8080
   - You should see the HAKIKI SCANNER landing page

2. **Test the API**
   - Go to http://localhost:8000/docs (Swagger UI)
   - Click "Try it out" on the `/predict` endpoint
   - Upload an image file to test

3. **Test End-to-End**
   - Click "Start Scanning" or navigate to Scanner page
   - Upload an image
   - Should receive real prediction from backend

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill process if needed
kill -9 <PID>

# Or change port in backend/.env
API_PORT=8001
```

### Frontend won't connect to backend
- Check `VITE_API_URL` in `.env.local`
- Ensure backend is running at that URL
- Check browser console for CORS errors
- Verify `CORS_ORIGINS` in `backend/.env`

### Model loading fails
```
Error: Model file not found
```
- Ensure `models/efficientnet3class_full_model.pth` exists
- Check `MODEL_PATH` in `backend/.env`
- Path is relative to backend directory

### CUDA errors
If you don't have a GPU or get CUDA errors:
```bash
# In backend/.env
DEVICE=cpu
```

## Development Workflow

### Terminal 1 - Backend
```bash
cd backend
python main.py
# Runs on http://localhost:8000
```

### Terminal 2 - Frontend
```bash
npm run dev
# Runs on http://localhost:8080
```

### Making Changes

**Backend Changes:**
- Edit `backend/main.py`, `config.py`, `model_service.py`
- No restart needed if `DEBUG=True` in `.env` (hot reload enabled)
- If changes don't appear, manually restart: `Ctrl+C` then `python main.py`

**Frontend Changes:**
- Edit files in `src/`
- Changes auto-apply via Vite hot module replacement
- Check browser console for errors

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/health
```

### Predict (Image Analysis)
```bash
curl -X POST -F "image=@face.jpg" http://localhost:8000/predict
```

### Interactive Docs
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Production Deployment

See `backend/README.md` for production deployment options:
- Gunicorn + systemd
- Docker + Docker Compose
- Nginx reverse proxy
- Cloud platforms (AWS, GCP, etc.)

## Key Files

**Frontend Integration Points:**
- `src/components/ScannerPage.tsx` - Makes API calls to `/predict`
- `src/components/Navbar.tsx` - Navigation and branding
- `.env.local` - Frontend configuration

**Backend Integration Points:**
- `backend/main.py` - FastAPI app with `/predict` endpoint
- `backend/model_service.py` - Image processing and inference
- `backend/.env` - Backend configuration

## Branding

The app is now branded as **HAKIKI SCANNER**:
- Navbar displays "HAKIKI SCANNER"
- Landing page text updated
- All references changed from "HAKIKI AI"

## API Response Format

When you upload an image, you get:

```json
{
  "verdict": "real",
  "confidence": 87.45,
  "scores": {
    "real": 87.45,
    "suspicious": 8.92,
    "fake": 3.63
  }
}
```

## Next Steps

1. ✅ Run backend: `cd backend && python main.py`
2. ✅ Run frontend: `npm run dev`
3. ✅ Open http://localhost:8080
4. ✅ Test the scanner with images

Need help? Check the logs in both terminal windows for detailed error messages.
