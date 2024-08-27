import MainLayout from '@layouts/MainLayout';
import TeamModule from '@/modules/team';
import { CDN_URL } from '@/config';
import { Metadata } from 'next';
import { APP_NAME } from '@/config/metadata';

const THUMBNAIL = `${CDN_URL}/metadata/bvm-team-metadata.png`;

export const metadata: Metadata = {
  description:
    'BVM is a crypto research and development team. Our mission is to upgrade Bitcoin beyond just a currency.',
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

const TeamPage = () => {
  return (
    <MainLayout
      headerProps={{
        bgColor: 'transparent',
        color: 'black',
        position: 'absolute',
      }}
      bodyColor={'#f2f2f2'}
    >
      <TeamModule />
    </MainLayout>
  );
};

export default TeamPage;
