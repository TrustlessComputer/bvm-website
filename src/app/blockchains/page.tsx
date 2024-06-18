'use client';

import { STORAGE_KEYS } from '@/constants/storage-key';
import MainLayout from '@/layouts/MainLayout';
import LocalStorage from '@/libs/localStorage';
import Page from '@/modules/blockchains';
import { useRouter } from 'next/navigation';

const BlockChainPage = () => {
  const router = useRouter();

  const accessToken = LocalStorage.getItem(
    STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2,
  );

  if (!accessToken) {
    return router.push('/');
  }
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <Page />
    </MainLayout>
  );
};

export default BlockChainPage;
