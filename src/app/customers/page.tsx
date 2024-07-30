import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import UseBitcoinModule from '@/modules/UseBitcoin';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/success-stories.png`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `${CDN_URL}/images/success-stories.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const UseBitcoin = () => {
  return (
    <MainLayout headerProps={{ bgColor: '#FFFFFF', color: 'black' }} hideFooter={true}>
      <div className={s.container}>
        <UseBitcoinModule />
      </div>
    </MainLayout>
  );
};

export default UseBitcoin;
