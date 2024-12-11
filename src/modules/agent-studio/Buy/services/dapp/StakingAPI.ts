import CContract from '@/contract/contract';
import CDappApiClient from '@/services/api/dapp/dapp.client';
import { ISTToken } from '@/services/api/dapp/staking/interface';
import { OrderItem } from '@/stores/states/l2services/types';
import { formatAmountToClient } from '@/utils/format';

class StakingAPI extends CDappApiClient {
  private BASE_URL = 'staking';

  getStakingPools = async ({
    chain,
  }: {
    chain: OrderItem;
  }): Promise<ISTToken[]> => {
    try {
      const contract = new CContract();
      const data: any = await this.api.get(`${this.BASE_URL}/sttokens`);

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

      return pools;
    } catch (error) {
      return [];
    }
  };
}

export default StakingAPI;
