"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { toPersianDigits } from "@/lib/format";

const links = [
  { label: "محصولات", href: "/products" },
  { label: "مجموعه‌ها", href: "/#collections" },
  { label: "پرفروش‌ها", href: "/#best-sellers" },
  { label: "تازه‌ها", href: "/#new-arrivals" },
  { label: "چرا اینجا۳دی", href: "/#why" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 transition-all duration-500 ${
          scrolled ? "glass-strong rounded-sm mx-4 md:mx-auto" : ""
        }`}
      >
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-display text-2xl tracking-[0.1em] text-bone">
            INJA<span className="text-gold">3D</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[14px] text-bone-dim hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5 text-bone-dim">
            <Link href="/products" aria-label="جست‌وجوی محصولات">
              <Search size={18} className="hover:text-gold transition-colors cursor-pointer" />
            </Link>
            <Link
              href={user ? "/account" : "/login"}
              aria-label="حساب کاربری"
              className="relative"
            >
              <User size={18} className="hover:text-gold transition-colors cursor-pointer" />
              {user && (
                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-gold" />
              )}
            </Link>
            <Link href="/cart" aria-label="سبد خرید" className="relative">
              <ShoppingBag size={18} className="hover:text-gold transition-colors cursor-pointer" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-gold text-ink text-[10px] font-body font-bold flex items-center justify-center">
                  {toPersianDigits(itemCount)}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/cart" aria-label="سبد خرید" className="relative text-bone">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-gold text-ink text-[10px] font-body font-bold flex items-center justify-center">
                  {toPersianDigits(itemCount)}
                </span>
              )}
            </Link>
            <button
              className="text-bone"
              onClick={() => setOpen((o) => !o)}
              aria-label="باز و بسته کردن منو"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden glass-strong mx-4 mt-2 rounded-sm"
          >
            <div className="flex flex-col gap-1 p-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-bone-dim hover:text-gold py-3 border-b border-gold/10 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={user ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="font-body text-base text-bone-dim hover:text-gold py-3 transition-colors"
              >
                {user ? `حساب کاربری (${user.fullName})` : "ورود / ثبت‌نام"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
