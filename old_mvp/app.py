import os
from dotenv import load_dotenv
import streamlit as st
import json
from openai import OpenAI, AuthenticationError
from prompts import get_resume_prompt
from resume_doc import create_docx

load_dotenv()

st.set_page_config(page_title="AI Resume Builder")
st.title("AI Resume Builder MVP")

api_key = os.getenv("OPENAI_API_KEY") or st.secrets.get("OPENAI_API_KEY")

if api_key:
    st.info("Using OpenAI key from environment or Streamlit secrets.")
else:
    st.warning("No OpenAI API key configured. Enter it below or set OPENAI_API_KEY.")

with st.form("resume_form"):
    st.subheader("Your Info")
    col1, col2 = st.columns(2)
    with col1:
        name = st.text_input("Full Name")
        email = st.text_input("Email")
    with col2:
        phone = st.text_input("Phone")

    api_key_input = st.text_input("OpenAI API Key (optional)", type="password")
    jd = st.text_area("Paste Job Description", height=200)
    exp = st.text_area(
        "Paste Your Experience",
        height=200,
        help="Rough bullets fine. Include company + dates if you have them."
    )
    submitted = st.form_submit_button("Generate Resume", disabled=not (api_key or api_key_input))

if submitted:
    effective_api_key = api_key_input.strip() if api_key_input else api_key

    if not effective_api_key:
        st.error("OpenAI API key is required. Enter it here or set OPENAI_API_KEY.")
    elif not all([name, email, jd, exp]):
        st.error("Fill all fields")
    else:
        client = OpenAI(api_key=effective_api_key)
        with st.spinner("AI is writing..."):
            prompt = get_resume_prompt(jd, exp, name, email, phone)
            try:
                response = client.chat.completions.create(
                    model="gpt-4o",
                    response_format={"type": "json_object"},
                    messages=[{"role": "user", "content": prompt}]
                )
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
            except AuthenticationError:
                st.error("Invalid OpenAI API key. Generate a new key at platform.openai.com/account/api-keys and try again.")
            except Exception as e:
                st.error(f"OpenAI request failed: {e}")
