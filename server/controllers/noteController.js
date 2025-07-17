import Note from '../models/Note.js';

// @desc   Get all notes for logged-in user
// @route  GET /api/notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
  }
};

// @desc   Get a single note by ID
// @route  GET /api/notes/:id
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch note', error: error.message });
  }
};


// @desc   Create a new note
// @route  POST /api/notes
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newNote = new Note({
      user: req.userId,
      title,
      content
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note', error: error.message });
  }
};

// @desc   Update a note
// @route  PUT /api/notes/:id
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update note', error: error.message });
  }
};

// @desc   Delete a note
// @route  DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note', error: error.message });
  }
};
