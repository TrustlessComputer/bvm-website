import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import s from './styles.module.scss';
import ModalLoading from '@/components/ModalLoading';
import { formatAddressCenter } from '@/utils/string';

interface IProps {
  viewPaymentOnClick: () => void;
}

const AccountInfor = (props: IProps) => {
  const { viewPaymentOnClick } = props;
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const { logout } = useWeb3Auth();
  const router = useRouter();

  const {
    isOpen: isOpenLoadingModal,
    onOpen: onOpenLoadingModal,
    onToggle: onToggleLoadingModal,
    onClose: onCloseLoadingModal,
  } = useDisclosure({
    id: 'LOADING_MODAL',
  });

  const logoutHandler = async () => {
    try {
      onOpenLoadingModal();
      logout && (await logout());
      setTimeout(() => {
        onCloseLoadingModal();
        router.push('/');
      }, 1000);
    } catch (error) {
      throw error;
    }
  };

  const renderDisconnectWallet = () => {
    return (
      <Flex
        p={'12px'}
        gap={'16px'}
        borderRadius={'12px'}
        flexDir={'row'}
        align={'center'}
        bgColor={'#fff'}
        _hover={{
          cursor: 'pointer',
        }}
        onClick={logoutHandler}
      >
        <Image
          src={`/icons/disconnect_ic.svg`}
          fit={'contain'}
          maxW={'20px'}
          maxH={'20px'}
        />
        <Text
          fontSize={'14px'}
          fontWeight={500}
          color={'#FF7F7F'}
          textTransform={'uppercase'}
        >
          Disconnect wallet
        </Text>
      </Flex>
    );
  };

  return (
    <Flex
      flex={1}
      flexDir={'row'}
      p="24px"
      borderRadius={'18px'}
      gap={'40px'}
      align={'flex-start'}
      justify={'space-between'}
      bgColor={'#fff'}
    >
      {/* LeftView */}
      <Flex flexDir={'column'} gap="12px">
        <Flex flexDir={'row'} align={'center'} gap="20px">
          <Flex
            flexDir={'row'}
            gap="6px"
            px="12px"
            py={'6px'}
            borderRadius={'8px'}
            bgColor={'#FAFAFA'}
            onClick={() => {
              if (
                accountInforL2Service &&
                accountInforL2Service?.topUpWalletAddress
              ) {
                copy(accountInforL2Service?.topUpWalletAddress!);
                toast.success('Copied successully!');
              }
            }}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
          >
            <Text
              className={s.font3}
              fontWeight={400}
              fontSize={'14px'}
              lineHeight={'16px'}
              color={'#000000B2'}
            >
              {`${
                formatAddressCenter(
                  accountInforL2Service?.topUpWalletAddress || '',
                  8,
                ) || '--'
              }`}
            </Text>
            <Image
              src={`/icons/ic-copy-v2.svg`}
              fit={'contain'}
              maxW={'25px'}
              maxH={'25px'}
            />
          </Flex>

          <Popover>
            <PopoverTrigger>
              <Flex
                px={'12px'}
                py="8px"
                borderRadius={'8px'}
                bgColor={'#FAFAFA'}
                _hover={{
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                <Image src={`/icons/three_dots.svg`} />
              </Flex>
            </PopoverTrigger>
            <PopoverContent
              bg="#fff"
              maxWidth={'max-content'}
              borderColor={'#FF7F7F'}
              borderWidth={'1px'}
            >
              <PopoverArrow bgColor={'#FF7F7F'} />
              {renderDisconnectWallet()}
            </PopoverContent>
          </Popover>
        </Flex>

        <Flex flexDir={'row'} gap="12px">
          <Text
            className={s.font3}
            fontWeight={500}
            fontSize={'36px'}
            lineHeight={'50px'}
            color={'#000000'}
          >
            {`${accountInforL2Service?.balanceFormatted || 0} BVM`}
          </Text>
          <Text
            className={s.font3}
            fontWeight={300}
            fontSize={'36px'}
            lineHeight={'50px'}
            color={'#000000'}
            opacity={0.4}
          >
            {`$${accountInforL2Service?.balanceUSDFormatted || 0}`}
          </Text>
        </Flex>
      </Flex>

      {/* RightView */}
      <Flex flexDir={'row'} align={'center'} gap={'10px'}>
        {/* <Button
          bgColor={'#fff'}
          color={'#FA4E0E'}
          borderColor={'#FA4E0E'}
          borderWidth={'1px'}
          borderRadius={'100px'}
          h={'54px'}
          minW={'140px'}
          className={s.fontType3}
          fontSize={'16px'}
          fontWeight={500}
          onClick={() => {}}
          _hover={{
            opacity: 0.8,
          }}
        >
          Withdraw
        </Button> */}

        <Button
          bgColor={'#FA4E0E'}
          color={'#fff'}
          borderRadius={'100px'}
          h={'54px'}
          minW={'140px'}
          className={s.fontType3}
          fontSize={'16px'}
          fontWeight={500}
          onClick={viewPaymentOnClick}
          _hover={{
            opacity: 0.8,
          }}
        >
          Deposit
        </Button>
        {isOpenLoadingModal && (
          <ModalLoading
            show={isOpenLoadingModal}
            onClose={onCloseLoadingModal}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default AccountInfor;
