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
  bodyColor?: string;
};

const MainLayout = ({
                      hideHeader = false,
                      hideFooter = false,
                      headerProps,
                      children,
                      isHeaderCustom,
                      bodyColor,
                    }: IMainProps) => {
  const pathName = usePathname();
  const { resetPlay } = useAnimationStore();
  useEffect(() => {
    resetPlay();
  }, [pathName]);

  return (
    <div style={{ backgroundColor: bodyColor }}>
      {isHeaderCustom && <HeaderCustom />}
      {!hideHeader && !isHeaderCustom && <HeaderV3 {...headerProps} />}
      {children}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
