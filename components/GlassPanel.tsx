import { HTMLAttributes, ReactNode } from "react";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strong?: boolean;
};

export default function GlassPanel({
  children,
  strong = false,
  className = "",
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={`${strong ? "glass-strong" : "glass"} rounded-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
