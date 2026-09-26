/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0a0a0c",
          panel: "#131317",
          card: "#17171c",
          border: "#26262d"
        },
        accent: {
          DEFAULT: "#ccff00",
          dim: "#a3cc00"
        },
        muted: "#8a8a93"
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        card: "10px"
      }
    }
  },
  plugins: []
};
