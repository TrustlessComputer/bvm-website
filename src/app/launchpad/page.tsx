'use client';

import MainLayout from '@/layouts/MainLayout';
import LaunchpadModule from '@/modules/Launchpad';
import { Flex } from '@chakra-ui/react';

const UpcomingPage = () => {
  return (
    <Flex flexDirection={'column'} minHeight={'100vh'}>
      <MainLayout
        headerProps={{
          color: 'black',
        }}
      >
        <LaunchpadModule />
      </MainLayout>
    </Flex>
  );
};

export default UpcomingPage;
