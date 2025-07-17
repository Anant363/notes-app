import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/notes';

export const getAllNotes = async (token) => {
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createNote = async (token, noteData) => {
  const res = await axios.post(API_BASE, noteData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteNote = async (token, noteId) => {
  const res = await axios.delete(`${API_BASE}/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateNote = async (token, noteId, updatedData) => {
  const res = await axios.put(`${API_BASE}/${noteId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
