"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Gem, ShieldCheck, Truck, ShoppingBag, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import StarRating from "@/components/StarRating";
import QuantityStepper from "@/components/QuantityStepper";
import { adaptProduct } from "@/lib/adaptProduct";
import { formatToman, toPersianDigits } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { Product } from "@/lib/types";

type Tab = "description" | "specs" | "reviews";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("description");
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (res.status === 404) {
          if (!cancelled) setNotFoundFlag(true);
          return;
        }
        const raw = await res.json();
        const adapted = adaptProduct(raw);
        if (cancelled) return;
        setProduct(adapted);

        if (adapted.categoryId) {
          const relRes = await fetch(
            `/api/products?category=${adapted.categoryId}&per_page=4&exclude=${adapted.id}`
          );
          const relData = await relRes.json();
          const relList: any[] = relData?.products ?? [];
          if (!cancelled) {
            setRelated(relList.map(adaptProduct).filter((p: Product) => p.id !== adapted.id));
          }
        }
      } catch (err) {
        console.log("خطا در دریافت محصول:", err);
        if (!cancelled) setNotFoundFlag(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  if (notFoundFlag) {
    notFound();
  }

  if (loading || !product) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-gold" size={28} />
        </div>
        <Footer />
      </main>
    );
  }

  const lowStock = product.editionLeft > 0 && product.editionLeft <= product.editionSize * 0.2;

  function handleAdd() {
  const cartProduct = {
    ...product!,
    price: selectedVariation
      ? selectedVariation.price
      : product!.price,
    name: selectedVariation
      ? `${product!.name} - ${selectedVariation.name}`
      : product!.name,
  };

  addItem(cartProduct, qty);

  showToast(
    `${toPersianDigits(qty)} عدد از «${cartProduct.name}» به سبد خرید افزوده شد`
  );
}

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-40 px-6">
        <div className="mx-auto max-w-7xl">
          {/* مسیر ناوبری */}
          <div className="flex items-center gap-2 font-body text-xs text-bone-faint mb-10">
            <Link href="/" className="hover:text-gold transition-colors">خانه</Link>
            <ChevronLeft size={12} />
            <Link href="/products" className="hover:text-gold transition-colors">محصولات</Link>
            <ChevronLeft size={12} />
            <span className="text-bone-dim">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
           {/* گالری تصویر */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <ProductGallery
                images={product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : []}
                category={product.category}
                badges={
                  <>
                    {product.isNew && (
                      <span className="absolute top-5 right-5 bg-bone/90 text-ink text-xs font-body font-semibold px-3 py-1.5">
                        تازه رونمایی‌شده
                      </span>
                    )}
                    {lowStock && (
                      <span className="absolute top-5 left-5 bg-gold/90 text-ink text-xs font-body font-semibold px-3 py-1.5">
                        فقط {toPersianDigits(product.editionLeft)} عدد باقی مانده
                      </span>
                    )}
                  </>
                }
              />
            </motion.div>

            {/* اطلاعات محصول */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow mb-3">{product.series}</p>
              <h1 className="font-display text-4xl md:text-5xl text-bone leading-[1.15] mb-4">
                {product.name}
              </h1>

{product.variations && product.variations.length > 0 && (
  <div className="mb-6">
    <p className="font-body text-sm text-bone-dim mb-3">
      انتخاب سایز:
    </p>

    <div className="flex gap-3 flex-wrap">
      {product.variations.map((v) => (
       <button
        key={v.id}
        onClick={() => setSelectedVariation(v)}
        className={`border px-4 py-2 text-sm transition-colors ${
        selectedVariation?.id === v.id
          ? "border-gold text-gold"
           : "border-gold/30 text-bone hover:border-gold"
          }`}
>
  {v.attributes?.[0]?.option || `مدل ${v.id}`}
</button>
      ))}
    </div>
  </div>
)}
              
              {product.reviewCount > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <StarRating rating={product.rating} showValue />
                  <span className="font-body text-xs text-bone-faint">
                    ({toPersianDigits(product.reviewCount)} نظر)
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-8">
                {product.compareAtPrice && (
                  <span className="font-body text-base text-bone-faint line-through">
                    {formatToman(product.compareAtPrice)}
                  </span>
                )}
                <span className="font-display text-3xl text-gradient-gold">
                    {formatToman(
                     selectedVariation
                     ? selectedVariation.price
                      : product.price
                       )}
                       </span>
              </div>

              {product.shortDescription && (
                <p className="font-body text-bone-dim text-sm leading-relaxed mb-8 max-w-lg">
                  {product.shortDescription}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gold/10">
                <div>
                  <p className="font-body text-[11px] text-bone-faint mb-1">مقیاس</p>
                  <p className="font-body text-sm text-bone">{product.scale}</p>
                </div>
               <div>
  <p className="font-body text-[11px] text-bone-faint mb-1">
    وضعیت سفارش
  </p>
  <p className="font-body text-sm text-bone">
    تماس بگیرید
  </p>
</div>
                <div>
                  <p className="font-body text-[11px] text-bone-faint mb-1">کد محصول</p>
                  <p className="font-body text-sm text-bone">{product.sku || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <QuantityStepper value={qty} onChange={setQty} max={10} />
                <button
                  onClick={handleAdd}
                  disabled={product.editionLeft === 0}
                  className="group flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-50 disabled:cursor-not-allowed text-ink py-3.5 font-body text-sm font-semibold transition-colors"
                >
                  <ShoppingBag size={16} />
                  {product.editionLeft === 0 ? "ناموجود" : "افزودن به سبد خرید"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <Truck size={18} className="text-gold shrink-0" strokeWidth={1.4} />
                  <span className="font-body text-xs text-bone-dim">ارسال ایمن به سراسر کشور</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Gem size={18} className="text-gold shrink-0" strokeWidth={1.4} />
                  <span className="font-body text-xs text-bone-dim">پرداخت‌شده کاملاً با دست</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={18} className="text-gold shrink-0" strokeWidth={1.4} />
                  <span className="font-body text-xs text-bone-dim">بازسازی مادام‌العمر رایگان</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* تب‌های توضیحات / مشخصات / نظرات */}
          <div className="mt-20 md:mt-28">
            <div className="flex items-center gap-8 border-b border-gold/10 mb-10">
              {[
                { id: "description" as Tab, label: "توضیحات" },
                { id: "specs" as Tab, label: "مشخصات فنی" },
                { id: "reviews" as Tab, label: `نظرات (${toPersianDigits(product.reviewCount)})` },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative pb-4 font-body text-sm transition-colors ${
                    tab === t.id ? "text-gold" : "text-bone-dim hover:text-bone"
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 inset-x-0 h-px bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <div className="max-w-2xl flex flex-col gap-4">
                {product.description.length > 0 ? (
                  product.description.map((para, i) => (
                    <p key={i} className="font-body text-sm md:text-base text-bone-dim leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="font-body text-sm text-bone-faint">توضیحاتی برای این محصول ثبت نشده است.</p>
                )}
              </div>
            )}

            {tab === "specs" && (
              <div className="max-w-2xl divide-y divide-gold/10">
                {product.specs.length > 0 ? (
                  product.specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-4">
                      <span className="font-body text-sm text-bone-faint">{s.label}</span>
                      <span className="font-body text-sm text-bone">{s.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="font-body text-sm text-bone-faint py-4">مشخصات فنی ثبت نشده است.</p>
                )}
              </div>
            )}

            {tab === "reviews" && (
              <div className="max-w-2xl">
                <p className="font-body text-sm text-bone-faint">
                  اتصال نظرات واقعی ووکامرس در مرحله‌ی بعدی اضافه می‌شود.
                </p>
              </div>
            )}
          </div>

          {/* محصولات مرتبط */}
          {related.length > 0 && (
            <div className="mt-24 md:mt-32">
              <div className="flex items-center gap-3 mb-10">
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">شاید این‌ها را هم بپسندید</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p, i) => (
                  <ProductCard product={p} index={i} key={p.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
