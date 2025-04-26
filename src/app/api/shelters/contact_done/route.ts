// Caminho: app/api/shelters/contact_done/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; // Importa o validador

export async function GET(request: Request) {
  // Verifica se o usuário é admin e tem sessão válida
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response;
  }

  try {
    const sheltersRef = collection(db, 'shelters');
    const q = query(sheltersRef, where('is_contact_done', '==', true));
    const querySnapshot = await getDocs(q);

    const shelters = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ shelters }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar abrigos contatados:', error);
    return NextResponse.json({ error: 'Erro ao buscar abrigos contatados' }, { status: 500 });
  }
}
