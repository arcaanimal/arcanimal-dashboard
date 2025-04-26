import { checkAdminSession } from "@/lib/checkAdminSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { authorized, response, role } = await checkAdminSession(request);

  if (!authorized) {
    return response;
  }

  if (role !== "master") {
    return NextResponse.json(
      { error: "Acesso restrito: apenas usuários master têm permissão." },
      { status: 403 }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
