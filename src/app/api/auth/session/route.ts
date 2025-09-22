// src/app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return NextResponse.json({
      user: {
        id: userDoc.id,
        email: userData.email,
        name: userData.name,
        role: userData.role, // Adicionar role aqui
        session_expires_at: userData.session_expires_at,
      },
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
