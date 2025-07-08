import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return NextResponse.json({ uid: decodedToken.uid });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}