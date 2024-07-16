import { IOrderBuyReq_V3 } from '@/stores/states/l2services/types';

type Params = {
  computerName: string;
  chainId: string;
  dynamicFormValues: any[];
};

export const formValuesAdapter = (params: Params): IOrderBuyReq_V3 => {
  const { computerName, chainId, dynamicFormValues } = params;

  const listLegoWrapper: IModelCategory[] =
    dynamicFormValues.map((item) => {
      let itemWrapper;
      itemWrapper = {
        ...item,
        options: item.options,
      };
      return itemWrapper;
    }) || [];

  const chainName = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
  const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');

  let result: IOrderBuyReq_V3 = {
    //Required
    domain: domain,
    chainName: chainName,
    chainId: chainId,
    nodeConfigs: listLegoWrapper,

    //Optinals
  };

  return result;
};
