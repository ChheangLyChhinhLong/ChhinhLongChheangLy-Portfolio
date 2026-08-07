/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        incognito: ["var(--incognito)"],
        inter: ["var(--inter)"],
      },
      colors: {
        "primary-color": "#33E092",
        "secondary-color": "#0CCE6B",
        "tertiary-color": "#16a34a",
        "primary-bg": "rgba(39, 39, 43, 0.4)",
        "secondary-bg": "rgba(250, 250, 250, 0.4)",
        ink: "#08080A",
        lavender: "#818CF8",
        aqua: "#2DD4BF",
      },
      boxShadow: {
        "line-light": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        "line-dark": "rgb(29, 29, 32) 0px 1px 0px",
        glass: "0 24px 70px rgba(15, 23, 42, 0.10), inset 0 1px 0 rgba(255,255,255,0.45)",
        "glass-dark": "0 24px 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.09)",
        "float-dark": "0 18px 55px rgba(0,0,0,0.38)",
      },
      borderRadius: {
        squircle: "32px",
      },
      gridTemplateColumns: {
        custom: "1.2fr 1fr",
      },
      gridTemplateRows: {
        fit: "min-content 0fr",
        full: "min-content 1fr",
      },
      backgroundPosition: {
        zero: "0 0",
      },
    },
  },
  plugins: [],
};
