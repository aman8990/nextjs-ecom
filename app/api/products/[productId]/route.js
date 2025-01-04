import prisma from '@/app/_libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const body = await params;
    const { productId } = body;

    if (!productId) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new NextResponse('No product found', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log('ERROR_IN_GETTING_PRODUCT', error);
    return NextResponse.json('Error in fetching product', { status: 500 });
  }
}
