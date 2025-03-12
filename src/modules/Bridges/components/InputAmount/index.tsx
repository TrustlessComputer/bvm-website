import { Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { formatCurrency } from '@utils/format';
import { MIN_DECIMAL } from '@constants/constants';
import { IFormValues } from '@/modules/Bridges/types';
import { useFormikContext } from 'formik';
import React from 'react';

const InputAmount = () => {
  const { values, touched, errors, setFieldValue } = useFormikContext();

  const { fromAmount, balance, fromToken } = values as IFormValues;

  return (
    <Flex className={s.inputForm} direction={'column'}>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <Text fontSize={'14px'} fontWeight={'400'} color={'#657786'}>
          You sent
        </Text>
        <Text
          textAlign={'right'}
          fontSize={'14px'}
          fontWeight={'400'}
          color={'#657786'}
        >
          Balance:{' '}
          <Text as={'span'} fontWeight={'500'} color={'#000'}>
            <Text as={'span'} fontWeight={'500'} color={'#000'}>
              {balance
                ? formatCurrency(balance || '0', MIN_DECIMAL, 4, 'EAI', true)
                : '0'}{' '}
              {fromToken?.symbol}
            </Text>
          </Text>
        </Text>
      </Flex>
      <input
        placeholder={`0.0 ${fromToken?.symbol}`}
        type={'number'}
        value={fromAmount as unknown as string}
        onChange={(e) => {
          setFieldValue('fromAmount', e.target.value);
        }}
      />
      {(touched as IFormValues)?.fromAmount &&
        !!(errors as IFormValues)?.fromAmount && (
          <Text fontSize={'12px'} fontWeight={'400'} color={'red'}>
            {(errors as IFormValues)?.fromAmount}
          </Text>
        )}
    </Flex>
  );
};

export default InputAmount;
