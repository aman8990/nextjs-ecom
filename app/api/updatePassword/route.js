import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { password, newPassword } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized user', { status: 401 });
    }

    if (!password || !newPassword) {
      return new NextResponse('Please provide password and newPassword', {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
    });

    const userHashedPassword = user.hashedPassword;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userHashedPassword
    );

    if (!isPasswordCorrect) {
      return new NextResponse('Incorrect Password', {
        status: 401,
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('UPDATE_PASSWORD_ERROR', error);
    return NextResponse.json('Error in updating password', { status: 500 });
  }
}
