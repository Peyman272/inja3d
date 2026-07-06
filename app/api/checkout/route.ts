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

    if (
      !WC_URL ||ّّ
      !CK ||
      !CS ||
      !ZARINPAL_MERCHANT_ID ||
      !BASE_URL
    ) {
      return NextResponse.json(
        {
          error: "ENV MISSING",
          env: {
            WC_URL: !!WC_URL,
            CK: !!CK,
            CS: !!CS,
            ZARINPAL_MERCHANT_ID: !!ZARINPAL_MERCHANT_ID,
            BASE_URL: !!BASE_URL,
          },
        },
        { status: 500 }
      );
    }

    console.log("===== CREATE ORDER =====");

    const orderRes = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_method: "zarinpal",
        payment_method_title: "زرین پال",
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

    console.log("ORDER STATUS:", orderRes.status);

    const orderText = await orderRes.text();

    console.log("ORDER BODY:", orderText);

    const order = JSON.parse(orderText);

    if (!order.id) {
      return NextResponse.json(
        {
          error: "WooCommerce Error",
          detail: order,
        },
        { status: 500 }
      );
    }

    console.log("===== CREATE PAYMENT =====");

    const paymentRes = await fetch(
      "https://payment.zarinpal.com/pg/v4/payment/request.json"
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          amount: Number(total) * 10,
          callback_url: `${BASE_URL}/api/payment/verify?order=${order.id}`,
          description: `Order #${order.id}`,
        }),
      }
    );

    console.log("PAYMENT STATUS:", paymentRes.status);

    const paymentText = await paymentRes.text();

    console.log("PAYMENT BODY:", paymentText);

    const payment = JSON.parse(paymentText);

    if (!payment.data?.authority) {
      return NextResponse.json(
        {
          error: "Zarinpal Error",
          detail: payment,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: `https://www.zarinpal.com/pg/StartPay/${payment.data.authority}`,
    });
  } catch (err: any) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
