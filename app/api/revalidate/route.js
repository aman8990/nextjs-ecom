import getCurrentUser from '@/app/_actions/getCurrentUser';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { path, apiKey } = body;

    if (
      !currentUser?.id ||
      !currentUser?.email ||
      currentUser?.role !== 'admin'
    ) {
      return new NextResponse('User not authenticated', { status: 401 });
    }

    if (!path || !apiKey) {
      return new NextResponse.json('Please provide all the deatils', {
        status: 400,
      });
    }

    const secretKey = process.env.REVALIDATE_KEY;

    if (apiKey !== secretKey) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    revalidatePath(path);

    return NextResponse.json(`Revalidate Successfull '${path}'`, {
      Status: 200,
    });
  } catch (error) {
    console.log('ERROR_IN_REVALIDATING', error);
    return NextResponse.json('Error in revalidating', { status: 500 });
  }
}
