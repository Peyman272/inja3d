"use client";

import ProductGridSection from "./ProductGridSection";

export default function NewArrivals() {
  return (
    <ProductGridSection
      id="new-arrivals"
      eyebrow="تازه رونمایی‌شده"
      title="تازه‌ترین‌ها"
      description="تازه از استودیو — آخرین آثاری که مراحل تولید و کنترل کیفیت را تمام کرده‌اند."
      query={{ orderby: "date", order: "desc" }}
      className="bg-charcoal/20"
    />
  );
}
