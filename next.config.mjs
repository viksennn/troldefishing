/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
    // Your Next.js configuration options here
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  };
  
  module.exports = nextConfig;
  