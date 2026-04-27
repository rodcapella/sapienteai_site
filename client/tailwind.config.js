export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        brand: {
          night: "#05081B",
          deep: "#1A1F2E",
          primary: "#0A8AFF",
          cyan: "#00D1FF",
          cyanBright: "#00F0FF",
          purple: "#7B81FF",
          offwhite: "#EAF6FF",
        },
      },

      borderColor: {
        border: "var(--border)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Sora", "Inter", "sans-serif"],
      },

      // 💎 sombras suaves
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        medium: "0 20px 60px rgba(0,0,0,0.12)",
      },

      // 💎 radius consistente
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      // 💎 easing premium
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      
      willChange: {
        transform: "transform",
      },
      // 💎 spacing mais respirado
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

    },
  },

  plugins: [require("tailwindcss-animate")],
};