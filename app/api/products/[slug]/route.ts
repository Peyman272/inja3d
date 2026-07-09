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

    if (!product) {
      return NextResponse.json(
        { error: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    let variations: any[] = [];

    if (product.type === "variable") {
      const { data: vars } = await wcFetch(
        `/products/${product.id}/variations`
      );

      variations = Array.isArray(vars) ? vars : [];
    }

    console.log("PRODUCT TYPE:", product.type);
    console.log("VARIATIONS COUNT:", variations.length);
    console.log("VARIATIONS DATA:", variations);

    return NextResponse.json({
      ...product,
      variations,
    });

  } catch (err: any) {
    console.log("PRODUCT API ERROR:", err);

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
