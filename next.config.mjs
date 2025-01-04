/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  //
  // webpack(config, { isServer }) {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   };

  //   return config;
  // },
  //
};

export default nextConfig;
