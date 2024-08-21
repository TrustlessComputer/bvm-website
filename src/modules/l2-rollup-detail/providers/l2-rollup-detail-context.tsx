'use client';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import {
  IRollupDetail,
  ITokenChain,
  RollupTokenRate,
} from '@/services/api/dapp/rollupl2-detail/interface';
import { validateBTCAddress } from '@/utils/format';
import { validateEVMAddress } from '@/utils/validate';
import BigNumber from 'bignumber.js';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export interface IL2RollupDetailContext {
  address: string;
  isValidAddress: boolean;
  isBTCAddress: boolean;
  totalBalanceUsd: number;
  rollupDetails: IRollupDetail[];
  rollupBalances: ITokenChain[];
  rollupTokensRate?: RollupTokenRate;
}

const initialValue: IL2RollupDetailContext = {
  address: '',
  isValidAddress: false,
  isBTCAddress: false,
  totalBalanceUsd: 0,
  rollupDetails: [],
  rollupBalances: [],
  rollupTokensRate: undefined,
};

export const L2RollupDetailContext =
  React.createContext<IL2RollupDetailContext>(initialValue);

export const L2RollupDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);

  const rollupApi = new CRollupL2DetailAPI();

  const isValidAddress = useMemo(
    () => validateEVMAddress(address) || validateBTCAddress(address),
    [address],
  );

  const isBTCAddress = useMemo(() => validateBTCAddress(address), [address]);

  const [rollupTokensRate, setRollupTokensRate] = useState<RollupTokenRate>();
  const [rollupDetails, setRollupDetails] = useState<IRollupDetail[]>([]);

  const rollupBalances = useMemo(() => {
    let balances: ITokenChain[] = [];
    rollupDetails.forEach((data) => {
      balances = [
        ...balances,
        ...data.balances.map((balance) => ({ ...balance, chain: data.rollup })),
      ];
    });
    return balances;
  }, [rollupDetails]);

  // const rollupChains = useMemo(() => {
  //   return rollupDetails.map((data) => data.rollup);
  // }, [rollupDetails]);

  const totalBalanceUsd = useMemo(() => {
    const total = rollupBalances.reduce((accum, item) => {
      if (!rollupTokensRate) return accum;
      const tokenRateUsd = rollupTokensRate[item.token_name];
      if (!tokenRateUsd) return accum;
      return (
        accum +
        new BigNumber(item.value)
          .multipliedBy(new BigNumber(tokenRateUsd))
          .toNumber()
      );
    }, 0);
    return total;
  }, [rollupTokensRate, rollupBalances]);

  useEffect(() => {
    fetchTokensRate();
  }, []);

  useEffect(() => {
    fetchRollupBalances();
  }, [address]);

  const fetchTokensRate = async () => {
    try {
      const data = await rollupApi.getRollupTokensRate();
      setRollupTokensRate(data);
    } catch (error) {}
  };

  const fetchRollupBalances = async () => {
    if (!isValidAddress) return;
    try {
      const data = await rollupApi.getRollupL2Detail(address);
      setRollupDetails(data);
    } catch (error) {}
  };

  const contextValues = React.useMemo((): IL2RollupDetailContext => {
    return {
      address,
      isValidAddress,
      isBTCAddress,
      totalBalanceUsd,
      rollupDetails,
      rollupBalances,
      rollupTokensRate,
    };
  }, [
    address,
    isValidAddress,
    isBTCAddress,
    totalBalanceUsd,
    rollupDetails,
    rollupBalances,
    rollupTokensRate,
  ]);

  return (
    <L2RollupDetailContext.Provider value={contextValues}>
      {children}
    </L2RollupDetailContext.Provider>
  );
};
