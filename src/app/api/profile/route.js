import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) return <p>Usuário não autenticado</p>;

  try {
    const { payload } = await jwtVerify(token, secret);
    const username = payload.username;

    return NextResponse.json({profile:username})
  } catch {
    return NextResponse.json({status:"error"}) ;
  }
}