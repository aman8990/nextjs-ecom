import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function GET() {
  try {
    const products = await prisma.product.findMany({});

    if (!products) {
      return new NextResponse('No Products found', { status: 400 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('ERROR_IN_FETCHING_PRODUCTS', error);
    return NextResponse.json('Error in fetching products', { status: 500 });
  }
}
