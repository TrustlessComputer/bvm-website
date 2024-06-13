import MainLayout from '@/layouts/MainLayout';
import ResearchModule from '@/modules/research';
import React from 'react';

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter={true}
    >
      <ResearchModule />;
    </MainLayout>
  );
}
