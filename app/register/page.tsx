"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  // ✅ validation ها
  if (!fullName || !email || !phone || !password) {
    setError("لطفاً همه‌ی فیلدها را تکمیل کنید.");
    return;
  }

  if (!/^09\d{9}$/.test(phone)) {
    setError("شماره موبایل نامعتبر است.");
    return;
  }

  if (password.length < 6) {
    setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
    return;
  }

  if (password !== confirmPassword) {
    setError("رمز عبور و تکرار آن یکسان نیست.");
    return;
  }

  setSubmitting(true);

  try {
    // 🚀 ارسال به API خودت در Next.js
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        password,
      }),
    });

    const data = await res.json();

    // ❌ اگر API خطا داد
    if (!res.ok || !data.ok) {
      setError(data.error || "ثبت‌نام ناموفق بود");
      return;
    }

    // ✅ موفق
    router.push("/account");

  } catch (err: any) {
    setError("خطا در ارتباط با سرور");
  } finally {
    setSubmitting(false);
  }
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
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-sm p-8 md:p-10 border-gold/15"
          >
            <div className="flex items-center gap-3 mb-2">
              <Gem size={18} className="text-gold" />
              <span className="eyebrow">حساب کاربری</span>
            </div>

            <h1 className="text-3xl mb-2">ساخت حساب کاربری</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                placeholder="نام و نام خانوادگی"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
              />

              <input
                type="email"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                dir="ltr"
              />

              <input
                placeholder="شماره موبایل"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                dir="ltr"
              />

              <input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                dir="ltr"
              />

              <input
                type="password"
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                dir="ltr"
              />

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-gold py-3 disabled:opacity-60"
              >
                <UserPlus size={16} />
                {submitting ? "در حال ثبت‌نام..." : "ساخت حساب"}
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <Link href="/login" className="text-gold">
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
