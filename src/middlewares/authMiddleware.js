import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    
  const token = req.header("Authorization")

  if (!token) {
    return res.status(400).json({
      message: "Token Not Provided",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim(); 

   try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.user = userData,
    req.token = token,
    req.userID =  userData._id

    next();
   
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token.",
    });
  }
};