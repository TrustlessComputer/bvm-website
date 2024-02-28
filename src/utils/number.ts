/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

export const formatAmountFromChain = (rawAmount: any, decimals = 18) => {
  if (rawAmount) {
    return new BigNumber(rawAmount)
      .div(`1e${decimals}`)
      .decimalPlaces(2)
      .toFixed();
  }
  return '0';
};

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

export const getDecimalsFromHumanAmount = (params: {
  amount: number;
  defaultDecimals?: number;
}) => {
  const { amount, defaultDecimals = 6 } = params;
  let decimals;
  if (amount > 10) {
    decimals = 2;
  } else if (amount > 1) {
    decimals = 4;
  } else if (amount > 1e-4) {
    decimals = 5;
  } else if (amount > 1e-5) {
    decimals = 6;
  } else {
    decimals = defaultDecimals;
  }
  return decimals;
};

export const removeTrailingZeroes = (amountString: string) => {
  let formattedString = amountString;
  while (
    formattedString.length > 0 &&
    ((formattedString.includes('.') &&
      formattedString[formattedString.length - 1] === '0') ||
      formattedString[formattedString.length - 1] === '.')
  ) {
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
};

export const formatAmountToClient = (amount: any, _decimals = 18) => {
  if (amount) {
    return ethers.utils.formatEther(amount);
  }
  return '0';
};

export const formatDecimal = (params: {
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
