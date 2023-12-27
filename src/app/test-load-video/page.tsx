'use client';

import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const TestLoadVideo = () => {
  return (
    <Box width={'100%'} height={1000}>
      <ReactPlayer
        url={'https://cdn.newbitcoincity.com/nbc/videos/AlphaIntrov7.mp4'}
        playing={true}
        controls={true}
        width={'100%'}
        height={'100%'}
        muted
      />
    </Box>
  );
};

export default TestLoadVideo;
