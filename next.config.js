/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_HOST: 'http://localhost:3333',
    GOOGLE_MAPS_API_KEY: 'AIzaSyBJs9VlH7mnjlYv8umf2DYrlu9DACMAtlo',
  }
}

module.exports = nextConfig
