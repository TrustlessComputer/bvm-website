import PrivateSaleModule from '@/modules/PrivateSale';
import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NakaChain - Bitcoin L2 for BRC-20 DeFi',
  description: 'Bitcoin L2 - Only 2 seconds block time - Almost 0 transaction fee- Receive free NakaChain Token',
  twitter: {
    card: 'summary_large_image',
    title: {
      default: 'NakaChain',
      template: '%s - NakaChain',
    },
    description: 'Bitcoin L2 - Only 2 seconds block time - Almost 0 transaction fee- Receive free NakaChain Token',
    images: [{ url: `https://storage.googleapis.com/nakachain/naka/images/nakaswap_metadata.jpg` }],
  },
};

const PrivateSale = () => {
  return (
    <MainLayout>
      <div className={s.container}>
        <PrivateSaleModule />
      </div>
    </MainLayout>
  );
};

export default PrivateSale;
