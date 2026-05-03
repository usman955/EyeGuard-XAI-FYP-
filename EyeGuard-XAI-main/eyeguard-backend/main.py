from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="EyeGuard-XAI API")

# Setup CORS to allow React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["Chatbot"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "EyeGuard-XAI Backend is running"}
