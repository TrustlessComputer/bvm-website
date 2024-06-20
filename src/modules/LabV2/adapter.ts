import { OrderItem } from '@/stores/states/l2services/types';
import { ILabItemContent } from './data';

export const orderAdapter = (orderItem: OrderItem): ILabItemContent => {
  let result = {
    image:
      orderItem.thumb ||
      'https://storage.googleapis.com/tc-cdn-prod/nbc/images/apps/chain_loading_placeholder.png',
    video: '',
    title: orderItem.chainName,
    content: orderItem.description || orderItem.chainName || '',
    link: '',
    disabled: false,
    tags: [],
    date: orderItem.createAt,
  };

  return result;
};
