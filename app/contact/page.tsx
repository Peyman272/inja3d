"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const infoCards = [
  {
    icon: Truck,
    title: "ارسال",
    text: "ارسال به سراسر کشور از طریق پست پیشتاز و تیپاکس. زمان آماده‌سازی هر اثر 15 تا 25 روز کاری است.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت و بازسازی",
    text: "تا ۷ روز پس از دریافت امکان بازگشت وجود دارد. آسیب در حمل؟ بازسازی رایگان تا پایان عمر اثر.",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت",
    text: "هر مجسمه با گواهی اصالت امضاشده و شماره‌ی نسخه‌ی حک‌شده ارسال می‌شود.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  }

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gold-radial pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">در ارتباط باشید</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-bone leading-[1.15]">
              تماس با  INJA3D
            </h1>
            <p className="font-body text-bone-dim text-base md:text-lg max-w-xl mt-4">
              سؤالی درباره‌ی سفارش، ارسال یا سفارش اختصاصی دارید؟ تیم ما آماده‌ی پاسخگویی است.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-20 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {infoCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-sm p-7 border-gold/10"
            >
              <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center mb-5">
                <c.icon size={18} className="text-gold" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-lg text-bone mb-2">{c.title}</h3>
              <p className="font-body text-sm text-bone-dim leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative pb-28 md:pb-36 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* اطلاعات تماس */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-display text-2xl text-bone mb-2">راه‌های ارتباطی</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-gold" strokeWidth={1.4} />
              </div>
              <div>
                <p className="font-body text-xs text-bone-faint mb-1">تلفن پشتیبانی</p>
                <p className="font-body text-sm text-bone" dir="ltr">09120085683</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-gold" strokeWidth={1.4} />
              </div>
              <div>
                <p className="font-body text-xs text-bone-faint mb-1">ایمیل</p>
                <p className="font-body text-sm text-bone" dir="ltr">Peymanpj@outlook.co</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-gold" strokeWidth={1.4} />
              </div>
              <div>
                <p className="font-body text-xs text-bone-faint mb-1">فروشگاه </p>
                <p className="font-body text-sm text-bone">تهران , شهرک غرب ,پاساژه پلاتین, طبقه س4 واحد 415</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <Instagram size={16} className="text-gold" strokeWidth={1.4} />
              </div>
              <div>
                <p className="font-body text-xs text-bone-faint mb-1">اینستاگرام</p>
                <p className="font-body text-sm text-bone" dir="ltr">@inja3d</p>
              </div>
            </div>
          
          <div className="flex items-start gap-4">
  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
    <Send size={16} className="text-gold" strokeWidth={1.4} />
  </div>

  <div>
    <p className="font-body text-xs text-bone-faint mb-1">تلگرام</p>
    <p className="font-body text-sm text-bone" dir="ltr">@Peymanpjj</p>
  </div>
</div>
          </motion.div>

          {/* فرم تماس */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-sm p-7 md:p-8 border-gold/10"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <Send size={28} className="text-gold mb-4" strokeWidth={1.4} />
                <h3 className="font-display text-xl text-bone mb-2">پیام شما ارسال شد</h3>
                <p className="font-body text-sm text-bone-dim">
                  به‌زودی از طریق ایمیل با شما تماس خواهیم گرفت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-bone-dim">نام شما</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="input-field"
                    placeholder="نام و نام خانوادگی"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-bone-dim">ایمیل</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="input-field"
                    placeholder="you@example.com"
                    dir="ltr"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-bone-dim">پیام شما</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="input-field resize-none"
                    rows={5}
                    placeholder="سؤال یا درخواست خود را بنویسید..."
                  />
                </label>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-ink py-3.5 font-body text-sm font-semibold transition-colors mt-1"
                >
                  <Send size={16} />
                  ارسال پیام
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
