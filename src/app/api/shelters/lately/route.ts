import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; // importa a função de segurança

export async function GET(request: Request): Promise<NextResponse> {
  // Primeiro, checamos se o usuário tem autorização
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response!;
  }

  try {
    const q = query(collection(db, 'shelters'), orderBy('createdAt', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    const shelters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(shelters, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar abrigos recentes' }, { status: 500 });
  }
}
