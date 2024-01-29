import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  lightMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
