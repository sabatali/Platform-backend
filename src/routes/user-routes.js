import { register, verifyEmail, userData, login, AdminMail, UpdateUser } from "../controllers/user-controllers.js";
import express from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { FeedBack } from "../controllers/FeedBacke.js";

const regRoute = express.Router();

regRoute.post("/register", register);
regRoute.post("/verifyemail", verifyEmail);
regRoute.post("/login", login)
regRoute.post("/adminmail/:id", AdminMail)
regRoute.get("/updateuser/:id", UpdateUser)
regRoute.post("/feedbacke", FeedBack)
regRoute.get("/userdata", authMiddleware, userData)


export default regRoute;
