'use client';

import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import s from './styles.module.scss';

type IMainProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
};

const MainLayout = ({
  hideHeader = false,
  hideFooter = false,
  children,
}: IMainProps) => (
  <div className={s.container}>
    {!hideHeader && <Header />}
    {children}
    {!hideFooter && <Footer />}
  </div>
);

export default MainLayout;
