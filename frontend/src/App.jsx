import { useState, useEffect } from 'react';
import ResumeForm from './components/Form/ResumeForm';
import ResumePreview from './components/Preview/ResumePreview';
import { Sun, Moon, Download, FileText } from 'lucide-react';
import './styles/global.css';

const initialData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com'
  },
  summary: 'Experienced Software Engineer with a passion for building scalable web applications and intuitive user interfaces. Strong background in React, Node.js, and Python. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.',
  skills: 'JavaScript, React, Node.js, Python, SQL, Git, AWS, Docker',
  experience: [
    {
      id: '1',
      role: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      dates: 'Jan 2020 - Present',
      description: 'Led the development of a microservices architecture that improved system scalability by 40%.\nMentored junior developers and established best practices for code reviews.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      school: 'University of Technology',
      dates: 'Sep 2015 - May 2019'
    }
  ],
  projects: []
};

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_data');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [theme, setTheme] = useState('light');
  const [apiKey, setApiKey] = useState('');
  const [activeTemplate, setActiveTemplate] = useState('modern');

  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1><FileText size={24} color="var(--primary)" /> AI Resume Builder</h1>
        
        <div className="header-actions">
          <input 
            type="password" 
            placeholder="Gemini API Key (optional)" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', width: '250px' }}
          />
          <select 
            value={activeTemplate} 
            onChange={(e) => setActiveTemplate(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="creative">Creative</option>
          </select>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="form-area">
          <ResumeForm data={data} setData={setData} apiKey={apiKey} />
        </div>
        <div className="preview-area">
          <ResumePreview data={data} template={activeTemplate} />
        </div>
      </main>
    </div>
  );
}

export default App;
