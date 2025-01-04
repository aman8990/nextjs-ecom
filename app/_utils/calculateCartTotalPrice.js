import prisma from '@/app/_libs/prismadb';

export async function calculateCartTotalPrice(cartId) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true } } },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    const price = item.product.price;
    totalPrice += price * item.quantity;
  });

  await prisma.cart.update({
    where: { id: cartId },
    data: { totalPrice },
  });
}
