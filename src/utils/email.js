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

export const sendVerificationEmail = (name ,email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email Address',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding: 10px 0;
                    }
                    .header img {
                        width: 100px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content h1 {
                        color: #333333;
                    }
                    .content p {
                        color: #666666;
                        line-height: 1.6;
                    }
                    .otp {
                        display: block;
                        width: 100%;
                        text-align: center;
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 0;
                        margin: 20px 0;
                        font-size: 20px;
                        font-weight: bold;
                        border-radius: 4px;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px 0;
                        color: #999999;
                        font-size: 12px;
                    }
                    .footer a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://yourcompanylogo.com/logo.png" alt="Company Logo">
                    </div>
                    <div class="content">
                        <h1>Email Verification</h1>
                        <p>Hi ${name},</p>
                        <p>Thank you for registering with us. Please use the OTP below to verify your email address:</p>
                        <div class="otp">${otp}</div>
                        <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
                        <p>Thank you,<br>The YourCompany Team</p>
                    </div>
                    <div class="footer">
                        <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
                        <p>© 2024 YourCompany. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    return transporter.sendMail(mailOptions);
};
