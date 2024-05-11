/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  };
  
export default nextConfig;