import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { formatCurrencyV2 } from '@/utils/format';
import { Flex, Text, Image, Input, Tooltip } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { useAccountAbstractionStore } from '../../store/hook';
import { IModelOption } from '@/types/customize-model';
// import Input from '../Input';
import s from './styles.module.scss';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';

const MIN_FEE_RATE = 0;
const MAX_FEE_RATE = 1 * 1e9;

// type Props = {
//   option: IModelOption;
// };

type Props = {
  option: any;
};

const FeeRateInput = (props: Props) => {
  const { option } = props;
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const { isCapture } = useCaptureStore();
  const { aaStatusData, aaInstalledData } = useAAModule();
  const { isUpdateFlow } = useChainProvider();
  const { statusCode } = aaStatusData;

  const {
    feeRate,
    isFeeRateFocused,
    feeRateErrMsg,
    setFeeRate,
    setFeeRateErrMsg,
    setFeeRateFocused,
  } = useAccountAbstractionStore();

  const needValidate = useMemo(() => {
    return isUpdateFlow && statusCode === 'need_config';
  }, [isUpdateFlow, statusCode]);

  const isError = useMemo(() => {
    return !!isFeeRateFocused && !!feeRateErrMsg;
  }, [isFeeRateFocused, feeRateErrMsg]);

  const checkFeeRate = (text: string | undefined) => {
    let errorMsg = undefined;

    // if (!text || text.length < 1) {
    //   errorMsg = 'Field is required!';
    //   setErrorCode(0);
    // } else

    if (text) {
      if (new BigNumber(text).lt(MIN_FEE_RATE)) {
        errorMsg = `Value is must be greater than or equal ${formatCurrencyV2({
          amount: MIN_FEE_RATE,
          decimals: 9,
        })}`;
      } else if (new BigNumber(text).gt(MAX_FEE_RATE)) {
        errorMsg = `Value is must be lesser than or equal ${formatCurrencyV2({
          amount: MAX_FEE_RATE,
          decimals: 0,
        })}`;
      } else {
        errorMsg = undefined;
      }
    }

    setFeeRateErrMsg(errorMsg);
  };

  const onChangeHandler = (text: string) => {
    setFeeRate(text);
    if (needValidate) {
      checkFeeRate(text);
    }
  };

  useEffect(() => {
    if (statusCode !== 'drafting_modules' && statusCode !== 'need_config') {
      setFeeRate(
        new BigNumber(aaInstalledData?.aaTokenGas || 0)
          .dividedBy(1e18)
          .toString() || '',
      );
    }
  }, [statusCode, aaInstalledData]);

  return (
    <Flex
      position={'relative'}
      align={'center'}
      gap={'10px'}
      minW={'max-content'}
    >
      {/* <Text
        as="span"
        color={'white'}
        minW={'max-content'}
        fontWeight={500}
        fontSize={['18px']}
      >
        {option?.title}
      </Text> */}

      <Tooltip
        hasArrow
        label={`For example, if you input 0.05 tokens per gas, a regular transfer transaction (21,000 gas) would require 1.05 tokens.`}
        bg={'#fff'}
        color={'#000'}
        p="5px"
      >
        <Image src={'/icons/white_tooltip_ic.svg'} w="20px" h="20px" />
      </Tooltip>
      <Flex flexDir={'column'} justify={'center'} gap={'4px'}>
        <Input
          className={s.input}
          mt={isError ? '10px' : '0px'}
          borderColor={isError ? 'red' : 'transparent'}
          borderWidth={isError ? '2px' : 'none'}
          type="number"
          placeholder="0 (gasless)"
          value={feeRate}
          onChange={(e) => {
            const text = e.target.value;
            setFeeRateFocused(true);
            onChangeHandler(text);
          }}
          onBlur={(e: any) => {
            const text = e.target.value;
            setFeeRateFocused(true);
            checkFeeRate(text);
          }}
          _focus={{
            borderColor: isError ? '#ff6666ff' : 'transparent',
          }}
        />
        {isError && (
          <Text
            px={'5px'}
            bgColor={'#FF4747'}
            borderRadius={'4px'}
            maxW={'max-content'}
            className={s.fontError}
            position={'relative'}
            color={'#fff'}
            fontWeight={500}
            fontSize={['13px']}
          >
            {feeRateErrMsg}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default FeeRateInput;
