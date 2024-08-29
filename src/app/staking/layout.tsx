import React from 'react';
import { APP_NAME } from '@/config/metadata';
import { Box, Flex } from '@chakra-ui/react';
import { CDN_URL } from '@/config';

const THUMBNAIL = `${CDN_URL}/metadata/staking.png`;

export const metadata = {
  title: 'Development infrastructure for Bitcoin.',
  description: 'Stake BVM to earn up to 58% APR.',
  openGraph: {
    type: 'website',
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
    card: 'summary_large_image',
    images: [
      {
        url: THUMBNAIL,
        alt: APP_NAME,
      },
    ],
  },
};

const StakeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box minH="100vh" bgColor="rgba(15, 15, 15, 1)">
      {children}
    </Box>
  );
};

export default StakeLayout;
