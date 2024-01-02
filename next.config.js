/** @type {import('next').NextConfig} */

const path = require('path');
const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-plugin-svgr');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
                  @import "@/styles/_variables.scss";
                  @import "@/styles/_mixins.scss";
                  `,
  },

  async redirects() {
    return [
      {
        source: '/trustless-computers',
        destination: '/blockchains',
        permanent: false,
      },
      {
        source: '/blockchains/dashboard',
        destination: '/blockchains/computers',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/tc',
        destination: '/blockchains',
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    if (isServer) {
      return config;
    }

    var isProduction = config.mode === 'production';

    if (!isProduction) {
      return config;
    }

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader', 'svg-react-loader'],
    });

    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp');
    }

    config.optimization.splitChunks.maxAsyncRequests = 8;
    config.optimization.splitChunks.maxInitialRequests = 8;

    return config;
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

module.exports = withPlugins([bundleAnalyzer, withSvgr], nextConfig);
