import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, password } = await req.json();

    // 🔴 validation اولیه
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { ok: false, error: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WORDPRESS_URL;
    const key = process.env.WC_CONSUMER_KEY;
    const secret = process.env.WC_CONSUMER_SECRET;

    if (!baseUrl || !key || !secret) {
      return NextResponse.json(
        { ok: false, error: "ENV تنظیم نشده" },
        { status: 500 }
      );
    }

    // 🔥 مهم: WooCommerce REST API
    const url = `${baseUrl}/wp-json/wc/v3/customers`;

    const auth = Buffer.from(`${key}:${secret}`).toString("base64");

    const wpRes = await fetch(url, {
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
          phone: phone || "",
        },
        shipping: {
          phone: phone || "",
        },
      }),
    });

    const text = await wpRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    console.log("🔥 WOOCOMMERCE RESPONSE:", data);

    // ❌ اگر خطا بود
    if (!wpRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: data?.message || data || "خطا در ساخت کاربر",
        },
        { status: wpRes.status }
      );
    }

    // ✅ موفق
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
