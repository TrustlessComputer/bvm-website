import CContract from '@/contract/contract';
import CDappApiClient from '@/services/api/dapp/dapp.client';
import { store } from '@/stores';
import { useAppDispatch } from '@/stores/hooks';
import { setStakingPools } from '@/stores/states/dapp/reducer';
import { formatAmountToClient } from '@/utils/format';
import { isLocalhost } from '@utils/helpers';
import { ISTToken } from './interface';

class CStakingAPI {
  private api = new CDappApiClient().api;
  private dispatch = useAppDispatch();

  private getUrl = (url: string) => {
    return `/staking/${url}`;
  };

  createNewStakingPool = async (data: any): Promise<ISTToken> => {
    return await this.api.post(this.getUrl('create'), data);
  };

  getStakingPools = async (): Promise<ISTToken[]> => {
    const chain = store.getState().dapp.chain;

    const contract = new CContract();
    let data: any = await this.api.get(this.getUrl('sttokens'));

    if (isLocalhost()) {
      // data = data.slice(data?.length - 3, data?.length);
      // data = data.slice(0, 1);
    }

    let pools: ISTToken[] = [];
    if (data && data?.length > 0) {
      for (const item of data) {
        let rewardTotal = '0';
        try {
          const reward = await contract
            .getERC20Contract({
              contractAddress: item.reward_token_address,
              rpc: chain?.rpc,
            })
            .balanceOf(item.reward_pool_address);
          rewardTotal = formatAmountToClient(reward.toString());
        } catch (error) {}

        pools.push({
          ...item,
          balance: rewardTotal,
        });
      }
    }

    this.dispatch(setStakingPools(pools));
    return pools;
  };
}

export default CStakingAPI;
