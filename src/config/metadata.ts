import { Metadata } from 'next';
import { CDN_URL_ICONS } from '../config';

export const APP_NAME = 'Bitcoin Virtual Machine';
export const APP_DEFAULT_TITLE = 'Bitcoin Virtual Machine';
export const APP_TITLE_TEMPLATE = 'Bitcoin Virtual Machine';
export const APP_DESCRIPTION =
  'BVM is the first modular Bitcoin L2 metaprotocol on Bitcoin. With a few clicks, anyone can plug and play the best-of-breed blockchain modules to launch their own Bitcoin L2 blockchain.';
// const APP_THUMBNAIL = `${CDN_URL_ICONS}/metadata.jpg`;

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
        url: 'https://cdn.newbitcoincity.com/nbc/icons/bvm-icons/metadata_5.png',
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
        url: 'https://cdn.newbitcoincity.com/nbc/icons/bvm-icons/metadata_5.png',
        alt: APP_NAME,
      },
    ],
  },
};

export default metadataConfig;
