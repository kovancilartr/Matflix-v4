// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... diğer ayarlar ...
    server: {
      // Güvenilir hostları buraya ekleyin
      trustedHosts: ['localhost'],
    },
  };
  
  export default nextConfig;