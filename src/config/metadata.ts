import { Metadata } from 'next';

export const APP_NAME = 'Launch your own ZK Rollup on Bitcoin for $99/month.';
export const APP_DEFAULT_TITLE = 'Launch your own ZK Rollup on Bitcoin for $99/month.';
export const APP_TITLE_TEMPLATE = '%s | Launch your own ZK Rollup on Bitcoin for $99/month.';
export const APP_DESCRIPTION =
  `Join the wave of developers building blockchains and decentralized applications. With its simple and intuitive interface, our blockchain platform is the perfect starting point for your blockchain journey.`;
// const APP_THUMBNAIL = `${CDN_URL_ICONS}/metadata.jpg`;
export const IMAGE_SHARING = 'https://storage.googleapis.com/bvm-network/image/metadata-sharing-bvm-v2.jpg';

const metadataConfig: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  // manifest: "/manifest.json",// using for PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: IMAGE_SHARING,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: IMAGE_SHARING,
        alt: APP_NAME,
      },
    ],
  },
};

export default metadataConfig;
