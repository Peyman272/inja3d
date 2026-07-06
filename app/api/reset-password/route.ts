import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { key, login, password } = await req.json();

    if (!key || !login || !password) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WORDPRESS_URL;

    const res = await fetch(`${baseUrl}/wp-json/wp/v2/users/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        login,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: data.message || "خطا در تغییر رمز" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "رمز تغییر کرد",
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
