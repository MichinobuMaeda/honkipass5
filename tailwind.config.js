import colors, { blue } from "tailwindcss/colors";
import { generateScheme, contrast } from "./material-theme.js";

const lightLink = blue[700];
const darkLink = blue[300];

const materialTheme = generateScheme("#4C662B", contrast.standard);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      ...colors,
      ...materialTheme,
      lightLink,
      darkLink,
      lightForm: materialTheme.lightBackground,
      lightOnForm: materialTheme.lightOnBackground,
      darkForm: materialTheme.darkBackground,
      darkOnForm: materialTheme.darkOnBackground,
    },
    extend: {},
  },
  plugins: [],
};
