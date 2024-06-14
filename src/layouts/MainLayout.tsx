'use client';

import { HeaderProps } from '@/layouts/Header';
import useAnimationStore from '@/stores/useAnimationStore';
import Footer from '@layouts/Footer';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import HeaderV3, { HeaderV3Props } from './HeaderV3';

type IMainProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
  headerProps?: HeaderV3Props;
};

const MainLayout = ({
  hideHeader = false,
  hideFooter = false,
  headerProps,
  children,
}: IMainProps) => {
  const pathName = usePathname();
  const { resetPlay } = useAnimationStore();
  useEffect(() => {
    resetPlay();
  }, [pathName]);

  return (
    <>
      {/* {<Header {...headerProps} />} */}
      {!hideHeader && <HeaderV3 {...headerProps} />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;
