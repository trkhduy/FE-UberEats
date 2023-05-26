/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_HOST: 'http://localhost:3333'
  }
}

module.exports = nextConfig
