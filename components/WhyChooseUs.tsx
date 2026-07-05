"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { whyPillars } from "@/lib/data";
import { Gem, Layers, Fingerprint, ShieldCheck } from "lucide-react";

const icons = [Gem, Layers, Fingerprint, ShieldCheck];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="هنر ما"
          title="چرا کلکسیونرها INJA3D  را انتخاب می‌کنند"
          align="center"
          description="هر مجسمه پیش از رسیدن به دست شما از پنج مرحله‌ی دستی عبور می‌کند."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyPillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-sm p-8 text-center flex flex-col items-center border-gold/10 hover:border-gold/40 transition-colors duration-500 group"
              >
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold group-hover:shadow-gold transition-all duration-500">
                  <Icon size={22} className="text-gold" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-xl text-bone mb-3">{p.title}</h3>
                <p className="font-body text-sm text-bone-dim leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
