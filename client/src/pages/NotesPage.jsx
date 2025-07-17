import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote
} from '../services/noteService';
import '../assets/mynotes.css';

export default function NotesPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', content: '' });

  const [editingNote, setEditingNote] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchNotes = async () => {
      try {
        const data = await getAllNotes(token);
        setNotes(data);
      } catch (err) {
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user, token]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEditChange = (e) => setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(token, form);
      setForm({ title: '', content: '' });
      const updated = await getAllNotes(token);
      setNotes(updated);
    } catch {
      alert('Failed to create note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(token, id);
      const updated = await getAllNotes(token);
      setNotes(updated);
    } catch {
      alert('Failed to delete note');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(token, editingNote._id, editForm);
      setEditingNote(null);
      const updated = await getAllNotes(token);
      setNotes(updated);
    } catch {
      alert('Failed to update note');
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setEditForm({ title: note.title, content: note.content });
  };

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div id="notes-wrapper">
      <h2>Your Notes</h2>

      <div className="notes-container">
        {/* Add Note Card */}
        <div className="note-card add-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              placeholder="Note Content"
              value={form.content}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Note</button>
          </form>
        </div>

        {/* Existing Notes */}
        {notes.map(note => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <div className="note-content">{note.content}</div>
            <div className="note-actions">
              <button onClick={() => handleDelete(note._id)}>🗑 Delete</button>
              <button onClick={() => startEdit(note)}>✏️ Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Note Form */}
      {editingNote && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <h3>Edit Note</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                required
              />
              <div className="note-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
