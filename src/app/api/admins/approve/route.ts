// File: src/app/api/admins/approve/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { checkAdminSession } from "@/lib/checkAdminSession";

export async function POST(request: Request): Promise<NextResponse> {
  const { authorized, response } = await checkAdminSession(request);

  if (!authorized) {
    return response!; // Usamos ! porque sabemos que response não será null quando authorized é false
  }

  try {
    const { userId, queueId } = await request.json();

    if (!userId || !queueId) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    // Atualiza o usuário para virar admin
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: 'admin' });

    // Deleta da fila de admins
    const queueRef = doc(db, "adminsQueue", queueId);
    await deleteDoc(queueRef);

    return NextResponse.json({ message: "Administrador aprovado com sucesso." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao aprovar administrador." }, { status: 500 });
  }
}
