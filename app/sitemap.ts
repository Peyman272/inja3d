import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.inja3d.ir";

  let products: any[] = [];

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();

      // اگر API مستقیم آرایه برگرداند
      if (Array.isArray(data)) {
        products = data;
      }

      // اگر API داخل products باشد
      if (Array.isArray(data.products)) {
        products = data.products;
      }
    }
  } catch (error) {
    console.error("Sitemap products fetch error:", error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...productUrls,
  ];
}
