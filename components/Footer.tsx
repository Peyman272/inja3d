"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter } from "lucide-react";

const columns = [
  {
    title: "فروشگاه",
    links: [
      { label: "پرفروش‌ها", href: "/#best-sellers" },
      { label: "تازه‌ها", href: "/#new-arrivals" },
      { label: "همه‌ی محصولات", href: "/products" },
      { label: "انیمه", href: "/products?cat=انیمه" },
      { label: "بازی", href: "/products?cat=بازی" },
      { label: "سینما", href: "/products?cat=سینما" },
    ],
  },
  {
    title: "آتلیه",
    links: [
      { label: "هنر ما", href: "/#why" },
      { label: "متریال‌ها", href: "/#why" },
      { label: "سفارش اختصاصی", href: "/contact" },
      { label: "عمده‌فروشی", href: "/contact" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "ارسال", href: "/contact" },
      { label: "بازگشت و بازسازی", href: "/contact" },
      { label: "پیگیری سفارش", href: "/contact" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 px-6 border-t border-gold/10 bg-ink">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <Link href="/" className="font-display text-3xl tracking-[0.1em] text-bone">
              INJA<span className="text-gold">3D</span>
            </Link>
            <p className="font-body text-bone-dim text-sm mt-5 max-w-sm leading-relaxed">
              مجسمه‌های کلکسیونی در سطح موزه‌ای، تراش‌خورده از دنیایی که دوستش دارید.
              پرداخت‌شده با دست، شماره‌گذاری فردی، ساخته‌شده برای ماندن.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <p className="eyebrow mb-3">به لیست آتلیه بپیوندید</p>
              <form className="flex max-w-sm border-b border-gold/30 focus-within:border-gold transition-colors">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="bg-transparent flex-1 py-3 font-body text-sm text-bone placeholder:text-bone-faint outline-none"
                />
                <button
                  type="submit"
                  className="font-body text-xs text-gold hover:text-gold-bright transition-colors px-2"
                >
                  عضویت
                </button>
              </form>
            </motion.div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-bone-dim hover:text-gold transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-bone-faint">
            © {new Date().getFullYear()} آتلیه‌ی اینجا۳دی. تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-5">
            <Instagram size={16} className="text-bone-dim hover:text-gold transition-colors cursor-pointer" />
            <Youtube size={16} className="text-bone-dim hover:text-gold transition-colors cursor-pointer" />
            <Twitter size={16} className="text-bone-dim hover:text-gold transition-colors cursor-pointer" />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="font-body text-xs text-bone-faint hover:text-gold transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/contact" className="font-body text-xs text-bone-faint hover:text-gold transition-colors">
              قوانین
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
<div className="mt-16 border-t border-gold/10 pt-10">

  <p className="text-center font-display text-lg text-bone mb-2">
    اعتماد شما، ارزشمندترین سرمایه‌ی ماست
  </p>

  <p className="text-center text-sm text-bone-dim mb-8">
    تمامی پرداخت‌ها از طریق درگاه امن زرین‌پال انجام می‌شود.
  </p>

  <div className="flex justify-center items-center gap-8">

    <!-- اینماد -->

    <!-- زرین پال -->

  </div>

</div>
