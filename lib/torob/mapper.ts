import { TorobProduct } from "./types";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.inja3d.ir";


export function mapProductToTorob(product: any): TorobProduct {

  const price = Number(product.price || 0);


  return {

    page_unique: `wc_${product.id}`,

    page_url: `${SITE_URL}/products/${product.slug}`,

    product_group_id: String(product.id),


    title: product.name,

    subtitle: product.slug,


    // ووکامرس ریال است، ترب تومان می‌خواهد
    current_price: Math.floor(price / 10),


    availability: true,


    image_links:
      product.images?.map(
        (img: any) => img.src
      ) || [],


    category_name:
      product.categories?.[0]?.name || "فیگور",


    short_desc:
      product.short_description
        ? product.short_description.replace(/<[^>]*>/g, "")
        : "فیگور سه بعدی دست ساز",


    spec: {},


    guarantee:
      "تضمین کیفیت چاپ و رنگ آمیزی",


    date_added:
      product.date_created ||
      new Date().toISOString(),


    date_updated:
      product.date_modified ||
      product.date_created ||
      new Date().toISOString()

  };

}
