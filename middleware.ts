import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith("/api/member") &&
    !request.nextUrl.pathname.startsWith("/member")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return Response.json(
      {
        success: false,
        error: "Authentication required",
      },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return Response.json(
      {
        success: false,
        error: "Invalid token",
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
