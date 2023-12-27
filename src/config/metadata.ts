import { Metadata } from 'next';

const APP_NAME = 'APP_NAME_TO_DO';
const APP_DEFAULT_TITLE = 'APP_DEFAULT_TITLE_TO_DO';
const APP_TITLE_TEMPLATE = '%s - [App name]';
const APP_DESCRIPTION = 'APP_DESCRIPTION_TO_DO';

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
