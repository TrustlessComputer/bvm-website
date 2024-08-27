import { Metadata } from 'next';
import MainLayout from '@layouts/MainLayout';
import ExploreModule from '@/modules/ExploreModule';
import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

const THUMBNAIL = `${CDN_URL}/metadata/bvm-explore-metadata.png`;

export const metadata: Metadata = {
  title: 'Development infrastructure for Bitcoin',
  description:
    "Discover how BVM is unlocking Bitcoin's potential far beyond just being a currency.",
  openGraph: {
    images: [
      {
        url: THUMBNAIL,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: THUMBNAIL,
        alt: APP_NAME,
      },
    ],
  },
};

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        colorLogo: 'black',
        bgColor: 'transparent',
        position: 'absolute',
        // showBanner: true,
      }}
    >
      <ExploreModule />
    </MainLayout>
  );
}
