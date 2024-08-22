import { compose } from '@reduxjs/toolkit';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

//
import enhanceExtractOrderID from './enhance.extractOrderID';
import enhanceValidateOrderID from './enhance.validateOrderID';
import enhancePrepareData from './enhance.prepareData';
import enhanceUpdateHandler from './enhance.updateHandler';
import enhanceValidateOrderData from './enhance.validateOrderData';
import enhanceCheckRedirect from './enhance.checkRedirect';
import enhanceLoopFetchOrder from './enhance.loopFetchOrder';

//
import withAuth from './enhance.withAuth';
import withLoading from './enhance.withLoading';
import withSkeleton from './enhance.withSkeleton';
import withResetModal from './enhance.withResetModal';
import clearNodes from './enhance.clearNodes';

const enhance =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) =>
    <WrappedComponent {...props} />;

export default compose<ChainDetailComponent>(
  enhanceExtractOrderID,

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

  // enhanceCheckRedirect,

  withAuth, // TO DO

  enhanceLoopFetchOrder,
  // ---------------------------------
  // Top Level UI
  // ---------------------------------
  withResetModal,
  clearNodes,

  // Main Page
  enhance,
);
