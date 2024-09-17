import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, enum: ['admin', 'contributor', 'user'], default: 'admin' },
    points: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.generateToken = function () {
    return jwt.sign(
        { userId: this._id.toString(), email: this.email, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const User = mongoose.model("User", UserSchema);

export default User;
