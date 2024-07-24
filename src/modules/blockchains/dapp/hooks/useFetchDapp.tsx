import { useParams } from 'next/navigation';
import CDappAPI from '@/services/api/dapp';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';

const useFetchDapp = () => {
  const params = useParams();
  const id = params?.id;

  const dappAPI = new CDappAPI();

  const dappState = useAppSelector(dappSelector)

  const fetchData = async () => {
    await dappAPI.prepareDappParams({ orderID: id as string })
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchTokenList = async () => {
    await dappAPI.getListToken(dappState?.chain?.chainId as string);
  }

  useEffect(() => {
    if(dappState?.chain?.chainId) {
      fetchTokenList();
    }
  }, [dappState]);

  return {
    loading: dappState.loading,
    configs: dappState.configs,
  }
};

export default useFetchDapp;
