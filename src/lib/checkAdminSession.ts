// File: lib/checkAdminSession.ts
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function checkAdminSession(request: Request) {
  const email = request.headers.get('authorization');

  if (!email) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Não autorizado: sem email.' }, { status: 401 })
    };
  }

  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    };
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  const now = new Date();
  const sessionExpiration = new Date(userData.session_expires_at);

  // Atualizado: permite admin ou master
  const allowedRoles = ['admin', 'master'];
  if (!allowedRoles.includes(userData.role) || sessionExpiration < now) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    };
  }

  return { authorized: true, response: null, role: userData.role }; // retornamos o role agora também
}
