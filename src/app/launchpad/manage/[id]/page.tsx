import MainLayout from '@/layouts/MainLayout';
import LaunchpadManageDetail from '@/modules/Launchpad/Launchpad.Manage/detail';
import { Flex } from '@chakra-ui/react';
import React from 'react';

const LaunchpadManageDetailPage = () => {
  return (
    <Flex flexDirection={'column'} minHeight={'100vh'}>
      <MainLayout
        headerProps={{
          color: 'black',
        }}
      >
        <LaunchpadManageDetail />
      </MainLayout>
    </Flex>
  );
};

export default LaunchpadManageDetailPage;
