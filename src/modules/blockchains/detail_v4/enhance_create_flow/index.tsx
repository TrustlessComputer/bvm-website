import { compose } from '@reduxjs/toolkit';
import clearNodes from './enhance.clearNodes';

import enhanceClearStudioLocalStorage from './enhance.clearStudioLocalStorage';

import enhanceGetTemplateParam from './enhance.getTemplateParam';
import enhancePrepareData from './enhance.prepareData';

import withLoading from './enhance.withLoading';

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  clearNodes,
  enhanceClearStudioLocalStorage,

  //
  enhanceGetTemplateParam,
  enhancePrepareData,

  //
  withLoading,

  // Main Page
  enhance,
);
