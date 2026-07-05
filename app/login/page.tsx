"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      return;
    }

    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "ورود ناموفق بود.");
      return;
    }

    router.push("/account");
  }

  return (
    <main className="relative">
      <Navbar />

      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gold-radial pointer-events-none" />
        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-sm p-8 md:p-10 border-gold/15"
          >
            <div className="flex items-center gap-3 mb-2">
              <Gem size={18} className="text-gold" strokeWidth={1.4} />
              <span className="eyebrow">حساب کاربری</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-bone mb-2">ورود به حساب</h1>
            <p className="font-body text-sm text-bone-dim mb-8">
              برای پیگیری سفارش‌ها و خرید سریع‌تر وارد شوید.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-bone-dim">ایمیل</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  dir="ltr"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-bone-dim">رمز عبور</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </label>

              {error && (
                <p className="font-body text-xs text-red-400 leading-relaxed">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright disabled:opacity-60 text-ink py-3.5 font-body text-sm font-semibold transition-colors mt-2"
              >
                <LogIn size={16} />
                {submitting ? "در حال ورود..." : "ورود"}
              </button>
            </form>

            <p className="font-body text-sm text-bone-dim text-center mt-8">
              هنوز حساب کاربری ندارید؟{" "}
              <Link href="/register" className="text-gold hover:text-gold-bright transition-colors">
                ثبت‌نام کنید
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
