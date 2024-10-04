import React from 'react';
import useChainFormHelper from '../helpers/useChainFormHelper';
import useChainFormStore from '../../stores/useChainFormStore';
import { IModelOption } from '@/types/customize-model';

const useProcessPrice = () => {
  const { currentNetwork, shouldCalcPrice } = useChainFormHelper();

  const chainFields = useChainFormStore((state) => state.chainFields);
  const setPriceBVM = useChainFormStore((state) => state.setPriceBVM);
  const setPriceUSD = useChainFormStore((state) => state.setPriceUSD);

  const processPrice = React.useCallback(() => {
    if (!currentNetwork) return;

    const getPriceBVM = (option: IModelOption) => {
      let price = option.priceBVM;

      if (currentNetwork === 'testnet' && option.priceBVMTestnet) {
        price = option.priceBVMTestnet;
      }

      return price;
    };

    const getPriceUSD = (option: IModelOption) => {
      let price = option.priceUSD;

      if (currentNetwork === 'testnet' && option.priceUSDTestnet) {
        price = option.priceUSDTestnet;
      }

      return price;
    };

    const priceBVM = chainFields.reduce((acc, chainField) => {
      if (!shouldCalcPrice(chainField)) return acc;

      return (
        acc +
        chainField.category.options.reduce((acc, option) => {
          return acc + getPriceBVM(option);
        }, 0)
      );
    }, 0);

    const priceUSD = chainFields.reduce((acc, chainField) => {
      if (!shouldCalcPrice(chainField)) return acc;

      return (
        acc +
        chainField.category.options.reduce((acc, option) => {
          return acc + getPriceUSD(option);
        }, 0)
      );
    }, 0);

    setPriceBVM(priceBVM);
    setPriceUSD(priceUSD);
  }, [currentNetwork]);

  React.useEffect(() => {
    processPrice();
  }, [processPrice]);
};

export default useProcessPrice;
