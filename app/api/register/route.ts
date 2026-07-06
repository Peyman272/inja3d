import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WP_URL; // مثلا: https://your-site.com

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const wpRes = await fetch(
      `${baseUrl}/wp-json/wc/v3/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          email,
          password,
          username: email,
          first_name: fullName,
          billing: {
            phone,
          },
        }),
      }
    );

    const data = await wpRes.json();

    if (!wpRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: data?.message || "خطا در ساخت کاربر",
        },
        { status: wpRes.status }
      );
    }

    return NextResponse.json({
      ok: true,
      user: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err.message || "Server Error",
      },
      { status: 500 }
    );
  }
}
