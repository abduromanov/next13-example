import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { TAnggota } from "./types";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const anggota: TAnggota = JSON.parse(
    req.cookies.get("anggota")?.value || "{}"
  );

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
    if (anggota.role === "admin") {
      url.pathname = "/admin/home";
    } else {
      url.pathname = "/anggota";
    }

    return NextResponse.redirect(url);
  }

  if (anggota.role === "member" && req.nextUrl.pathname.startsWith("/admin")) {
    req.nextUrl.pathname = "/auth/login";

    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
}
