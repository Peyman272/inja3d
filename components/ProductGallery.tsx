"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { toPersianDigits } from "@/lib/format";

export default function ProductGallery({
  images,
  category,
  badges,
}: {
  images: string[];
  category: string;
  badges?: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const hasImages = images.length > 0;

  function goNext() {
    setActiveIndex((i) => (i + 1) % images.length);
  }
  function goPrev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div>
      <div className="glass rounded-sm overflow-hidden border-gold/10 relative">
        <div className="relative h-[420px] md:h-[560px] bg-gradient-to-b from-charcoal-high to-charcoal flex items-center justify-center">
          {hasImages ? (
            <>
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-zoom-in"
                aria-label="بزرگ‌نمایی تصویر"
              >
                <img
                  src={images[activeIndex]}
                  alt=""
                  className="max-w-full max-h-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 bg-ink/70 text-bone text-[11px] font-body px-3 py-1.5 rounded-full mx-auto w-fit opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={13} />
                  برای بزرگ‌نمایی کلیک کنید
                </span>
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/60 hover:bg-ink/85 text-bone flex items-center justify-center transition-colors z-10"
                    aria-label="تصویر قبلی"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/60 hover:bg-ink/85 text-bone flex items-center justify-center transition-colors z-10"
                    aria-label="تصویر بعدی"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </>
              )}
            </>
          ) : (
            <ProductVisual category={category} className="h-full w-full" />
          )}

          {badges}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`glass rounded-sm h-16 md:h-20 overflow-hidden transition-colors ${
                activeIndex === i ? "border-2 border-gold" : "border border-gold/10 hover:border-gold/40"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoomOpen && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-charcoal/80 hover:bg-charcoal text-bone flex items-center justify-center transition-colors"
              aria-label="بستن"
            >
              <X size={20} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-charcoal/80 hover:bg-charcoal text-bone flex items-center justify-center transition-colors"
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-charcoal/80 hover:bg-charcoal text-bone flex items-center justify-center transition-colors"
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft size={20} />
                </button>
              </>
            )}

            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={images[activeIndex]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {images.length > 1 && (
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-bone-dim">
                {toPersianDigits(activeIndex + 1)} از {toPersianDigits(images.length)}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}