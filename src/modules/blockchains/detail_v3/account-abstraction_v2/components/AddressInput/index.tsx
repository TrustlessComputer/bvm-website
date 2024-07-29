import { useMemo, useState } from 'react';
import { useAccountAbstractionStore } from '../../store/useAccountAbstractionStore';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import s from './styles.module.scss';
import { Flex, Input, Text } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';

type Props = {
  option: IModelOption;
};

const AddressInput = (props: Props) => {
  const { option } = props;
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const { isCapture } = useCaptureStore();
  const {
    setTokenContractAddress,
    tokenContractAddress,
    feeRate,
    isTokenContractAddressFocused,
    tokenContractAddressErrMsg,
    setTokenContractFocused,
    setTokenContractAddressErrMsg,
  } = useAccountAbstractionStore();

  const isError = useMemo(() => {
    return !!isTokenContractAddressFocused && !!tokenContractAddressErrMsg;
  }, [isTokenContractAddressFocused, tokenContractAddressErrMsg]);

  const checkTokenContractAddress = (text: string | undefined) => {
    let errorMsg = undefined;
    if (!text || text.length < 1) {
      errorMsg = 'Address is required!';
    } else if (!isAddress(text)) {
      errorMsg = 'Address is invalid!';
    } else {
      errorMsg = undefined;
    }
    setTokenContractAddressErrMsg(errorMsg);
  };

  const onChangeHandler = (text: string) => {
    setTokenContractAddress(text);
    checkTokenContractAddress(text);
  };

  return (
    <Flex align={'center'} gap={'10px'} py={'4px'} px={'8px'}>
      <Text
        as="span"
        color={'#fff'}
        minW={'max-content'}
        fontWeight={500}
        fontSize={['18px']}
      >
        {option?.title}
      </Text>

      <Input
        fontWeight={500}
        fontSize={['18px']}
        borderRadius={'18px'}
        bgColor={'#fff'}
        color={'#000'}
        _placeholder={{
          color: 'grey',
        }}
        type="text"
        placeholder="Example: 0xabc...xzy"
        value={tokenContractAddress}
        onBlur={(e: any) => {
          const text = e.target.value;
          setTokenContractFocused(true);
          checkTokenContractAddress(text);
        }}
        onChange={(e) => {
          const text = e.target.value;
          onChangeHandler(text);
          setTokenContractFocused(true);
        }}
      />
      {isError && (
        <Text
          position={'absolute'}
          right={'-165px'}
          color={'red'}
          minW={'max-content'}
          fontWeight={500}
          fontSize={['15px']}
        >
          {tokenContractAddressErrMsg}
        </Text>
      )}
    </Flex>
  );
};

export default AddressInput;
