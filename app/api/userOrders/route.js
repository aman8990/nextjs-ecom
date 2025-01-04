import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized User', { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { email: currentUser.email },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!orders) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error('ERROR_IN_FINDING_ORDERS', error);
    return NextResponse.json('Error in fetching user orders', { status: 500 });
  }
}
