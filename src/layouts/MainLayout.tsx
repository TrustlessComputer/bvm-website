'use client';

import useAnimationStore from '@/stores/useAnimationStore';
import Footer from '@layouts/Footer';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { HeaderV3Props } from './HeaderV3';
import HeaderCustom from './HeaderCustom';
import HeaderV4 from '@layouts/HeaderV4';

type IMainProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
  isHeaderCustom?: boolean;
  headerProps?: HeaderV3Props;
  bodyColor?: string;
  footerClassName?: string;
};

const MainLayout = ({
  hideHeader = false,
  hideFooter = false,
  headerProps,
  children,
  isHeaderCustom,
  bodyColor,
  footerClassName,
}: IMainProps) => {
  const pathName = usePathname();
  const { resetPlay } = useAnimationStore();
  useEffect(() => {
    resetPlay();
  }, [pathName]);

  return (
    <div style={{ backgroundColor: bodyColor }}>
      {/*{isHeaderCustom && <HeaderCustom />}*/}
      {!hideHeader && !isHeaderCustom && <HeaderV4 {...headerProps} />}
      {children}
      {!hideFooter && <Footer className={footerClassName} />}
    </div>
  );
};

export default MainLayout;
