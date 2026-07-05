import type { Metadata } from "next";
import { Vazirmatn, Noto_Naskh_Arabic } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const displayFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INJA3D — مجسمه‌های کلکسیونی نسخه محدود",
  description:
    "اینجا۳دی، مجسمه‌های کلکسیونی سه‌بعدی در سطح موزه‌ای، الهام‌گرفته از انیمه، بازی و سینما را می‌سازد. نسخه‌های محدود، پرداخت‌شده با دست، شماره‌گذاری فردی.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-ink text-bone antialiased selection:bg-gold selection:text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
