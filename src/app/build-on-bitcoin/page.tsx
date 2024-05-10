'use client';

import MainLayout from '@/layouts/MainLayout';
import BuilderLading from '@/modules/builder-landing';

export default function Builder() {
  return (
    <MainLayout hideFooter>
      <BuilderLading />
    </MainLayout>
  );
}
