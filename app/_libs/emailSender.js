import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `App <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
}
