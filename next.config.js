/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable webpack cache to avoid WSL path issues
  webpack: (config) => {
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig

