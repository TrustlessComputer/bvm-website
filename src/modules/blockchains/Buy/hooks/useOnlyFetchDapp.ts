import { OrderItem } from '@/stores/states/l2services/types';
import AirdropAPI from '../services/dapp/AirdropAPI';
import DappAPI from '../services/dapp/DappAPI';
import StakingAPI from '../services/dapp/StakingAPI';
import TokenAPI from '../services/dapp/TokenAPI';

const useOnlyFetchDapp = () => {
  const dappAPI = new DappAPI();
  const stakingAPI = new StakingAPI();
  const airdropAPI = new AirdropAPI();
  const tokenAPI = new TokenAPI();

  const fetchChain = async (params: { orderID: string }) => {
    return await dappAPI.getChainByOrderID(params);
  };

  const fetchListStakingPool = async (params: { chain: OrderItem }) => {
    return await stakingAPI.getStakingPools(params);
  };

  const fetchListTask = async () => {
    return await airdropAPI.getListTask();
  };

  const fetchListAirdrop = async () => {
    return await airdropAPI.getListAirdrop();
  };

  const fetchListReceivers = async ({ airdropId }: { airdropId: string }) => {
    return await airdropAPI.getListReceivers(airdropId);
  };

  const fetchListToken = async (params: { networkId: string }) => {
    return await tokenAPI.tokenList(params.networkId);
  };

  return {
    fetchChain,
    fetchListStakingPool,
    fetchListTask,
    fetchListAirdrop,
    fetchListReceivers,
    fetchListToken,
  };
};

export default useOnlyFetchDapp;
