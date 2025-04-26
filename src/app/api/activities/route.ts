import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const docId = process.env.NEXT_PUBLIC_ACTIVITIES_ID as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact, admin, adopters, shelter } = body;

    if (!docId) {
      throw new Error('ID do documento de atividades não configurado.');
    }

    const docRef = doc(db, 'activities', docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Documento de atividades não encontrado.');
    }

    const currentData = docSnap.data();

    const updatedContact = currentData.contact
      ? `${currentData.contact}\n${contact}`
      : contact;

    await updateDoc(docRef, {
      contact: updatedContact,
      admin: admin || currentData.admin || '',
      adopters: adopters ?? currentData.adopters ?? 0,
      shelter: shelter ?? currentData.shelter ?? 0,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    return NextResponse.json({ error: 'Erro ao atualizar atividade' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!docId) {
      throw new Error('ID do documento de atividades não configurado.');
    }

    const docRef = doc(db, 'activities', docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Documento não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(docSnap.data(), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    return NextResponse.json({ error: 'Erro ao buscar atividades' }, { status: 500 });
  }
}
