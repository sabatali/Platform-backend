import { register, verifyEmail, userData, login, AdminMail, UpdateUser } from "../controllers/user-controllers.js";
import express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const regRoute = express.Router();

regRoute.post("/register", register);
regRoute.post("/verifyemail", verifyEmail);
regRoute.post("/login", login)
regRoute.post("/adminmail/:id", AdminMail)
regRoute.post("/updateuser/:id", UpdateUser)
regRoute.get("/userdata", authMiddleware, userData)


export default regRoute;
