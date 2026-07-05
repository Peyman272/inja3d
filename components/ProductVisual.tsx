export default function ProductVisual({
  category,
  image,
  className = "",
  hovered = false,
}: {
  category: string;
  image?: string;
  className?: string;
  hovered?: boolean;
}) {
  if (image) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        
        {/* 💣 FIX اصلی: force containment */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          
          <img
            src={image}
            alt=""
            className={`max-w-full max-h-full object-contain transition-transform duration-500 ${
              hovered ? "scale-105" : "scale-100"
            }`}
            style={{
              transformOrigin: "center",
            }}
          />

        </div>

      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gold-radial opacity-60" />

      <div
        className={`relative w-28 h-44 md:w-32 md:h-52 transition-transform duration-500 ${
          hovered ? "scale-105 rotate-3" : "scale-100"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-t-full rounded-b-md bg-gradient-to-b ${
            category ? "from-gold/20 via-gold/25" : "from-gold/20 via-gold/25"
          } to-transparent`}
        />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-px bg-gold/50" />
    </div>
  );
}