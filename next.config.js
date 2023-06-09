/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_HOST: 'http://localhost:3333',
    GOOGLE_MAPS_API_KEY: 'AIzaSyDU6fWc1ExrszO-Kz7gkQn-qBh-bMIMjn8',
  }
}

module.exports = nextConfig
