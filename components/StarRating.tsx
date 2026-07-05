import { Star, StarHalf } from "lucide-react";

export default function StarRating({
  rating,
  size = 14,
  showValue = false,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) {
            return <Star key={i} size={size} className="fill-gold text-gold" />;
          }
          if (i === full && hasHalf) {
            return <StarHalf key={i} size={size} className="fill-gold text-gold" />;
          }
          return <Star key={i} size={size} className="text-bone-faint/40" />;
        })}
      </div>
      {showValue && (
        <span className="font-body text-xs text-bone-dim mr-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
