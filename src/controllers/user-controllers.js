import User from "../models/user.js";

export const register = async (req, res) => {    
    try {
        const { email, username } = req.body;

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

        const user = await User.create(req.body);
        const token = user.generateToken();

        return res.status(201).json({
            status: "success",
            message: "User Created Successfully",
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
