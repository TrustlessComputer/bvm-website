'use client';

import MainLayout from '@/layouts/MainLayout';
import Landing from '@/modules/landing';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <Landing />
    </MainLayout>
  );
}
