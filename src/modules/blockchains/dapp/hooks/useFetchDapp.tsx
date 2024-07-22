import { useParams } from 'next/navigation';
import CDappAPI from '@/services/api/dapp';
import React from 'react';
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

  console.log('SANG TEST: ', dappState);

  return {
    loading: dappState.loading,
  }
};

export default useFetchDapp;
