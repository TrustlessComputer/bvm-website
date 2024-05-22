import MainLayout from '@/layouts/MainLayout';
import LaunchpadManage from '@/modules/Launchpad/Launchpad.Manage';
import { Flex } from '@chakra-ui/react';
import React from 'react';

const LaunchpadManagePage = () => {
  return (
    <Flex flexDirection={'column'} minHeight={'100vh'}>
      <MainLayout
        headerProps={{
          color: 'black',
        }}
      >
        <LaunchpadManage />
      </MainLayout>
    </Flex>
  );
};

export default LaunchpadManagePage;
