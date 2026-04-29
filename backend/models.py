from pydantic import BaseModel
from typing import List, Optional

class Experience(BaseModel):
    id: str
    role: str
    company: str
    dates: str
    description: str

class Education(BaseModel):
    id: str
    degree: str
    school: str
    dates: str

class Project(BaseModel):
    id: str
    title: str
    technologies: str
    description: str
    link: Optional[str] = ""

class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    linkedin: Optional[str] = ""
    website: Optional[str] = ""

class ResumeData(BaseModel):
    personalInfo: PersonalInfo
    summary: str
    skills: str
    experience: List[Experience]
    education: List[Education]
    projects: List[Project]

class ImproveRequest(BaseModel):
    text: str
    context: str = ""

class SuggestionRequest(BaseModel):
    partial_text: str
    context: str
