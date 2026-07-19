"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductVisual from "@/components/ProductVisual";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/lib/cart-context";
import { formatToman, toPersianDigits } from "@/lib/format";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, itemCount } = useCart();
  const shipping = 0;
const total = subtotal;

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">سبد خرید</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bone mb-12">
            سبد خرید شما
          </h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-sm py-24 px-6 flex flex-col items-center text-center border-gold/10"
            >
              <ShoppingBag size={40} className="text-gold/50 mb-6" strokeWidth={1.2} />
              <p className="font-display text-2xl text-bone mb-2">سبد خرید شما خالی است</p>
              <p className="font-body text-sm text-bone-dim mb-8 max-w-sm">
                هنوز اثری به سبد خرید خود اضافه نکرده‌اید. مجموعه‌ی محصولات را کاوش کنید.
              </p>
              <Link
                href="/products"
                className="flex items-center gap-2 bg-gold hover:bg-gold-bright text-ink px-7 py-3.5 font-body text-sm font-semibold transition-colors"
              >
                مشاهده‌ی محصولات
                <ArrowLeft size={15} />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* لیست اقلام */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="glass rounded-sm p-4 md:p-5 flex items-center gap-4 md:gap-6 border-gold/10"
                  >
                    <Link
  href={`/products/${item.slug}`}
  className="shrink-0 w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-charcoal-high to-charcoal rounded-sm overflow-hidden"
>
  {item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <ProductVisual category={item.category} className="h-full scale-90" />
  )}
</Link>

                    <div className="flex-1 min-w-0">
                      <p className="eyebrow mb-1">{item.series}</p>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-lg text-bone hover:text-gold transition-colors block truncate"
                      >
                        {item.name}
                      </Link>
                      <p className="font-body text-xs text-bone-faint mt-1">مقیاس {item.scale}</p>
                    </div>

                    <div className="hidden sm:block shrink-0">
                      <QuantityStepper
                        value={item.qty}
                        onChange={(v) => updateQty(item.productId, v)}
                        max={10}
                      />
                    </div>

                    <div className="shrink-0 text-left">
                      <p className="font-display text-base text-gradient-gold whitespace-nowrap">
                        {formatToman(item.price * item.qty)}
                      </p>
                      <div className="sm:hidden mt-2">
                        <QuantityStepper
                          value={item.qty}
                          onChange={(v) => updateQty(item.productId, v)}
                          max={10}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label="حذف از سبد"
                      className="shrink-0 text-bone-faint hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* خلاصه‌ی سفارش */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-strong rounded-sm p-6 md:p-8 h-fit border-gold/15"
              >
                <h2 className="font-display text-xl text-bone mb-6">خلاصه‌ی سفارش</h2>

                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gold/10">
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-bone-dim">تعداد اقلام</span>
                    <span className="text-bone">{toPersianDigits(itemCount)} عدد</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-bone-dim">جمع جزء</span>
                    <span className="text-bone">{formatToman(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-bone-dim">هزینه‌ی ارسال</span>
                    <span className="text-bone">
                      {shipping === 0 ? "رایگان" : formatToman(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-body text-[11px] text-gold/80 leading-relaxed">
                      با {formatToman(FREE_SHIPPING_THRESHOLD - subtotal)} خرید بیشتر، ارسال رایگان می‌شود.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-8">
                  <span className="font-body text-sm text-bone-dim">مبلغ نهایی</span>
                  <span className="font-display text-2xl text-gradient-gold">{formatToman(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-ink py-4 font-body text-sm font-semibold transition-colors"
                >
                  ادامه‌ی فرایند خرید
                </Link>

                <div className="flex items-center gap-2.5 mt-6 justify-center">
                  <Gem size={14} className="text-gold/70" strokeWidth={1.4} />
                  <span className="font-body text-[11px] text-bone-faint">
                    همه‌ی آثار دارای گواهی اصالت هستند
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
