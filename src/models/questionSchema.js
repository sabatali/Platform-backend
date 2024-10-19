import mongoose from 'mongoose';

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['labQuestion', 'General', 'assignment'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  language: {
    type: String,
    enum: ['C++', 'C', 'JS',"Python", "Java"],
    required: true,
  },
  solutionDescription: {
    type: String,
    required: true,
  },
  solutionCode: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  videoLink: {
    type: String,
  },
  hint: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Question = mongoose.model('Question', questionSchema);

export default Question;
