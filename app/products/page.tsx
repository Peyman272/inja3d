"use client";

import { useEffect, useMemo, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { adaptProduct, adaptCategory } from "@/lib/adaptProduct";
import { Product, Category } from "@/lib/types";

const PER_PAGE = 12;

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<number | "all">(
    initialCategory ? Number(initialCategory) : "all"
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const categoryRef = useRef<HTMLDivElement>(null);

function scrollCategories(direction: "left" | "right") {
  if (!categoryRef.current) return;

  categoryRef.current.scrollBy({
    left: direction === "left" ? -250 : 250,
    behavior: "smooth",
  });
}

  /* دسته‌بندی‌ها مستقل از محصولات گرفته می‌شوند — همیشه کامل هستند،
     حتی اگر صفحه‌ی فعلیِ محصولات همه‌ی دسته‌ها را نداشته باشد */
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data.map(adaptCategory));
        else console.log("خطای دسته‌بندی‌ها:", data);
      })
      .catch((err) => console.log("خطا در دریافت دسته‌بندی‌ها:", err));
  }, []);

  const fetchProducts = async (pageNumber: number, categoryId: number | "all") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pageNumber),
        per_page: String(PER_PAGE),
      });
      if (categoryId !== "all") params.set("category", String(categoryId));

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      const list: any[] = data?.products ?? [];
      const adapted = list.map(adaptProduct);

      setProducts((prev) => (pageNumber === 1 ? adapted : [...prev, ...adapted]));
      setHasMore(list.length === PER_PAGE);
    } catch (err) {
      console.log("خطا در دریافت محصولات:", err);
      setHasMore(false);
    }
    setLoading(false);
  };

  /* با تغییر دسته، از صفحه‌ی ۱ دوباره می‌گیرد */
  useEffect(() => {
    setPage(1);
    fetchProducts(1, activeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.trim().toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gold-radial pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">فروشگاه</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bone">همه‌ی محصولات</h1>

          {/* جست‌وجو */}
          <input
            className="mt-6 px-5 py-3 bg-charcoal/60 border border-gold/15 focus:border-gold/50 rounded-full w-full md:w-96 outline-none font-body text-sm text-bone placeholder:text-bone-faint transition-colors"
            placeholder="جست‌وجوی محصول..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* دسته‌بندی‌ها — دایره‌ای، با موشن */}
          <div className="relative mt-8">

<button
  onClick={() => scrollCategories("right")}
  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-charcoal border border-gold/30 text-gold flex items-center justify-center"
>
  <ChevronRight size={18} />
</button>


<motion.div
  ref={categoryRef}
  initial="hidden"
  animate="show"
  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
  className="flex gap-4 overflow-x-auto pb-2 px-12"
  style={{ scrollbarWidth: "none" }}
>
            {/* دکمه‌ی همه */}
            <motion.button
              onClick={() => setActiveId("all")}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="relative shrink-0"
            >
              {activeId === "all" && (
                <motion.span
                  layoutId="active-category-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 bg-gold rounded-full"
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2.5 pr-2 pl-5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-300 border ${
                  activeId === "all" ? "border-gold text-ink" : "border-gold/15 bg-charcoal/40 text-bone-dim hover:text-bone"
                }`}
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gold/10 border border-gold/20 text-sm font-display text-gold">
                  همه
                </span>
                همه‌ی محصولات
              </span>
            </motion.button>

            {categories.map((c) => {
              const isActive = activeId === c.id;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative shrink-0"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-gold rounded-full"
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2.5 pr-2 pl-5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-300 border ${
                      isActive ? "border-gold text-ink" : "border-gold/15 bg-charcoal/40 text-bone-dim hover:text-bone"
                    }`}
                  >
                    <span
                      className={`relative w-9 h-9 rounded-full overflow-hidden shrink-0 flex items-center justify-center border ${
                        isActive ? "border-ink/20" : "border-gold/20"
                      }`}
                    >
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <span
                          className={`w-full h-full flex items-center justify-center text-sm font-display ${
                            isActive ? "bg-ink/10 text-ink" : "bg-gold/10 text-gold"
                          }`}
                        >
                          {c.name.charAt(0)}
                        </span>
                      )}
                    </span>
                    {c.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
     <button
  onClick={() => scrollCategories("left")}
  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-charcoal border border-gold/30 text-gold flex items-center justify-center"
>
  <ChevronLeft size={18} />
</button>
          </div>
      </section>

      {/* شبکه محصولات */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 && !loading ? (
            <p className="text-center text-bone-dim font-body py-20">محصولی پیدا نشد</p>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i % PER_PAGE} />
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* بارگذاری بیشتر */}
          {hasMore && !query.trim() && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => {
                  const next = page + 1;
                  setPage(next);
                  fetchProducts(next, activeId);
                }}
                disabled={loading}
                className="px-8 py-3.5 bg-gold hover:bg-gold-bright disabled:opacity-60 text-ink rounded-full font-body text-sm font-semibold transition-colors"
              >
                {loading ? "در حال بارگذاری..." : "محصولات بیشتر"}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}
