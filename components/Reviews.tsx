"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/lib/data";
import { Star, Quote } from "lucide-react";

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-28 md:py-36 px-6 bg-charcoal/20">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="صدای کلکسیونرها"
          title="مشتریان ما چه می‌گویند"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-sm p-8 flex flex-col border-gold/10 hover:border-gold/30 transition-colors duration-500"
            >
              <Quote size={26} className="text-gold/40 mb-4" strokeWidth={1.2} />
              <p className="font-display text-lg text-bone italic leading-relaxed mb-6">
                "{r.quote}"
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gold/10">
                <div>
                  <p className="font-body text-sm text-bone">{r.name}</p>
                  <p className="font-body text-xs text-bone-dim">{r.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
