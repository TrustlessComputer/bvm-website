import { CDN_URL } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import TxExplorerModule from '@/modules/l2-rollup-detail/TxExplorer';
import { Metadata } from 'next';

const TITLE = 'Bitcoin Heartbeat | Welcome to the future of Bitcoin.';
const DESCRIPTION =
  'Provide transparent and verifiable insights into Bitcoin rollups.';

const THUMBNAIL = `${CDN_URL}/pages/bvm-studio/bvm-heartbeat-metadata.png`;

export const metadata: Metadata = {
  applicationName: TITLE,
  title: {
    default: TITLE,
    template: '',
  },
  description: DESCRIPTION,
  icons: '/icons/heartbeat.svg',
  openGraph: {
    type: 'website',
    title: {
      default: TITLE,
      template: '',
    },
    images: [
      {
        url: THUMBNAIL,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: TITLE,
      template: '',
    },
    description: DESCRIPTION,
    images: THUMBNAIL,
  },
};

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={false}
      bodyColor={'#fff'}
    >
      <TxExplorerModule />
    </MainLayout>
  );
}
