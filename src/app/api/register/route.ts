import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Verificar se o email já existe (consultando a coleção)
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Criptografar senha
    const hashedPassword = await hashPassword(password);

    // Calcular validade da sessão (24 horas a partir de agora)
    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Criar usuário (ID gerado automaticamente)
    const userRef = await addDoc(collection(db, 'users'), {
      email,
      password: hashedPassword,
      role: 'common',
      name,
      createdAt: new Date().toISOString(),
      session_expires_at: sessionExpiresAt,
    });

    // Adicionar na fila de admin (ID gerado automaticamente)
    await addDoc(collection(db, 'admins_queue'), {
      userId: userRef.id, // Salva também o id do user criado
      name,
      email,
      role: 'common',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
