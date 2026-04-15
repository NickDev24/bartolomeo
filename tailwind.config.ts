import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F1EA",
        primary: "#6F4E37",
        secondary: "#A67C52",
        accent: "#D9A441",
        text: "#2C2C2C",
        white: "#FFFFFF",
        card: "#FFFDF9",
      },
    },
  },
  plugins: [],
};
export default config;
