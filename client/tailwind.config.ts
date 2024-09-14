import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "9/16": "9 / 16",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorText: "#7c7b89",
        bgColor: "#f1e4de",
        buttonNotSelected: "#f4d75e",
        colorButton: "#e9723d",
        boldTextColor: "#0b7fab",
        bg_color: "#ffbc5d",
        fuchsia_color: "#E02852",
        violet_color: "#63339C",
        border_hover: "#58D8DC",
        main_btn: "#ECDF05",
        main_btn_2: "#F18A10",
        checked_option: "#55C100",
        unchecked_option: "#F8A748",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
config.theme!.extend!.fontFamily = {
  kodeMono: ['"Kode Mono"', "monospace"],
  robotoMono: ['"Roboto Mono"', "monospace"],
};

export default config;
