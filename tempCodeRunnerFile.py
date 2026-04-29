import os
import streamlit as st
import json
from openai import OpenAI
from prompts import get_resume_prompt
from resume_doc import create_docx

st.set_page_config(page_title="AI Resume Builder")

api_key = os.getenv("OPENAI_API_KEY") or st.secrets.get("OPENAI_API_KEY")
client = None

if not api_key:
    st.warning("Set OPENAI_API_KEY in your environment or add it to Streamlit secrets.")
else:
    client = OpenAI(api_key=api_key)

st.title("AI Resume Builder MVP")

with st.form("resume_form"):
    st.subheader("Your Info")
    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input("Full Name")
        email = st.text_input("Email")
    with col2:
        phone = st.text_input("Phone")

    jd = st.text_area("Paste Job Description", height=200)
    exp = st.text_area("Paste Your Experience", height=200,
                       help="Rough bullets fine. Include company + dates if you have them.")

    submitted = st.form_submit_button("Generate Resume", disabled=not api_key)

if submitted:
    if not api_key:
        st.error("OpenAI API key is not configured. Set OPENAI_API_KEY or add it to Streamlit secrets.")
    elif not all([name, email, jd, exp]):
        st.error("Fill all fields")
    else:
        with st.spinner("AI is writing..."):
            prompt = get_resume_prompt(jd, exp, name, email, phone)

            response = client.chat.completions.create(
                model="gpt-4o",
                response_format={"type": "json_object"},
                messages=[{"role": "user", "content": prompt}]
            )

            try:
                resume_data = json.loads(response.choices[0].message.content)
                st.success("Done!")
                st.json(resume_data)

                file_path = create_docx(resume_data, name, email, phone)
                with open(file_path, "rb") as file:
                    st.download_button(
                        label="Download DOCX Resume",
                        data=file,
                        file_name=f"{name.replace(' ', '_')}_Resume.docx"
                    )
            except Exception as e:
                st.error(f"Error: {e}. Raw output below:")
                st.code(response.choices[0].message.content)