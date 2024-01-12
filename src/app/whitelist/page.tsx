'use client';

import MainLayout from '@/layouts/MainLayout';
import WhitelistModule from '@/modules/Whitelist';
import styles from './styles.module.scss';

const Whitelist = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <div className={styles.container}>
        <WhitelistModule/>
      </div>
    </MainLayout>
  );
};

export default Whitelist;
