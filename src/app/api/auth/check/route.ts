// File: app/api/auth/check/route.ts
import { checkAdminSession } from "@/lib/checkAdminSession";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { authorized, response } = await checkAdminSession(request);

  if (!authorized) {
    return response;
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
