import crypto from 'crypto';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '@/app/_libs/emailSender';

const getOTPEmailTemplate = (otp, email) => {
  const templatePath = path.join('app/_libs', 'otpTemplate.html');
  let html = fs.readFileSync(templatePath, 'utf-8');
  html = html.replace('{{otp}}', otp);
  html = html.replace('{{email}}', email);
  return html;
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.active !== false) {
      return new NextResponse(
        'Your account is active. Please log in to continue.',
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user;

    if (existingUser) {
      const user = await prisma.user.update({
        where: { email },
        data: {
          otp: hashedOtp,
          otpExpires,
        },
      });
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          otp: hashedOtp,
          otpExpires,
        },
      });
    }

    const htmlContent = getOTPEmailTemplate(otp, email);

    await sendEmail({
      to: email,
      subject: 'Signup OTP',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: htmlContent,
    });

    return NextResponse.json('OTP sent successfully', { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_SENDING_OTP', error);
    return NextResponse.json('Error sending OTP', { status: 500 });
  }
}
