import { compose } from '@reduxjs/toolkit';

import enhancePrepareData from '../../enhance/enhance.prepareData';
import enhanceValidateOrderID from '../../enhance/enhance.validateOrderID';
import enhanceSliceOrderIDByURL from './enhance.sliceOrderIDByURL';
import enhanceSelecteDAppConfig from './enhance.selecteDappConfig';
import enhanceValidateOrderData from '../../enhance/enhance.validateOrderData';

import withSkeleton from '../../enhance/enhance.withSkeleton';

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  enhanceSliceOrderIDByURL,

  enhanceValidateOrderID,

  enhancePrepareData,

  withSkeleton,

  enhanceValidateOrderData,
  enhanceSelecteDAppConfig,

  enhance,
);
