"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatToman } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import ProductVisual from "./ProductVisual";
import StarRating from "./StarRating";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast(`«${product.name}» به سبد خرید افزوده شد`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          style={{ perspective: 900 }}
          className="relative"
        >
          {/* پرتو نور روی هاور */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(180deg, rgba(240,205,124,0.22) 0%, rgba(240,205,124,0.05) 45%, transparent 80%)",
              filter: "blur(2px)",
            }}
          />

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative glass rounded-sm overflow-hidden border-gold/10 group-hover:border-gold/40 transition-colors duration-500"
          >
            {/* محفظه‌ی نمایش */}
            <div className="relative h-72 md:h-80 bg-gradient-to-b from-charcoal-high to-charcoal overflow-hidden">
              <ProductVisual category={product.category} image={product.image} hovered={hovered} className="h-full" />

              {product.editionLeft === 0 ? (
                <span className="absolute top-4 right-4 bg-charcoal-high/95 text-bone-faint text-[10px] font-body font-semibold px-2.5 py-1 border border-gold/10">
                  ناموجود
                </span>
              ) : product.editionLeft <= product.editionSize * 0.2 && (
                <span className="absolute top-4 right-4 bg-gold/90 text-ink text-[10px] font-body font-semibold px-2.5 py-1">
                  رو به اتمام
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 right-4 bg-bone/90 text-ink text-[10px] font-body font-semibold px-2.5 py-1">
                  تازه
                </span>
              )}
              <span className="absolute top-4 left-4 eyebrow text-[10px]">{product.category}</span>

              <button
                onClick={handleAddToCart}
                disabled={product.editionLeft === 0}
                className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-gold/95 hover:bg-gold-bright disabled:bg-charcoal-high disabled:text-bone-faint disabled:cursor-not-allowed text-ink text-xs font-body font-semibold py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              >
                <ShoppingBag size={14} />
                {product.editionLeft === 0 ? "ناموجود" : "افزودن به سبد خرید"}
              </button>
            </div>

            <div className="p-5 md:p-6 border-t border-gold/10">
              <div className="flex items-center justify-between mb-1">
                <p className="eyebrow">{product.series}</p>
                <StarRating rating={product.rating} size={11} />
              </div>
              <h3 className="font-display text-xl text-bone mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-bone-dim text-xs font-body">مقیاس {product.scale}</span>
                <div className="flex items-center gap-2">
                  {product.compareAtPrice && (
                    <span className="text-bone-faint text-xs line-through font-body">
                      {formatToman(product.compareAtPrice)}
                    </span>
                  )}
                  <span className="font-display text-lg text-gradient-gold">
                    {formatToman(product.price)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
