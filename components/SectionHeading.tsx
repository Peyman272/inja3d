"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-start"}`}
    >
      <div className="flex items-center gap-3">
        {!isCenter && <span className="h-px w-8 bg-gold/60" />}
        <span className="eyebrow">{eyebrow}</span>
        {isCenter && <span className="h-px w-8 bg-gold/60" />}
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-bone leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className={`font-body text-bone-dim text-base md:text-lg max-w-xl ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
