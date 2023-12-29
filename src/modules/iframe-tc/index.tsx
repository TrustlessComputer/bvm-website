'use client';

import useWindowSize from '@/hooks/useWindowSize';
import s from './styles.module.scss';
import { useEffect } from 'react';

interface IProps {
  iframeURL: string;
}

const IframeTC = (props: IProps) => {
  const { heightWidth } = useWindowSize();
  const elmHeader = document.getElementById('header');

  useEffect(() => {
    window.focus();
    function blur(e: any) {
      const elmHeader = document.getElementById('header-hidden');
      if (elmHeader) {
        elmHeader.click();
      }
    }
    window.addEventListener('blur', blur);
    return () => window.removeEventListener('blur', blur);
  }, []);

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
      />
    </div>
  );
};

export default IframeTC;
