export type SlideItemType = {
  key: string;
  title: string;
  srcImg: string;
  isViewProject: boolean;
  href?: string;
  isComminSoon?: boolean;
  childrentList?: {
    icon: string;
    desc: string;
    desc1?: string;
  }[];
};

export const DataList: SlideItemType[] = [
  {
    key: 'Alpha Chain',
    title: 'Alpha Chain',
    srcImg: '/images/ai_chain_img.png',
    href: 'https://alpha.wtf',
    isViewProject: true,
    isComminSoon: false,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'SocialFi',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },
  {
    key: 'Naka Chain',
    title: 'Naka Chain',
    srcImg: '/images/defi_chain_img.png',
    isViewProject: true,
    isComminSoon: true,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'DeFi',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },
  {
    key: 'AI Chain',
    title: 'AI Chain',
    srcImg: '/images/gaming_chain_img.png',
    isViewProject: true,
    isComminSoon: true,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'AI',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },
  {
    key: 'Alpha Chain 100',
    title: 'Alpha Chain',
    srcImg: '/images/ai_chain_img.png',
    href: 'https://alpha.wtf',
    isViewProject: true,
    isComminSoon: false,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'SocialFi',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },
  {
    key: 'Naka Chain 100',
    title: 'Naka Chain',
    srcImg: '/images/defi_chain_img.png',
    isViewProject: true,
    isComminSoon: true,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'DeFi',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },

  {
    key: 'AI Chain 100',
    title: 'AI Chain',
    srcImg: '/images/gaming_chain_img.png',
    isViewProject: true,
    isComminSoon: true,
    childrentList: [
      {
        icon: '/icons/layer_ic.svg',
        desc: 'Use Case',
        desc1: 'AI',
      },
      {
        icon: '/icons/infrastructure_ic.svg',
        desc: 'Rollups',
        desc1: 'Optimistic, Sovereign',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Validity',
        desc1: 'Bitcoin',
      },
      {
        icon: '/icons/storage_ic.svg',
        desc: 'Data Availability',
        desc1: 'Polygon',
      },
    ],
  },
];
