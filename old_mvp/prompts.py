def get_resume_prompt(job_desc, user_exp, name, email, phone):
    return f"""
You are an expert ATS resume writer. Never invent facts.

Job Description:
{job_desc}

Candidate Info:
Name: {name}
Email: {email}
Phone: {phone}
Experience:
{user_exp}

Task: Return ONLY valid JSON with these exact keys:
1. "summary": 2-line professional summary tailored to the JD
2. "skills": array of 8-12 hard skills from JD that candidate has
3. "experience": array of objects with "role", "company", "dates", "bullets"
   where "bullets" is array of 3-5 rewritten achievements. Start with action verbs.
   Include JD keywords naturally. Do NOT add metrics unless provided.
4. "education": array of objects with "degree", "school", "dates"

Rules: If company/dates not in user experience, use "Company" / "2020-2023" as placeholders.
JSON only. No markdown.
"""