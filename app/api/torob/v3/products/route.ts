import { NextRequest, NextResponse } from "next/server";

import { wcFetch } from "@/lib/woocommerce";

import { adaptProduct } from "@/lib/adaptProduct";

import { mapProductToTorob } from "@/lib/torob/mapper";

import { createTorobResponse } from "@/lib/torob/response";


export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();


    const {
      page,
      sort,
      page_urls,
      page_uniques

    } = body;


    /*
      ترب یا باید صفحه‌بندی بخواهد
      یا چند محصول مشخص
    */

    if (
      !page &&
      !page_urls &&
      !page_uniques
    ) {

      return NextResponse.json(
        {
          error:
          "invalid request"
        },
        {
          status:400
        }
      );

    }


    let currentPage = 1;


    if(page){

      currentPage =
        Number(page);

    }


    /*
      گرفتن محصولات ووکامرس
      هر صفحه 100 محصول
    */

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
            "desc"

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


  } catch(error:any){


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
