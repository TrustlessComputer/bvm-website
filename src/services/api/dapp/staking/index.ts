import CDappApiClient from '@/services/api/dapp/dapp.client';
import { ISTToken } from './interface';
import BigNumberJS from 'bignumber.js';
import CContract from '@/contract/contract';
import { formatAmountToClient } from '@/utils/format';

class CStakingAPI {
  private api = new CDappApiClient().api;

  private getUrl = (url: string) => {
    return `/staking/${url}`;
  };

  createNewStakingPool = async (data: any): Promise<ISTToken> => {
    return await this.api.post(this.getUrl('create'), data);
  };

  getStakingPools = async (): Promise<DappModel[]> => {
    const contract = new CContract();
    const data: any = await this.api.get(this.getUrl('sttokens'));
    if (data && data?.length > 0) {
      let pools: any[] = [];
      for (const item of data) {
        let rewardTotal = '0';
        try {
          const reward = await contract
            .getERC20Contract({ contractAddress: item.reward_token_address })
            .balanceOf(item.reward_pool_address);
          rewardTotal = formatAmountToClient(reward.toString());
        } catch (error) {}

        pools.push({
          id: 'staking',
          key: 'staking',
          title: 'Staking',
          icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
          order: 2,
          color: '#24704D',
          created_at: '2021-09-14T09:00:00.000Z',
          updated_at: '2021-09-14T09:00:00.000Z',
          tooltip: '',
          sections: [
            {
              key: 'information',
              icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
              title: 'Staking Pool',
              tooltip: '',
              required: true,
            },
          ],
          baseBlock: {
            key: 'token_info',
            title: 'Staking Pool',
            icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-issue-a-token.svg',
            placableAmount: -1,
            section: 'information',
            preview: true,
            fields: [
              {
                key: 'staking_token',
                title: 'Staking Token',
                type: 'dropdown',
                icon: '',
                value: item.principle_token_address,
                tooltip: '',
                options: [
                  {
                    key: item.principle_token?.symbol,
                    title: item.principle_token?.symbol,
                    value: item.principle_token?.contract_address,
                    icon: item.principle_token?.image_url,
                    tooltip: '',
                    type: '',
                    options: [],
                  },
                ],
              },
              {
                key: 'reward_token',
                title: 'Reward Token',
                type: 'dropdown',
                icon: '',
                value: item.reward_token_address,
                tooltip: '',
                options: [
                  {
                    key: item.reward_token?.symbol,
                    title: item.reward_token?.symbol,
                    value: item.reward_token?.contract_address,
                    icon: item.reward_token?.image_url,
                    tooltip: '',
                    type: '',
                    options: [],
                  },
                ],
              },
              {
                key: 'rate',
                title: 'Rate',
                type: 'input',
                icon: '',
                value: `${1 / Number(item.token_rate)}`,
                tooltip:
                  'Exchange rate between staking token and reward token.',
                placeholder: 'eg. 1',
                options: [],
              },
              {
                key: 'apr',
                title: 'APR',
                type: 'input',
                icon: '',
                value:
                  new BigNumberJS(item?.interest_rate || '0.2')
                    .times(100)
                    .toString() + '%',
                tooltip: '',
                placeholder: 'eg. 20%',
                options: [],
              },
              {
                key: 'amount',
                title: 'Reward amount',
                type: 'input',
                icon: '',
                value: rewardTotal,
                tooltip: '',
                placeholder: 'eg. 100,000',
                options: [],
              },
            ],
          },
        });
      }
      return pools;
    }
    return [];
  };
}

export default CStakingAPI;
