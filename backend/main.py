from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ModerationRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "ModPilot AI backend is running"}

@app.post("/analyze")
def analyze(request: ModerationRequest):

    text = request.text.lower()

    toxic_words = ["hate", "idiot", "stupid", "trash"]
    spam_words = ["buy now", "free money", "click here"]

    flags = []

    for word in toxic_words:
        if word in text:
            flags.append("Toxic Language")

    for word in spam_words:
        if word in text:
            flags.append("Spam Content")

    if len(flags) >= 2:
        action = "Remove"
        risk = "High"
    elif len(flags) == 1:
        action = "Warn"
        risk = "Medium"
    else:
        action = "Approve"
        risk = "Low"

    return {
        "risk": risk,
        "suggested_action": action,
        "flags": flags
    }