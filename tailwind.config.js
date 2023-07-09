// const {
//   iconsPlugin,
//   getIconCollections,
// } = require("@egoist/tailwindcss-icons");

import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          0: "#F9FBFF",
          1: "#E7EFFA",
          2: "#B8D0F1",
          3: "#89B1E8",
          4: "#5A92DE",
          5: "#2A73D5",
          6: "#215AA5",
          7: "#174076",
          8: "#0E2647",
          9: "#050D18",
        },
        success: {
          1: "#E8FAEF",
          2: "#BAEFD0",
          3: "#8BE5B1",
          4: "#5DDB92",
          5: "#2FD073",
          6: "#24A259",
          7: "#1A7440",
          8: "#104526",
          9: "#05170D",
        },
        "white-gray": "F9F9F9",
      },
    },
    fontFamily: {
      sans: ["Source Sans 3", "sans-serif"],
    },
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
};
