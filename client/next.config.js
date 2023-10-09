/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/registration", permanent: false }];
  },
};

module.exports = nextConfig;
