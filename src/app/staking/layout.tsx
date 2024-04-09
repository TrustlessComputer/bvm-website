import React from 'react';
import { APP_NAME } from '@/config/metadata';
import { Flex } from '@chakra-ui/react';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `/shard/seo_image.jpg`,
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
        url: `/shard/seo_image.jpg`,
        alt: APP_NAME,
      },
    ],
  },
};

const StakeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Flex flex={1} minH="100vh" bgColor="rgba(15, 15, 15, 1)" justifyContent='center'>
      {children}
    </Flex>
  )
};

export default StakeLayout;
