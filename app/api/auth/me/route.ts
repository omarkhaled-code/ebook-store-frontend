import { NextResponse } from "next/server";
import { laravelFetch } from "@/lib/laravel";

export async function GET() {
  const res = await laravelFetch("/auth/me");

  const data = await res.json();

  if (!res.ok) {
    const response = NextResponse.json(data, {
      status: res.status,
    });

    response.cookies.delete("auth_token");

    return response;
  }

  return NextResponse.json(data);
}
