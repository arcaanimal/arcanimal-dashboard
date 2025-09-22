// File: src/app/api/admins/delete/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { checkAdminSession } from "@/lib/checkAdminSession";

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { authorized, response, role } = await checkAdminSession(request);

  if (!authorized) {
    return response!;
  }

  if (role !== 'master') {
    return NextResponse.json({ error: "Apenas usuários master podem deletar admins." }, { status: 403 });
  }

  const { id } = await params;

  try {
    await deleteDoc(doc(db, "users", id));
    return NextResponse.json({ message: "Admin deletado com sucesso." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar admin." }, { status: 500 });
  }
}
