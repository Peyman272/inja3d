import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07070A",
          soft: "#0C0C10",
        },
        charcoal: {
          DEFAULT: "#131316",
          high: "#1B1B1F",
        },
        gold: {
          dim: "#8A6F35",
          DEFAULT: "#C9A24B",
          bright: "#F0CD7C",
          line: "#5C4A24",
        },
        bone: {
          DEFAULT: "#F3EFE7",
          dim: "#A8A39A",
          faint: "#6E6A63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at 50% 0%, rgba(201,162,75,0.18), rgba(7,7,10,0) 60%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #C9A24B, transparent)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(201,162,75,0.45)",
        glass: "0 8px 32px rgba(0,0,0,0.55)",
      },
      keyframes: {
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        rotateSlow: "rotateSlow 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
