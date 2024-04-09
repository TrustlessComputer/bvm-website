import { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '@utils/format';
import { getCoinPrices } from '@/services/common';
import useAsyncEffect from 'use-async-effect';
import { Coin } from '@/stores/states/common/types';
import { priceBVM } from '@/services/price';
import BigNumber from 'bignumber.js';

export default function Treasury() {
  const [price, setPrice] = useState(0);
  const hard = 50000000;

  const treasuryPrice = useMemo((): string => {
    return new BigNumber(price || 0).times(hard).toString();
  }, [price]);

  useAsyncEffect(async () => {
    const data = await priceBVM();
    setPrice(data[Coin.BVM])
  }, []);

  return <div>
    <p>Treasury: <span>${formatCurrency(treasuryPrice, 0, 0, '')}</span></p>
  </div>;
}
