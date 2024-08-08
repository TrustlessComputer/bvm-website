import { OrderItem } from '@/stores/states/l2services/types';
import { FC } from 'react';

type IActions = {};

type Props = {
  orderId?: string;
  isDataInvalid?: boolean;
  isFetching?: boolean;
  chainDetailData?: OrderItem;
};

type IResetModalTypes = {
  isShowModal?: boolean;
  setIsShowModal?: (flag: boolean) => void;
  resetEditHandler?: () => void;
};

export type ChainDetailComponentProps = IActions & Props & IResetModalTypes;

export type ChainDetailComponent = FC<ChainDetailComponentProps>;
