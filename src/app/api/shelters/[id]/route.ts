import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession'; // Importa a verificação

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // Verifica se o usuário é admin e tem sessão válida
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response!;
  }

  try {
    const { id } = await params;
    const docRef = doc(db, 'shelters', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Abrigo não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar abrigo' }, { status: 500 });
  }
}
