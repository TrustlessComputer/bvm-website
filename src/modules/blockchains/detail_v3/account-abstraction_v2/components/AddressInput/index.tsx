import { useEffect, useMemo, useState } from 'react';
import { useCaptureStore } from '@/modules/blockchains/Buy/stores/index_v3';
import { Flex, Text, Image, Tooltip, Input } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { useAccountAbstractionStore } from '../../store/hook';
import { IModelOption } from '@/types/customize-model';
import s from './styles.module.scss';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';

type Props = {
  option: any;
};

const AddressInput = (props: Props) => {
  const { option } = props;
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const { isCapture } = useCaptureStore();
  const { isUpdateFlow, getAAStatus } = useChainProvider();
  const { statusCode } = getAAStatus();

  const {
    setTokenContractAddress,
    tokenContractAddress,
    isTokenContractAddressFocused,
    tokenContractAddressErrMsg,
    setTokenContractFocused,
    checkTokenContractAddress,
  } = useAccountAbstractionStore();

  const needValidate = useMemo(() => {
    return isUpdateFlow && statusCode === 'need_config';
  }, [isUpdateFlow, statusCode]);

  const isError = useMemo(() => {
    return !!isTokenContractAddressFocused && !!tokenContractAddressErrMsg;
  }, [isTokenContractAddressFocused, tokenContractAddressErrMsg]);

  const onChangeHandler = (text: string) => {
    setTokenContractAddress(text);
    if (needValidate) {
      checkTokenContractAddress();
    }
  };

  // useEffect(() => {
  //   if (needValidate) {
  //     checkTokenContractAddress();
  //   }
  // }, [tokenContractAddress, needValidate]);

  return (
    <Flex flexDir={'row'} align={'center'} gap={'10px'}>
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

      <Flex flexDir={'column'} justify={'center'} gap={'4px'}>
        <Input
          className={s.input}
          mt={isError ? '10px' : '0px'}
          type="text"
          placeholder="Example: 0xabc...xzy"
          fontSize={'14px'}
          value={tokenContractAddress}
          borderColor={isError ? 'red' : 'transparent'}
          borderWidth={isError ? '2px' : 'none'}
          onBlur={(e: any) => {
            const text = e.target.value;
            setTokenContractFocused(true);
            onChangeHandler(text);
          }}
          onChange={(e) => {
            const text = e.target.value;
            setTokenContractFocused(true);
            onChangeHandler(text);
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
            {tokenContractAddressErrMsg}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default AddressInput;
