import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Buscar usuário usando email (não pelo ID)
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Como email é único, pegamos o primeiro resultado
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Verificar senha
    const isValidPassword = await verifyPassword(password, userData.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Atualizar sessão (24h a partir de agora) - Horário de Brasília (UTC-3)
    const now = new Date();
    const brasiliaOffset = -3 * 60; // UTC-3 em minutos
    const brasiliaTime = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
    const sessionExpiresAt = new Date(brasiliaTime.getTime() + 24 * 60 * 60 * 1000).toISOString();

    console.log('Horário atual Brasília:', brasiliaTime.toISOString());
    console.log('Sessão expira em:', sessionExpiresAt);
    
    await updateDoc(doc(db, 'users', userDoc.id), {
      session_expires_at: sessionExpiresAt // Corrigir nome do campo
    });

    // Retornar dados do usuário
    return NextResponse.json({
      user: {
        id: userDoc.id,
        email: userData.email,
        name: userData.name,
        role: userData.role, // Adicionar role aqui
        session_expires_at: sessionExpiresAt
      }
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
