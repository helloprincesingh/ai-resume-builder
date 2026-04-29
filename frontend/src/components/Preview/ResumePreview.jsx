import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';
import { exportDocx } from '../../services/api';
import ModernTemplate from '../Templates/ModernTemplate';
import ClassicTemplate from '../Templates/ClassicTemplate';
import MinimalTemplate from '../Templates/MinimalTemplate';
import ProfessionalTemplate from '../Templates/ProfessionalTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
  creative: ModernTemplate, // Fallback for MVP
};

const ResumePreview = ({ data, template }) => {
  const printRef = useRef();
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  const SelectedTemplate = templates[template] || ModernTemplate;

  const handleDownloadPDF = () => {
    setIsExportingPDF(true);
    const element = printRef.current;
    
    const opt = {
      margin:       0,
      filename:     `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsExportingPDF(false);
    });
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      const blob = await exportDocx(data);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Docx export error", error);
      alert("Failed to export DOCX. Make sure backend is running.");
    } finally {
      setIsExportingDocx(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={isExportingPDF}>
          <Download size={18} /> {isExportingPDF ? 'Generating...' : 'Download PDF'}
        </button>
        <button className="btn btn-secondary" onClick={handleDownloadDocx} disabled={isExportingDocx}>
          <Download size={18} /> {isExportingDocx ? 'Generating...' : 'Download DOCX'}
        </button>
      </div>
      
      <div className="resume-page" ref={printRef}>
        <SelectedTemplate data={data} />
      </div>
    </div>
  );
};

export default ResumePreview;
