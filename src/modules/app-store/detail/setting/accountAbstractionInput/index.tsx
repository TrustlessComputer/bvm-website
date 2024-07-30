import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import { formatCurrencyV2 } from '@/utils/format';
import { Flex, Input, Text } from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

const MIN_FEE_RATE = 1 * 1e-9;
const MAX_FEE_RATE = 1 * 1e9;

export interface AccountAbstractionInputAreaProps {
  resultCallback: ({
    isInValid,
    inputs: [],
  }: {
    isInValid: boolean;
    inputs: any[];
  }) => void;
}

const AccountAbstractionInputArea = (
  props: AccountAbstractionInputAreaProps,
) => {
  const { resultCallback } = props;
  const { accountInforL2Service, isMyOrderListFetched } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | undefined>(
    undefined,
  );

  const { isAccountInforFetching, isMyOrderListFetching } = useAppSelector(
    getL2ServicesStateSelector,
  );

  const [tokenContractAddress, setTokenContractAddress] = useState<
    undefined | string
  >(undefined);
  const [tokenContractAddressErrorMsg, setTokenContractAddressErrorMsg] =
    useState<undefined | string>(undefined);

  const [feeRate, setFeeRate] = useState<undefined | string>(undefined);
  const [feeRateErrorMsg, setfeeRateErrorMsg] = useState<undefined | string>(
    undefined,
  );

  const isInValid = useMemo(() => {
    return (
      !tokenContractAddress ||
      !feeRate ||
      !!tokenContractAddressErrorMsg ||
      !!feeRateErrorMsg
    );
  }, [
    tokenContractAddress,
    feeRate,
    tokenContractAddressErrorMsg,
    feeRateErrorMsg,
  ]);

  useEffect(() => {
    resultCallback &&
      resultCallback({
        isInValid,
        inputs: [
          {
            key: 'aaPaymasterTokenID',
            value: tokenContractAddress,
          },
          {
            key: 'aaTokenGas',
            value: new BigNumber(feeRate || 1).multipliedBy(1e18).toFixed(),
          },
        ],
      });
  }, [isInValid, tokenContractAddress, feeRate]);

  const checkTokenContractAddress = (text: string | undefined) => {
    if (!text || text.length < 1) {
      setTokenContractAddressErrorMsg('Token contract address is required!');
    } else if (!isAddress(text)) {
      setTokenContractAddressErrorMsg('Address is invalid!');
    } else {
      setTokenContractAddressErrorMsg(undefined);
    }
  };

  const checkFeeRate = (text: string | undefined) => {
    if (!text || text.length < 1) {
      setfeeRateErrorMsg('Number of Tokens per Gas is required!');
    } else if (new BigNumber(text).lt(MIN_FEE_RATE)) {
      setfeeRateErrorMsg(
        `Value is must be greater than or equal ${formatCurrencyV2({
          amount: MIN_FEE_RATE,
          decimals: 9,
        })}`,
      );
    } else if (new BigNumber(text).gt(MAX_FEE_RATE)) {
      setfeeRateErrorMsg(
        `Value is must be lesser than or equal ${formatCurrencyV2({
          amount: MAX_FEE_RATE,
          decimals: 0,
        })}`,
      );
    } else {
      setfeeRateErrorMsg(undefined);
    }
  };

  const renderTokenContractAddress = () => {
    return (
      <Flex
        flexDir={'column'}
        align={'flex-start'}
        alignSelf={'stretch'}
        gap={['6px']}
        color={'#000'}
      >
        <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
          {'Token contract address'}
        </Text>
        <Text
          fontSize={['13px', '14px', '16px']}
          fontWeight={400}
          color={'#334344'}
          opacity={0.7}
        >
          {'The token that users can use to pay for gas fees.'}
        </Text>
        <Input
          value={tokenContractAddress}
          border="1px solid #CECECE"
          placeholder="Example: 0xabc...xzy"
          _placeholder={{
            color: 'grey',
          }}
          type="text"
          _hover={{}}
          height={'48px'}
          p={'11px'}
          fontSize={['14px', '15px', '16px']}
          // value={yourXAcc}
          onChange={(e: any) => {
            const text = e.target.value;
            setTokenContractAddress(text);
            checkTokenContractAddress(text);
          }}
        />
        {tokenContractAddressErrorMsg && (
          <Text fontSize={['14px', '15px', '16px']} color={'#FA4E0E'}>
            {tokenContractAddressErrorMsg}
          </Text>
        )}
      </Flex>
    );
  };

  const renderFeeRate = () => {
    return (
      <Flex
        flexDir={'column'}
        align={'flex-start'}
        alignSelf={'stretch'}
        gap={['6px']}
        color={'#000'}
      >
        <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
          {'Number of Tokens per Gas'}
        </Text>
        <Text
          fontSize={['13px', '14px', '16px']}
          fontWeight={400}
          color={'#334344'}
          opacity={0.7}
        >
          {
            'For example, if you input 0.05 tokens per gas, a regular transfer transaction (21,000 gas) would require 1.05 tokens.'
          }
        </Text>
        <Input
          value={feeRate}
          border="1px solid #CECECE"
          placeholder="Example: 0.05"
          type="number"
          height={'48px'}
          p={'11px'}
          fontSize={['14px', '15px', '16px']}
          _hover={{}}
          _placeholder={{
            color: 'grey',
          }}
          onChange={(e: any) => {
            const text = e.target.value;
            setFeeRate(text);
            checkFeeRate(text);
          }}
        />
        {feeRateErrorMsg && (
          <Text fontSize={['14px', '15px', '16px']} color={'#FA4E0E'}>
            {feeRateErrorMsg}
          </Text>
        )}
      </Flex>
    );
  };

  return (
    <Flex direction={'column'} gap={'28px'}>
      {renderTokenContractAddress()}
      {renderFeeRate()}
    </Flex>
  );
};

export default AccountAbstractionInputArea;
