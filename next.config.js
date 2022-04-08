module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: { exclude: ["error"] },
  },
};
