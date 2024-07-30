import { IDApp } from '@/services/api/DAServices/types';
import { useCallback } from 'react';

interface Params {
  dApp?: IDApp;
}

const useDAppHelper = (props: Params) => {
  const { dApp } = props;
  const { user_package = [] } = dApp || {};

  const hasIntalledByNetworkID = useCallback((networkID?: string | number) => {
    const itemFinded = user_package?.find(
      (item) => item.network_id === Number(networkID),
    );
    return !!itemFinded;
  }, []);

  const getUserListInstalledByNetworkID = useCallback(
    (networkID?: string | number) => {
      const userList = user_package?.filter(
        (item) => item.network_id === Number(networkID),
      );
      return userList || [];
    },
    [],
  );

  return {
    dApp,
    hasIntalledByNetworkID,
    getUserListInstalledByNetworkID,
  };
};

export default useDAppHelper;
