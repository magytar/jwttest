// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ status: 'logout' });

  res.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // apaga cookie
    path: '/',
  });

  return res;
}
