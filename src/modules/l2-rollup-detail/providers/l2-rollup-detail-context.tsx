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
import { isValidBTCTxHash, isValidERC20TxHash } from '@/utils/form-validate';
import { formatCurrency, validateBTCAddress } from '@/utils/format';
import { compareString } from '@/utils/string';
import { validateEVMAddress } from '@/utils/validate';
import BigNumber from 'bignumber.js';
import { useParams } from 'next/navigation';
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import uniqBy from 'lodash/uniqBy';
import { IBlock } from '@/modules/l2-rollup-detail/MemPool/interface';

export interface IL2RollupDetailContext {
  address: string;
  aiSummary: string;
  isLoadingAI: boolean;
  isValidAddress: boolean;
  isBTCAddress: boolean;
  isBTCTxAddress: boolean;
  isERC20TxAddress: boolean;
  totalBalanceUsd: number;
  rollupDetails: IRollupDetail[];
  rollupBalances: ITokenChain[];
  rollupL2PorfolioBalances: any[];
  rollupTokensRate?: RollupTokenRate;
  // Bitcoin
  balanceBitcoinInfo?: IBalanceBitcoinInfo;
  totalBitcoinBalanceUsd?: number;
  rollupBitcoinBalances?: any[];
  selectedBlock: IBlock | undefined;
  setSelectedBlock: any;
}

const initialValue: IL2RollupDetailContext = {
  address: '',
  aiSummary: '',
  isLoadingAI: false,
  isValidAddress: false,
  isBTCAddress: false,
  isBTCTxAddress: false,
  isERC20TxAddress: false,
  totalBalanceUsd: 0,
  rollupDetails: [],
  rollupBalances: [],
  rollupL2PorfolioBalances: [],
  rollupTokensRate: undefined,
  // Bitcoin
  balanceBitcoinInfo: undefined,
  totalBitcoinBalanceUsd: 0,
  rollupBitcoinBalances: [],
  selectedBlock: undefined,
  setSelectedBlock: () => {},
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
  const isBTCTxAddress = useMemo(() => isValidBTCTxHash(address), [address]);
  const isERC20TxAddress = useMemo(
    () => isValidERC20TxHash(address),
    [address],
  );

  const isValidAddress = useMemo(
    () => isEVMAddress || isBTCAddress || isBTCTxAddress || isERC20TxAddress,
    [isEVMAddress, isBTCAddress, isBTCTxAddress, isERC20TxAddress],
  );

  const [rollupTokensRate, setRollupTokensRate] = useState<RollupTokenRate>();
  const [rollupDetails, setRollupDetails] = useState<IRollupDetail[]>([]);
  const [selectedBlock, setSelectedBlock] =
    useState<IBlock | undefined>(undefined);

  const [aiSummary, setAiSummary] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

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

  const rollupL2PorfolioBalances = useMemo(() => {
    const list = rollupDetails
      .filter((detail) => !!detail.rollup)
      .map((detail) => {
        const totalUsd = detail.balances?.reduce((accum, item) => {
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
        const percent = totalUsd
          ? ((totalUsd / totalBalanceUsd) * 100).toFixed(0)
          : 0;
        return {
          ...detail,
          balanceUsd: totalUsd || 0,
          percent,
        };
      });
    return list.sort((a, b) => b.balanceUsd - a.balanceUsd);
  }, [rollupDetails, rollupTokensRate, totalBalanceUsd]);

  useEffect(() => {
    if (
      rollupBalances.length > 0 &&
      rollupL2PorfolioBalances.length > 0 &&
      rollupTokensRate
    )
      fetchL2Summary();
  }, [rollupL2PorfolioBalances, rollupBalances, rollupTokensRate]);

  useEffect(() => {
    fetchTokensRate();
  }, []);

  useEffect(() => {
    fetchRollupBalances();
  }, [address]);

  const fetchL2Summary = async () => {
    if (!isEVMAddress) return;
    setIsLoadingAI(true);
    try {
      const data = await rollupBitcoinApi.getRollupL2BitcoinSummary(address, {
        type: 'ETH',
        portfolio: rollupL2PorfolioBalances.map((portfolio) => ({
          asset: portfolio.rollup.name,
          balance: `${
            portfolio.balanceUsd
              ? formatCurrency(portfolio.balanceUsd, 2, 2)
              : '0'
          }`,
          percent: `${portfolio.percent}`,
        })),
        token: uniqBy(rollupBalances, 'token_name')
          .filter((item) => !!rollupTokensRate![item.token_name])
          .map((balance) => ({
            asset: balance.token_name,
            balance: `${formatCurrency(
              rollupBalances
                .filter((item) =>
                  compareString(balance.token_name, item.token_name),
                )
                .reduce((accum, item) => {
                  if (!rollupTokensRate) return accum;
                  const tokenRateUsd = rollupTokensRate[item.token_name];
                  if (!tokenRateUsd) return accum;

                  return (
                    accum +
                    new BigNumber(item.value)
                      .multipliedBy(new BigNumber(tokenRateUsd))
                      .toNumber()
                  );
                }, 0),
              0,
              2,
            )}`,
          })),
      });
      if (data) setAiSummary(data.summary);
    } catch (error) {
    } finally {
      setIsLoadingAI(false);
    }
  };

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
  const isLoadedAssetBitcoin = useRef(false);

  const rollupBitcoinBalances = useMemo(() => {
    return [
      {
        amountUsd: new BigNumber(balanceBitcoinInfo?.balance || '0')
          .multipliedBy(
            new BigNumber(rollupTokensRate ? rollupTokensRate['BTC'] : 0),
          )
          .toNumber(),
        title: 'BTC',
        btcBalance: balanceBitcoinInfo?.balance || '0',
        color: 'orange',
        count: 0,
      },
      ...BalanceTypes.map((balanceType) => {
        if (!assetBitcoin) {
          return {
            amountUsd: 0,
            title: balanceType.title,
            count: 0,
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

        return {
          amountUsd: totalUsd,
          title: balanceType.title,
          color: balanceType.color,
          count: assetBitcoin[balanceType.type].length,
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
    isLoadedAssetBitcoin.current = false;
    try {
      const data = await Promise.all(
        BalanceTypes.map(async (balanceType) => {
          const limit =
            balanceType.type === 'runes'
              ? 40
              : balanceType.type === 'ordinals_nft'
              ? 20
              : 50;
          const res = (await rollupBitcoinApi.getRollupL2BitcoinBalances({
            user_address: address,
            type: balanceType.type,
            page: 1,
            limit,
          })) as any;
          return { [balanceType.type]: res };
        }),
      );

      let asset: any = {};
      data.forEach((item) => {
        asset = { ...asset, ...item };
      });
      setAssetBitcoin(asset);
    } catch (error) {
    } finally {
      isLoadedAssetBitcoin.current = true;
    }
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

  useEffect(() => {
    if (rollupBitcoinBalances.length > 0) fetchBitcoinSummary();
  }, [rollupBitcoinBalances]);

  const fetchBitcoinSummary = async () => {
    if (!isBTCAddress || !isLoadedAssetBitcoin.current || !rollupTokensRate)
      return;
    setIsLoadingAI(true);
    try {
      const data = await rollupBitcoinApi.getRollupL2BitcoinSummary(address, {
        type: 'BTC',
        portfolio: rollupBitcoinBalances.map((portfolio) => ({
          asset: portfolio.title,
          balance: `${
            portfolio.amountUsd
              ? formatCurrency(portfolio.amountUsd, 2, 2)
              : '0'
          }`,
          percent: `${
            portfolio.amountUsd && totalBitcoinBalanceUsd
              ? ((portfolio.amountUsd / totalBitcoinBalanceUsd) * 100).toFixed(
                  0,
                )
              : 0
          }`,
        })),
        token: rollupBitcoinBalances
          .filter((balance) => balance.title !== 'BTC')
          .map((portfolio) => ({
            asset: portfolio.title,
            count: `${portfolio?.count || '0'}`,
          })),
        nft_count: `${assetBitcoin?.ordinals_nft.length || 0}`,
      });
      if (data) setAiSummary(data.summary);
    } catch (error) {
    } finally {
      setIsLoadingAI(false);
    }
  };

  const contextValues = React.useMemo((): IL2RollupDetailContext => {
    return {
      address,
      aiSummary,
      isLoadingAI,
      isValidAddress,
      isBTCAddress,
      totalBalanceUsd,
      rollupDetails,
      rollupBalances,
      rollupL2PorfolioBalances,
      rollupTokensRate,
      balanceBitcoinInfo,
      totalBitcoinBalanceUsd,
      rollupBitcoinBalances,
      isBTCTxAddress,
      isERC20TxAddress,
      selectedBlock,
      setSelectedBlock,
    };
  }, [
    address,
    aiSummary,
    isLoadingAI,
    isValidAddress,
    isBTCAddress,
    totalBalanceUsd,
    rollupDetails,
    rollupBalances,
    rollupL2PorfolioBalances,
    rollupTokensRate,
    balanceBitcoinInfo,
    totalBitcoinBalanceUsd,
    rollupBitcoinBalances,
    isBTCTxAddress,
    isERC20TxAddress,
    selectedBlock,
    setSelectedBlock,
  ]);

  return (
    <L2RollupDetailContext.Provider value={contextValues}>
      {children}
    </L2RollupDetailContext.Provider>
  );
};
