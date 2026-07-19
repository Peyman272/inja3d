"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShieldCheck, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { formatToman } from "@/lib/format";
import { Address, Order } from "@/lib/types";


const provinces = [
  "تهران", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی",
  "خوزستان", "مازندران", "گیلان", "کرمان", "یزد",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState<Address>({
    fullName: user?.fullName ?? "",
    phone: user?.phone ?? "",
    province: "تهران",
    city: "",
    postalCode: "",
    addressLine: "",
  });
  const [payment, setPayment] = useState<"online" | "cod">("online");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping = 0;
  const total = subtotal;

  function handleChange<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress((prev) => ({ ...prev, [key]: value }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (items.length === 0) {
    setError("سبد خرید شما خالی است.");
    return;
  }

  if (!address.fullName || !address.phone || !address.city || !address.addressLine || !address.postalCode) {
    setError("لطفاً همه‌ی فیلدهای آدرس را تکمیل کنید.");
    return;
  }

  if (!/^09\d{9}$/.test(address.phone)) {
    setError("شماره موبایل اشتباه است");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total,
        address,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // 👉 رفتن به زرین‌پال
    } else {
      setError("خطا در اتصال به پرداخت");
    }
  } catch (err) {
    setError("خطای سرور");
  }

  setSubmitting(false);
}

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 font-body text-xs text-bone-faint mb-4">
            <Link href="/cart" className="hover:text-gold transition-colors">سبد خرید</Link>
            <ChevronLeft size={12} />
            <span className="text-bone-dim">تسویه حساب</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bone mb-12">تکمیل خرید</h1>

          {items.length === 0 ? (
            <div className="glass rounded-sm py-20 px-6 text-center border-gold/10">
              <p className="font-body text-bone-dim mb-6">سبد خرید شما خالی است.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-bright text-ink px-7 py-3.5 font-body text-sm font-semibold transition-colors"
              >
                مشاهده‌ی محصولات
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* آدرس ارسال */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-sm p-6 md:p-8 border-gold/10"
                >
                  <div className="flex items-center gap-2.5 mb-6">
                    <Truck size={18} className="text-gold" strokeWidth={1.4} />
                    <h2 className="font-display text-xl text-bone">آدرس ارسال</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="نام و نام خانوادگی">
                      <input
                        value={address.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="input-field"
                        placeholder="مثلاً علی محمدی"
                      />
                    </Field>
                    <Field label="شماره موبایل">
                      <input
                        value={address.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="input-field"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        dir="ltr"
                      />
                    </Field>
                    <Field label="استان">
                      <select
                        value={address.province}
                        onChange={(e) => handleChange("province", e.target.value)}
                        className="input-field cursor-pointer"
                      >
                        {provinces.map((p) => (
                          <option key={p} value={p} className="bg-charcoal">
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="شهر">
                      <input
                        value={address.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="input-field"
                        placeholder="مثلاً تهران"
                      />
                    </Field>
                    <Field label="کد پستی">
                      <input
                        value={address.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        className="input-field"
                        placeholder="۱۲۳۴۵۶۷۸۹۰"
                        dir="ltr"
                      />
                    </Field>
                    <Field label="آدرس کامل" className="sm:col-span-2">
                      <textarea
                        value={address.addressLine}
                        onChange={(e) => handleChange("addressLine", e.target.value)}
                        className="input-field min-h-[90px] resize-none"
                        placeholder="خیابان، کوچه، پلاک، واحد"
                      />
                    </Field>
                  </div>
                </motion.div>

                {/* روش پرداخت */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="glass rounded-sm p-6 md:p-8 border-gold/10"
                >
                  <div className="flex items-center gap-2.5 mb-6">
                    <CreditCard size={18} className="text-gold" strokeWidth={1.4} />
                    <h2 className="font-display text-xl text-bone">روش پرداخت</h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setPayment("online")}
                      className={`text-right p-4 border transition-colors ${
                        payment === "online" ? "border-gold bg-gold/5" : "border-gold/15 hover:border-gold/30"
                      }`}
                    >
                      <p className="font-body text-sm text-bone">پرداخت آنلاین (درگاه بانکی)</p>
                      <p className="font-body text-xs text-bone-faint mt-1">
                        پرداخت امن از طریق درگاه بانک؛ بلافاصله پس از تأیید، سفارش ثبت می‌شود.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayment("cod")}
                      className={`text-right p-4 border transition-colors ${
                        payment === "cod" ? "border-gold bg-gold/5" : "border-gold/15 hover:border-gold/30"
                      }`}
                    >
                      <p className="font-body text-sm text-bone">پرداخت در محل</p>
                      <p className="font-body text-xs text-bone-faint mt-1">
                        هزینه‌ی سفارش هنگام تحویل توسط پیک دریافت می‌شود.
                      </p>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* خلاصه سفارش */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-strong rounded-sm p-6 md:p-8 h-fit border-gold/15"
              >
                <h2 className="font-display text-xl text-bone mb-6">خلاصه‌ی سفارش</h2>

                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gold/10 max-h-64 overflow-y-auto pl-1">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between font-body text-sm">
                      <span className="text-bone-dim truncate">
                        {item.name} × {item.qty}
                      </span>
                      <span className="text-bone shrink-0 mr-2">{formatToman(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gold/10">
                  <div className="flex items-center justify-between font-body text-sm">
                    <span className="text-bone-dim">جمع جزء</span>
                    <span className="text-bone">{formatToman(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between font-body text-sm">
                <span className="text-bone-dim">هزینه‌ی ارسال</span>
                <span className="text-bone">پس از هماهنگی</span>
                </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-sm text-bone-dim">مبلغ نهایی</span>
                  <span className="font-display text-2xl text-gradient-gold">{formatToman(total)}</span>
                </div>

                {error && (
                  <p className="font-body text-xs text-red-400 mb-4 leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-60 text-ink py-4 font-body text-sm font-semibold transition-colors"
                >
                  {submitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
                </button>

                <div className="flex items-center gap-2.5 mt-6 justify-center">
                  <ShieldCheck size={14} className="text-gold/70" strokeWidth={1.4} />
                  <span className="font-body text-[11px] text-bone-faint">پرداخت و اطلاعات شما کاملاً امن است</span>
                </div>
              </motion.div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="font-body text-xs text-bone-dim">{label}</span>
      {children}
    </label>
  );
}
