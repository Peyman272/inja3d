"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !phone || !password) {
      setError("لطفاً همه‌ی فیلدها را تکمیل کنید.");
      return;
    }
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل را به‌درستی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).");
      return;
    }
    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setSubmitting(true);
    const result = register(fullName, email, phone, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "ثبت‌نام ناموفق بود.");
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
            <h1 className="font-display text-3xl md:text-4xl text-bone mb-2">ساخت حساب کاربری</h1>
            <p className="font-body text-sm text-bone-dim mb-8">
              به جمع کلکسیونرهای اینجا۳دی بپیوندید.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-bone-dim">نام و نام خانوادگی</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="مثلاً علی محمدی"
                />
              </label>

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
                <span className="font-body text-xs text-bone-dim">شماره موبایل</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
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
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-bone-dim">تکرار رمز عبور</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <UserPlus size={16} />
                {submitting ? "در حال ثبت‌نام..." : "ساخت حساب"}
              </button>
            </form>

            <p className="font-body text-sm text-bone-dim text-center mt-8">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <Link href="/login" className="text-gold hover:text-gold-bright transition-colors">
                وارد شوید
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
