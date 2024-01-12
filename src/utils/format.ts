import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { MAX_DECIMAL } from '@/constants/constants';
import { compareString } from './string';
import dayjs from 'dayjs';

export const isInValidAmount = (amount?: string | number) => {
  if (!amount) return true;
  const amountBN = new BigNumber(amount);

  return (
    amountBN.isLessThan(0) ||
    amountBN.isNaN() ||
    amountBN.isNegative() ||
    !amountBN.isFinite()
  );
};

export const abbreviateNumber = (value: any) => {
  const config: any = {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
    maximumFractionDigits: 2,
  };
  const result = new Intl.NumberFormat('en-US', config);
  return result.format(value);
};

export const formatCurrency = (
  value: any = 0,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  symbol = 'TC',
  hideAbbr = false,
): string => {
  if (isNaN(Number(value))) return '0';

  let config: any = {
    maximumFractionDigits: maximumFractionDigits,
    minimumFractionDigits: minimumFractionDigits,
  };

  if (Number(value) < 1) {
    if (compareString(symbol, 'BTC')) {
      config = {
        maximumFractionDigits: 6,
        minimumFractionDigits: 0,
      };
    } else {
      if (Number(value) < 0.001) {
        config = {
          maximumFractionDigits: 7,
          minimumFractionDigits: 0,
        };
      } else {
        config = {
          maximumFractionDigits: maximumFractionDigits,
          minimumFractionDigits: minimumFractionDigits,
        };
      }
    }
  } else if (Number(value) >= 1 && Number(value) < 1000) {
    config = {
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    };
  } else if (Number(value) >= 10000 && !hideAbbr) {
    return abbreviateNumber(value);
  } else if (Number(value) >= 1000) {
    config = {
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
    };
  }

  const result = new Intl.NumberFormat('en-US', config);
  return result.format(value);
};

export const formatName = (name: string, length = 12): string => {
  if (!name) return '';
  if (ethers.utils.isAddress(name)) {
    return name.substring(2, 8);
  } else {
    return name?.length > length ? name.substring(0, length) + '...' : name;
  }
};

export const formatCurrencyV2 = (params: {
  amount: string | number;
  decimals?: number;
}) => {
  const { amount, decimals = 6 } = params;

  if (!amount || isInValidAmount(amount)) return '0.0';
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
  };
  const amount_BN = new BigNumber(amount);
  if (amount_BN.isZero()) return '0';

  return new BigNumber(amount).toFormat(decimals, BigNumber.ROUND_DOWN, fmt);
};

interface IFormat {
  amount: string;
  roundCeil?: boolean;
  decimalsDisplay?: number;
}

export const formatAmount = (params: IFormat) => {
  const decimals = params.decimalsDisplay || MAX_DECIMAL;
  return new BigNumber(
    new BigNumber(params.amount).toFixed(
      decimals,
      params.roundCeil ? BigNumber.ROUND_CEIL : BigNumber.ROUND_FLOOR,
    ),
  ).toString();
};

interface IFormatToHuman extends IFormat {
  decimals?: number;
}

export const formatToHumanAmount = (params: IFormatToHuman) => {
  const decimals = params.decimals || 18;
  const amount = new BigNumber(params.amount).dividedBy(
    new BigNumber(10).pow(decimals),
  );
  return formatAmount({ ...params, amount: amount.toString() } as any);
};

export const formatAmountToClient = (amount: any, _decimals = 18) => {
  if (amount) {
    return ethers.utils.formatEther(amount);
  }
  return '0';
};

export const humanReadable = (
  price: number | string,
  decimalPlaces = 6,
): string => {
  return new BigNumber(price || 0).decimalPlaces(decimalPlaces).toString();
};
export function formatString(
  str: string | undefined,
  length = 8,
  suffix = '...',
) {
  if (str?.length && str.length > length) {
    return str.slice(0, length) + suffix;
  }
  return str;
}


export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');
