import MainLayout from '@/layouts/MainLayout';

import { APP_NAME } from '@/config/metadata';
import VisualLanding from '@/modules/ai-landing';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `/ai-landing/bvm-eternal.jpeg`,
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
        url: `/ai-landing/bvm-eternal.jpeg`,
        alt: APP_NAME,
      },
    ],
  },
};

const AiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <VisualLanding/>
    </MainLayout>
  );
};

export default AiPage;
