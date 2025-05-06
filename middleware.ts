import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { redis } from "./lib/redis";

const CACHE_TTL = 5 * 60;

const publicPaths = [
  "/sign-in",
  "/sign-up",
  "/accept-member",
  "/accept-new-member",
  "/reset-password",
  "/forgot-password",
];
export async function middleware(request: NextRequest) {
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    console.log("omo middleware");
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  let userId;

  try {
    const cached = await redis.get(`user:${userId}`);

    if (cached) {
      return NextResponse.next();
    }
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    userId = decoded?.payload?.id;

    if (decoded?.payload?.exp! < Date.now() / 1000) {
      await redis.del(`user:${userId}`);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/members/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `authToken=${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user", {
        cause: { status: response.status },
      });
    }

    const userData = await response.json();

    if (!userData?.data) {
      throw new Error("No user found", { cause: { status: 401 } });
    }
    await redis.set(
      `user:${userId}`,
      JSON.stringify({
        firstName: userData.data.firstName,
        lastName: userData.data.lastName,
        email: userData.data.email,
        id: userData.data._id,
      }),
      {
        ex: CACHE_TTL,
      }
    );
    return NextResponse.next();
  } catch (error: any) {
    await redis.del(`user:${userId}`);
    if (error.name === "JsonWebTokenError" || error.cause?.status === 401) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    console.error("Middleware error:", error);
    // return NextResponse.next();
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/member/:path*", "/admin/:path*", "/director/:path*"],
};
