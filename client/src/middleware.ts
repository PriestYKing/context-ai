import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // These paths are always public:
  const publicPaths = ["/", "/login", "/register"];

  const isPublic = publicPaths.includes(pathname);

  // If user is unauthenticated AND not at a public route, redirect to /login
  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user IS authenticated and at a public route, redirect to /dashboard
  if (isAuth && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Otherwise, proceed as normal
  return NextResponse.next();
}

// Specify the matcher to include all routes
export const config = {
  matcher: [
    "/((?!api/|_next/|favicon.ico|static/|public/).*)", // Protect all app routes (but not assets/api)
  ],
};
