import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { obsidian: "#0A0A0A", gold: "#EAB308" } } },
  plugins: [],
};
export default config;
