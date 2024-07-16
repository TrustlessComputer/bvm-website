'use client'

import MainLayout from '@layouts/MainLayout';
import Domain from 'src/modules/domain';
import { useParams } from 'next/navigation';
import React from 'react';

const DomainPage = () => {

  const params = useParams();

  const chainID = React.useMemo(() => (params?.id), [params?.id]) as string;

  return (
    <MainLayout>
      <Domain chainID={chainID} />
    </MainLayout>
  )
}

export default DomainPage;
