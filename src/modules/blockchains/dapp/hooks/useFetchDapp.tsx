import { useParams } from 'next/navigation';
import CDappAPI from '@/services/api/dapp';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { commonSelector } from '@/stores/states/common/selector';
import CStakingAPI from '@/services/api/dapp/staking';
import CTokenAirdropAPI from '@/services/api/dapp/airdrop';
import { useDispatch } from 'react-redux';
import { setAirdropTasks } from '@/stores/states/dapp/reducer';

const useFetchDapp = () => {
  const params = useParams();
  const id = params?.id;

  const dispatch = useDispatch();

  const dappAPI = new CDappAPI();
  const stakingAPI = new CStakingAPI();
  const tokenAirdropAPI = new CTokenAirdropAPI();

  const dappState = useAppSelector(dappSelector);
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    await dappAPI.prepareDappParams({ orderID: id as string });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const getListTask = async () => {
    try {
      const rs = await tokenAirdropAPI.getListTask();
      dispatch(setAirdropTasks(rs));
    } catch (error) {
      dispatch(setAirdropTasks([]));
    }
  };

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
      getListTask();
    }
  }, [dappState?.chain?.chainId, needReload]);

  return {
    loading: dappState.loading,
    configs: dappState.configs,
  };
};

export default useFetchDapp;
