import { NextRequest, NextResponse } from "next/server";
import { wcFetch } from "@/lib/woocommerce";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "12";
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const exclude = searchParams.get("exclude") ?? undefined;
  const featured = searchParams.get("featured") ?? undefined;
  const orderby = searchParams.get("orderby") ?? undefined;
  const order = searchParams.get("order") ?? undefined;

  try {
    const { data, totalPages, total } = await wcFetch("/products", {
      page,
      per_page,
      category,
      search,
      exclude,
      featured,
      orderby,
      order,
      status: "publish",
    });
    return NextResponse.json({ products: data, totalPages, total });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "خطای ناشناخته" }, { status: 500 });
  }
}
