'use client';
import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import {
  BalanceBitcoinType,
  BalanceTypes,
  IBalanceBitcoin,
  IBalanceBitcoinInfo,
} from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
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
  // Bitcoin
  totalBitcoinBalanceUsd?: number;
  rollupBitcoinBalances?: any[];
}

const initialValue: IL2RollupDetailContext = {
  address: '',
  isValidAddress: false,
  isBTCAddress: false,
  totalBalanceUsd: 0,
  rollupDetails: [],
  rollupBalances: [],
  rollupTokensRate: undefined,
  // Bitcoin
  totalBitcoinBalanceUsd: 0,
  rollupBitcoinBalances: [],
};

export const L2RollupDetailContext =
  React.createContext<IL2RollupDetailContext>(initialValue);

export const L2RollupDetailProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const params = useParams();

  const address = useMemo(() => params?.id as string, [params]);

  const rollupApi = new CRollupL2DetailAPI();
  const rollupBitcoinApi = new CRollupL2DetailBitcoinAPI();

  const isEVMAddress = useMemo(() => validateEVMAddress(address), [address]);
  const isBTCAddress = useMemo(() => validateBTCAddress(address), [address]);

  const isValidAddress = useMemo(
    () => isEVMAddress || isBTCAddress,
    [isEVMAddress, isBTCAddress],
  );

  const [rollupTokensRate, setRollupTokensRate] = useState<RollupTokenRate>();
  const [rollupDetails, setRollupDetails] = useState<IRollupDetail[]>([]);

  const rollupBalances = useMemo(() => {
    let balances: ITokenChain[] = [];
    rollupDetails.forEach((data) => {
      if (data.rollup && data.balances?.length > 0)
        balances = [
          ...balances,
          ...data.balances.map((balance) => ({
            ...balance,
            chain: data.rollup,
          })),
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
    if (!isEVMAddress) return;
    try {
      const data = await rollupApi.getRollupL2Detail(address);
      setRollupDetails(data);
    } catch (error) {}
  };

  // Bitcoin Porfolio

  const [balanceBitcoinInfo, setBalanceBitcoinInfo] =
    useState<IBalanceBitcoinInfo>();
  const [assetBitcoin, setAssetBitcoin] =
    useState<{ [x in BalanceBitcoinType]: IBalanceBitcoin[] }>();

  const rollupBitcoinBalances = useMemo(() => {
    return [
      {
        amountUsd: new BigNumber(balanceBitcoinInfo?.balance || '0')
          .multipliedBy(
            new BigNumber(rollupTokensRate ? rollupTokensRate['BTC'] : 0),
          )
          .toNumber(),
        title: 'BTC',
      },
      ...BalanceTypes.map((balanceType) => {
        if (!assetBitcoin) {
          return {
            amountUsd: 0,
            title: balanceType.title,
          };
        }
        const totalUsd = assetBitcoin[balanceType.type].reduce(
          (accum, item) => {
            return (
              accum +
              new BigNumber(item.holding_amount)
                .multipliedBy(item.token_price)
                .toNumber()
            );
          },
          0,
        );
        console.log('===totalUsd', totalUsd, balanceType.type);

        return {
          amountUsd: totalUsd,
          title: balanceType.title,
        };
      }),
    ];
  }, [balanceBitcoinInfo, rollupTokensRate, assetBitcoin]);

  const totalBitcoinBalanceUsd = useMemo(() => {
    const total = rollupBitcoinBalances.reduce((accum, item) => {
      return accum + item.amountUsd;
    }, 0);
    return total;
  }, [rollupBitcoinBalances]);

  useEffect(() => {
    fetchRollupBitcoinBalance();
    fetchRollupAssetBitcoinBalance();
  }, [address]);

  const fetchRollupAssetBitcoinBalance = async () => {
    if (!isBTCAddress) return;
    try {
      const data = await Promise.all(
        BalanceTypes.map(async (balanceType) => {
          const res = (await rollupBitcoinApi.getRollupL2BitcoinBalances({
            user_address: address,
            type: balanceType.type,
            page: 0,
            limit: 50,
          })) as any;
          return { [balanceType.type]: res };
        }),
      );

      let asset: any = {};
      data.forEach((item) => {
        asset = { ...asset, ...item };
      });
      setAssetBitcoin(asset);
    } catch (error) {}
  };

  const fetchRollupBitcoinBalance = async () => {
    if (!isBTCAddress) return;
    try {
      const data: any = await rollupBitcoinApi.getRollupL2BitcoinBalanceInfo(
        address,
      );
      if (data) setBalanceBitcoinInfo(data);
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
      totalBitcoinBalanceUsd,
      rollupBitcoinBalances,
    };
  }, [
    address,
    isValidAddress,
    isBTCAddress,
    totalBalanceUsd,
    rollupDetails,
    rollupBalances,
    rollupTokensRate,
    totalBitcoinBalanceUsd,
    rollupBitcoinBalances,
  ]);

  return (
    <L2RollupDetailContext.Provider value={contextValues}>
      {children}
    </L2RollupDetailContext.Provider>
  );
};
