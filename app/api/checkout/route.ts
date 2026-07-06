import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WORDPRESS_URL!;
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;
const ZARINPAL_MERCHANT = process.env.ZARINPAL_MERCHANT_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 🧱 1. ساخت سفارش در ووکامرس
    const orderRes = await fetch(
      `${WC_URL}/wp-json/wc/v3/orders?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method: "zarinpal",
          payment_method_title: "زرین‌پال",
          set_paid: false,
          billing: body.address,
          shipping: body.address,
          line_items: body.items.map((i: any) => ({
            product_id: i.productId,
            quantity: i.qty,
          })),
        }),
      }
    );

    const order = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json({ error: order }, { status: 500 });
    }

    // 🧱 2. ساخت پرداخت زرین‌پال
    const amount = body.total;

    const zpRes = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_id: ZARINPAL_MERCHANT,
        amount,
        description: `Order ${order.id}`,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify?order_id=${order.id}`,
      }),
    });

    const zpData = await zpRes.json();

    if (zpData.data.code !== 100) {
      return NextResponse.json({ error: zpData }, { status: 500 });
    }

    // 🧱 3. redirect به درگاه
    const redirectUrl = `https://www.zarinpal.com/pg/StartPay/${zpData.data.authority}`;

    return NextResponse.json({
      url: redirectUrl,
      orderId: order.id,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
