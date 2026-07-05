"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center border border-gold/20">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center text-bone-dim hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="کاهش تعداد"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center font-body text-sm text-bone">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 flex items-center justify-center text-bone-dim hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="افزایش تعداد"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
