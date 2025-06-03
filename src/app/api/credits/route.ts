import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(): Promise<Response> {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token ausente' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const username = payload.username;

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT credit FROM users WHERE user = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ credits: rows[0].credit });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 403 });
  }
}
