import CDappApiClient from '@/services/api/dapp/dapp.client';

class AirdropAPI extends CDappApiClient {
  private BASE_URL = 'airdrop';

  getListTask = async () => {
    try {
      const rs = await this.api.get(`${this.BASE_URL}/tasks`);

      return rs;
    } catch (error) {
      return [];
    }
  };

  getListAirdrop = async () => {
    try {
      const rs: any = await this.api.get(`${this.BASE_URL}/my-airdrop`);

      return rs?.rows;
    } catch (error) {
      return [];
    }
  };

  getListReceivers = async (airdrop_id: string) => {
    try {
      const rs = await this.api.get(`${this.BASE_URL}/receivers/${airdrop_id}`);

      return rs;
    } catch (error) {
      return [];
    }
  };
}

export default AirdropAPI;
