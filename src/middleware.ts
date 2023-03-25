import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (
    (!req.cookies.get("anggota") &&
      !req.nextUrl.pathname.startsWith("/auth")) ||
    req.nextUrl.pathname === "/"
  ) {
    url.pathname = "/auth/login";

    return NextResponse.redirect(url);
  }

  if (
    (req.cookies.get("anggota") && req.nextUrl.pathname.startsWith("/auth")) ||
    req.nextUrl.pathname.includes("components")
  ) {
    url.pathname = "/admin/home";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
