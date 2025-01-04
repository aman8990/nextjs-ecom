import getSession from '@/app/_actions/getSession';
import { saveCartToDatabase } from '@/app/_libs/saveCartToDatabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { cartItems, totalPrice } = body;

    await saveCartToDatabase(session.user.id, cartItems, totalPrice);

    return NextResponse.json('Cart synced successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to sync cart', { status: 500 });
  }
}
