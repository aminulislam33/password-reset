const nodemailer = require('nodemailer');

async function handleSendEmail(email, subject, text){

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: `Password link is here: ${text}`
        });
    } catch (error) {
        console.log(error)
    }
};

module.exports = handleSendEmail;