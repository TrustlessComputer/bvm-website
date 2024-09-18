import { MIN_DECIMAL } from '@/constants/constants';
import { formatCurrency } from '@/utils/format';
import { Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import cs from 'classnames';
import { isNaN } from 'lodash';
import React, { useMemo } from 'react';
import s from './styles.module.scss';

interface IProps {
  value: string;
  className?: string;
  style?: any;
  isSats?: boolean;
  hideSymbol?: boolean;
  decimals?: number;
  symbol?: string;
}

const TextNumberTooSmallDecimal: React.FC<IProps> = ({
  value,
  className,
  style,
  isSats,
  hideSymbol,
  decimals = 2,
  symbol,
}) => {
  const parts = useMemo(() => {
    if (
      !value ||
      isNaN(parseFloat(value)) ||
      (!isNaN(parseFloat(value)) && parseFloat(value) >= 1)
    ) {
      return (
        <Text
          className={cs(s.textContainer, className)}
          dangerouslySetInnerHTML={{
            __html: `${formatCurrency(value, MIN_DECIMAL, decimals)} ${symbol}`,
          }}
          style={style}
        ></Text>
      );
    }

    if (isSats) {
      const satAmount = new BigNumber(value).multipliedBy(1e8);
      if (new BigNumber(satAmount).isLessThan(1e4)) {
        return (
          <Text
            className={cs(s.textContainer, className)}
            dangerouslySetInnerHTML={{
              __html: `${formatCurrency(satAmount, 0, 2)}${
                hideSymbol ? '' : '<span style="opacity: 0.7"> sat</span>'
              }`,
            }}
            style={style}
          ></Text>
        );
      }
    }

    return (
      <Text
        className={cs(s.textContainer, className)}
        dangerouslySetInnerHTML={{
          __html: `${formatCurrency(value, MIN_DECIMAL, decimals)} ${symbol}`,
        }}
        style={style}
      ></Text>
    );
  }, [value, isSats, hideSymbol]);

  return parts;
};

export default TextNumberTooSmallDecimal;
