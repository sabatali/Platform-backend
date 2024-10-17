import express from 'express';
import { assingment, assingmentPrompt } from '../controllers/assingmentControllers.js';

const assingmentRoute = express.Router();

assingmentRoute.post("/assingment_prompt", assingmentPrompt);
assingmentRoute.post("/assingment", assingment);

export default assingmentRoute;
