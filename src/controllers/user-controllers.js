import User from "../models/user.js";
import { sendVerificationEmail } from "../utils/email.js";
import { UserUpdateMail } from "../utils/UserUpdateMail.js";
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



  export const AdminMail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ AdminMail ~ id:", id);

    const userExist = await User.findOne({ _id: id });
    console.log("🚀 ~ AdminMail ~ userExist:", userExist);

    if (!userExist) {
      return res.status(200).json({
        status: "fail",
        message: "User does not exist",
      });
    }

    const approveLink = `https://platform-backend-6njk.onrender.com/api/v1/updateuser/${id}`;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="text-align: center; color: #4CAF50;">New User Registration</h1>
        <p style="font-size: 16px; color: #333;">A new user has registered on your platform. Please review the details below and take the appropriate action:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <p style="font-size: 16px; margin: 0;"><strong>Email:</strong> ${userExist.email}</p>
          <p style="font-size: 16px; margin: 0;"><strong>Name:</strong> ${userExist.fullName}</p>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${approveLink}" style="text-decoration: none; padding: 10px 20px; color: white; background-color: #4CAF50; border-radius: 5px; font-size: 16px;">Approve As Admin</a>
        </div>
      </div>
    `;

    const to = "maliksabatali@gmail.com";
    const bcc = "";

    const emailResponse = await UserUpdateMail(to, bcc, emailContent);
    console.log("🚀 ~ AdminMail ~ emailResponse:", emailResponse);

    return res.status(200).json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("🚀 ~ AdminMail ~ error:", error);
    return res.status(500).json({ status: "error", message: "Error in sending admin mail." });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const role = "editer";

    const userExist = await User.findOne({ _id: id });
    console.log("🚀 ~ UpdateUser ~ userExist:", userExist);

    userExist.role = role;
    await userExist.save();

    if (!userExist) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const emailContent = `
      <div style="width: 80%; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; color: #ffffff; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0;">
          <h2>Registration Approved</h2>
        </div>
        <div style="margin: 20px 0;">
          <p>Dear ${userExist.fullName || "User"},</p>
          <p>We are pleased to inform you that your registration has been approved. You are now an active member of our community!</p>
          <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="https://costal-frontend.vercel.app/" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Log In</a>
          </p>
          <p>Best regards,<br/>The Costal Team</p>
        </div>
        <div style="text-align: center; color: #777777; font-size: 12px; margin-top: 20px;">
          <p>&copy; 2024 Costal. All rights reserved.</p>
        </div>
      </div>
    `;

    const to = "maliksabatali@gmail.com";
    const bcc = userExist.email;

    await UserUpdateMail(to, bcc, emailContent);

    res.send(`
      <div style="width: 80%; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; color: #ffffff; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0;">
          <h2>Registration Approved</h2>
        </div>
        <div style="margin: 20px 0;">
          <p>Dear SUPER Admin,</p>
          <p>We are pleased to inform you that the request has been approved!</p>
          <p>Best regards,<br/>The Coastal Team</p>
        </div>
        <div style="text-align: center; color: #777777; font-size: 12px; margin-top: 20px;">
          <p>&copy; 2024 Coastal. All rights reserved.</p>
        </div>
      </div>
    `);
  } catch (error) {
    console.error("🚀 ~ UpdateUser ~ error:", error);
    return res.status(500).json({ status: "error", message: "Error approving user." });
  }
};
