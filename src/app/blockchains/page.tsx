'use client';

import { isProduction } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import IframeTC from '@/modules/iframe-tc';

const pathUrl = '/bvm-website-sats-iframe/computers';
const IframeURLExtend =
  'http://localhost:6009/trustless-computers-iframe/dashboard';

// const iframeDomain = isProduction
//   ? 'http://localhost:6009'
//   : 'http://localhost:6009';

const iframeDomain = isProduction
  ? 'https://bvm.network'
  : 'https://dev.bvm.network';

const TCPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        position: 'relative',
        bgColor: 'white',
      }}
    >
      <IframeTC iframeURL={`${iframeDomain}${pathUrl}`} />
    </MainLayout>
  );
};

export default TCPage;
