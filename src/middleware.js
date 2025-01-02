import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/protected') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
