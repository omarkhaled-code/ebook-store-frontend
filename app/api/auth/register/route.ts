import { NextRequest, NextResponse } from "next/server";
import { laravelFetch } from "@/lib/laravel";
import { registerSchema } from "@/lib/validations/registerSchema";

export async function POST(request: NextRequest) {
  try {
    // =========================
    // Get Request Body
    // =========================
    const body = await request.json();

    const validatedFields = registerSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        {
          status: 422,
        },
      );
    }

    // =========================
    // Send Registration Request To Laravel
    // =========================
    const res = await laravelFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    // =========================
    // Parse Response
    // =========================
    const data = await res.json().catch(() => null);

    // =========================
    // Handle Laravel Errors
    // =========================
    if (!res.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Registration failed",
          errors: data?.errors || null,
        },
        {
          status: res.status,
        },
      );
    }

    // =========================
    // Create Response
    // =========================
    const response = NextResponse.json({
      message: data.message,
      user: data.user,
    });

    // =========================
    // Store Token In HTTP-Only Cookie
    // =========================
    response.cookies.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration Route Error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
