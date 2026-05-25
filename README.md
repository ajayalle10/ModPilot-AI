# ModPilot AI

ModPilot AI is an AI-powered Reddit moderation assistant that helps moderators detect toxic, spam, and harmful content while providing explainable moderation suggestions.

## Features
- Analyze Reddit posts or comments
- Detect toxic and spam-like content
- Suggest actions: Approve, Warn, or Remove
- Show risk level and flags
- Track moderation history
- Dashboard summary for checked, flagged, and safe content

## Tech Stack
- React
- Vite
- CSS
- Python
- FastAPI
- Uvicorn

## How to Run

### Backend
```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --reload