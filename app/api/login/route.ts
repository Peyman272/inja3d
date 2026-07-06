import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();
    // identifier = ایمیل یا شماره

    if (!identifier || !password) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WORDPRESS_URL;

    // 🔥 اول باید user رو پیدا کنیم
    const searchRes = await fetch(
      `${baseUrl}/wp-json/wp/v2/users?search=${identifier}`
    );

    const users = await searchRes.json();

    if (!users || users.length === 0) {
      return NextResponse.json(
        { ok: false, error: "کاربر پیدا نشد" },
        { status: 404 }
      );
    }

    const user = users[0];

    // ⚠️ WooCommerce مستقیم password check نمی‌کنه
    // پس باید از WP auth یا JWT استفاده کنیم
    const loginRes = await fetch(
      `${baseUrl}/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password,
        }),
      }
    );

    const data = await loginRes.json();

    if (!loginRes.ok) {
      return NextResponse.json(
        { ok: false, error: data.message || "ورود ناموفق" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      token: data.token,
      user: data.user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
