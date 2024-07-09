import { STORAGE_KEYS } from '@/constants/storage-key';
import LocalStorage from '@/libs/localStorage';
import { DAServiceAPI as httpClient } from '@/services/api/clients';
import { IDApp, InstallDAByParams } from './types';
import { DA_DUMMY_LIST } from './constants';

// ------------------------------------------------------------------------
// Access Token
// ------------------------------------------------------------------------

const getAPIAccessToken = () => {
  return LocalStorage.getItem(STORAGE_KEYS.L2_SERVICE_ACCESS_TOKEN_V2);
};

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------

const fetchDAList = async (): Promise<IDApp[]> => {
  // const accessToken = getAPIAccessToken();
  // if (!accessToken) return [];
  let result: IDApp[] = [];
  try {
    result = (await httpClient.get(`/apps/list`, {
      headers: {
        Authorization: `${getAPIAccessToken()}`,
      },
    })) as IDApp[];
    return result || [];
  } catch (error) {
    throw error;
  }
};

const fetchDAppByID = async (dAppID: number): Promise<IDApp> => {
  let result: IDApp;
  try {
    result = (await httpClient.get(`/apps/detail/${dAppID}`)) as IDApp;
    return result;
    // result = DA_DUMMY_LIST.find((a) => a.id === dAppID) as IDApp;
    // return result;
  } catch (error) {
    throw error;
  }
};

// ------------------------------------------------------------------------
// Auth API
// ------------------------------------------------------------------------

const installDAByParams = async (params: InstallDAByParams): Promise<any> => {
  // const accessToken = getAPIAccessToken();
  // if (!accessToken) return;

  let result;
  const { address, dAppID, inputs = [] } = params;
  try {
    result = (await httpClient.post(
      `/apps/install?address=${address}${
        params?.network_id ? `&network_id=${params.network_id}` : ''
      }`,
      {
        app_store_detail_id: dAppID,
        inputs: inputs,
      },
      {
        headers: {
          Authorization: `${getAPIAccessToken()}`,
        },
      },
    )) as IDApp[];
    return result;
  } catch (error) {
    throw error;
  }
};

const dAppServicesAPI = {
  fetchDAList,
  fetchDAppByID,
  installDAByParams,
};

export default dAppServicesAPI;
