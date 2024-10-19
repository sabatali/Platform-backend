

// utils/email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const UserUpdateMail= (email , bcc, emailContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        bcc,
        subject: 'New Question Added',
        html : emailContent,
    };

    return transporter.sendMail(mailOptions);
};
