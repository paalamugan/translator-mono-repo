module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"], // for unused CSS
  theme: {
    extend: {
      colors: ({ colors }) => ({
        current: "currentColor",
        green: colors.green,
      }),
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
