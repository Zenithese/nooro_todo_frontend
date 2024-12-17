import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "h2-blue": "#4EA8DE",
        "button-blue": "#1E6F9F",
        "card": "#262626",
        "wt": "#F2F2F2",
      },
    },
  },
  plugins: [],
} satisfies Config;
