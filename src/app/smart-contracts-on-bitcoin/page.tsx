'use client';

import { CDN_URL } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import BvmSctLanding from '@/modules/bvm-sct-landing';
import Head from 'next/head';

export default function Builder() {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={`${CDN_URL}/images/smart-contract-on-bitcoin.png`}
        />
        <meta
          name="twitter:image"
          content={`${CDN_URL}/images/smart-contract-on-bitcoin.png`}
        />
      </Head>
      <MainLayout>
        <BvmSctLanding />
      </MainLayout>
    </>
  );
}
