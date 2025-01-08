/** @type {import('next').NextConfig} */

const path = require('path');
const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-plugin-svgr');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isDevEnv = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

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
  async rewrites() {
    return [
      {
        source: '/poc',
        destination: '/PoC',
      },
    ];
  },
  async redirects() {
    const redirects = [
      {
        source: '/blockchains',
        destination: '/rollups',
        permanent: false,
      },
      {
        source: '/tge',
        destination: '/bvm',
        permanent: false,
      },
      {
        source: '/rollups',
        destination: '/chains',
        permanent: false,
      },
      {
        source: '/rollups/customizev2',
        destination: '/studio',
        permanent: false,
      },
      {
        source: '/rollups/customize',
        destination: '/studio',
        permanent: false,
      },
      {
        source: '/module/bvm-studio',
        destination: '/module/bitcoin-raas-studio',
        permanent: false,
      },
      {
        source: '/module/bitcoin-studio',
        destination: '/module/bitcoin-raas-studio',
        permanent: false,
      },
      {
        source: '/heartbeat',
        destination: '/heartbeats',
        permanent: false,
      },
        {
        source: '/shard',
        destination: '/bvm',
        permanent: false,
      },
      // {
      //   source: '/launchpad',
      //   destination: `/`,
      //   permanent: true,
      // },
      // {
      //   source: '/launchpad/detail/:slug',
      //   destination: `/`,
      //   permanent: true,
      // },
    ];
    //
    // if (isPublicSale) {
    //   redirects.push({
    //     source: '/allowlist',
    //     destination: '/public-sale',
    //     permanent: false,
    //   })
    // }
    return redirects;
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
      test: /\.md$/,
      use: 'raw-loader',
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
