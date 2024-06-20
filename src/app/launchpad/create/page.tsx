import MainLayout from '@/layouts/MainLayout';
import CreateLaunchpad from '@/modules/Launchpad/Launchpad.Create';
import { Flex } from '@chakra-ui/react';
import React from 'react';

const LaunchpadCreatePage = () => {
  return (
    <Flex flexDirection={'column'} minHeight={'100vh'}>
      <MainLayout
        headerProps={{
          color: 'black',
        }}
      >
        <CreateLaunchpad />
      </MainLayout>
    </Flex>
  );
};

export default LaunchpadCreatePage;
