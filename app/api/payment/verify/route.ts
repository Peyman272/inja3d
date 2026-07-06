import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WORDPRESS_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;
const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");
    const orderId = searchParams.get("order");

    if (!authority || status !== "OK") {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    // 💳 1. Verify زرین‌پال
    const verifyRes = await fetch(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          authority,
          amount: 0, // ⚠️ اگر خواستی دقیق‌ترش کنیم بعداً از سفارش می‌کشیم
        }),
      }
    );

    const result = await verifyRes.json();

    if (result?.data?.code !== 100) {
      return NextResponse.json({ error: "Zarinpal verify failed" }, { status: 400 });
    }

    // 🧾 2. آپدیت سفارش در WooCommerce (paid)
    if (orderId && WC_URL) {
      await fetch(`${WC_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          set_paid: true,
          status: "processing",
        }),
      });
    }

    // ✅ 3. هدایت به success page
    return NextResponse.redirect(
      new URL(`/checkout/success?order=${orderId}`, req.url)
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "verify error" },
      { status: 500 }
    );
  }
}
