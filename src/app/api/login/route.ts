import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET não definido');

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE user = ? AND password = ?", [username,password]
    )
    if(rows.length === 1){
      const token = jwt.sign({username}, secret || "", {expiresIn: "1h"})
      const res = NextResponse.json({status: "ok"})
      res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      })
      return res
    }
    if(rows.length === 0){
      return NextResponse.json({ok:0,status: "User or Password incorrect !"})
    }
  }
  catch(error){
    return NextResponse.json({status:"erro com servidor: "+ error})
  }

}
