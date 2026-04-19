"""
FastAPI backend for Hakiki Scanner - Image & Text Verification System

Gemini-backed pipelines for image validation, text claim validation, and
document validation. No local ML models — all inference happens through
the LLM gateway.
"""

import logging

from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from config import get_settings
from pipelines import (
    InputType,
    route_input,
    run_document_pipeline,
    run_image_pipeline,
    run_text_pipeline,
)
from validation import DecisionResult, decide

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


class HealthResponse(BaseModel):
    status: str
    version: str


app = FastAPI(
    title="Hakiki Scanner API",
    description="Gemini-backed API for image verification and text fact-checking",
    version="2.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins_list(),
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0|(\d{1,3}\.){3}\d{1,3})(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# Health & Info Endpoints
# ============================================================================


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    return HealthResponse(status="ok", version=app.version)


@app.get("/info", tags=["Information"])
async def get_info():
    s = get_settings()
    return {
        "api": {
            "name": "Hakiki Scanner API",
            "version": s.api_version,
            "title": s.api_title,
            "debug": s.debug,
        },
        "llm": {
            "primary_provider": s.llm.primary_provider,
            "model": s.llm.gemini_model,
            "vision_model": s.llm.gemini_vision_model,
        },
        "configuration": {
            "max_upload_size_mb": s.max_upload_size_mb,
            "allowed_image_formats": s.allowed_image_formats,
            "allowed_document_formats": s.allowed_document_formats,
            "cors_origins": s.cors_origins,
        },
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "validate": "/validate",
            "validate_text": "/validate-text",
            "info": "/info",
        },
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Hakiki Scanner API - Image & Text Verification",
        "version": app.version,
        "docs": "/docs",
        "health": "/health",
        "validate": "/validate (POST) - Multimodal validation (file upload)",
        "validate_text": "/validate-text (POST) - Text validation",
        "info": "/info",
    }


# ============================================================================
# Validation Endpoints
# ============================================================================


class ValidateTextRequest(BaseModel):
    text: str


@app.post("/validate", response_model=DecisionResult, tags=["Validation"])
async def validate_upload(file: UploadFile = File(...)) -> DecisionResult:
    """
    Validate an uploaded image or document through the multimodal pipeline.

    Routes the upload to the appropriate pipeline, fuses claim, image, and
    source-trust signals, and returns a deterministic verdict.
    """
    s = get_settings()

    try:
        data = await file.read()
    except Exception as exc:
        logger.error(f"Failed to read upload: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to read uploaded file",
        )

    max_size_bytes = s.max_upload_size_mb * 1024 * 1024
    if len(data) > max_size_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds the maximum limit of {s.max_upload_size_mb}MB",
        )

    logger.info(
        f"/validate entry: filename={file.filename}, content_type={file.content_type}, bytes={len(data)}"
    )

    try:
        input_type, _routing = route_input(
            filename=file.filename,
            content_type=file.content_type,
            data=data,
            text=None,
        )

        if input_type == InputType.IMAGE:
            pipeline_result = run_image_pipeline(data, filename=file.filename)
        elif input_type == InputType.DOCUMENT:
            pipeline_result = run_document_pipeline(data, filename=file.filename)
        else:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail="Unsupported upload type. Use /validate-text for text.",
            )

        decision = decide(pipeline_result)
        logger.info(
            f"/validate complete: input_type={decision.input_type}, "
            f"verdict={decision.verdict.value}, confidence={decision.confidence}"
        )
        return decision

    except HTTPException:
        raise
    except ValueError as exc:
        logger.error(f"/validate value error: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error(f"/validate failed: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during validation",
        )


@app.post("/validate-text", response_model=DecisionResult, tags=["Validation"])
async def validate_text(request: ValidateTextRequest) -> DecisionResult:
    """Validate a text statement through the text pipeline and decision engine."""
    text = request.text.strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty text provided",
        )

    logger.info(f"/validate-text entry: length={len(text)}")

    try:
        pipeline_result = run_text_pipeline(text)
        decision = decide(pipeline_result)
        logger.info(
            f"/validate-text complete: input_type={decision.input_type}, "
            f"verdict={decision.verdict.value}, confidence={decision.confidence}"
        )
        return decision
    except ValueError as exc:
        logger.error(f"/validate-text value error: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
    except Exception as exc:
        logger.error(f"/validate-text failed: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during validation",
        )


# ============================================================================
# Exception Handlers
# ============================================================================


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.warning(f"HTTP exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "Internal server error", "status_code": 500},
    )


if __name__ == "__main__":
    import uvicorn

    s = get_settings()
    logger.info(f"Starting server at {s.host}:{s.port}")
    uvicorn.run(
        "main:app",
        host=s.host,
        port=s.port,
        reload=s.debug,
        workers=1 if s.debug else s.workers,
        log_level=s.log_level.lower(),
    )
