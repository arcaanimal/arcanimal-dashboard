import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { checkAdminSession } from "@/lib/checkAdminSession"; // segurança

export async function GET(request: Request): Promise<NextResponse> {
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response!;
  }

  try {
    // Fazendo uma query direto no Firestore
    const adminsQuery = query(
      collection(db, "users"),
      where("role", "==", "admin")
    );

    const snapshot = await getDocs(adminsQuery);

    const admins = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name || "",
        email: data.email || "",
        createdAt: data.created_at,
        id: data.id,
        };
    });

    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar admins" }, { status: 500 });
  }
}
