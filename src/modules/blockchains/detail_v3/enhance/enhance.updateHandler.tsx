import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

const enhanceUpdateHandler =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    return <WrappedComponent {...props} />;
  };

export default enhanceUpdateHandler;
