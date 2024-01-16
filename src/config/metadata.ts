import { Metadata } from 'next';
import { CDN_URL_ICONS } from '../config';

const APP_NAME = 'Bitcoin Virtual Machine';
const APP_DEFAULT_TITLE = 'Bitcoin Virtual Machine';
const APP_TITLE_TEMPLATE = 'Bitcoin Virtual Machine';
const APP_DESCRIPTION =
  'BVM is a metaprotocol that lets developers launch their own lightning-fast and low-cost Bitcoin L2 blockchain in a few clicks and start building decentralized applications on Bitcoin.';
// const APP_THUMBNAIL = `${CDN_URL_ICONS}/metadata.jpg`;

const metadataConfig: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
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
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: 'https://cdn.newbitcoincity.com/nbc/icons/bvm-icons/metadata.jpg',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

export default metadataConfig;
