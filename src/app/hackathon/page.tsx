import MainLayout from '@/layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import HackathonModule from '@/modules/hackathon';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

// const metadataThumbnail = `${CDN_URL}/images/gamefi.png`; // TODO: Update new thumbnail

// export const metadata = {
//   openGraph: {
//     type: 'website',
//     images: [
//       {
//         url: metadataThumbnail,
//         width: 1200,
//         height: 630,
//         alt: APP_NAME,
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     images: [
//       {
//         url: metadataThumbnail,
//         alt: APP_NAME,
//       },
//     ],
//   },
// };

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
            src={`${CDN_URL}/images/hackathon-hero-bg.png`}
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
