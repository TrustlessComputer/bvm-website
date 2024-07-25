import { compose } from '@reduxjs/toolkit';

//
import enhanceInitData from '../../enhance/enhance.InitData';
import enhanceValidateOrderData from '../../enhance/enhance.validateOrderData';

//

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  // Data (Fetch Data from API, Storage ...)
  enhanceInitData,

  // Extends UI
  // Validate OrderID
  enhanceValidateOrderData,

  // Main Page
  enhance,
);
