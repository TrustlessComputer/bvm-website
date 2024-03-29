'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import BoxContent from '@/layouts/BoxContent';
import Banner from '@/modules/landing/Componets/Hero/Banner';

interface IProps {
  iframeURL: string;
}

const IframeTC = (props: IProps) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const { heightWidth } = useWindowSize();
  const elmHeader = document?.getElementById('header');

  useEffect(() => {
    window.focus();
    function blur(e: any) {
      const elmHeader = document?.getElementById('header-hidden');
      if (elmHeader) {
        elmHeader.click();
      }
    }
    return () => window.removeEventListener('blur', blur);
  }, [document]);

  if (!document) {
    return <></>;
  }
  return (
    <div className={s.container}>
      <div className={s.banner}>
        <Banner disabledAnimation={true} />
      </div>
      <iframe
        id="TC_PAGE_IFRAME"
        src={props.iframeURL}
        width={'100%'}
        height={'100%'}
        style={{
          border: 'none',
          opacity: iframeLoading ? 0 : 1,
        }}
        onLoad={() => {
          setIframeLoading(false);
        }}
      />
      {iframeLoading && (
        <Flex
          flex={1}
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          minHeight={'100vh'}
          justify={'center'}
          align={'center'}
          bgColor={'#F3F1E8'}
        >
          <Spinner color={'black'}></Spinner>
        </Flex>
      )}
    </div>
  );
};

export default IframeTC;
