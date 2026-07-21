import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.inja3d.ir";

  let products: any[] = [];

  try {
    // گرفتن صفحه اول برای فهمیدن تعداد صفحات
    const firstResponse = await fetch(
      `${baseUrl}/api/products?page=1`,
      {
        cache: "no-store",
      }
    );

    const firstData = await firstResponse.json();

    if (Array.isArray(firstData.products)) {
      products.push(...firstData.products);
    }

    const totalPages = firstData.totalPages || 1;

    // گرفتن بقیه صفحات
    if (totalPages > 1) {
      const pages = await Promise.all(
        Array.from(
          { length: totalPages - 1 },
          (_, i) =>
            fetch(
              `${baseUrl}/api/products?page=${i + 2}`,
              {
                cache: "no-store",
              }
            ).then((res) => res.json())
        )
      );

      pages.forEach((pageData) => {
        if (Array.isArray(pageData.products)) {
          products.push(...pageData.products);
        }
      });
    }

  } catch (error) {
    console.error("Sitemap error:", error);
  }


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

    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
