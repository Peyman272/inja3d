"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatToman, toPersianDigits } from "@/lib/format";
import { Order } from "@/lib/types";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    try {
      const raw = window.localStorage.getItem("inja3d-orders");
      const all: Order[] = raw ? JSON.parse(raw) : [];
      setOrder(all.find((o) => o.id === orderId) ?? null);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
      <div className="absolute inset-0 bg-gold-radial pointer-events-none" />
      <div className="relative mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-sm p-8 md:p-12 border-gold/15 text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={30} className="text-gold" strokeWidth={1.4} />
          </motion.div>

          <span className="eyebrow">سفارش ثبت شد</span>
          <h1 className="font-display text-3xl md:text-4xl text-bone mt-3 mb-4">
            از خرید شما سپاسگزاریم
          </h1>
          <p className="font-body text-sm text-bone-dim leading-relaxed max-w-md mx-auto">
            سفارش شما با موفقیت ثبت شد و تیم آتلیه‌ی اینجا۳دی به‌زودی آماده‌سازی و بسته‌بندی آن
            را آغاز می‌کند. جزئیات سفارش برای شما پیامک خواهد شد.
          </p>

          {order && (
            <div className="mt-8 border border-gold/10 p-6 text-start">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-4 border-b border-gold/10">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-gold" />
                  <span className="font-body text-sm text-bone" dir="ltr">{order.id}</span>
                </div>
                <span className="font-body text-xs text-bone-faint">
                  {toPersianDigits(order.items.reduce((s, i) => s + i.qty, 0))} قلم کالا
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between">
                    <span className="font-body text-xs text-bone-dim">
                      {item.name} × {toPersianDigits(item.qty)}
                    </span>
                    <span className="font-body text-xs text-bone">
                      {formatToman(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <span className="font-body text-sm text-bone-dim">مبلغ کل پرداخت‌شده</span>
                <span className="font-display text-xl text-gradient-gold">
                  {formatToman(order.total)}
                </span>
              </div>

              <p className="font-body text-xs text-bone-faint mt-4">
                ارسال به: {order.address.addressLine}، {order.address.city}، {order.address.province}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/account"
              className="flex items-center gap-2 bg-gold hover:bg-gold-bright text-ink px-6 py-3 font-body text-xs font-semibold transition-colors"
            >
              مشاهده‌ی سفارش‌ها
              <ChevronLeft size={14} />
            </Link>
            <Link
              href="/products"
              className="border border-gold/20 hover:border-gold/50 text-bone-dim hover:text-bone px-6 py-3 font-body text-xs transition-colors"
            >
              ادامه‌ی خرید
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="relative">
      <Navbar />
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
