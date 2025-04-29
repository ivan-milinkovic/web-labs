import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  return new NextResponse(body, { status: 200 });
}
