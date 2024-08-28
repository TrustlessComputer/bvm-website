import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import LandingV3 from '@/modules/landingV3';
import { Metadata } from 'next';

const THUMBNAIL = `${CDN_URL}/pages/build-bitcoin/build-bitcoin-metadata.png`;

export const metadata: Metadata = {
  title: 'Launch your own Bitcoin L2 with drags and drops.',
  description: 'No coding expertise required — just your big idea.',

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

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        colorLogo: 'black',
      }}
      footerClassName={'mt-0'}
    >
      <LandingV3 />
    </MainLayout>
  );
}
