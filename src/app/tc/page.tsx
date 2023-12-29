'use client';

import IframeTC from '@/modules/iframe-tc';
import MainLayout from '@/layouts/MainLayout';
import { DOMAIN_URL, isProduction } from '@/config';

const MAIN_PATH = '/trustless-computers-iframe/';
// const IframeURLExtend = DOMAIN_URL + MAIN_PATH;
const IframeURLExtend =
  'https://dev.newbitcoincity.com/trustless-computers-iframe/';

const TCPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        position: 'relative',
        bgColor: 'white',
      }}
    >
      <IframeTC iframeURL={IframeURLExtend} />
    </MainLayout>
  );
};

export default TCPage;
