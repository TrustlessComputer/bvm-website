import { FC } from 'react';

type IActions = {};

type Props = {};

type TopUpModalProps = {
  isOpenTopUpModal?: boolean;
  onOpenTopUpModal?: () => void;
  onCloseTopUpModal?: () => void;
};

type BillingModalProps = {
  isOpenBillingModal?: boolean;
  onOpenBillingModal?: () => void;
  onCloseBillingModal?: () => void;
};

type SendFormModalProps = {
  isOpenSendFormModal?: boolean;
  onOpenSendFormModal?: () => void;
  onCloseSendFormModal?: () => void;
};

type EditConfigModalProps = {
  isOpenEditConfigModal?: boolean;
  onOpenEditConfigModal?: () => void;
  onCloseEditConfigModal?: () => void;
};

type OrderDetailModalProps = {
  isOpenOrderDetailModal?: boolean;
  onOpenOpenOrderDetailModal?: () => void;
  onCloseOpenOrderDetailModal?: () => void;
};

type CancelOrderModalProps = {
  isOpenCancelOrderModal?: boolean;
  onOpenCancelOrderModal?: () => void;
  onCloseCancelOrderModal?: () => void;
};

type UpdateOrderModalProps = {
  isOpenUpdateOrderModal?: boolean;
  onOpenUpdateOrderModal?: () => void;
  onCloseUpdateOrderModal?: () => void;
};

type IModalProps = TopUpModalProps &
  BillingModalProps &
  SendFormModalProps &
  EditConfigModalProps &
  OrderDetailModalProps &
  CancelOrderModalProps &
  UpdateOrderModalProps;

export type DashboardProps = IActions & Props & IModalProps & {};

export type DashboardWrappedComponent = FC<DashboardProps>;