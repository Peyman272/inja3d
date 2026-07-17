import { TorobProduct } from "./types";
import { Product } from "../types";


const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.inja3d.ir";


export function mapProductToTorob(
  product: Product
): TorobProduct {

  return {

    page_unique:
      `wc_${product.id}`,

    page_url:
      `${SITE_URL}/products/${product.slug}`,


    product_group_id:
      String(product.id),


    title:
      product.name,


    current_price:
      Math.round(product.price),


    availability:
      true,


    image_links:
      product.images || [],


    category_name:
      product.category || "فیگور",


    short_desc:
      product.shortDescription || "",


    spec:
      product.specs?.reduce(
        (acc:any, item:any)=>{

          acc[item.label] =
            item.value;

          return acc;

        },
        {}
      ) || {},


    guarantee:
      "تضمین کیفیت چاپ و رنگ آمیزی",


    date_added:
      new Date().toISOString(),


    date_updated:
      new Date().toISOString()

  };

}
