import { OrderItem } from '@/stores/states/l2services/types';
import { FC } from 'react';

type IActions = {};

type Props = {
  orderId?: string;
  isDataInvalid?: boolean;
  isFetching?: boolean;
  chainDetailData?: OrderItem;
};

export type ChainDetailComponentProps = IActions & Props;

export type ChainDetailComponent = FC<ChainDetailComponentProps>;
