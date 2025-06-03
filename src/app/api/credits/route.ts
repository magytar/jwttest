import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token) return NextResponse.json({status: "token ausente !"});

  try {
    const { payload } = await jwtVerify(token, secret);
    const username = payload.username;
    const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE user = ?", [username]
    )
    if(rows.length === 1){
        return NextResponse.json({credits: rows[0].credit})
    }

    return NextResponse.json({profile:username})
  } catch {
    return NextResponse.json({status:"error"}) ;
  }
}