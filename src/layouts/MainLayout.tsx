'use client';

// import Footer from '@/layouts/Footer';
import Header, { HeaderProps } from '@/layouts/Header';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useAnimationStore from '@/stores/useAnimationStore';
// import s from './styles.module.scss';

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
    {children}
  </>;
};

export default MainLayout;
