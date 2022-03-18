// const tailwind = require("tailwindcss");
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import tailwindcssNesting from "tailwindcss/nesting/index.js";
import tailwindConfig from "./tailwind.config.cjs";

const mode = process.env.NODE_ENV;
const prod = mode === "production";

let plugins = [
  postcssImport(),
  tailwindcssNesting(postcssNesting()),
  tailwind(tailwindConfig),
  autoprefixer({
    overrideBrowserslist: ["last 2 version", "> 1%", "IE 10"],
  }),
];

prod && plugins.push(cssnano({ preset: "default" }));

export default {
  plugins,
};
