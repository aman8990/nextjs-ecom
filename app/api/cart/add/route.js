import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import { calculateCartTotalPrice } from '@/app/_utils/calculateCartTotalPrice';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { productId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!productId) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    let cart = await prisma.cart.findUnique({
      where: {
        userId: currentUser.id,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: currentUser.id,
          cartItems: {
            create: [
              {
                productId,
                quantity: 1,
                userId: currentUser.id,
              },
            ],
          },
        },
      });

      await calculateCartTotalPrice(cart.id);

      return NextResponse.json(
        { message: 'Item added successfully' },
        { status: 200 }
      );
    }

    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
          userId: currentUser.id,
        },
      });
    }

    await calculateCartTotalPrice(cart.id);

    return NextResponse.json('Item added successfully', { status: 200 });
  } catch (error) {
    console.error('ERROR_IN_ADDING_TO_CART', error);
    return NextResponse.json('Error in adding item to cart', { status: 500 });
  }
}
