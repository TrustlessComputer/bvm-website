import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

const withAuth =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    //TO DO
    return <WrappedComponent {...props} />;
  };

export default withAuth;
