/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "firebasestorage.googleapis.com",
      "googleusercontent.com",
    ],
  },
  experimental: {
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/icons-material/?(((\\w*)?/?)*)": {
        transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
      },
    },
  },
};
