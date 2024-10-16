import express from 'express';
import { addQuestion, getAllQuestions, getSingleQuestion, deleteQuestion } from '../controllers/questionControllers.js';
import { searchBlos } from '../controllers/scraperControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { gemini } from '../controllers/geminiControllers.js';

const questionRoute = express.Router();

questionRoute.post("/question", authMiddleware, addQuestion);
questionRoute.get("/questions", getAllQuestions);
questionRoute.get("/question/:id", getSingleQuestion);
questionRoute.post("/question/:id", deleteQuestion);
questionRoute.post("/resources", searchBlos);
questionRoute.post("/aiapi", gemini);

export default questionRoute;
