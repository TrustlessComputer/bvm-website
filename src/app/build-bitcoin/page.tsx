import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import { Metadata } from 'next';
import Landing from '@/modules/landing';

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

// import LandingV3 from '@/modules/landingV3';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        // color: 'white',
        // colorLogo: 'white',
        // bgColor: '#1C1C1C',
        theme: 'white',
      }}
      hideFooter
    >
      <Landing />
    </MainLayout>
  );
}
