import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

const products = await fetch(
"https://wp.inja3d.ir/wp-json/wc/v3/products"
).then(res => res.json());


const productUrls = products.map((product:any)=>({
 url:`https://www.inja3d.ir/products/${product.slug}`,
 lastModified:new Date(),
}));


return [
{
 url:"https://www.inja3d.ir",
 lastModified:new Date(),
},

...productUrls

];

}
