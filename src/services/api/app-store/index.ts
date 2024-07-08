import { L2ServiceAPI as httpClient } from '@/services/api/clients';
import { IOrderBuyReq } from '@/stores/states/l2services/types';
import { useLocalStorage } from 'usehooks-ts/dist';
import { STORAGE_KEYS } from '@constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { IOrderInstallReq } from '@/services/api/app-store/types';

const getAPIAccessToken = () => {
  return LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
};

class CAppStoreApi {
  public orderBuyAPI = async (params: IOrderInstallReq): Promise<any> => {
    try {
      const data = (await httpClient.post(`/order/register`, params, {
        headers: {
          Authorization: `${getAPIAccessToken()}`,
        },
      })) as any;
      return data;
    } catch (error: any) {
      throw error;
    }
  };

};

export default CAppStoreApi;
