import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marca: {
          50: "#f0f7f7",
          100: "#d9ecec",
          600: "#1f6f6f",
          700: "#175757",
          800: "#124646",
        },
      },
    },
  },
  plugins: [],
};
export default config;
