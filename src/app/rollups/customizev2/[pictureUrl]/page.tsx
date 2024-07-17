import MainLayout from '@/layouts/MainLayout';
import Page from '@/modules/blockchains/customize/index_v4';
import { APP_NAME } from '@/config/metadata';
import { decodeBase64, encodeBase64 } from '@utils/helpers';


export async function generateMetadata({ params }: any) {
  const pictureUrl = decodeBase64(params.pictureUrl);
  return {
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      images: [
        {
          url: pictureUrl,
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
          url: pictureUrl,
          alt: APP_NAME,
        },
      ],
    },
  };
}

const CustomizePage = () => {


  return (
    <MainLayout
      headerProps={{
        color: 'black',

        bgColor: '#F3F1E8',
      }}
      hideHeader={true}
      isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default CustomizePage;
