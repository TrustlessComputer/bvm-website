'use client';

import useAnimationStore from '@/stores/useAnimationStore';
import Footer from '@layouts/Footer';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import HeaderV3, { HeaderV3Props } from './HeaderV3';
import HeaderCustom from './HeaderCustom';

type IMainProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
  isHeaderCustom?: boolean;
  headerProps?: HeaderV3Props;
};

const MainLayout = ({
                      hideHeader = false,
                      hideFooter = false,
                      headerProps,
                      children,
                      isHeaderCustom,
                    }: IMainProps) => {
  const pathName = usePathname();
  const { resetPlay } = useAnimationStore();
  useEffect(() => {
    resetPlay();
  }, [pathName]);

  return (
    <>
      {isHeaderCustom && <HeaderCustom />}
      {!hideHeader && !isHeaderCustom && <HeaderV3 {...headerProps} />}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
