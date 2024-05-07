'use client';

import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import Module from '@/modules/blockchains/payment';

const Payment = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <Module />
    </MainLayout>
  );
};

export default Payment;
