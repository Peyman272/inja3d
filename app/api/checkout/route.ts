import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, total, address } = body;

    const WC_URL = process.env.WORDPRESS_URL;
    const CK = process.env.WC_CONSUMER_KEY;
    const CS = process.env.WC_CONSUMER_SECRET;
    const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!WC_URL || !CK || !CS || !ZARINPAL_MERCHANT_ID || !BASE_URL) {
      return NextResponse.json(
        { error: "ENV missing" },
        { status: 500 }
      );
    }

    // 🧾 1. ساخت سفارش ووکامرس
    const orderRes = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_method: "zarinpal",
        payment_method_title: "پرداخت زرین‌پال",
        set_paid: false,

        billing: {
          first_name: address.fullName,
          phone: address.phone,
          address_1: address.addressLine,
          city: address.city,
          state: address.province,
          postcode: address.postalCode,
        },

        line_items: items.map((item: any) => ({
          product_id: item.productId,
          quantity: item.qty,
        })),
      }),
    });

    const order = await orderRes.json();

    if (!order?.id) {
      return NextResponse.json(
        { error: "WooCommerce order failed", detail: order },
        { status: 500 }
      );
    }

    const orderId = order.id;

    // 💳 2. درخواست زرین‌پال (FIX اصلی اینجاست)
    const paymentRes = await fetch(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,

          // 🔥 مهم: زرین‌پال ریال می‌خواهد نه تومان
          amount: Number(total) * 10,

          // 🔥 callback باید FRONTEND باشد نه API
          callback_url: `${BASE_URL}/checkout/success?order=${orderId}`,

          description: `Order #${orderId}`,
        }),
      }
    );

    const paymentText = await paymentRes.text();
    let payment;

    try {
      payment = JSON.parse(paymentText);
    } catch {
      return NextResponse.json(
        {
          error: "Zarinpal invalid response",
          raw: paymentText,
        },
        { status: 500 }
      );
    }

    console.log("ZARINPAL RESPONSE:", payment);

    const authority = payment?.data?.authority;

    if (!authority) {
      return NextResponse.json(
        {
          error: "Zarinpal failed",
          detail: payment,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: `https://www.zarinpal.com/pg/StartPay/${authority}`,
      orderId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "server error" },
      { status: 500 }
    );
  }
}
