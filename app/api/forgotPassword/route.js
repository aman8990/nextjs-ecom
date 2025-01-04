import bcrypt from 'bcrypt';
import prisma from '@/app/_libs/prismadb';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, otp } = body;

    if (!email || !password || !otp) {
      return new NextResponse('Missing Info', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const forgotOtpExpires = new Date(user.forgotOtpExpires);
    const currentTime = new Date();

    if (currentTime > forgotOtpExpires) {
      return new NextResponse('OTP has expired', { status: 400 });
    }

    const hashedForgotOtp = user.forgotOtp;
    const hashedForgotOtpProvided = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    if (hashedForgotOtp !== hashedForgotOtpProvided) {
      return new NextResponse('Invalid OTP', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        hashedPassword,
        forgotOtp: null,
        forgotOtpExpires: null,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, 'FORGOT_ERROR');
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
