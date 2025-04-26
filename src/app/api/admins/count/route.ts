import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; 

export async function GET(request: Request) {
  // Primeiro: segurança
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response;
  }

  try {
    const adminsSnapshot = await getDocs(collection(db, 'admins_queue'));
    const count = adminsSnapshot.size;
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Erro ao contar admins:', error);
    return NextResponse.json({ error: 'Erro ao contar admins' }, { status: 500 });
  }
}
