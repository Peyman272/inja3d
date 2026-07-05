"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import { adaptProduct } from "@/lib/adaptProduct";
import { Product } from "@/lib/types";

export default function ProductGridSection({
  id,
  eyebrow,
  title,
  description,
  query,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** پارامترهای اضافه‌ی fetch به /api/products، مثل { featured: "true" } یا { orderby: "date" } */
  query: Record<string, string>;
  className?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ per_page: "4", ...query });
        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        const list: any[] = data?.products ?? [];
        if (!cancelled) setProducts(list.map(adaptProduct));
      } catch (err) {
        console.log("خطا در دریافت محصولات:", err);
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section id={id} className={`relative py-28 md:py-36 px-6 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="glass rounded-sm border-gold/10 h-[420px] animate-pulse"
                />
              ))
            : products.map((p, i) => <ProductCard product={p} index={i} key={p.id} />)}
        </div>
      </div>
    </section>
  );
}
