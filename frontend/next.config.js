/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: false,
   },
   reactStrictMode: true,
   // Be tudod állítani az engedélyezett img url domain-eket
   images: {
      domains: ['scontent.fbud4-1.fna.fbcdn.net'],
   },
}

module.exports = nextConfig
