import { compose } from '@reduxjs/toolkit';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

//
import enhanceInitData from './enhance.InitData';
import enhanceUpdateHandler from './enhance.updateHandler';
import enhanceValidateOrderData from './enhance.validateOrderData';
import enhanceValidateOrderID from './enhance.validateOrderID';

//
import withAuth from './enhance.withAuth';
import withLoading from './enhance.withLoading';
import withSkeleton from './enhance.withSkeleton';

const enhance =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) =>
    <WrappedComponent {...props} />;

export default compose<ChainDetailComponent>(
  // Validate Original Data
  enhanceValidateOrderID,

  // Data (Fetch Data from API, Storage ...)
  enhanceInitData,

  enhanceUpdateHandler, // TO DO

  // Extends UI
  // withLoading,
  withSkeleton,

  // Validate OrderID
  enhanceValidateOrderData,

  withAuth, // TO DO

  // Main Page
  enhance,
);
