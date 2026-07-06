import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "ایمیل یا شماره لازم است" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WORDPRESS_URL;

    // 🔥 WordPress default reset password endpoint
    const res = await fetch(
      `${baseUrl}/wp-login.php?action=lostpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_login: email,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "ارسال ایمیل ناموفق بود" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "لینک بازیابی ارسال شد",
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Server Error" },
      { status: 500 }
    );
  }
}
