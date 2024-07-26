import CDappApiClient from '@/services/api/dapp/dapp.client';
import { ISTToken } from './interface';
import CContract from '@/contract/contract';
import { formatAmountToClient } from '@/utils/format';
import { useAppDispatch } from '@/stores/hooks';
import { setStakingPools } from '@/stores/states/dapp/reducer';

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
    const contract = new CContract();
    const data: any = await this.api.get(this.getUrl('sttokens'));

    let pools: ISTToken[] = [];
    if (data && data?.length > 0) {
      for (const item of data) {
        let rewardTotal = '0';
        try {
          const reward = await contract
            .getERC20Contract({ contractAddress: item.reward_token_address })
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
