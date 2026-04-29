import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education } = data;

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #1a1a1a', paddingBottom: '10px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'normal', margin: '0 0 5px 0' }}>
            {personalInfo.name || 'Your Name'}
          </h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#444', lineHeight: '1.4' }}>
          <div>{personalInfo.location}</div>
          <div>{personalInfo.phone}</div>
          <div>{personalInfo.email}</div>
          <div>{personalInfo.linkedin}</div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ fontSize: '13px', lineHeight: '1.6', fontStyle: 'italic' }}>
          {summary}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontSize: '12px', color: '#666' }}>{exp.dates}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#444', marginBottom: '6px' }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.5' }}>
                  {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{edu.degree}</div>
                  <div style={{ fontSize: '12px', color: '#444' }}>{edu.school}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>{edu.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px' }}>Expertise</h2>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.6', color: '#333' }}>
              {skills.split(',').map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
