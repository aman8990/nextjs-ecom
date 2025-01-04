import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: currentUser.id,
      },
      include: {
        cartItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                photo: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return new NextResponse('Cart not found', { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error('ERROR_IN_FETCHING_CART', error);
    return NextResponse.json('Error in fetching cart', { status: 500 });
  }
}
