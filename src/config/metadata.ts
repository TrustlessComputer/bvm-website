import { Metadata } from 'next';
import { CDN_URL_ICONS } from '../config';

const APP_NAME = 'Bitcoin Virtual Machine';
const APP_DEFAULT_TITLE = 'Bitcoin Virtual Machine';
const APP_TITLE_TEMPLATE = 'Bitcoin Virtual Machine';
const APP_DESCRIPTION =
  'A metaprotocol that lets developers launch their own L2 blockchain and build dapps on Bitcoin';
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
        url: 'https://cdn.newbitcoincity.com//nbc/icons/bvm-icons/metadata.jpg',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default metadataConfig;
