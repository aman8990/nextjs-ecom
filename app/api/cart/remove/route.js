import prisma from '@/app/_libs/prismadb'; // assuming you have a Prisma instance setup
import getCurrentUser from '@/app/_actions/getCurrentUser';
import { calculateCartTotalPrice } from '@/app/_utils/calculateCartTotalPrice';

export async function DELETE(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { productId, cartId } = body;

    if (!currentUser) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!productId) {
      return new Response('Product ID is required', { status: 400 });
    }

    const cartItem = await prisma.cartItem.deleteMany({
      where: {
        userId: currentUser.id,
        productId: productId,
      },
    });

    if (cartItem.count === 0) {
      return new Response('Item not found in cart', { status: 404 });
    }

    await calculateCartTotalPrice(cartId);

    return new Response('Item removed from cart', { status: 200 });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
