const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TO DO Disabling strict mode for now because of issue with react-specturm:
  // https://github.com/adobe/react-spectrum/issues/2231
  // must enable it eventually when fix is found.
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/scss")],
    prependData: `@import "./styles/_vars.scss";`,
},
}

module.exports = nextConfig
