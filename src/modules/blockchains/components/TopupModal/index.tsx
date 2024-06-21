import BaseModal from '@/components/BaseModal';
import { Flex, Image, Text, Button } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';

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
  order?: OrderItem;
}

const TopupModal = (props: IProps) => {
  const {
    show,
    onClose,
    infor,
    onSuccess,
    warningMessage,
    payWithNakaWalletCB,
    order,
  } = props;
  if (!infor || !infor.paymentAddress) return <></>;

  const { paymentAddress } = infor;

  const renderFasterMethod = () => {
    return (
      <Flex
        mt={'20px'}
        width={'45%'}
        bgColor={'#B6B6B6'}
        height={'1px'}
        alignSelf={'center'}
      >
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
    );
  };

  const renderMessageDetault = () => {
    return (
      <Flex flexDir={'column'}>
        <Text
          fontSize={'15px'}
          fontWeight={400}
          color={'#31323d'}
          textAlign={'center'}
        >
          Please send
          <Text as="span" fontWeight={700} color={'#000'} textAlign={'center'}>
            {` BVM `}
          </Text>
          {`to the following wallet address below.`}
        </Text>
        <Text
          fontSize={'15px'}
          fontWeight={400}
          color={'#31323d'}
          textAlign={'center'}
        >
          Not enough BVM? No worries -{' '}
          <Text
            as="span"
            fontWeight={700}
            color={'#2352c1'}
            textAlign={'center'}
            textUnderlineOffset={'2px'}
            textDecorationLine={'underline'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              window.open(
                'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
                '_blank',
              );
            }}
          >
            {`grab some here!`}
          </Text>
        </Text>
      </Flex>
    );
  };

  // const renderMessageWithTopBVM = () => {
  //   return (
  //     <Text
  //       fontSize={'15px'}
  //       fontWeight={400}
  //       color={'#6C6F93'}
  //       textAlign={'center'}
  //     >
  //       Please send at least
  //       <Text as="span" fontWeight={700} color={'#000'} textAlign={'center'}>
  //         {` ${order?.needToTopupBalanceFormatted} BVM `}
  //       </Text>
  //       {`to the following wallet address. `}
  //       {/* <Text
  //         as="span"
  //         fontWeight={700}
  //         color={'#e6922c'}
  //         textAlign={'center'}
  //         textUnderlineOffset={'2px'}
  //         textDecorationLine={'underline'}
  //         _hover={{
  //           cursor: 'pointer',
  //           opacity: 0.8,
  //         }}
  //         onClick={() => {
  //           window.open('https://nakachain.xyz/swap', '_blank');
  //         }}
  //       >
  //         {`Buy now!`}
  //       </Text> */}
  //     </Text>
  //   );
  // };

  const renderMessageWithTopBVM_V2 = () => {
    return (
      <Text
        fontSize={'15px'}
        fontWeight={400}
        color={'#31323d'}
        textAlign={'center'}
        w={'90%'}
      >
        Send
        <Text as="span" fontWeight={700} color={'#000'} textAlign={'center'}>
          {` ${order?.needToTopupBalanceFormatted} BVM `}
        </Text>
        to the following wallet address below.
        <Text>
          Not enough BVM? No worries -{' '}
          <Text
            as="span"
            fontWeight={700}
            color={'#2352c1'}
            textAlign={'center'}
            textUnderlineOffset={'2px'}
            textDecorationLine={'underline'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              window.open(
                'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
                '_blank',
              );
            }}
          >
            {`grab some here!`}
          </Text>
        </Text>
      </Text>
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

        {order ? renderMessageWithTopBVM_V2() : renderMessageDetault()}

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
            src={'/icons/ic-copy-red.svg'}
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
          Ethereum
        </Text>
        {/* {!order && (
          <Flex
            justify={'center'}
            align={'center'}
            flexDir={'column'}
            mt="20px"
          >
            <Text
              as="span"
              fontWeight={700}
              color={'#e6922c'}
              textAlign={'center'}
              textUnderlineOffset={'2px'}
              textDecorationLine={'underline'}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
              onClick={() => {
                window.open(
                  'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
                  '_blank',
                );
              }}
            >
              {`Buy BVM now`}
            </Text>

            <Text
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
              Ethereum
            </Text>
          </Flex>
        )} */}
      </Flex>

      {/* {
        <Text
          marginTop={'10px'}
          fontSize={'15px'}
          fontWeight={400}
          color={'#6C6F93'}
          textAlign={'center'}
        >
          {`Insufficient balance.  `}
          <Text
            as="span"
            fontWeight={700}
            color={'#e6922c'}
            textAlign={'center'}
            textUnderlineOffset={'2px'}
            textDecorationLine={'underline'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              window.open(
                'https://app.uniswap.org/swap?outputCurrency=0x069d89974f4edabde69450f9cf5cf7d8cbd2568d&chain=ethereum',
                '_blank',
              );
            }}
          >
            {`Buy now!`}
          </Text>
        </Text>
      } */}
    </BaseModal>
  );
};

export default TopupModal;
