import { NextRequest, NextResponse } from "next/server";

import { wcFetch } from "@/lib/woocommerce";
import { adaptProduct } from "@/lib/adaptProduct";
import { mapProductToTorob } from "@/lib/torob/mapper";
import { createTorobResponse } from "@/lib/torob/response";


export async function GET() {
  return NextResponse.json({
    status: "Torob API is alive",
    message: "Use POST request for products",
  });
}


export async function POST(req: NextRequest) {

  try {

const body = await req.json().catch(() => ({}));

    const {
      page,
      sort,
      page_urls,
      page_uniques,
    } = body;


/*
  دریافت چند محصول با URL
*/

if (Array.isArray(page_urls)) {

  const result =
    await wcFetch<any[]>(
      "/products",
      {
        per_page: 100,
      }
    );





 const requestedSlugs =
  page_urls.map((url: string) => {

    return url
      .split("/")
      .filter(Boolean)
      .pop();

  });

const products =
    result.data
      .filter((item: any) => {

        return requestedSlugs.some(
          (slug)=>
            slug &&
            (
              item.slug === slug ||
              item.slug.includes(slug) ||
              slug.includes(item.slug)
            )
        );

      })
  
      .map((item: any) =>
        mapProductToTorob(
          adaptProduct(item)
        )
      );


  return NextResponse.json(
    createTorobResponse(
      products,
      1,
      products.length
    )
  );

}

    if (Array.isArray(page_uniques)) {


      const ids =
        page_uniques.map(id =>
          id.replace("wc_","")
        );


      const result =
        await wcFetch<any[]>(
          "/products",
          {
            include: ids.join(","),
            per_page:100,
          }
        );


      const products =
        result.data.map(item =>
          mapProductToTorob(
            adaptProduct(item)
          )
        );


      return NextResponse.json(
        createTorobResponse(
          products,
          1,
          products.length
        )
      );

    }



 /*
  لیست همه محصولات
*/

if (
  page !== undefined
) {


      const currentPage =
  Number(page || 1);


      const result =
        await wcFetch<any[]>(
          "/products",
          {
            page: currentPage,
            per_page:100,
            orderby:"date",
            order:"desc",
          }
        );


      const products =
        result.data.map(item =>
          mapProductToTorob(
            adaptProduct(item)
          )
        );


      return NextResponse.json(
        createTorobResponse(
          products,
          currentPage,
          result.total
        )
      );

    }



    return NextResponse.json(
      {
        error:
          "invalid request parameters"
      },
      {
        status:400
      }
    );


  }
  catch(error:any) {


    return NextResponse.json(
      {
        error:
          error.message ||
          "server error"
      },
      {
        status:500
      }
    );

  }

}
