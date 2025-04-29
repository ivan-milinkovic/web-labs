// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  return new NextResponse("Ping response");
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ reflected: body }, { status: 200 });
}

// const cookieData = "123";
// (await cookies()).set("next-lab-cookie", cookieData, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "lax",
//   path: "/",
// });

// const res = NextResponse.json({ reflected: body }, { status: 200 });
// res.cookies.set("next-lab-cookie", cookieData, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "lax",
//   path: "/",
// });

// return Response.json(
//   { reflected: body },
//   {
//     status: 200,
//     headers: {
//       "Set-Cookie": `next-lab-cookie=${cookieData}; HttpOnly; SameSite=Lax;`,
//     },
//   }
// );
