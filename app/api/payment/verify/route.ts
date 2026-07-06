import { NextRequest, NextResponse } from "next/server";

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const WC_URL = process.env.WORDPRESS_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");
  const orderId = searchParams.get("order");

  if (status !== "OK") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?status=failed`
    );
  }

  try {
    // 💳 verify payment
    const verifyRes = await fetch(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          authority,
          amount: 1000, // ⚠️ فعلاً تستی — بعداً باید واقعی کنی
        }),
      }
    );

    const result = await verifyRes.json();

    if (result?.data?.code === 100) {
      // ✅ پرداخت موفق

      // 🧾 آپدیت سفارش در WooCommerce
      await fetch(`${WC_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          set_paid: true,
          status: "processing",
        }),
      });

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?status=success&order=${orderId}`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?status=failed`
    );
  } catch (err) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?status=error`
    );
  }
}
