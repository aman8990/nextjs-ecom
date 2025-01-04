import { NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import createOrderFromCart from '@/app/_utils/createOrderFromCart';

Cashfree.XClientId = process.env.CASHFREE_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateRandomLetters(length) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }
  return result;
}

function generateOrderId() {
  const timestamp = Date.now();
  const randomLetters = generateRandomLetters(5);
  return `${timestamp}${randomLetters}`;
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    const url = process.env.NEXTAUTH_URL;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = currentUser?.id;
    const userEmail = currentUser?.email;
    const order = await createOrderFromCart(userEmail, userId);

    if (!order) {
      return new NextResponse('Order creation failed', { status: 400 });
    }

    const customerId = order.userId;
    const customerName = order.name;
    const customerEmail = order.email;
    const customerPhone = order.phone;

    const cashfreeOrderId = generateOrderId();

    const request = {
      order_id: cashfreeOrderId,
      userOrder_id: order.id,
      order_amount: order.amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${url}/cashfreeVerify?cashfreeOrderId=${cashfreeOrderId}&userOrderId=${order.id}`,
      },
      order_note: '',
    };

    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    const paymentData = response.data;

    return NextResponse.json(paymentData);
  } catch (error) {
    console.log('ERROR_IN_CREATING_ORDER', error);
    return NextResponse.json('Error setting up order request', { status: 500 });
  }
}
