// File: app/api/shelters/[id]/contact/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; // Importa a verificação

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response;
  }

  try {
    const body = await request.json();
    const { admin_contacter } = body;

    // Atualizar o shelter
    const shelterRef = doc(db, 'shelters', params.id);
    await updateDoc(shelterRef, {
      is_contact_done: true,
      admin_contacter,
    });

    // Criar novo registro na coleção contacts
    const contactsRef = collection(db, 'contacts');
    await addDoc(contactsRef, {
      shelterId: params.id,
      admin_contacter,
      contactedAt: serverTimestamp(), // adiciona data e hora do contato
    });

    return NextResponse.json({ message: 'Contato registrado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao registrar contato:', error);
    return NextResponse.json({ error: 'Erro ao registrar contato' }, { status: 500 });
  }
}
