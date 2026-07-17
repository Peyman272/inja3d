import { NextRequest, NextResponse } from "next/server";

import { wcFetch } from "@/lib/woocommerce";
import { adaptProduct } from "@/lib/adaptProduct";
import { mapProductToTorob } from "@/lib/torob/mapper";
import { createTorobResponse } from "@/lib/torob/response";


// تست ساده با مرورگر
export async function GET() {
  return NextResponse.json({
    status: "Torob API is alive",
    message: "Use POST request for products",
  });
}


// API اصلی ترب
export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();


    const {
      page,
      sort,
      page_urls,
      page_uniques,

    } = body;


    /*
      حالت دریافت لیست محصولات
      ترب باید page و sort بفرستد
    */

    if (page !== undefined) {


      if (!sort) {

        return NextResponse.json(
          {
            error:
              "sort parameter is not provided",
          },
          {
            status: 400,
          }
        );

      }


      const currentPage =
        Number(page);


      const result =
        await wcFetch<any[]>(
          "/products",
          {

            page:
              currentPage,

            per_page:
              100,

            orderby:
              "date",

            order:
              "desc",

          }
        );


      const products =
        result.data
          .map(item =>
            adaptProduct(item)
          )
          .map(product =>
            mapProductToTorob(product)
          );


      return NextResponse.json(

        createTorobResponse(

          products,

          currentPage,

          result.total

        )

      );

    }



    /*
      دریافت محصول با page_urls
      فعلاً آماده شده برای توسعه بعدی
    */

    if (page_urls) {


      return NextResponse.json(

        createTorobResponse(

          [],

          1,

          0

        )

      );

    }



    /*
      دریافت محصول با page_uniques
      فعلاً آماده شده برای توسعه بعدی
    */

    if (page_uniques) {


      return NextResponse.json(

        createTorobResponse(

          [],

          1,

          0

        )

      );

    }



    return NextResponse.json(

      {
        error:
          "invalid request",
      },

      {
        status: 400,
      }

    );


  }

  catch(error:any) {


    return NextResponse.json(

      {
        error:
          error.message ||
          "server error",
      },

      {
        status:500,
      }

    );

  }

}
