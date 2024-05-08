const APP_NAME = 'NakaChain';
const APP_DEFAULT_TITLE = 'NakaChain';
const APP_TITLE_TEMPLATE = '%s - NakaChain';
const APP_DESCRIPTION =
  'Bitcoin L2 - Only 2 seconds block time - Almost 0 transaction fee - Solidity smart contract';

export const AppThumbnail = {
  earn: 'meta_earn-min.png',
  feature: 'meta_feature-min.png',
  market: 'meta_market-min.png',
  swap: 'meta_swap-min.png',
  nakachain: 'meta_nakachain-min.png',
  stake: 'meta_stake-min.png',
  eternal_ai: 'meta_eternal_ai_3.png',
  naka_ido: 'metadata-ido.png',
  page: 'metadata-ido-1.png',
};

export const getMetadata = (params: {
  thumbnail: string;
  description?: string;
}) => {
  const CDN = 'https://cdn.nakaswap.org/naka/images/';
  const appThumbnail = CDN + params.thumbnail;

  return {
    description: params?.description || APP_DESCRIPTION,
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: params?.description || APP_DESCRIPTION,
      images: [{ url: appThumbnail }],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: params?.description || APP_DESCRIPTION,
      images: [{ url: appThumbnail }],
    },
  };
};
