/** @type {import('next').NextConfig} */
const nextConfig = {
   compiler: {
      styledComponents: true,
   },
   reactStrictMode: true,
   // Be tudod állítani az engedélyezett img url domain-eket
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'scontent.fbud4-1.fna.fbcdn.net',
         },
         {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
         },
      ],
   },
}

module.exports = nextConfig
