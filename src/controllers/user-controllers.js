import User from "../models/user.js";
import { sendVerificationEmail } from "../utils/email.js";
import { otpVerificationSchema, userRegistrationSchema } from "../Validation/validationSchemas.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {

        userRegistrationSchema.parse(req.body);

        const { email, username, fullName, password, phone } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        const emailExist = await User.findOne({ email });
        const usernameExist = await User.findOne({ username });

        if (emailExist) {
            return res.status(400).json({
                status: "fail",
                message: "Email Already Exists"
            });
        }

        if (usernameExist) {
            return res.status(400).json({
                status: "fail",
                message: "Username Already Exists, Please Choose a Unique Username"
            });
        }

        const user = await User.create({
            fullName,
            username,
            email,
            password,
            phone,
            otp,
            otpExpires
        });

        await sendVerificationEmail(fullName, email, otp);

        return res.status(201).json({
            status: "250",
            message: "User registered. OTP sent to email.",
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: `Internal Server Error: ${error.message}`
        });
    }
};

export const verifyEmail = async (req, res) => {
    try {

        otpVerificationSchema.parse(req.body);

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Email not found"
            });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid OTP or expired"
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = user.generateToken();

        return res.status(200).json({
            status: "201",
            message: "Email verified successfully.",
            data: user,
            userId: user._id.toString(),
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: `Internal Server Error: ${error.message}`
        });
    }
};



export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid Credentials",
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, userExist.password);
      console.log("🚀 ~ login ~ isPasswordMatch:", isPasswordMatch);
  
      if (isPasswordMatch) {
        return res.status(200).json({
          status: "success",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
          message: "Login Successfully",
        });
      } else {
        return res.status(200).json({
          status: "fail",
          message: "Invalid Credentials",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: `Internal server error ${error.message}`
      });
    }
  };
  

export const userData = async (req, res) => {
    try {
      const userData = req.user
      res.status(200).json({
        data : userData,
        message: "successfully resived data"
      })
    } catch (error) {
      console.log(`error : ${error}`)
    }
  }