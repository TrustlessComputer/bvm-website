import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { formatCurrencyV2 } from '@/utils/format';
import { Flex, Input, Text, Image, Tooltip } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useAccountAbstractionStore } from '../../store/hook';

const MIN_FEE_RATE = 1 * 1e-9;
const MAX_FEE_RATE = 1 * 1e9;

type Props = {
  option: IModelOption;
};

const FeeRateInput = (props: Props) => {
  const { option } = props;
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const { isCapture } = useCaptureStore();

  const [errorCode, setErrorCode] = useState(0);

  const {
    feeRate,
    isFeeRateFocused,
    feeRateErrMsg,
    setFeeRate,
    setFeeRateErrMsg,
    setFeeRateFocused,
  } = useAccountAbstractionStore();

  const isError = useMemo(() => {
    return !!isFeeRateFocused && !!feeRateErrMsg;
  }, [isFeeRateFocused, feeRateErrMsg]);

  const checkFeeRate = (text: string | undefined) => {
    let errorMsg = undefined;

    if (!text || text.length < 1) {
      errorMsg = 'Field is required!';
      setErrorCode(0);
    } else if (new BigNumber(text).lt(MIN_FEE_RATE)) {
      errorMsg = `Value is must be greater than or equal ${formatCurrencyV2({
        amount: MIN_FEE_RATE,
        decimals: 9,
      })}`;
      setErrorCode(1);
    } else if (new BigNumber(text).gt(MAX_FEE_RATE)) {
      errorMsg = `Value is must be lesser than or equal ${formatCurrencyV2({
        amount: MAX_FEE_RATE,
        decimals: 0,
      })}`;
      setErrorCode(1);
    } else {
      setErrorCode(0);
      errorMsg = undefined;
    }
    setFeeRateErrMsg(errorMsg);
  };

  const onChangeHandler = (text: string) => {
    setFeeRate(text);
    checkFeeRate(text);
  };

  return (
    <Flex
      position={'relative'}
      align={'center'}
      gap={'10px'}
      py={'4px'}
      px={'8px'}
      minW={'max-content'}
    >
      <Text
        as="span"
        color={'white'}
        minW={'max-content'}
        fontWeight={500}
        fontSize={['18px']}
      >
        {option?.title}
      </Text>

      <Tooltip
        hasArrow
        label={`${option.tooltip || ''}`}
        bg={'#fff'}
        color={'#000'}
        p="5px"
      >
        <Image src={'/icons/white_tooltip_ic.svg'} w="20px" h="20px" />
      </Tooltip>

      <Input
        fontWeight={500}
        fontSize={['18px']}
        borderRadius={'18px'}
        bgColor={'#fff'}
        color={'#000'}
        _placeholder={{
          color: '#ababab',
        }}
        type="number"
        placeholder="Example: 0.05"
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
      />
      {isError && (
        <Text
          position={'absolute'}
          right={errorCode === 1 ? '-235px' : '-165px'}
          maxWidth={'200px'}
          flexWrap={'wrap'}
          color={'red'}
          fontWeight={500}
          fontSize={['15px']}
        >
          {feeRateErrMsg}
        </Text>
      )}
    </Flex>
  );
};

export default FeeRateInput;
