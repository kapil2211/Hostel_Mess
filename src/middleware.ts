import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('userToken')?.value;

  // Decode Base64 or JWT token to get role
  let role: string | null = null;
  try {
    const decoded = token ? JSON.parse(Buffer.from(token, 'base64').toString()) : null;
    role = decoded?.role ?? null;
  } catch {
    role = null;
  }

  // Student route protection
  if (pathname.startsWith('/student')) {
    if (role !== 'student') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // MessOwner route protection
  if (pathname.startsWith('/messowner')) {
    if (role !== 'messowner') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/student/:path*', '/messowner/:path*'],
};
