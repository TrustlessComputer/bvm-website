import MainLayout from '@/layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME, IMAGE_SHARING } from '@/config/metadata';
import HackathonModule from '@/modules/hackathon';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

const metadataThumbnail = `/images/poc/metadata-2x.jpg`; // TODO: Update new thumbnail
// const metadataThumbnail = IMAGE_SHARING; // TODO: Update new thumbnail

const metadataDesc = `
Proof Of Code by BVM: The Weekly Crypto Coding Competition

Compete for a chance to win a share of the $500 weekly prize pool, starting with Solidity problems

Register now to sharpen your coding abilities, connect with a community of like-minded developers, and prove that you are the best!
`;

export const metadata = {
  title: 'PoC',
  description: metadataDesc,

  openGraph: {
    type: 'website',
    images: [
      {
        url: metadataThumbnail,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: metadataThumbnail,
        alt: APP_NAME,
      },
    ],
  },
};

const HackathonPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white',
        bgColor: 'transparent',
        position: 'absolute',
      }}
      bodyColor={'#151515'}
      hideFooter={true}
    >
      <>
        <Box
          position={'absolute'}
          w="100%"
          h={{ base: 'calc(100vh +  184px)', md: '100vh' }}
        >
          <Image
            layout="fill"
            alt="hero thumbnail"
            src={`/images/poc/hackathon-bg-1x.png`}
            // `}
          />
        </Box>

        <Box height="92px" />
        <Loader />
        <HackathonModule />
      </>
    </MainLayout>
  );
};

export default HackathonPage;
