from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import os

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    role: str = "user" # 'user' or 'doctor'
    history: list[dict] = []

class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
def get_chat_response(request: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenRouter API key is not configured.")

    # Base system prompt configuring the persona
    system_prompt = (
        "You are the EyeGuard-XAI Assistant, an educational and clinical AI designed to help with retinal disease screening. "
        "The system detects Diabetic Retinopathy, Glaucoma, AMD, and Hypertensive Retinopathy using a CNN model and Grad-CAM heatmaps. "
        "Always be helpful, concise, and clarify that you provide educational guidance or screening support, not clinical diagnosis."
    )
    
    # Adapt tone based on the role
    if request.role == 'doctor':
        system_prompt += " You are speaking to a medical professional (doctor). Provide detailed, clinical, and precise information regarding model parameters, pathologies, and Grad-CAM interpretation."
    else:
        system_prompt += " You are speaking to a general user/patient. Keep explanations simple, reassuring, and easy to understand. Avoid overly complex medical jargon unless explaining it simply."

    # Construct the message payload
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history
    for msg in request.history:
        messages.append({
            "role": "assistant" if msg.get("isBot") else "user",
            "content": msg.get("text", "")
        })
        
    # Add current message
    messages.append({"role": "user", "content": request.message})

    # Call OpenRouter API
    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "EyeGuard-XAI",
            },
            json={
                "model": "meta-llama/llama-3-8b-instruct",
                "messages": messages,
                "temperature": 0.5,
                "max_tokens": 300,
            }
        )
        response.raise_for_status()
        data = response.json()
        
        reply = data["choices"][0]["message"]["content"]
        return ChatResponse(response=reply)
        
    except requests.exceptions.RequestException as e:
        print(f"Error calling OpenRouter: {e}")
        # Return a fallback response so the UI doesn't completely break on API failure
        return ChatResponse(response="I'm sorry, I am currently experiencing connection issues to my AI brain. Please try again later.")
