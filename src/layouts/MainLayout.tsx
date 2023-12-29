'use client';

import Footer from '@/layouts/Footer';
import Header, { HeaderProps } from '@/layouts/Header';
import s from './styles.module.scss';

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
}: IMainProps) => (
  <div className={s.container}>
    {!hideHeader && <Header {...headerProps} />}
    {children}
    {/* {!hideFooter && <Footer />} */}
  </div>
);

export default MainLayout;
