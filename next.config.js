/** @type {import('next').NextConfig} */

const path = require('path');

const isDevEnv = process.env.NODE_ENV === 'development';

const nextConfig = {
  swcMinify: true,
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: !!isDevEnv,
  },
  poweredByHeader: false,
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  generateEtags: true, // etags
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "@/styles/_font.scss";
                  @import "@/styles/_global.scss";
                  @import "@/styles/_variables.scss";
                  @import "@/styles/_mixins.scss";
                  @import "@/styles/_mixins.scss";
                  @import "@/styles/_root.scss";
                  `,
  },
  compiler: {
    removeConsole: !isDevEnv
      ? {
          exclude: ['error'],
        }
      : false,
    emotion: false,
    styledComponents: true,
  },
};

module.exports = nextConfig;
