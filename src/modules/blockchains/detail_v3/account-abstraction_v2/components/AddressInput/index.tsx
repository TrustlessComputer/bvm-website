import { useMemo, useState } from 'react';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { Flex, Text, Image, Tooltip } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { useAccountAbstractionStore } from '../../store/hook';
import { IModelOption } from '@/types/customize-model';
import Input from '../Input';
import s from './styles.module.scss';

// type Props = {
//   option: IModelOption;
// };

type Props = {
  option: any;
  needValidate?: boolean;
};

const AddressInput = (props: Props) => {
  const { option, needValidate = false } = props;
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
    if (needValidate) {
      if (!text || text.length < 1) {
        errorMsg = 'Address is required!';
      } else if (!isAddress(text)) {
        errorMsg = 'Address is invalid!';
      } else {
        errorMsg = undefined;
      }
    }
    setTokenContractAddressErrMsg(errorMsg);
  };

  const onChangeHandler = (text: string) => {
    setTokenContractAddress(text);
    checkTokenContractAddress(text);
  };

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      gap={'10px'}
      py={'4px'}
      px={'8px'}
    >
      {/* <Text
        as="span"
        color={'#fff'}
        minW={'max-content'}
        fontWeight={500}
        fontSize={['18px']}
      >
        {option?.title}
      </Text> */}

      <Tooltip
        hasArrow
        label={`The token that users can use to pay for gas fees.`}
        bg={'#fff'}
        color={'#000'}
        p="5px"
      >
        <Image src={'/icons/white_tooltip_ic.svg'} w="20px" h="20px" />
      </Tooltip>

      <Flex flexDir={'column'} padding="5px" bgColor={'#fff'}>
        <Input
          className={s.input}
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
            position={'relative'}
            color={'red'}
            minW={'max-content'}
            fontWeight={500}
            fontSize={['14px']}
          >
            {tokenContractAddressErrMsg}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default AddressInput;
