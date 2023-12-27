'use client';

import MainLayout from '@/layouts/MainLayout';
import NotFoundPage from './not-found/index';

export default () => (
  <MainLayout hideHeader hideFooter>
    <NotFoundPage />
  </MainLayout>
);
