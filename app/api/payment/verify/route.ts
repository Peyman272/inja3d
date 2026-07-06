import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WORDPRESS_URL!;
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;
const ZP_MERCHANT = process.env.ZARINPAL_MERCHANT_ID!;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");
    const orderId = searchParams.get("order_id");

    if (!authority || !orderId) {
      return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
    }

    if (status !== "OK") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/fail`);
    }

    // 🔥 verify payment with Zarinpal
    const verifyRes = await fetch("https://api.zarinpal.com/pg/v4/payment/verify.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_id: ZP_MERCHANT,
        authority,
        amount: 1000, // ⚠️ بعداً باید از order بگیریم
      }),
    });

    const data = await verifyRes.json();

    if (data.data.code !== 100) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/fail`);
    }

    // 🔥 اینجا می‌تونی ووکامرس رو آپدیت کنی (paid)
    await fetch(
      `${WC_URL}/wp-json/wc/v3/orders/${orderId}?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          set_paid: true,
          status: "processing",
        }),
      }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order=${orderId}`
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
