'use client';

import { isProduction } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import IframeTC from '@/modules/iframe-tc';

const pathUrl = '/trustless-computers-iframe/';
// const IframeURLExtend = DOMAIN_URL + MAIN_PATH;
const IframeURLExtend =
  'https://dev.newbitcoincity.com/trustless-computers-iframe/';

const iframeDomain = isProduction
  ? 'https://newbitcoincity.com'
  : 'https://dev.newbitcoincity.com';

const TCPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        position: 'relative',
        bgColor: 'white',
      }}
    >
      {typeof document !== 'undefined' ? (
        <IframeTC iframeURL={`${iframeDomain}${pathUrl}`} />
      ) : null}
    </MainLayout>
  );
};

export default TCPage;
