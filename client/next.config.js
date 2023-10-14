/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/registration", permanent: false }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tot-bucket.s3.eu-central-1.amazonaws.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
