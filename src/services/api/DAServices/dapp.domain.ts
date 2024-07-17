import { DappDomain, IDApp } from '@/services/api/DAServices/types';
import { DAServiceAPI as httpClient } from '@/services/api/clients';
import LocalStorage from '@/libs/localStorage';
import { STORAGE_KEYS } from '@constants/storage-key';
import sleep from '@utils/sleep';


class CDappDomainAPI {
  private httpClient = httpClient;

  constructor() {
    this.httpClient.interceptors.request.use(function (config) {
      config.headers.Authorization =  LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
      return config;
    });
  }

  getDappDomain = async (params: { address: string }): Promise<DappDomain[]> => {
    const domains = await this.httpClient.get(`user/domain/list?address=${params?.address}`) as DappDomain[];
    return domains
  }

  setDappDomain = async (params: { address: string, domain: string, chainID: string }): Promise<DappDomain[]> => {
    await this.httpClient.put(`user/domain/update??address=${params?.address}`, {
      "user_domain": params.domain,
      "network_id": Number(params.chainID)
    })

    await sleep(0.2)

    return await this.getDappDomain({ address: params.address }) as DappDomain[];
  }
}

export default CDappDomainAPI;
