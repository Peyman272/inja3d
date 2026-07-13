import { NextResponse } from "next/server";
import { wcFetch } from "@/lib/woocommerce";

export async function GET() {
  try {
    const { data } = await wcFetch("/products/categories", {
      per_page: 100,
      hide_empty: "false",
      orderby: "name",
      order: "asc",
    });

    console.log("CATEGORIES DATA:", data);

    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message ?? "خطای ناشناخته",
      },
      {
        status: 500,
      }
    );
  }
}
