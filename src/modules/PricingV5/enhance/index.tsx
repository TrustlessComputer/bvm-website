import { compose } from '@reduxjs/toolkit';
import enhanceFetchTemplate from './enhance.fetchTemplate';
import enhanceWithLoading from './enhance.withLoading';

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  enhanceFetchTemplate,
  enhanceWithLoading,

  // Main Page
  enhance,
);
