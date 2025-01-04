import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, description } = body;

    if (!name || !email || !phone || !subject || !description) {
      return new NextResponse('Please fill all the details', { status: 401 });
    }

    await prisma.contactUs.create({
      data: {
        name,
        email,
        phone,
        subject,
        description,
      },
    });

    return NextResponse.json('Response generated', { status: 200 });
  } catch (error) {
    console.log('ERROR_IN_CREATING_CONTACTINFO', error);
    return NextResponse.json('Error in creating contact response', {
      status: 500,
    });
  }
}
