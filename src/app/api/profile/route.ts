import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ status: "token ausente !" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { payload } = await jwtVerify(token, secret);
    const username = payload.username;

    return new Response(JSON.stringify({ profile: username }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}