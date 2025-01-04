import crypto from 'crypto';
import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/_libs/emailSender';

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

    await sendEmail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    return NextResponse.json('OTP sent successfully', { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_SENDING_OTP', error);
    return NextResponse.json('Error sending OTP', { status: 500 });
  }
}
