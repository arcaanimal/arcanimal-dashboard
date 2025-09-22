// File: lib/checkAdminSession.ts
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function checkAdminSession(request: Request) {
  const email = request.headers.get('authorization');

  console.log("Email recebido no header:", email);

  if (!email) {
    console.log("Erro: Nenhum email encontrado no header");
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Não autorizado: sem email.' }, { status: 401 })
    };
  }

  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  console.log("Número de documentos encontrados:", querySnapshot.size);

  if (querySnapshot.empty) {
    console.log("Erro: Usuário não encontrado no banco:", email);
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    };
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  console.log("Dados do usuário encontrado:", {
    email: userData.email,
    role: userData.role,
    session_expires_at: userData.session_expires_at
  });

  // Horário atual em Brasília (UTC-3)
  const now = new Date();
  const brasiliaOffset = -3 * 60; // UTC-3 em minutos
  const brasiliaNow = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
  const sessionExpiration = new Date(userData.session_expires_at);

  console.log("Data atual (Brasília):", brasiliaNow.toISOString());
  console.log("Data de expiração da sessão:", sessionExpiration.toISOString());
  console.log("Sessão expirada?", sessionExpiration < brasiliaNow);

  // Atualizado: permite admin ou master
  const allowedRoles = ['admin', 'master'];

  console.log("essa é a role dele: ", userData.role)
  console.log("Role permitida?", allowedRoles.includes(userData.role));
  
  // Verificar se a sessão expirou
  const isSessionExpired = sessionExpiration < brasiliaNow;
  
  if (!allowedRoles.includes(userData.role) || isSessionExpired) {
    console.log("Acesso negado. Role não permitida ou sessão expirada");
    console.log("Motivo - Role inválida:", !allowedRoles.includes(userData.role));
    console.log("Motivo - Sessão expirada:", isSessionExpired);
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    };
  }

  console.log("Autorização concedida!");
  return { authorized: true, response: null, role: userData.role }; // retornamos o role agora também
}
