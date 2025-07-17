import express from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below are protected
router.use(authMiddleware);

// @route   GET /api/notes
router.get('/', getNotes);

router.get('/:id', getNoteById);

// @route   POST /api/notes
router.post('/', createNote);

// @route   PUT /api/notes/:id
router.put('/:id', updateNote);

// @route   DELETE /api/notes/:id
router.delete('/:id', deleteNote);

export default router;
