module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
  theme: {
    extend: {
      colors: ({ colors }) => ({
        current: "currentColor",
        green: colors.green,
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
