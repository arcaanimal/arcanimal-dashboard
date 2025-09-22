import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; 

export async function GET(request: Request): Promise<NextResponse> {
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response!;
  }

  try {
    const contactsRef = collection(db, 'contacts');
    const snapshot = await getCountFromServer(contactsRef);

    const count = snapshot.data().count;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Erro ao contar contatos:', error);
    return NextResponse.json({ error: 'Erro ao contar contatos' }, { status: 500 });
  }
}
