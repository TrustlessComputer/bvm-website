import CDappAPI from '@/services/api/dapp';
import CTokenAirdropAPI from '@/services/api/dapp/airdrop';
import CStakingAPI from '@/services/api/dapp/staking';
import { useAppSelector } from '@/stores/hooks';
import { setCounterFetchedDapp } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { setAirdrops, setAirdropTasks } from '@/stores/states/dapp/reducer';
import { dappSelector } from '@/stores/states/dapp/selector';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetchDapp = () => {
  const params = useParams();
  const id = params?.id;

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const dappAPI = new CDappAPI();
  const stakingAPI = new CStakingAPI();
  const tokenAirdropAPI = new CTokenAirdropAPI();

  const dappState = useAppSelector(dappSelector);
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    await dappAPI.prepareDappParams({ orderID: id as string });
  };

  const getListTask = async () => {
    try {
      const rs = await tokenAirdropAPI.getListTask();
      dispatch(setAirdropTasks(rs));
    } catch (error) {
      dispatch(setAirdropTasks([]));
    }
  };

  const getListAirdrop = async () => {
    try {
      const rs = await tokenAirdropAPI.getListAirdrop();
      dispatch(setAirdrops(rs));
    } catch (error) {
      dispatch(setAirdrops([]));
    }
  };

  const fetchTokenList = async () => {
    console.time('[TIME] fetchTokenList')
    await dappAPI.getListToken(dappState?.chain?.chainId || '');
    console.timeEnd('[TIME] fetchTokenList')
  };

  const fetchStakingPoolsList = async () => {
    console.time('[TIME] fetchStakingPoolsList')
    await stakingAPI.getStakingPools();
    console.timeEnd('[TIME] fetchStakingPoolsList')
  };

  const getDappTasks = async () => {
    console.time('[useFetchDapp] getDappTasks time');
    try {
      await Promise.all([
        fetchTokenList(),
        fetchStakingPoolsList(),
        getListTask(),
        getListAirdrop(),
      ]);
      setLoading(true);
      console.time('[useFetchDapp] getDappTasks time');
      dispatch(setCounterFetchedDapp());
    } catch (error) {
      console.log('getDappTasks', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (dappState?.chain?.chainId) {
      getDappTasks();
    }
  }, [dappState?.chain?.chainId, needReload]);

  useEffect(() => {
    if (!dappState.loading && !loading) {
      setLoaded(true);
    }
  }, [dappState.loading, loading]);

  return {
    loading: dappState.loading || loading,
    configs: dappState.configs,
    loaded,
  };
};

export default useFetchDapp;
