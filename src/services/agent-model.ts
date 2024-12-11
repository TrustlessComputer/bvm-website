// import { IOrderBuyReq } from '@/stores/states/l2services/types';
// import { IOrderBuyEstimateRespone } from '@/services/api/l2services/types';
import { APP_ENV } from '@/config';
import { L2ServiceAPI as httpClient } from '@/services/api/clients';
import { IModelCategory, ITemplate } from '@/types/customize-model';

export async function getModelCategories(
  tcAddress: string | undefined,
): Promise<IModelCategory[] | null> {
  try {
    let data;
    if (APP_ENV === 'staging') {
      data = await fetch(
        `https://l2aas-api.newbitcoincity.com/api/agent/available-list-v3?tcAddress=0x4113ed747047863Ea729f30C1164328D9Cc8CfcF`,
      ).then((res) => res.json());
    } else {
      data = await fetch(
        `https://l2aas-api.newbitcoincity.com/api/agent/available-list-v3?tcAddress=${
          tcAddress || ''
        }`,
      ).then((res) => res.json());
    }

    return data.result;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function getTemplates(): Promise<Array<IModelCategory[]> | null> {
  try {
    const data = await fetch(
      'https://l2aas-api.newbitcoincity.com/api/agent/available-list-template',
    ).then((res) => res.json());

    return data.result;
  } catch (err) {
    console.error(err);
  }

  return null;
}

export async function getTemplateV2(): Promise<ITemplate[] | null> {
  try {
    const data = await fetch(
      'https://l2aas-api.newbitcoincity.com/api/agent/available-list-template-v2',
    ).then((res) => res.json());

    return data.result;
  } catch (err) {
    console.error(err);
  }

  return null;
}

export const getPictureSharing = async (
  key: string,
): Promise<string | null> => {
  // try {
  //   const data = await httpClient.get(
  //     `/order/upload/get-file-url?getKey=${key}`,
  //   );
  //
  //   console.log('____picture', key, data);
  //   // return data;
  // } catch (error: any) {
  //   throw error;
  // }

  try {
    const data = await fetch(
      `https://l2aas-api.newbitcoincity.com/api/agent/upload/get-file-url?getKey=${key}`,
    ).then((res) => res.json());
    return data.result;
  } catch (err) {
    console.error(err);
  }

  return null;
};
