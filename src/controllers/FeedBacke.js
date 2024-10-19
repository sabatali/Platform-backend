import { UserUpdateMail } from "../utils/UserUpdateMail.js";

export const FeedBack = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        const adminEmail = "maliksabatali@gmail.com";
        const bcc = ""; 

        const adminSubject = "Feedback of Code P";
        const adminEmailContent = `User ${fullName} (${email}) sent the following feedback: \n\n${message}`;
        
        const adminMailResponse = await UserUpdateMail(adminEmail, bcc, adminSubject, adminEmailContent);

        const userSubject = "Feedback on Code P Received";
        const userEmailContent = `Dear ${fullName},\n\nThank you for your valuable feedback on Code P! We appreciate your input and will review it carefully.`;
        
        const userMailResponse = await UserUpdateMail(email, bcc, userSubject, userEmailContent);

        res.status(200).json({
            status: "success",
            message: "Thank you for your feedback. A confirmation email has been sent.",
        });

    } catch (error) {
        console.error("Error while sending email:", error);
        res.status(500).json({
            status: "error",
            message: "There was an error sending your feedback. Please try again later.",
        });
    }
};
