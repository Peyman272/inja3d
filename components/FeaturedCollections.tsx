"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { adaptCategory } from "@/lib/adaptProduct";
import { Category } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedCollections() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;
        setCategories(data.map(adaptCategory).slice(0, 50));
      })
      .catch((err) => console.log("خطا در دریافت مجموعه‌ها:", err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section id="collections" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="نمای کلی"
          title="مجموعه‌های ویژه"
          description="دنیاهای منتخب فروشگاه، هرکدام با زبان متریال و پرداخت مخصوص به خود."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass rounded-sm h-[420px] border-gold/10 animate-pulse" />
              ))
            : categories.map((c, i) => (
                <motion.a
                  href={`/products?category=${c.id}`}
                  key={c.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative glass rounded-sm overflow-hidden h-[420px] flex flex-col justify-end p-8 border-gold/10 hover:border-gold/40 transition-colors duration-500"
                >
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal-high via-charcoal to-ink" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, rgba(240,205,124,0.18), transparent 60%)",
                    }}
                  />

                  <div className="relative z-10">
                    <span className="eyebrow">{toPersianDigitsSimple(c.count)} محصول</span>
                    <h3 className="font-display text-3xl md:text-4xl text-bone mt-3 mb-3 flex items-center gap-2">
                      {c.name}
                      <ArrowUpRight
                        size={22}
                        className="text-gold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      />
                    </h3>
                    <div className="mt-5 h-px w-12 bg-gold/50 group-hover:w-24 transition-all duration-500" />
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
}

function toPersianDigitsSimple(n: number): string {
  const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(n).replace(/[0-9]/g, (d) => map[Number(d)]);
}
