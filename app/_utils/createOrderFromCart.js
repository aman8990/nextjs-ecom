import prisma from '@/app/_libs/prismadb';

export default async function createOrderFromCart(userEmail, userId) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
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

    if (!cart) throw new Error('Cart not found');

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) throw new Error('User not found');

    const orderItems = cart.cartItems.map((item) => ({
      productName: item.product.name,
      productId: item.product.id,
      photo: item.product.photo,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const order = {
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      items: orderItems,
      amount: cart.totalPrice,
      currency: 'inr',
      status: 'PENDING',
    };

    const finalOrder = await prisma.order.create({
      data: {
        userId: order.userId,
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        items: order.items,
        amount: order.amount,
        currency: order.currency,
        orderStatus: 'PENDING',
        deliveryStatus: 'CANCELLED',
      },
    });

    return finalOrder;
  } catch (error) {
    throw new Error('Error in creating order', error);
  }
}
