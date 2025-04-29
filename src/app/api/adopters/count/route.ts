import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; // Importa a função de segurança

export async function GET(request: Request) {
  // Verifica se o usuário está autorizado
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response;
  }

  try {
    const snapshot = await getDocs(collection(db, 'adopters'));
    const total = snapshot.size;
    return NextResponse.json({ total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao contar adotantes' }, { status: 500 });
  }
}
