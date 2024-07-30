'use client';

import Intro from '@/modules/ai-landing/Intro';
import Loader from '@/modules/ai-landing/Loader';
import { useEffect, useState } from 'react';

export default function PreLoader() {
  const [isHadLoaded, setIsHadLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage) {
      setIsHadLoaded(localStorage.getItem('isLoaded') === '1');
    }
  }, []);

  return <>
    {
      isHadLoaded ? <Loader /> : <Intro />
    }
  </>;
}
