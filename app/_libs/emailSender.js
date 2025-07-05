import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `E-Com <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
}
