const withLess = require("next-with-less");
const lessToJs = require("less-vars-to-js");
const fs = require("fs");

// Read the less file in as string
const themePalettes = fs.readFileSync("./styles/theme.custom.less", "utf8");
// console.log("___themePalettes___\n", themePalettes.split("\n"));
// Pass in file contents
const themeVariables = lessToJs(themePalettes, {
  resolveVariables: true,
  stripPrefix: true,
});

// const path = require("path");
// const pathToLessFileWithVariables = path.resolve("./styles/theme.less");

const antdTheme = withLess({
  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* ... */
      // modifyVars: {
      //   "primary-color": "red",
      //   "border-radius-base": "2px",
      //   /* ... */
      // },
      modifyVars: themeVariables,
      // additionalData: (content) =>
      //   `${content}\n\n@import '${pathToLessFileWithVariables}';`,
    },
  },
});
const isNodeEnvProd = process.env.NODE_ENV === "production";
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: isNodeEnvProd ? { exclude: ["error"] } : false,
  },
  ...antdTheme,
};
