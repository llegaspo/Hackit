import { firestore } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, name, role } = body;

    if (!uid || !email || !name || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await firestore.collection('users').doc(uid).set({
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
