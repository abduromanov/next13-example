import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (!req.cookies.get('anggota') && !req.nextUrl.pathname.startsWith('/auth')) {
    url.pathname = '/auth/login'

    return NextResponse.redirect(url);
  }

  if (req.cookies.get('anggota') && req.nextUrl.pathname.startsWith('/auth')) {
    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}