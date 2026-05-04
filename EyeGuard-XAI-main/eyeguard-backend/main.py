"""
============================================================================
File: main.py
Location: eyeguard-backend
Purpose: Core configuration, initialization, or entry point for the EyeGuard-XAI Machine Learning Backend.
This file is part of the EyeGuard-XAI automated screening system.
============================================================================
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat

app = FastAPI(
    title="EyeGuard-XAI API",
    description="Backend API for the EyeGuard-XAI application.",
    version="1.0.0"
)

# Configure CORS so the web frontend and mobile app can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the chat router
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the EyeGuard-XAI Backend API! The server is running successfully."}
