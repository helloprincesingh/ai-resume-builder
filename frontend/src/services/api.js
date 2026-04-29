import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const improveText = async (text, context, apiKey) => {
  const response = await api.post('/improve', { text, context }, {
    headers: { 'x-api-key': apiKey }
  });
  return response.data.improved_text;
};

export const suggestText = async (partial_text, context, apiKey) => {
  const response = await api.post('/suggest', { partial_text, context }, {
    headers: { 'x-api-key': apiKey }
  });
  return response.data.suggestion;
};

export const generateSummary = async (data, apiKey) => {
  const response = await api.post('/generate-summary', data, {
    headers: { 'x-api-key': apiKey }
  });
  return response.data.summary;
};

export const exportDocx = async (data) => {
  const response = await api.post('/export/docx', data, {
    responseType: 'blob' // Important for handling binary data
  });
  return response.data;
};
