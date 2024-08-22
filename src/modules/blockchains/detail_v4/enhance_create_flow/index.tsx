import { compose } from '@reduxjs/toolkit';
import clearNodes from './enhance.clearNodes';
import enhanceGetTemplateParam from './enhance.getTemplateParam';
import enhancePrepareData from './enhance.prepareData';

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  clearNodes,
  enhanceGetTemplateParam,
  enhancePrepareData,

  // Main Page
  enhance,
);
