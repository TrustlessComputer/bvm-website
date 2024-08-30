import { useEffect, useMemo } from 'react';
import { Flex, Image, Input, Text, Tooltip } from '@chakra-ui/react';
import { useAccountAbstractionStore } from '../../store/hook';
import s from './styles.module.scss';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import useRfLocalStorageHelper from '@/modules/blockchains/Buy/hooks/useRfLocalStorageHelper';

type Props = {
  option: any;
};

const AddressInput = (props: Props) => {
  const { option } = props;
  // const { setChainName } = useOrderFormStore();
  // const { value, errorMessage } = computerNameField;

  const { isExitAANodeInLocal } = useRfLocalStorageHelper();
  const { isUpdateFlow } = useChainProvider();
  const { aaStatusData, aaInstalledData, isCanNotEdit } = useAAModule();
  const { statusCode } = aaStatusData;

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

  useEffect(() => {
    if (statusCode !== 'drafting_modules' && statusCode !== 'need_config') {
      setTokenContractAddress(aaInstalledData?.aaPaymasterTokenID || '');
    }
  }, [statusCode, aaInstalledData]);

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
        <Flex flexDir={'row'} align={'center'} gap={'4px'}>
          <Input
            className={s.input}
            mt={isError ? '10px' : '0px'}
            type="text"
            placeholder="Example: 0xabc...xzy"
            fontSize={'14px'}
            value={tokenContractAddress}
            borderColor={isError ? 'red' : 'transparent'}
            borderWidth={isError ? '2px' : 'none'}
            disabled={isCanNotEdit}
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
            _disabled={{
              color: '#fff',
            }}
          />
          {isCanNotEdit && (
            <Image
              src={'/icons/ic-copy.svg'}
              w={['16px', '18px', '20px']}
              h={'auto'}
              objectFit={'contain'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() => {
                if (tokenContractAddress) {
                  copy(tokenContractAddress);
                  toast.success('Copied successully!');
                }
              }}
            />
          )}
        </Flex>

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
