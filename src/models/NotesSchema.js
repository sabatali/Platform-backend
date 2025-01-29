import mongoose from 'mongoose';

// Define the schema for questions
const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  topic: {
    type: String,
  },
  asset_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Notes = mongoose.model('Notes', notesSchema);

export default Notes;
