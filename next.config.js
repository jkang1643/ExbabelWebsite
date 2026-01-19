/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable webpack cache to avoid WSL path issues
  webpack: (config) => {
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig

