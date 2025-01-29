import express from 'express';
import { CreateNewNotes, UpdateNotes, getAllNotes } from '../controllers/Notes.js';

const notesRoutes = express.Router();

notesRoutes.post('/create_new_notes', CreateNewNotes)
notesRoutes.post('/update_notes', UpdateNotes)
notesRoutes.get('/getnotes', getAllNotes)


export default notesRoutes
