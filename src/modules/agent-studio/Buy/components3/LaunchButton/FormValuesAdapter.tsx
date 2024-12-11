import { IOrderBuyReq_V3 } from '@/stores/states/l2services/types';
import { IModelCategory } from '@/types/customize-model';

function removeDoubleSpaces(str: string) {
  return str.replace(/  +/g, ' ');
}

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

  let computerNameRemove2Space = removeDoubleSpaces(
    computerName?.toLowerCase()?.trim(),
  );
  // const domainOLD = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
  const domain = computerNameRemove2Space.replaceAll(' ', '-');

  // console.log('TEST --- ', {
  //   chainId,
  //   domainOLD,
  //   domain,
  // });

  let result: IOrderBuyReq_V3 = {
    //Required
    domain: domain,
    chainName: computerName,
    chainId: chainId,
    nodeConfigs: listLegoWrapper,

    //Optinals
  };

  return result;
};
