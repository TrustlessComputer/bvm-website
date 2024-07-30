import { compose } from '@reduxjs/toolkit';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

//
import enhanceExtractOrderID from './enhance.extractOrderID';
import enhanceValidateOrderID from './enhance.validateOrderID';
import enhancePrepareData from './enhance.prepareData';
import enhanceUpdateHandler from './enhance.updateHandler';
import enhanceValidateOrderData from './enhance.validateOrderData';

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

  withAuth, // TO DO

  // ---------------------------------
  // Top Level UI
  // ---------------------------------
  withResetModal,

  // Main Page
  enhance,
);
