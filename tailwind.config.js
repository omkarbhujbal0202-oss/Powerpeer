/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#171e19",
        sage: "#b7c6c2",
        taupe: "#9f8d8b",
        beige: "#d7c5b2",
        cyan: "#d5f4f9",
        softblue: "#bbe2f5",
        charcoal: "#302b2f"
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      cursor: {
        crosshair: 'crosshair',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
