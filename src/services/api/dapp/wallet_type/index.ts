import CDappApiClient from '@/services/api/dapp/dapp.client';
import { WalletType } from '@/stores/states/dapp/types';
import { store } from '@/stores';

class CWalletTypeAPI {
  private api = new CDappApiClient().api;
  private chainID = store.getState().dapp.chain?.chainId;

  private getUrl = (url: string) => {
    return `/user/chain/${url}`;
  };

  updateWalletType = async (params: {
    wallet_type: WalletType,
  }) => {
    return await this.api.post(this.getUrl('wallet-type'), {
      wallet_type: params.wallet_type,
      network_id: Number(this.chainID || '0'),
    });
  };
}

export default CWalletTypeAPI;
