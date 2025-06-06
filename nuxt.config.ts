import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  css: ["~/assets/tailwind.css"],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
