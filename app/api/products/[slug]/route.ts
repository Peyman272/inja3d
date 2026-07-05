import { NextRequest, NextResponse } from "next/server";
import { wcFetch } from "@/lib/woocommerce";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data } = await wcFetch<any[]>("/products", {
      slug: params.slug,
      status: "publish",
    });
    const product = Array.isArray(data) ? data[0] : undefined;
let variations = [];

if (product?.type === "variable") {
  const { data: vars } = await wcFetch(
    `/products/${product.id}/variations`
  );

  variations = vars;
}
    if (!product) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({
  ...product,
  variations,
});
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "خطای ناشناخته" }, { status: 500 });
  }
}
