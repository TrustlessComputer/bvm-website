'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import s from './styles.module.scss';

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
    setIframeLoading(false);
    return () => window.removeEventListener('blur', blur);
  }, [document]);

  if (!document) {
    return <></>;
  }
  if (iframeLoading) {
    return (
      <Flex
        flex={1}
        minHeight={'100%'}
        justify={'center'}
        align={'center'}
        bgColor={'white'}
      >
        <Spinner color={'black'}></Spinner>
      </Flex>
    );
  }
  return (
    <div
      className={s.container}
      style={{
        height:
          heightWidth -
          (elmHeader && elmHeader.offsetHeight ? elmHeader.offsetHeight : 80),
      }}
    >
      <iframe
        id="TC_PAGE_IFRAME"
        src={props.iframeURL}
        width="100%"
        style={{ border: 'none' }}
        onLoadedData={() => {}}
        onLoad={() => {
          setIframeLoading(false);
        }}
      />
    </div>
  );
};

export default IframeTC;
