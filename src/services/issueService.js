import axios from 'axios';

const API_URL = 'http://localhost:3001/issues';

export const getIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createIssue = async (issue) => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

export const updateIssue = async (id, updates) => {
  const response = await axios.patch(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteIssue = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
