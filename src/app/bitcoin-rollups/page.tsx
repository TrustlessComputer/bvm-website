import MainLayout from '@/layouts/MainLayout';
import L2RollupModule from '@/modules/l2-rollup';
import React from 'react';

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={false}
      bodyColor={'#f3f1e8'}
    >
      <L2RollupModule />
    </MainLayout>
  );
}
