'use client';
import Loader from '@/modules/builder-landing/Loader';
import { useEffect, useState } from 'react';
import Intro from '@/modules/landing/Componets/Intro';

export default function PreLoader() {
  const [isHadLoaded, setIsHadLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage) {
      setIsHadLoaded(localStorage.getItem('bvmloaded') === '1');
    }
  }, []);

  return <>
    {
      isHadLoaded ? <Loader /> : <Intro />
    }
  </>;
}
