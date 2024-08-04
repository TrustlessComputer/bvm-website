import CDappApiClient from '../dapp.client';
import { IBodySetupTask } from './interface';

class CTokenAirdropAPI extends CDappApiClient {
  getListTask = async () => {
    try {
      const rs = await this.api.get('airdrop/tasks');
      return rs;
    } catch (error) {
      return [];
    }
  };

  getListAirdrop = async () => {
    try {
      const rs: any = await this.api.get('airdrop/my-airdrop');
      return rs?.rows;
    } catch (error) {
      return [];
    }
  };

  setupTask = async (body: IBodySetupTask) => {
    try {
      const rs = await this.api.post('airdrop/setup-event', body);
      return rs;
    } catch (error) {
      return [];
    }
  };

  getListReceivers = async (airdrop_id: string) => {
    try {
      const rs = await this.api.get(`airdrop/receivers/${airdrop_id}`);
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CTokenAirdropAPI;
