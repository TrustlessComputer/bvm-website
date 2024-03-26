import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `/shard/seo_image.jpg`,
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
        url: `/shard/seo_image.jpg`,
        alt: APP_NAME,
      },
    ],
  },
};

const ShardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      {children}
    </div>
  )
};

export default ShardLayout;
