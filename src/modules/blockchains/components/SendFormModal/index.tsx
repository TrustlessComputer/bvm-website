import BaseModal from '@/components/BaseModal';
import { Flex, Input, Text, Button, Skeleton } from '@chakra-ui/react';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import CContract from '@/contract/contract';
import { BVM_TOKEN_ADDRESS } from '@/contract/proposal/configs';
import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { parseEther } from 'ethers/lib/utils';
import { NakaConnectContext } from '@/Providers/NakaConnectProvider';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import formatter from '@/modules/price/Pricing.helper';
import { ArrowDownIcon } from '@chakra-ui/icons';

const INTERVAL_TIMER = 6000; // only Layer 2!

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
}

const SendFormModal = (props: IProps) => {
  const { show, onClose, onSuccess } = props;

  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const { nakaAddress } = useNakaAuthen();
  const { getConnector } = useContext(NakaConnectContext);

  const timerRef = useRef<any>();

  const [balanceNakaWallet, setBalanceNakaWallet] = useState<string>('0');
  const [balanceNakaWalletFetched, setBalanceNakaWalletFetched] =
    useState<boolean>(false);

  const [amountInput, setAmountInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [isValid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const contract = useRef(new CContract()).current;

  const connector = useMemo(() => getConnector(), []);

  const contractBVM = useMemo(() => {
    return contract.getERC20Contract({
      contractAddress: BVM_TOKEN_ADDRESS,
    });
  }, [contract]);

  const getBalance = async () => {
    const balance = (await contractBVM.balanceOf(nakaAddress)).toString();
    const balanceFormmated = formatter.formatAmount({
      originalAmount: Number(balance),
      decimals: 18,
      maxDigits: 2,
      isCeil: false,
    });

    setBalanceNakaWallet(balanceFormmated);
    setBalanceNakaWalletFetched(true);
  };

  const amountOnChangeHandler = (text: string) => {
    let isValid = true;
    let errorMgs = undefined;

    if (!text || text.length < 1) errorMgs = 'Amount is invalid';
    else {
      // amount input > wallet's balance
      const isGreaterBlance = new BigNumber(text).gte(balanceNakaWallet);

      // amount input <=0
      const isLessThanZero = new BigNumber(text).lte(0);

      if (isLessThanZero) {
        errorMgs = `Must be larger than 0`;
      } else if (isGreaterBlance) {
        errorMgs = `Insufficient balance. Must be less than ${balanceNakaWallet}`;
      }
    }

    if (errorMgs) isValid = false;

    setAmountInput(text);
    setErrorMessage(errorMgs);
    setValid(isValid);
  };

  const transferHandler = async () => {
    if (
      !accountInforL2Service ||
      !accountInforL2Service.topUpWalletAddress ||
      !amountInput
    )
      return;

    const toAddress = accountInforL2Service.topUpWalletAddress;

    try {
      setLoading(true);

      const contractInsance = contract.getERC20Contract({
        contractAddress: BVM_TOKEN_ADDRESS,
      });

      const calldata = contractInsance.interface.encodeFunctionData(
        'transfer',
        [toAddress, parseEther(amountInput)],
      );

      const result = await connector.requestSign({
        calldata,
        target: 'popup',
        to: BVM_TOKEN_ADDRESS || '',
        functionType: 'transfer',
        chainType: 'NAKA',
      });

      // console.log('transferHandler RESULT: ', result);

      if (result && result.hash) {
        toast.success('Successfully.');
      }
    } catch (error) {
      // console.log('transferHandler ERROR: ', error);
      const { message } = getError(error);
      toast.error(message);
    } finally {
      console.log('transferHandler FINALLY: ');
      setLoading(false);
    }
  };

  const clearTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  useEffect(() => {
    getBalance();
    timerRef.current = setInterval(() => {
      getBalance();
    }, INTERVAL_TIMER);
    return () => {
      clearTimer();
    };
  }, [nakaAddress]);

  if (!accountInforL2Service) return <></>;

  const { topUpWalletAddress, balanceFormatted } = accountInforL2Service;

  if (!topUpWalletAddress) return <p>Top up Wallet Address invalid!</p>;

  const renderAmountField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'center'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex
          flexDir={'row'}
          w={'100%'}
          align={'center'}
          justify={'space-between'}
        >
          <Text
            fontSize={'13px'}
            fontWeight={500}
            lineHeight={'20px'}
            color={'#6C6F93'}
          >
            {'Your Naka Wallet'}
          </Text>
          <Skeleton isLoaded={balanceNakaWalletFetched}>
            <Text
              fontSize={'13px'}
              fontWeight={600}
              lineHeight={'20px'}
              color={'#000'}
            >
              {`Balance: ${balanceNakaWallet} BVM`}
            </Text>
          </Skeleton>
        </Flex>

        <Input
          border="1px solid #000000"
          placeholder="0.0 BVM"
          _placeholder={{
            color: '#6C6F93',
            fontSize: 13,
          }}
          _hover={{}}
          height={'48px'}
          p={'11px'}
          color={'#000'}
          value={`${amountInput}`}
          type="number"
          onChange={(e: any) => {
            amountOnChangeHandler(e.target.value);
          }}
        />

        {errorMessage && (
          <Text
            alignSelf={'flex-start'}
            fontSize={'13px'}
            fontWeight={500}
            color={'#f33b3b'}
          >{`${errorMessage || ''}`}</Text>
        )}
      </Flex>
    );
  };

  const renderReceivingAddressField = () => {
    return (
      <Flex
        direction={'column'}
        display={'flex'}
        alignItems={'center'}
        w={'100%'}
        gap={'8px'}
      >
        <Flex
          flexDir={'row'}
          w={'100%'}
          align={'center'}
          justify={'space-between'}
        >
          <Text
            fontSize={'13px'}
            fontWeight={500}
            lineHeight={'20px'}
            alignSelf={'flex-start'}
            color={'#6C6F93'}
          >
            {`The Operational Wallet`}
          </Text>

          <Text
            fontSize={'13px'}
            fontWeight={600}
            lineHeight={'20px'}
            color={'#000'}
          >
            {`Balance: ${balanceFormatted} BVM`}
          </Text>
        </Flex>
        <Input
          border="1px solid #CECECE"
          placeholder=""
          _placeholder={{
            color: 'grey',
          }}
          _disabled={{
            border: '1px solid #000',
          }}
          isDisabled={true}
          _hover={{}}
          height={'48px'}
          p={'11px'}
          color={'#000'}
          value={`${topUpWalletAddress}`}
          onChange={(e: any) => {}}
        />
      </Flex>
    );
  };

  const renderSubmitButton = () => {
    return (
      <Flex direction={'column'} display={'flex'} w={'100%'} mt={'20px'}>
        <Button
          px={'30px'}
          borderRadius={'14px'}
          minH={'50px'}
          minW={'160px'}
          bgColor={'#17066C'}
          color={'#fff'}
          _hover={{
            opacity: 0.8,
          }}
          _disabled={{
            opacity: 0.5,
          }}
          isDisabled={!isValid || !balanceNakaWalletFetched}
          isLoading={loading}
          fontSize={'16px'}
          onClick={transferHandler}
        >
          {'Transfer'}
        </Button>
      </Flex>
    );
  };

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        mt={'20px'}
        display={'flex'}
        flexDir={'column'}
        w={'100%'}
        bgColor={'#ECECEC'}
        borderRadius={'10px'}
        p={'20px'}
      >
        <Text
          fontSize={'20px'}
          fontWeight={600}
          color={'#000'}
          lineHeight={'20px'}
          alignSelf={'flex-start'}
        >
          {`Top Up Your Account`}
        </Text>

        <Text
          fontSize={'14px'}
          fontWeight={500}
          color={'#6C6F93'}
          lineHeight={'16px'}
          alignSelf={'flex-start'}
          mt={'10px'}
          mb={'20px'}
        >
          {`Please send BVM to the operational wallet listed below to cover the costs associated with running your Bitcoin L2.`}
        </Text>

        {renderAmountField()}
        <ArrowDownIcon
          w={'30px'}
          h={'30px'}
          my={'20px'}
          color="#000"
          alignSelf={'center'}
        ></ArrowDownIcon>
        {renderReceivingAddressField()}
        {renderSubmitButton()}
      </Flex>
    </BaseModal>
  );
};

export default SendFormModal;
