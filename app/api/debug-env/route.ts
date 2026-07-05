import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    WORDPRESS_URL_present: Boolean(process.env.WORDPRESS_URL),
    WORDPRESS_URL_value: process.env.WORDPRESS_URL ?? null,
    WC_CONSUMER_KEY_present: Boolean(process.env.WC_CONSUMER_KEY),
    WC_CONSUMER_KEY_length: process.env.WC_CONSUMER_KEY?.length ?? 0,
    WC_CONSUMER_SECRET_present: Boolean(process.env.WC_CONSUMER_SECRET),
    WC_CONSUMER_SECRET_length: process.env.WC_CONSUMER_SECRET?.length ?? 0,
    node_env: process.env.NODE_ENV,
  });
}