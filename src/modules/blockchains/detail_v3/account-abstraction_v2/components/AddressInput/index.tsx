import { useMemo, useState } from 'react';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { Flex, Input, Text, Image, Tooltip } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { useAccountAbstractionStore } from '../../store/hook';

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
