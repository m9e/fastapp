# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.modules.widgets.api import router as widgets_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(widgets_router, prefix="/api/widgets", tags=["widgets"])

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI template"}

@app.get("/health", status_code=200)
async def health_check():
    return {"status": "healthy"}

# To add a new module:
# 1. Create a new directory under app/modules/
# 2. Implement api.py, models.py, schemas.py, and services.py
# 3. Import and include the new router here, following the pattern above