import { NextRequest, NextResponse } from "next/server";

const WC_URL = process.env.WORDPRESS_URL!;
const CK = process.env.WC_CONSUMER_KEY!;
const CS = process.env.WC_CONSUMER_SECRET!;
const ZP = process.env.ZARINPAL_MERCHANT_ID!;
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { items, total, address } = body;

    // 1️⃣ ساخت سفارش در ووکامرس
    const orderRes = await fetch(
      `${WC_URL}/wp-json/wc/v3/orders?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method: "zarinpal",
          payment_method_title: "Zarinpal",
          set_paid: false,
          billing: {
            first_name: address.fullName,
            phone: address.phone,
            address_1: address.addressLine,
            city: address.city,
            postcode: address.postalCode,
          },
          line_items: items.map((i: any) => ({
            product_id: i.productId,
            quantity: i.qty,
          })),
        }),
      }
    );

    const order = await orderRes.json();

    if (!order.id) {
      return NextResponse.json({ error: "Order failed" }, { status: 500 });
    }

    // 2️⃣ درخواست پرداخت زرین‌پال
    const payRes = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: ZP,
        amount: total,
        callback_url: `${BASE}/api/payment/verify?order_id=${order.id}`,
        description: `Order #${order.id}`,
      }),
    });

    const pay = await payRes.json();

    const authority = pay?.data?.authority;

    if (!authority) {
      return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
    }

    const url = `https://www.zarinpal.com/pg/StartPay/${authority}`;

    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
