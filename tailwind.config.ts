/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        gold: "#EAB308",
        brown: "#8B4513",
      },
      backdropBlur: { xs: "4px" },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: { "0%": { boxShadow: "0 0 10px #EAB30833" }, "100%": { boxShadow: "0 0 25px #EAB30880" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
    },
  },
  plugins: [],
}
