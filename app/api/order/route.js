import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { orderId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!orderId) {
      return new NextResponse('No order ID found', { status: 400 });
    }

    const order = await prisma.order.findMany({
      where: { id: orderId, email: currentUser.email },
    });

    if (order.length === 0) {
      return new NextResponse('No such order found', { status: 401 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.log('ERROR_IN_FINDING_ORDER', error);
    return NextResponse.json('Error in finding order', { status: 500 });
  }
}
