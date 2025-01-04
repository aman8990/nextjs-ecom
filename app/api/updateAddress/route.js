import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { locality, city, district, state, pincode } = body;

    if (!locality || !city || !district || !state || !pincode) {
      return new NextResponse.json('Please provide all the deatils', {
        status: 401,
      });
    }

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse.json('Unauthorized User', { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email },
      data: {
        address: {
          locality,
          city,
          district,
          state,
          pincode,
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('UPDATE_ADDRESS_ERROR', error);
    return NextResponse.json('Error in updating address', { status: 500 });
  }
}
