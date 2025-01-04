import { NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';
import axios from 'axios';
import prisma from '@/app/_libs/prismadb';

Cashfree.XClientId = process.env.CASHFREE_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function POST(request) {
  try {
    const body = await request.json();
    const { cashfreeOrderId, userOrderId } = body;

    if (!cashfreeOrderId || !userOrderId) {
      return new NextResponse('Details missing', { status: 401 });
    }

    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${cashfreeOrderId}`,
      {
        headers: {
          accept: 'application/json',
          'x-api-version': '2023-08-01',
          'x-client-id': Cashfree.XClientId,
          'x-client-secret': Cashfree.XClientSecret,
        },
      }
    );

    if (!response) {
      return new NextResponse('No response from payment gateway', {
        status: 401,
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: userOrderId },
    });

    if (!order) {
      return new NextResponse('Order not found', { status: 401 });
    }

    let updatedOrder;

    if (response.data.order_status === 'PAID') {
      updatedOrder = await prisma.order.update({
        where: { id: userOrderId },
        data: {
          paymentStatus: 'PAID',
          paymentId: response.data.payment_session_id,
          orderStatus: 'PENDING',
          deliveryStatus: 'PROCESSING',
        },
      });

      return NextResponse.json(updatedOrder, { status: 200 });
    } else {
      updatedOrder = await prisma.order.update({
        where: { id: userOrderId },
        data: {
          paymentStatus: 'FAILED',
          orderStatus: 'CANCELLED',
          deliveryStatus: 'CANCELLED',
          paymentId: response.data.payment_session_id,
        },
      });

      return NextResponse.json(updatedOrder, { status: 201 });
    }
  } catch (error) {
    console.log('ERROR_IN_VERIFYING_ORDER', error);
    return NextResponse.json('Error in verifying order', { status: 500 });
  }
}
