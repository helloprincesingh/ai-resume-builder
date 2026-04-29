import React from 'react';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education } = data;

  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12px' }}>
          {[
            personalInfo.location,
            personalInfo.phone,
            personalInfo.email,
            personalInfo.linkedin
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', textTransform: 'uppercase', marginBottom: '6px' }}>Summary</h2>
          <p style={{ fontSize: '12px', lineHeight: '1.4', margin: 0 }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', textTransform: 'uppercase', marginBottom: '8px' }}>Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
                  <span>{exp.company}</span>
                  <span>{exp.dates}</span>
                </div>
                <div style={{ fontStyle: 'italic', fontSize: '13px', marginBottom: '4px' }}>{exp.role}</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', lineHeight: '1.4' }}>
                  {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', textTransform: 'uppercase', marginBottom: '8px' }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{edu.school}</span> - {edu.degree}
                </div>
                <div>{edu.dates}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', textTransform: 'uppercase', marginBottom: '6px' }}>Skills</h2>
          <p style={{ fontSize: '12px', margin: 0 }}>{skills}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
