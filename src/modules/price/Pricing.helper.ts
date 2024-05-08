import { BigNumber } from 'bignumber.js';
import floor from 'lodash/floor';
import { ceil } from 'lodash';
import { IOrderBuyEstimateRespone } from '@/services/api/l2services/types';

interface IAmount {
  originalAmount?: number;
  humanAmount?: number;
  decimals: number;
  clipAmount?: boolean;
  decimalDigits?: boolean;
  maxDigits?: number;
  isCeil?: boolean;
}

interface IHumanAmount {
  originalAmount?: number | string;
  decimals: number;
}

const toHumanAmount = (payload: IHumanAmount) => {
  const { originalAmount = 0, decimals } = payload;
  const amount = new BigNumber(originalAmount);
  if (amount.isNaN()) {
    return 0;
  }
  const indexNumber = new BigNumber(10).pow(decimals);
  return amount.dividedBy(indexNumber).toNumber();
};

const removeTrailingZeroes = ({ amountString }: { amountString: string }) => {
  let formattedString = amountString;
  const decimalSeparator = '.';
  while (
    formattedString.length > 0 &&
    ((formattedString.includes(decimalSeparator) &&
      formattedString[formattedString.length - 1] === '0') ||
      formattedString[formattedString.length - 1] === decimalSeparator)
  ) {
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
};

interface IMaxDigits {
  decimalDigits: boolean;
  clipAmount: boolean;
  decimals: number;
  humanAmount: number;
}

const getMaxDecimalDigits = (payload: IMaxDigits) => {
  const { decimals, decimalDigits, clipAmount, humanAmount } = payload;
  let maxDigits = decimals;
  try {
    if (clipAmount) {
      if (humanAmount > 0 && humanAmount < 1 && decimalDigits) {
        maxDigits = 5;
      }
      if (humanAmount > 1) {
        maxDigits = 4;
      }
      if (humanAmount > 1e3) {
        maxDigits = 2;
      }
      if (humanAmount > 1e5) {
        maxDigits = 0;
      }
    }
  } catch (error) {
    maxDigits = decimals;
    throw error;
  }
  return maxDigits;
};

interface IToFixed {
  number: number;
  decimals: number;
}

const toFixed = (payload: IToFixed) => {
  const decimalSeparator = '.';
  const { number, decimals } = payload;
  const bigNumber = new BigNumber(number);
  if (bigNumber.isNaN()) {
    return '0';
  }
  return removeTrailingZeroes({
    amountString: bigNumber.toFixed(decimals).replace('.', decimalSeparator),
  });
};

export const formatAmount = (payload: IAmount) => {
  const {
    originalAmount,
    humanAmount,
    decimals,
    clipAmount = true,
    decimalDigits = true,
    maxDigits = 2,
    isCeil = false,
  } = payload;
  const decimalSeparator = '.';
  const groupSeparator = ',';
  const fmt = {
    decimalSeparator,
    groupSeparator,
    groupSize: 3,
  };
  let formatedAmount;
  try {
    const convertHumanAmount =
      humanAmount ||
      toHumanAmount({
        originalAmount,
        decimals,
      });
    const _maxDigits = maxDigits
      ? maxDigits
      : getMaxDecimalDigits({
          clipAmount,
          decimalDigits,
          decimals,
          humanAmount: convertHumanAmount,
        });
    let fixedNumber = convertHumanAmount;
    if (decimals) {
      if (isCeil) {
        fixedNumber = ceil(convertHumanAmount, Math.min(decimals, _maxDigits));
      } else {
        fixedNumber = floor(convertHumanAmount, Math.min(decimals, _maxDigits));
      }
    } else {
      if (isCeil) {
        fixedNumber = ceil(convertHumanAmount, _maxDigits);
      } else {
        fixedNumber = floor(convertHumanAmount, _maxDigits);
      }
    }
    const fixedString = toFixed({
      number: fixedNumber,
      decimals,
    });
    const amountString = new BigNumber(fixedString).toFormat(
      _maxDigits,
      isCeil ? BigNumber.ROUND_CEIL : BigNumber.ROUND_DOWN,
      fmt,
    );
    formatedAmount = removeTrailingZeroes({
      amountString,
    });
  } catch (error) {
    formatedAmount = '0';
    throw error;
  }
  return formatedAmount;
};

const number = (num: number) => {
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
  };
  const rs = new BigNumber(num);
  return rs.isFinite() ? rs.toFormat(fmt) : num;
};

interface IShorterAmount {
  originalAmount: number | string;
  decimals: number;
}

const getDecimalsFromHumanAmount = (
  humanAmount: number,
  defaultDecimals: number,
) => {
  let decimals;
  if (humanAmount > 10) {
    decimals = 2;
  } else if (humanAmount > 1) {
    decimals = 3;
  } else if (humanAmount > 1e-4) {
    decimals = 4;
  } else if (humanAmount > 1e-5) {
    decimals = 5;
  } else {
    decimals = Math.max(defaultDecimals, 6);
  }
  return decimals;
};

const shorterAmount = ({
  originalAmount,
  decimals,
}: IShorterAmount): string => {
  try {
    const _amount = toHumanAmount({ originalAmount, decimals });
    const _decimals = getDecimalsFromHumanAmount(_amount, decimals);
    return _amount
      ? removeTrailingZeroes({
          amountString: new BigNumber(_amount).toFormat(
            _decimals,
            BigNumber.ROUND_DOWN,
          ),
        }).toString()
      : '0';
  } catch (e) {
    return '0';
  }
};

const formatter = {
  formatAmount,
  number,
  toFixed,
  shorterAmount,
};

export const dataFormater = (estimateData: IOrderBuyEstimateRespone) => {
  let result = {
    SetupCode: '0',
    OperationCost: '0',
    RollupCost: '0',
    TotalCost: '0',
  };
  if (!estimateData) {
    return result;
  } else {
    let setupCodeFomatted = `${formatter.formatAmount({
      originalAmount: Number(estimateData.SetupCode || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let operationCostFomatted = `${formatter.formatAmount({
      originalAmount: Number(estimateData.OperationCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let rollupCostFomatted = `${formatter.formatAmount({
      originalAmount: Number(estimateData.RollupCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    let totalCostFomatted = `${formatter.formatAmount({
      originalAmount: Number(estimateData.TotalCost || '0'),
      decimals: 18,
      maxDigits: 2,
      isCeil: true,
    })}`;

    result.SetupCode = setupCodeFomatted;
    result.OperationCost = operationCostFomatted;
    result.RollupCost = rollupCostFomatted;
    result.TotalCost = totalCostFomatted;
    return result;
  }
};

export default formatter;
