import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def get_gemini_model(api_key=None):
    key = api_key or os.getenv("GEMINI_API_KEY")
    if not key:
        raise ValueError("GEMINI_API_KEY is not set.")
    genai.configure(api_key=key)
    # Using 1.5 pro for better reasoning and instruction following
    return genai.GenerativeModel('gemini-1.5-pro')

def improve_text(text: str, context: str, api_key: str = None) -> str:
    model = get_gemini_model(api_key)
    prompt = f"""You are an expert ATS resume writer and editor. 
    Please improve the following text for a resume section: '{context}'. 
    Make it professional, impactful, and start with strong action verbs if it's an experience bullet. 
    Fix any grammatical errors and ensure ATS keyword optimization.
    Return ONLY the improved text, no additional conversational text.
    
    Text to improve:
    {text}
    """
    response = model.generate_content(prompt)
    return response.text.strip()

def suggest_completion(partial_text: str, context: str, api_key: str = None) -> str:
    model = get_gemini_model(api_key)
    prompt = f"""You are a smart autocomplete assistant for a resume builder.
    The user is typing in the '{context}' section of their resume.
    Suggest a professional continuation for the following partial text.
    Keep it concise and relevant. Return ONLY the suggested continuation (what comes immediately after the partial text). Do NOT repeat the partial text.
    
    Partial text:
    {partial_text}
    """
    response = model.generate_content(prompt)
    return response.text.strip()

def generate_summary(resume_data_dict: dict, api_key: str = None) -> str:
    model = get_gemini_model(api_key)
    prompt = f"""Based on the following candidate information, generate a professional 2-3 sentence resume summary.
    Ensure it highlights their key strengths and is ATS friendly.
    Return ONLY the summary text. No other commentary.
    
    Data:
    {resume_data_dict}
    """
    response = model.generate_content(prompt)
    return response.text.strip()
