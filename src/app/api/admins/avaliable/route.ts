import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { checkAdminSession } from "@/lib/checkAdminSession";

export async function GET(request: Request) {
  const { authorized, response } = await checkAdminSession(request);
  if (!authorized) {
    return response;
  }

  try {
    const snapshot = await getDocs(collection(db, "admins_queue"));
    
    const admins = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // sempre o ID do documento da queue
          userId: data.userId, // agora traz também o userId
          name: data.name,
          email: data.email,
          createdAt: data.created_at?.toDate().toISOString() || null,
        };
      });

    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar admins disponíveis" }, { status: 500 });
  }
}
