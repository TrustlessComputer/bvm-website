import BaseModal from '@/components/BaseModal';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';

interface TopUpInfor {
  paymentAddress?: string;
}

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
  payWithNakaWalletCB?: () => void;
  infor: TopUpInfor;
  warningMessage?: string;
}

const TopupModal = (props: IProps) => {
  const {
    show,
    onClose,
    infor,
    onSuccess,
    warningMessage,
    payWithNakaWalletCB,
  } = props;
  if (!infor || !infor.paymentAddress) return <></>;

  const { paymentAddress } = infor;

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
        {warningMessage && (
          <Text
            fontSize={'15px'}
            fontWeight={500}
            color={'#e6922c'}
            textAlign={'center'}
            mb={'10px'}
          >
            {warningMessage}
          </Text>
        )}

        <Text
          fontSize={'15px'}
          fontWeight={400}
          color={'#6C6F93'}
          textAlign={'center'}
        >
          Please sent
          <Text as="span" fontWeight={700} color={'#000'} textAlign={'center'}>
            {` BVM `}
          </Text>
          to the following wallet address
        </Text>

        {/* Adderss Bar */}
        <Flex
          mt={'20px'}
          flexDir={'row'}
          py="10px"
          px={'20px'}
          bgColor={'#fff'}
          color={'#000'}
          borderRadius={'12px'}
          gap="10px"
          width={'max-content'}
          alignSelf={'center'}
          onClick={() => {
            console.log('TO DO ');
          }}
        >
          <Text fontSize={'15px'} fontWeight={600} textAlign={'center'}>
            {paymentAddress}
          </Text>
          <Image
            src={'/blockchains/customize/ic-copy-green.svg'}
            w={'20px'}
            h={'auto'}
            objectFit={'contain'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              copy(paymentAddress);
              toast.success('Copied successully!');
            }}
          />
        </Flex>

        {/* QRCode Generator */}
        <Flex
          mt={'20px'}
          flexDir={'column'}
          p="20px"
          borderRadius={'12px'}
          bgColor={'#fff'}
          width={'max-content'}
          color={'#000'}
          gap="10px"
          alignSelf={'center'}
        >
          <QRCode size={184} value={paymentAddress} />
        </Flex>

        <Text
          mt={'20px'}
          fontSize={'15px'}
          fontWeight={400}
          color={'#6C6F93'}
          textAlign={'center'}
        >
          Network
        </Text>
        <Text
          fontSize={'15px'}
          fontWeight={600}
          color={'#000'}
          textAlign={'center'}
        >
          Naka Chain
        </Text>

        <Flex
          mt={'20px'}
          width={'45%'}
          bgColor={'#B6B6B6'}
          height={'1px'}
          alignSelf={'center'}
        ></Flex>

        <Text
          mt={'20px'}
          fontSize={'15px'}
          fontWeight={500}
          color={'#6C6F93'}
          textAlign={'center'}
        >
          Or with faster method
        </Text>

        <Button
          mt={'20px'}
          bgColor={'#130E67'}
          color={'#fff'}
          borderRadius={'30px'}
          h="45px"
          minW={'280px'}
          py="10px"
          px="20px"
          w={'max-content'}
          alignSelf={'center'}
          _hover={{
            opacity: 0.8,
          }}
          onClick={payWithNakaWalletCB}
        >
          Pay with Naka wallet
        </Button>
      </Flex>
    </BaseModal>
  );
};

export default TopupModal;
