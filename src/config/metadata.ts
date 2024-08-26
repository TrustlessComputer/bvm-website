import { Metadata } from 'next';

export const APP_NAME = 'Development infrastructure for Bitcoin.';
export const APP_DEFAULT_TITLE = 'Development infrastructure for Bitcoin.';
export const APP_TITLE_TEMPLATE = '%s'; // Don't need extra text for the title
export const APP_DESCRIPTION = `Deploy Bitcoin chains, build Bitcoin apps, and bring Bitcoin to the people.`;
// const APP_THUMBNAIL = `${CDN_URL_ICONS}/metadata.jpg`;
export const IMAGE_SHARING = `https://storage.googleapis.com/tc-cdn-prod/pages/bvm/home-metadata.png`;

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
