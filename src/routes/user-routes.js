import { register, verifyEmail, userData, login } from "../controllers/user-controllers.js";
import express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const regRoute = express.Router();

regRoute.post("/register", register);
regRoute.post("/verifyemail", verifyEmail);
regRoute.post("/login", login)
regRoute.get("/userdata", authMiddleware, userData)


export default regRoute;
