import { compose } from '@reduxjs/toolkit';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

//
import enhancePrepareData from './enhance.prepareData';
import enhanceUpdateHandler from './enhance.updateHandler';
import enhanceValidateOrderData from './enhance.validateOrderData';
import enhanceValidateOrderID from './enhance.validateOrderID';

//
import withAuth from './enhance.withAuth';
import withLoading from './enhance.withLoading';
import withSkeleton from './enhance.withSkeleton';
import withResetModal from './enhance.withResetModal';

const enhance =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) =>
    <WrappedComponent {...props} />;

export default compose<ChainDetailComponent>(
  // Validate Original Data
  enhanceValidateOrderID,

  // Data (Fetch Data from API, Storage ...)
  enhancePrepareData,

  // ---------------------------------
  // Extends UI
  // ---------------------------------
  // withLoading,
  withSkeleton,

  // Validate OrderID
  enhanceValidateOrderData,

  withAuth, // TO DO

  // ---------------------------------
  // Top Level UI
  // ---------------------------------
  withResetModal,

  // Main Page
  enhance,
);
