from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import Optional
from models import ResumeData, ImproveRequest, SuggestionRequest
import ai_service
from export_service import create_docx
import uvicorn
import os

app = FastAPI(title="AI Resume Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI Resume Builder API is running"}

@app.post("/api/improve")
def improve_content(request: ImproveRequest, x_api_key: Optional[str] = Header(None)):
    try:
        improved = ai_service.improve_text(request.text, request.context, x_api_key)
        return {"improved_text": improved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/suggest")
def suggest_text(request: SuggestionRequest, x_api_key: Optional[str] = Header(None)):
    try:
        suggestion = ai_service.suggest_completion(request.partial_text, request.context, x_api_key)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-summary")
def generate_summary(data: ResumeData, x_api_key: Optional[str] = Header(None)):
    try:
        summary = ai_service.generate_summary(data.model_dump(), x_api_key)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/export/docx")
def export_docx(data: ResumeData):
    try:
        file_path = create_docx(data.model_dump())
        return FileResponse(
            path=file_path, 
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            filename=os.path.basename(file_path)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
