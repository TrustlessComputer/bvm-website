import { useAppSelector } from '@/stores/hooks';
import {
  getDappSelectedSelector,
  myOrderListSelector,
} from '@/stores/states/l2services/selector';
import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import { useMemo, useState } from 'react';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from 'bignumber.js';
import { formatCurrencyV2 } from '@/utils/format';

const MIN_FEE_RATE = 1 * 1e-9;
const MAX_FEE_RATE = 1 * 1e9;

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
}

export const AccountAbstractionDAppModal = (props: IProps) => {
  const { show, onClose } = props;

  const dappDetail = useAppSelector(getDappSelectedSelector);
  const chainsList = useAppSelector(myOrderListSelector);

  // Local State

  const [chainIndexSelected, setChainIndexSelected] = useState<number>(0);
  const [tokenContractAddress, setTokenContractAddress] = useState<
    undefined | string
  >(undefined);
  const [tokenContractAddressErrorMsg, setTokenContractAddressErrorMsg] =
    useState<undefined | string>(undefined);

  const [feeRate, setFeeRate] = useState<undefined | string>(undefined);
  const [feeRateFormat, setFeeRateFormat] = useState<undefined | string>(
    undefined,
  );

  const [feeRateErrorMsg, setfeeRateErrorMsg] = useState<undefined | string>(
    undefined,
  );

  const isEmptyChain = useMemo(() => {
    if (!chainsList || chainsList.length < 1) return true;
    return false;
  }, [chainsList]);

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

  const isDisableSubmitBtn = useMemo(() => {
    return !tokenContractAddress || !feeRate || !!isEmptyChain;
  }, [tokenContractAddress, feeRate, isEmptyChain]);

  const submitHandler = async () => {
    if (isEmptyChain) {
      //Lauch a Chain
      console.log('Lauch a chain TO DO');
    } else {
      //Install a DApp
      console.log('Install a DAPP TO DO');
    }
  };

  console.log('DATA ', {
    chainsList,
    chainIndexSelected,
    isEmptyChain,
    isDisableSubmitBtn,
  });

  const renderChainDropDown = () => {
    return (
      <Flex
        flexDir={'column'}
        align={'flex-start'}
        alignSelf={'stretch'}
        gap={['12px']}
        color={'#000'}
      >
        <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
          {'Install for chain'}
        </Text>
        <Select
          defaultValue={chainIndexSelected}
          placeholder={isEmptyChain ? 'Choose the chain' : ''}
          disabled={isEmptyChain}
          height={'50px'}
          borderRadius={'8px'}
          fontSize={['13px', '14px', '15px']}
          border={'0.5px solid #c2c2c2'}
          bgColor={`${isEmptyChain ? '#EFEFEF' : '#fff'}`}
          _hover={{}}
          onChange={(e) => {
            setChainIndexSelected(Number(e.target.value));
          }}
        >
          {chainsList.map((chain, index) => {
            return (
              <option key={chain.chainName + index} value={index}>
                {chain.chainName}
              </option>
            );
          })}
        </Select>
      </Flex>
    );
  };

  const renderTokenContractAddress = () => {
    if (isEmptyChain) return null;
    return (
      <Flex
        flexDir={'column'}
        align={'flex-start'}
        alignSelf={'stretch'}
        gap={['6px']}
        color={'#000'}
      >
        <Text fontSize={['16px', '18px', '20px']} fontWeight={600}>
          {'Token Contract Address'}
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
          placeholder="Ex: 0xabc...xzy"
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
    if (isEmptyChain) return null;
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
          value={'feeRate'}
          border="1px solid #CECECE"
          placeholder="Ex: 0.01"
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

  const renderDescriptionEmptyChain = () => {
    if (isEmptyChain)
      return (
        <Text
          fontSize={['15px', '16px', '18px']}
          fontWeight={400}
          textAlign={'center'}
          color="#1D1D1D"
        >
          There is no chain, please launch a chain before install Dapp
        </Text>
      );
    return null;
  };

  return (
    <Modal isOpen={show} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent className={s.modalContent}>
        <ModalBody>
          <Flex flexDir={'column'} gap={'28px'} my="28px" mx="0px">
            <Flex align="center" justify={'space-between'}>
              <Flex
                gap="10px"
                align="center"
                position={'absolute'}
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
                onClick={onClose}
              >
                <Image src={'/icons/back_orange_ic.svg'}></Image>
                <Text
                  color={'#FA4E0E'}
                  fontSize={['14px', '15px', '16px']}
                  fontWeight={400}
                >
                  Back
                </Text>
              </Flex>

              <Flex
                flex={1}
                flexDir={'row'}
                justify={'center'}
                align={'center'}
                gap="12px"
              >
                <Image
                  src={'/icons/add_dapp_default.svg'}
                  w={['35px', '40px', '48px']}
                  h={'auto'}
                  fit={'contain'}
                ></Image>
                <Text
                  fontSize={['18px', '22px', '28px']}
                  fontWeight={500}
                  color={'#000'}
                >
                  {`${'Account Abstraction' || '--'}`}
                </Text>
              </Flex>
            </Flex>
            <Flex bgColor={'#ECECEC'} h="1px"></Flex>

            {renderChainDropDown()}

            {renderTokenContractAddress()}

            {renderFeeRate()}

            {renderDescriptionEmptyChain()}

            <Flex bgColor={'#ECECEC'} h="1px"></Flex>

            <Button
              isDisabled={isDisableSubmitBtn}
              bgColor={'#FA4E0E'}
              color={'#fff'}
              borderRadius={'100px'}
              h={'auto'}
              minW={['80px', '120px', '160px', '200px']}
              maxH={['35px', '40px', '45px']}
              fontSize={['13px', '14px', '15px']}
              p="20px"
              fontWeight={600}
              alignSelf={'center'}
              onClick={submitHandler}
              _hover={{
                cursor: !isDisableSubmitBtn ? 'pointer' : '',
                opacity: !isDisableSubmitBtn ? 0.8 : '',
              }}
            >
              {`${isEmptyChain ? 'Lauch a chain' : 'Install'}`}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
