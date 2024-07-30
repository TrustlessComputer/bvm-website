import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import useL2Service from '@/hooks/useL2Service';
import { useEffect } from 'react';

const enhanceInitData = (WrappedComponent: any) => (props: any) => {
  const { orderId } = props;

  const {
    getAccountInfor,
    getOrderDetailByID,
    getAvailableListTemplate,
    getModelCategories,
  } = useL2Service();

  const { loggedIn, l2ServiceUserAddress } = useWeb3Auth();

  useEffect(() => {
    getAvailableListTemplate();
    getOrderDetailByID(orderId);
    getModelCategories(l2ServiceUserAddress);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getAccountInfor();
    }
  }, [loggedIn]);

  return <WrappedComponent {...props} />;
};

export default enhanceInitData;
