import express from 'express';
import { compileJavaCode } from '../controllers/compilerController.js';

const compilerRoute = express.Router();

compilerRoute.post("/compiler", compileJavaCode);

export default compilerRoute;
