import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'


interface SendEmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            });
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{
                $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            });
        }
        
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const redirectUrl =
            emailType === "VERIFY"
                ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

        const mailOptions = {
            from: "kapil@kapil.ai",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: ` <p>Click <a href="${redirectUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
                    <p>Or copy and paste the following link in your browser:</p>
                    <p>${redirectUrl}</p>`,
        };
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}