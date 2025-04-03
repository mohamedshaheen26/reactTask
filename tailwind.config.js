export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xxs: "1px", // Extra extra small
        xs: "2px", // Extra small
      },
    },
  },
  plugins: [],
};
