import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    secure: process.env.SMTP_TLS === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendConfirmationEmail = async (email: string, confirmationToken: string) => {
    const confirmationUrl = `${process.env.APP_URL}/api/confirm-email?token=${confirmationToken}`;

    const message = {
        from: process.env.SMTP_FROM_EMAIL,
        to: email,
        subject: 'Confirmez votre email',
        text: `Veuillez cliquer sur ce lien pour confirmer votre email : ${confirmationUrl}`,
    };

    await transporter.sendMail(message);
};
