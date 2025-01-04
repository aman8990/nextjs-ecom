import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password, otp } = body;

    if (!email || !name || !password || !otp) {
      return new NextResponse('Missing Info', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const otpExpires = new Date(user.otpExpires);
    const currentTime = new Date();

    if (currentTime > otpExpires) {
      return new NextResponse('OTP has expired', { status: 400 });
    }

    const hashedOtp = user.otp;
    const hashedOtpProvided = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    if (hashedOtp !== hashedOtpProvided) {
      return new NextResponse('Invalid OTP', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        hashedPassword,
        otp: null,
        otpExpires: null,
        active: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('ERROR_IN_REGISTRATION', error);
    return NextResponse.json('Error in Registration', { status: 500 });
  }
}
