import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, phone } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized user', { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email },
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('UPDATE_USER_INFO_ERROR', error);
    return NextResponse.json('Error in updating details', { status: 500 });
  }
}
