import prisma from './prismadb';

export async function saveCartToDatabase(userId, cartItems, totalPrice) {
  try {
    await prisma.cart.deleteMany({
      where: { userId },
    });

    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        totalPrice: totalPrice,
        cartItems: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            userId: userId,
          })),
        },
      },
    });

    return cart;
  } catch (error) {
    throw new Error('Failed to save cart to the database');
  }
}
