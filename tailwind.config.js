const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "theme-primary": "#EEEFF2",
        "color-primary": "#138BFC",
        "color-secondary": "#231F20",
        "color-accent": "#FF5D73",
      },
    },
    screens: {
      sm: "640px",
      md: "960px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
      "3xl": "1600px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
