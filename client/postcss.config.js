import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindConfig from "./tailwind.config.cjs";

const mode = process.env.NODE_ENV;
const prod = mode === "production";

export default {
  plugins: [
    tailwind(tailwindConfig), // Some plugins, like postcss-nested, need to run before Tailwind
    autoprefixer({
      overrideBrowserslist: ["last 2 version", "> 1%", "IE 10"],
    }), // But others, like autoprefixer, need to run after
    prod &&
      cssnano({
        preset: "default",
      }),
  ],
};
