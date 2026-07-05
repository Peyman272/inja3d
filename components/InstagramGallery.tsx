"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { instagramPosts } from "@/lib/data";
import { Instagram } from "lucide-react";

export default function InstagramGallery() {
  return (
    <section className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="پشت صحنه‌ی استودیو"
            title="INJA3D در اینستاگرام"
          />
          <a
            href="https://instagram.com/INJA3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold font-body text-xs uppercase tracking-widest hover:text-gold-bright transition-colors shrink-0"
          >
            <Instagram size={16} />
            دنبال کردن استودیو
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, i) => (
  <motion.div
    key={post.id}
    className="group relative aspect-square overflow-hidden bg-gradient-to-br from-charcoal-high to-charcoal"
  >
    {/* تصویر واقعی */}
    <img
      src={post.image}
      alt={post.caption}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />

    {/* لایه تاریک */}
    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-300 flex items-center justify-center">
      <p className="font-body text-[11px] text-bone text-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {post.caption}
      </p>
    </div>
  </motion.div>
))}
        </div>
      </div>
    </section>
  );
}
