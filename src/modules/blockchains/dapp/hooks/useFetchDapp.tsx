import { useParams } from 'next/navigation';
import CDappAPI from '@/services/api/dapp';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import { commonSelector } from '@/stores/states/common/selector';
import CTokenGenerationAPI from '@/services/api/dapp/token_generation';

const useFetchDapp = () => {
  const params = useParams();
  const id = params?.id;

  const dappAPI = new CDappAPI();
  const tokenAPI = new CTokenGenerationAPI();

  const dappState = useAppSelector(dappSelector)
  const needReload = useAppSelector(commonSelector).needReload;

  const fetchData = async () => {
    await dappAPI.prepareDappParams({ orderID: id as string })
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchTokenList = async () => {
    await tokenAPI.getListToken('91227');
  }

  useEffect(() => {
    if(dappState?.chain?.chainId) {
      fetchTokenList();
    }
  }, [dappState?.chain?.chainId, needReload]);

  return {
    loading: dappState.loading,
    configs: dappState.configs,
  }
};

export default useFetchDapp;
