import MainLayout from '@/layouts/MainLayout';
import React from 'react';

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter={true}
    ></MainLayout>
  );
}
