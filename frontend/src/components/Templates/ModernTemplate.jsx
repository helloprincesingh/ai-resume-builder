import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education } = data;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#333', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #4F46E5', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 5px 0' }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '13px', color: '#4B5563' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#4F46E5', textTransform: 'uppercase', marginBottom: '8px' }}>Profile</h2>
          <p style={{ fontSize: '13px', lineHeight: '1.6' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#4F46E5', textTransform: 'uppercase', marginBottom: '12px' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: '500' }}>{exp.dates}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500', marginBottom: '6px' }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.5' }}>
                  {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#4F46E5', textTransform: 'uppercase', marginBottom: '12px' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 2px 0' }}>{edu.degree}</h3>
                  <div style={{ fontSize: '13px', color: '#4B5563' }}>{edu.school}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{edu.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#4F46E5', textTransform: 'uppercase', marginBottom: '12px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.split(',').map((skill, i) => (
                <span key={i} style={{ background: '#EEF2FF', color: '#4F46E5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
