import MainLayout from '@/layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import HackathonModule from '@/modules/hackathon';
import { Box } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

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
  return redirect('/');

  // return (
  //   <MainLayout
  //     headerProps={{
  //       color: 'white',
  //       colorLogo: 'white',
  //       bgColor: 'transparent',
  //       position: 'absolute',
  //     }}
  //     bodyColor={'#151515'}
  //     hideFooter={true}
  //   >
  //     <>
  //       <Box height="92px" />
  //       <Loader />
  //       <HackathonModule />
  //     </>
  //   </MainLayout>
  // );
};

export default HackathonPage;