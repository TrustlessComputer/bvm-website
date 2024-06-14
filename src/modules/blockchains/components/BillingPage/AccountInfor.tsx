import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Flex, Text, Image, Button } from '@chakra-ui/react';
import s from './styles.module.scss';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';

interface IProps {
  viewPaymentOnClick: () => void;
}

const AccountInfor = (props: IProps) => {
  const { viewPaymentOnClick } = props;
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
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
        <Flex
          flexDir={'row'}
          gap="12px"
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
            {`${accountInforL2Service?.topUpWalletAddress || '--'}`}
          </Text>
          <Image
            src={`/icons/ic-copy-v2.svg`}
            fit={'cover'}
            maxW={'15px'}
            maxH={'15px'}
          />
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
      </Flex>
    </Flex>
  );
};

export default AccountInfor;
