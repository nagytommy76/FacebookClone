/** @type {import('next').NextConfig} */
const nextConfig = {
   compiler: {
      styledComponents: true,
   },
   reactStrictMode: true,
   // Be tudod állítani az engedélyezett img url domain-eket
   images: {
      domains: ['scontent.fbud4-1.fna.fbcdn.net', 'firebasestorage.googleapis.com'],
   },
}

module.exports = nextConfig
