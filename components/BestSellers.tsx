"use client";

import ProductGridSection from "./ProductGridSection";

export default function BestSellers() {
  return (
    <ProductGridSection
      id="best-sellers"
      eyebrow="محبوب‌ترین‌ها"
      title="پرفروش‌ترین‌ها"
      description="نسخه‌هایی که کلکسیونرهای ما همیشه برایشان برمی‌گردند — همیشه در هفته‌ی اول تمام می‌شوند."
      query={{ featured: "true" }}
    />
  );
}
