import { createTransport } from "nodemailer";

export const sendMail = async (userMessage) => {
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
    })

    await transporter.sendMail({ 
        subject:"CONTACT REQUIRED FOR PROTFOLIO",
        to:process.env.SMTP_TO,
        from:process.env.SMTP_MAIL,
        text:userMessage,
    })
    

}