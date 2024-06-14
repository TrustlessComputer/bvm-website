import MainLayout from '@/layouts/MainLayout';
import ResearchModule from '@/modules/research';
import React from 'react';

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white'
      }}
      hideFooter={true}
    >
      <ResearchModule />
    </MainLayout>
  );
}
