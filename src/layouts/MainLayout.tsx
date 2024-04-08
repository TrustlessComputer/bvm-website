'use client';

import Header, { HeaderProps } from '@/layouts/Header';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useAnimationStore from '@/stores/useAnimationStore';
import HeaderV2 from '@layouts/HeaderV2';

type IMainProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
  headerProps?: HeaderProps;
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

  return <>
    {!hideHeader && <Header {...headerProps} />}
    <HeaderV2 />
    {children}
  </>;
};

export default MainLayout;
