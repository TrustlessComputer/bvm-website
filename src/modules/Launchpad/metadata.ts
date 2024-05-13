const APP_NAME = 'Bitcoin Virtual Machine';
const APP_DEFAULT_TITLE = 'Bitcoin Virtual Machine';
const APP_TITLE_TEMPLATE = '%s - Bitcoin Virtual Machine';
const APP_DESCRIPTION =
  'BVM is the first modular Bitcoin L2 metaprotocol on Bitcoin. With a few clicks, anyone can plug and play the best-of-breed blockchain modules to launch their own Bitcoin L2.';

export const AppThumbnail = {
  earn: 'meta_earn-min.png',
  feature: 'meta_feature-min.png',
  market: 'meta_market-min.png',
  swap: 'meta_swap-min.png',
  nakachain: 'meta_nakachain-min.png',
  stake: 'meta_stake-min.png',
  eternal_ai: 'meta_eternal_ai_3.png',
  naka_ido: 'metadata-ido.png',
  page: 'metadata_5.png',
};

export const getMetadata = (params: {
  thumbnail: string;
  description?: string;
}) => {
  const CDN = 'https://cdn.newbitcoincity.com/nbc/icons/bvm-icons/';
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
