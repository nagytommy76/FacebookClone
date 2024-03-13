// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack(config, options) {
      config.module.rules.push({
         test: /\.(mp3|wav|m4a)$/,
         use: {
            loader: 'file-loader',
         },
      })
      return config
   },
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
