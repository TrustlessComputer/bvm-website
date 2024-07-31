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
  setupTask = async (body: IBodySetupTask) => {
    try {
      const rs = await this.api.post('airdrop/setup-event', body);
      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default CTokenAirdropAPI;
