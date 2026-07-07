import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("NEXT RESET BODY:", body);

    const res = await fetch(
      "https://wp.inja3d.ir/wp-json/inja3d/v1/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    console.log("WORDPRESS RESET RESPONSE:", data);

    return NextResponse.json(data);

  } catch (error: any) {

    console.log("RESET API ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
