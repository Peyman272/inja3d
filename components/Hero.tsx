"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Crown, Gem, ChevronDown } from "lucide-react";

// نمای جایگزین — بعداً با فوتیج واقعی از استودیو و پرینت محصولات جایگزین کنید.
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const stats = [
  { value: "4000+", label: "مجسمه ساخته‌شده" },
  { value: "۹۸٪", label: "بازگشت مشتریان" },
  { value: "+6", label: "سال تجربه‌ی آتلیه" },
];

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-ink">
      {/* ویدیوی پس‌زمینه */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* روکش تیره برای خوانایی + حس‌وحال طلایی */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gold-radial" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      {/* محتوا */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          className="flex items-center gap-2 mb-6 lg:mb-8"
        >
          <Crown className="w-4 h-4 text-gold" />
          <span className="font-body text-xs sm:text-sm text-bone-dim tracking-wide">
            مجسمه‌های کلکسیونی نسخه محدود
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="show"
          className="font-display text-bone leading-[1.15]"
        >
          <span className="block text-[clamp(2.6rem,7.5vw,6rem)]">تجربه‌ای</span>
          <span className="block text-[clamp(2.6rem,7.5vw,6rem)]">فراتر از یک </span>
          <span className="block text-[clamp(2.6rem,7.5vw,6rem)] text-gradient-gold"> فیگور</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          animate="show"
          className="mt-6 lg:mt-8 max-w-md font-body text-sm sm:text-base text-bone-dim leading-relaxed"
        >
          دنیای انیمه، بازی و سینما را به مجسمه‌هایی در سطح موزه تبدیل می‌کنیم؛
          مجسمه‌هایی که فقط روی قفسه نمی‌نشینند —{" "}
          <span className="text-bone font-semibold">جایگاهشان را حفظ می‌کنند.</span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          animate="show"
          className="mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <a
            href="/products"
            className="group flex items-center gap-2 bg-gold hover:bg-gold-bright text-ink px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-sm font-body font-semibold transition-colors"
          >
            مشاهده‌ی مجموعه
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <div className="hidden sm:flex items-center gap-3">
            <Gem className="w-8 h-8 text-gold/70" strokeWidth={1.4} />
            <div className="font-body text-xs text-bone-dim leading-tight">
              <p>ساخت موزه‌ای</p>
              <p>پرداخت‌شده با دست</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.8}
          initial="hidden"
          animate="show"
          className="mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-body font-bold text-bone text-2xl sm:text-4xl lg:text-5xl tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 font-body text-[11px] sm:text-xs text-bone-faint">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone-dim"
      >
        <span className="text-[11px]">اسکرول کنید</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
