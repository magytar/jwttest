import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'minhadog2025');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch (error) {
    console.log("❌ Token inválido:", error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
