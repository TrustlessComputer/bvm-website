import { compose } from '@reduxjs/toolkit';
import clearNodes from './enhance.clearNodes';

const enhance = (WrappedComponent: any) => (props: any) =>
  <WrappedComponent {...props} />;

export default compose<any>(
  clearNodes,

  // Main Page
  enhance,
);
