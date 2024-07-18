import { register } from "../controllers/user-controllers.js";
import express from 'express';

const regRoute = express.Router();

regRoute.post("/register", register);

export default regRoute;
