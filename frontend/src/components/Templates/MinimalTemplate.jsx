import React from 'react';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, summary, skills, experience, education } = data;

  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#222', display: 'flex' }}>
      {/* Left Column */}
      <div style={{ width: '35%', paddingRight: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
          {personalInfo.name ? personalInfo.name.split(' ').join('\n') : 'Your\nName'}
        </h1>
        
        <div style={{ fontSize: '11px', color: '#555', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>

        {education && education.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: '#555' }}>{edu.school}</div>
                <div style={{ fontSize: '10px', color: '#888' }}>{edu.dates}</div>
              </div>
            ))}
          </div>
        )}

        {skills && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Skills</h2>
            <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '11px', color: '#555', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {skills.split(',').map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div style={{ width: '65%', paddingLeft: '20px', borderLeft: '1px solid #eee' }}>
        {summary && (
          <div style={{ marginBottom: '30px' }}>
             <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#444' }}>{summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }}>{exp.role}</div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>{exp.company} • {exp.dates}</div>
                <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '12px', lineHeight: '1.5', color: '#444' }}>
                  {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
