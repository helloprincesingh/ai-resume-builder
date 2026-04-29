import React, { useState, useEffect, useRef } from 'react';
import { suggestText, improveText } from '../../services/api';
import { Sparkles } from 'lucide-react';

const SmartTextarea = ({ value, onChange, context, apiKey, label, placeholder, rows = 4 }) => {
  const [suggestion, setSuggestion] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const typingTimerRef = useRef(null);
  
  const handleImprove = async () => {
    if (!value.trim()) return;
    setIsImproving(true);
    try {
      const improved = await improveText(value, context, apiKey);
      if (improved) {
        onChange(improved);
      }
    } catch (error) {
      console.error('Improve text error:', error);
    } finally {
      setIsImproving(false);
    }
  };

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSuggestion(''); // Clear suggestion on type
    
    // Auto-suggest logic when paused typing
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    
    if (newValue.trim().length > 10 && newValue.endsWith(' ')) {
      typingTimerRef.current = setTimeout(async () => {
        setIsSuggesting(true);
        try {
          // Send last 50 chars as context
          const partial = newValue.slice(-50);
          const completion = await suggestText(partial, context, apiKey);
          if (completion) {
            setSuggestion(completion);
          }
        } catch (error) {
          console.error('Suggestion error:', error);
        } finally {
          setIsSuggesting(false);
        }
      }, 1000);
    }
  };

  const applySuggestion = () => {
    onChange(value + suggestion);
    setSuggestion('');
  };

  return (
    <div className="input-group">
      <div className="flex justify-between items-center mb-2">
        <label style={{ marginBottom: 0 }}>{label}</label>
        <button 
          type="button"
          className="btn btn-secondary flex items-center gap-2" 
          onClick={handleImprove}
          disabled={isImproving || !value}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
        >
          <Sparkles size={14} color="var(--primary)" />
          {isImproving ? 'Improving...' : 'AI Improve'}
        </button>
      </div>
      <div className="smart-input-wrapper">
        <textarea
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={rows}
        />
        {suggestion && (
          <div className="suggestion-box">
            <div className="suggestion-item flex justify-between items-center" onClick={applySuggestion}>
              <span style={{ color: 'var(--text-secondary)' }}>{value}... <b>{suggestion}</b></span>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>Tab to apply</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTextarea;
