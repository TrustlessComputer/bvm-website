import { formatCurrencyV2 } from '@/utils/format';
import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';
import useAvailableListTemplate from '../blockchains/Buy/studio/useAvailableListTemplate';

export const usePricingTemplate = () => {
  const { templateList } = useAvailableListTemplate();

  const dataList = useMemo(() => {
    let result: any[] = [];
    let templateListTemp = [...templateList];

    templateListTemp.shift();

    templateListTemp.map((template) => {
      let totalPriceBVM = 0;
      let totalPriceUSD = 0;

      template.map((item) => {
        totalPriceBVM = totalPriceBVM + item.options[0].priceBVM;
        totalPriceUSD = totalPriceUSD + item.options[0].priceUSD;
      });

      const priceBVMPerDay = new BigNumber(totalPriceBVM)
        .dividedBy(30)
        .toString();
      const priceBVMPerDayFormated = formatCurrencyV2({
        amount: priceBVMPerDay,
        decimals: 0,
      });

      const priceUSDPerDay = new BigNumber(totalPriceUSD)
        .dividedBy(30)
        .toString();
      const priceUSDPerDayFormated = formatCurrencyV2({
        amount: priceUSDPerDay,
        decimals: 0,
      });

      result.push({
        totalPriceBVM,
        priceUSDPerDay,
        priceBVMPerDayFormated,
        priceUSDPerDayFormated,
      });
    });

    return result;
  }, [templateList]);

  console.log('[LOG] -- dataList -- ', {
    dataList,
  });

  return {
    dataList,
  };
};
