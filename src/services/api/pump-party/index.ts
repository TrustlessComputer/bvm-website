import CPumpApiClient from './pump.client';
import { IRequestPumpPartyParams, IPumpParty } from './types';

class CPumpPartyAPI {
  private api = new CPumpApiClient().api;

  public getPumpParties = async (
    params: IRequestPumpPartyParams,
  ): Promise<{ parties: IPumpParty[]; count: number }> => {
    const response = (await this.api.get('/meme/list', { params })) as any;
    return {
      parties: (response?.rows || []) as IPumpParty[],
      count: response?.count as number,
    };
  };
}

export default CPumpPartyAPI;
