import { useParams } from 'next/navigation';
import CDappAPI from '@/services/api/dapp';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { commonSelector } from '@/stores/states/common/selector';
import CStakingAPI from '@/services/api/dapp/staking';

const useFetchDapp = () => {
  const params = useParams();
  const id = params?.id;

  const dappAPI = new CDappAPI();
  const stakingAPI = new CStakingAPI();

  const dappState = useAppSelector(dappSelector);
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    await dappAPI.prepareDappParams({ orderID: id as string });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchTokenList = async () => {
    await dappAPI.getListToken(dappState?.chain?.chainId || '');
  };

  const fetchStakingPoolsList = async () => {
    await stakingAPI.getStakingPools();
  };

  useEffect(() => {
    if (dappState?.chain?.chainId) {
      fetchTokenList();
      fetchStakingPoolsList();
    }
  }, [dappState?.chain?.chainId, needReload]);

  return {
    loading: dappState.loading,
    configs: dappState.configs,
  };
};

export default useFetchDapp;
