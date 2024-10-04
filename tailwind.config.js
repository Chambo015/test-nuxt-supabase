const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.{js,vue,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // TODO: change file to .ts and change colors
        purple: {
          50: "(var(--purple-50)",
          100: "(var(--purple-100)",
          200: "(var(--purple-200)",
          300: "(var(--purple-300)",
          400: "(var(--purple-400)",
          500: "(var(--purple-500)",
          600: "(var(--purple-600)",
          700: "(var(--purple-700)",
          800: "(var(--purple-800)",
          900: "(var(--purple-900)",
          950: "(var(--purple-950)",
        },
        primary: "#7F56D9",
        "primary-hover": "#6941C6",

        "primary-50": "rgb(var(--primary-50))",
        "primary-100": "rgb(var(--primary-100))",
        "primary-200": "rgb(var(--primary-200))",
        "primary-300": "rgb(var(--primary-300))",
        "primary-400": "rgb(var(--primary-400))",
        "primary-500": "rgb(var(--primary-500))",
        "primary-600": "rgb(var(--primary-600))",
        "primary-700": "rgb(var(--primary-700))",
        "primary-800": "rgb(var(--primary-800))",
        "primary-900": "rgb(var(--primary-900))",
        "primary-950": "rgb(var(--primary-950))",

        "surface-0": "rgb(var(--surface-0))",
        "surface-50": "rgb(var(--surface-50))",
        "surface-100": "rgb(var(--surface-100))",
        "surface-200": "rgb(var(--surface-200))",
        "surface-300": "rgb(var(--surface-300))",
        "surface-400": "rgb(var(--surface-400))",
        "surface-500": "rgb(var(--surface-500))",
        "surface-600": "rgb(var(--surface-600))",
        "surface-700": "rgb(var(--surface-700))",
        "surface-800": "rgb(var(--surface-800))",
        "surface-900": "rgb(var(--surface-900))",
        "surface-950": "rgb(var(--surface-950))",

        "main-bg": "#FAFAFA",
        "main-purple": "#916AE9",
        lime: {
          main: "#E1FFA8",
        },
      },
      fontFamily: {
        NeueMachina: ["Neue Machina", ...fontFamily.sans],
        sfProDisplay: ["SF Pro Display", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
        manrope: ["Manrope", ...fontFamily.sans],
      },
      backgroundImage: {
        headingLinerGradientBg: "linear-gradient(to right, #734CC9 0%, #9C6FFF 100%)",
        primaryHeadingBg: "linear-gradient(90deg, rgba(174, 137, 255, 1) 0%, rgba(115, 76, 201, 1) 100%)",
        secondaryHeadingBg: "linear-gradient(90deg, rgba(115, 76, 201, 1) 0%, rgba(156, 111, 255, 1) 100%)",
      },
      spacing: {
        sidebarWidth: "260px",
        miniSidebarWidth: "90px",
        mobileTabsHeight: "calc(60px + 1px)",
        navbarHeight: "68px",
      },
      fontSize: {
        30: ["30px", "38px"],
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [],
};
