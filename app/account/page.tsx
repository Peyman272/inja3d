"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, Package, User as UserIcon, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { formatToman, toPersianDigits } from "@/lib/format";
import { Order } from "@/lib/types";

const paymentLabel: Record<Order["paymentMethod"], string> = {
  online: "پرداخت آنلاین",
  cod: "پرداخت در محل",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
console.log("ACCOUNT USER:", user);
console.log("ACCOUNT READY:", ready);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("inja3d-orders");
      const all: Order[] = raw ? JSON.parse(raw) : [];
      setOrders(all);
    } catch {
      setOrders([]);
    }
  }, []);

  if (!ready || !user) {
    return (
      <main className="relative min-h-screen bg-ink">
        <Navbar />
      </main>
    );
  }

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">حساب کاربری</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-bone">
              خوش آمدید، {user.fullName}
            </h1>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-2 border border-gold/20 hover:border-gold/50 text-bone-dim hover:text-bone px-5 py-2.5 font-body text-xs transition-colors self-start sm:self-auto"
            >
              <LogOut size={14} />
              خروج از حساب
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* اطلاعات کاربر */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-sm p-6 md:p-8 border-gold/10 h-fit"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <UserIcon size={18} className="text-gold" strokeWidth={1.4} />
                <h2 className="font-display text-xl text-bone">اطلاعات حساب</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-body text-[11px] text-bone-faint mb-1">نام و نام خانوادگی</p>
                  <p className="font-body text-sm text-bone">{user.fullName}</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-bone-faint mb-1">ایمیل</p>
                  <p className="font-body text-sm text-bone" dir="ltr">{user.email}</p>
                </div>
                <div>
                  <p className="font-body text-[11px] text-bone-faint mb-1">شماره موبایل</p>
                  <p className="font-body text-sm text-bone" dir="ltr">{user.phone}</p>
                </div>
              </div>
            </motion.div>

            {/* تاریخچه‌ی سفارش‌ها */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 glass rounded-sm p-6 md:p-8 border-gold/10"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <Package size={18} className="text-gold" strokeWidth={1.4} />
                <h2 className="font-display text-xl text-bone">سفارش‌های من</h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-sm text-bone-dim mb-6">
                    هنوز سفارشی ثبت نکرده‌اید.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-bright text-ink px-6 py-3 font-body text-xs font-semibold transition-colors"
                  >
                    مشاهده‌ی محصولات
                    <ChevronLeft size={14} />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gold/10 p-5 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-body text-sm text-bone" dir="ltr">
                          {order.id}
                        </span>
                        <span className="font-body text-xs text-bone-faint">
                          {paymentLabel[order.paymentMethod]}
                        </span>
                      </div>
                      <p className="font-body text-xs text-bone-faint">
                        {toPersianDigits(order.items.reduce((s, i) => s + i.qty, 0))} قلم کالا
                        {" · "}
                        ارسال به {order.address.city}، {order.address.province}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-gold/10">
                        <span className="font-body text-xs text-bone-dim">مبلغ کل</span>
                        <span className="font-display text-lg text-gradient-gold">
                          {formatToman(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
