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

export const updateEmail = (bcc, question) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        bcc,
        subject: 'New Question Added',
        html : `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Question Added</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 10px;
        }

        .header h1 {
            margin: 0;
            color: #007BFF;
        }

        .content {
            margin-bottom: 20px;
        }

        .content h1 {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }

        .content h4 {
            font-size: 17px;
            font-weight: 500;
            color: #333;
            margin-bottom: 15px;
        }

        .content h3 {
            background-color: #d4edda;
            color: #155724;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #707070;
            margin-bottom: 20px;
        }

        .content code {
            display: block;
            font-size: 16px;
            line-height: 1.6;
            color: #707070;
            background-color: #f8f9fa;
            padding: 8px;
            border-radius: 4px;
        }

        .button {
            display: inline-block;
            width: 95%;
            background-color: #007BFF;
            color: #FFFFFF;
            padding: 12px 16px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .button:hover {
            background-color: #0056b3;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
        }

        .footer a {
            color: #007BFF;
            text-decoration: none;
        }

        .flex {
            display: flex;
        }

        .justify-between {
            justify-content: space-between;
        }

        .items-start {
            align-items: flex-start;
        }

        .justify-start {
            justify-content: flex-start;
        }

        .bg-gray-100 {
            background-color: #f8f9fa;
        }

        .text-blue-600 {
            color: #0056b3;
        }

        .bg-green-200 {
            background-color: #d4edda;
        }

        .text-black {
            color: #000;
        }

        .p-1 {
            padding: 4px;
        }

        .p-2 {
            padding: 8px;
        }

        .px-4 {
            padding-left: 16px;
            padding-right: 16px;
        }

        .py-2 {
            padding-top: 8px;
            padding-bottom: 8px;
        }

        .rounded {
            border-radius: 4px;
        }

        .text-3xl {
            font-size: 1.875rem;
        }

        .text-2xl {
            font-size: 1.5rem;
        }

        .text-xl {
            font-size: 1.25rem;
        }

        .text-lg {
            font-size: 1.125rem;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>New Question Added</h1>
        </div>
        <div class="content">
            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-3xl font-bold">${question.title}</h1>
                    <h4 class="text-lg font-500">Publish By <span class="bg-gray-100 text-blue-600 p-1 rounded">${question.createdby ||" Sabat Ali"}</span> in <span class="bg-gray-100 text-blue-600 p-1 rounded">${question.language}</span></h4>
                </div>
                <div class="flex justify-start items-start">
                    <h3 class="bg-green-200 text-black px-4 py-2 rounded">${question.difficulty}</h3>
                </div>
            </div>
            <p class="text-xl">${question.description}</p>

            <h1 class="text-2xl font-bold">Hint</h1>
            <code>${question.hint}</code>
        </div>
        <a href="https://code-p.vercel.app/" class="button">Solve Now</a>

        <div class="footer">
            <p>Thank you for your participation!</p>
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
        </div>
    </div>
</body>

</html>
`,
    };

    return transporter.sendMail(mailOptions);
};
