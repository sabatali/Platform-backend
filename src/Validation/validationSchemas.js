import { z } from 'zod';

const userRegistrationSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

const otpVerificationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().length(6, { message: "OTP must be 6 digits" })
});

export { userRegistrationSchema, otpVerificationSchema };
