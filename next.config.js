/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_HOST: 'http://localhost:3333',
    GOOGLE_MAPS_API_KEY: 'AIzaSyDKlrInmKV4Mrnv3m5T-CXXDG0-J7bCFtQ',
  }
}

module.exports = nextConfig
