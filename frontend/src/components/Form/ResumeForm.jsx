import React from 'react';
import SmartTextarea from './SmartTextarea';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { generateSummary } from '../../services/api';

const ResumeForm = ({ data, setData, apiKey }) => {
  
  const updatePersonalInfo = (field, value) => {
    setData({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const handleGenerateSummary = async () => {
    try {
      const summary = await generateSummary(data, apiKey);
      if (summary) {
        setData({ ...data, summary });
      }
    } catch (error) {
      console.error("Summary generation error", error);
      alert("Failed to generate summary. Is your API key correct?");
    }
  };

  const updateItem = (section, index, field, value) => {
    const newItems = [...data[section]];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, [section]: newItems });
  };

  const addItem = (section, defaultItem) => {
    setData({ ...data, [section]: [...data[section], { id: Date.now().toString(), ...defaultItem }] });
  };

  const removeItem = (section, index) => {
    const newItems = [...data[section]];
    newItems.splice(index, 1);
    setData({ ...data, [section]: newItems });
  };

  return (
    <div className="resume-form">
      {/* Personal Info */}
      <section className="form-section">
        <h2>Personal Information</h2>
        <div className="grid-2">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" value={data.personalInfo.name} onChange={e => updatePersonalInfo('name', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type="text" value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input type="text" value={data.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} />
          </div>
          <div className="input-group">
            <label>LinkedIn (Optional)</label>
            <input type="text" value={data.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Website (Optional)</label>
            <input type="text" value={data.personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="form-section">
        <h2>
          Professional Summary
          <button className="btn btn-secondary flex items-center gap-2" onClick={handleGenerateSummary} style={{ fontSize: '0.875rem' }}>
            <Sparkles size={16} color="var(--primary)" /> Generate
          </button>
        </h2>
        <SmartTextarea
          value={data.summary}
          onChange={val => setData({ ...data, summary: val })}
          context="Professional Summary"
          apiKey={apiKey}
          placeholder="Briefly describe your professional background and goals."
        />
      </section>

      {/* Skills */}
      <section className="form-section">
        <h2>Skills</h2>
        <SmartTextarea
          value={data.skills}
          onChange={val => setData({ ...data, skills: val })}
          context="Skills"
          apiKey={apiKey}
          placeholder="List your skills separated by commas (e.g. JavaScript, React, Node.js)"
          rows={3}
        />
      </section>

      {/* Experience */}
      <section className="form-section">
        <h2>Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={exp.id} style={{ border: '1px dashed var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div className="flex justify-between mb-2">
              <h3 style={{ fontSize: '1rem' }}>Role {index + 1}</h3>
              <button className="btn btn-danger" onClick={() => removeItem('experience', index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Job Title</label>
                <input type="text" value={exp.role} onChange={e => updateItem('experience', index, 'role', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Company</label>
                <input type="text" value={exp.company} onChange={e => updateItem('experience', index, 'company', e.target.value)} />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Dates (e.g. Jan 2020 - Present)</label>
                <input type="text" value={exp.dates} onChange={e => updateItem('experience', index, 'dates', e.target.value)} />
              </div>
            </div>
            <SmartTextarea
              label="Description (Bullets)"
              value={exp.description}
              onChange={val => updateItem('experience', index, 'description', val)}
              context={`Experience description for ${exp.role} at ${exp.company}`}
              apiKey={apiKey}
              placeholder="Describe your achievements and responsibilities."
            />
          </div>
        ))}
        <button className="btn btn-secondary w-full" onClick={() => addItem('experience', { role: '', company: '', dates: '', description: '' })}>
          <Plus size={16} /> Add Experience
        </button>
      </section>

      {/* Education */}
      <section className="form-section">
        <h2>Education</h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} style={{ border: '1px dashed var(--border-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
             <div className="flex justify-between mb-2">
              <h3 style={{ fontSize: '1rem' }}>Education {index + 1}</h3>
              <button className="btn btn-danger" onClick={() => removeItem('education', index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Degree / Certificate</label>
                <input type="text" value={edu.degree} onChange={e => updateItem('education', index, 'degree', e.target.value)} />
              </div>
              <div className="input-group">
                <label>School / University</label>
                <input type="text" value={edu.school} onChange={e => updateItem('education', index, 'school', e.target.value)} />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Dates</label>
                <input type="text" value={edu.dates} onChange={e => updateItem('education', index, 'dates', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-secondary w-full" onClick={() => addItem('education', { degree: '', school: '', dates: '' })}>
          <Plus size={16} /> Add Education
        </button>
      </section>
      
      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default ResumeForm;
