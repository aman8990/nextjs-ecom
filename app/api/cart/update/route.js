import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { calculateCartTotalPrice } from '@/app/_utils/calculateCartTotalPrice';

export async function PATCH(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { productId, quantity, cartId } = body;

    if (!currentUser) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const updatedCartItem = await prisma.cartItem.updateMany({
      where: {
        userId: currentUser.id,
        productId,
      },
      data: {
        quantity,
      },
    });

    if (updatedCartItem.count === 0) {
      return new NextResponse('Item not found in cart', { status: 404 });
    }

    await calculateCartTotalPrice(cartId);

    return new NextResponse('Quantity updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
