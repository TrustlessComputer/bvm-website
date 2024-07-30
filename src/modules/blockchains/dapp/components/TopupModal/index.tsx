import BaseModal from '@/components/BaseModal';
import { Flex, Image, Text, Tabs, TabList, Tab } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import s from './styles.module.scss';

export interface TopUpDappInfor {
  paymentAddress: string;
  networkName: string;
  tokenSymbol: string;
  tokenAddress: string;
  title: string;
  amount?: string;
  warningMessage?: string;
}

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  infors?: TopUpDappInfor[];
}

const TopupModal = (props: IProps) => {
  const { show, onClose, infors } = props;
  if (!infors) return <></>;

  const [currentIndexInfo, setCurrentIndexInfo] = useState(0);

  const { paymentAddress, amount, tokenSymbol, warningMessage, networkName } =
    infors[currentIndexInfo];

  const renderMessage = () => {
    return (
      <Text
        fontSize={['13px', '14px', '15px']}
        fontWeight={400}
        color={'#31323d'}
        textAlign={'center'}
        w={['100%', '90%']}
      >
        Please send
        <Text as="span" fontWeight={700} color={'#000'} textAlign={'center'}>
          {amount ? ` ${amount}` : ''} {tokenSymbol}{' '}
        </Text>
        to the following wallet address below.
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
      title={'Top up'}
    >
      <Flex
        display={'flex'}
        flexDir={'column'}
        w={['100%', '100%']}
        bgColor={'#ECECEC'}
        borderRadius={'10px'}
        p={'20px'}
      >
        {infors.length > 1 && (
          <Tabs className={s.tabContainer}>
            <TabList className={s.tabList}>
              {infors.map((info, index) => (
                <Tab onClick={() => setCurrentIndexInfo(index)}>
                  {info.title}
                </Tab>
              ))}
            </TabList>
          </Tabs>
        )}

        {warningMessage && (
          <Text
            fontSize={['13px', '14px', '15px']}
            fontWeight={500}
            color={'#e6922c'}
            textAlign={'center'}
            mb={'10px'}
          >
            {warningMessage}
          </Text>
        )}

        {renderMessage()}

        {/* Adderss Bar */}
        <Flex
          mt={'20px'}
          flexDir={'row'}
          py="10px"
          px={['8px', '14px', '20px']}
          bgColor={'#fff'}
          color={'#000'}
          borderRadius={'12px'}
          w={'100%'}
          gap="10px"
          width={'max-content'}
          alignSelf={'center'}
          onClick={() => {
            console.log('TO DO ');
          }}
        >
          <Text
            fontSize={['11px', '14px', '15px']}
            fontWeight={600}
            textAlign={'center'}
          >
            {paymentAddress}
          </Text>
          <Image
            src={'/icons/ic-copy-red.svg'}
            w={['16px', '18px', '20px']}
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
          fontSize={['11px', '14px', '15px']}
          fontWeight={400}
          color={'#6C6F93'}
          textAlign={'center'}
        >
          Network
        </Text>
        <Text
          fontSize={['11px', '14px', '15px']}
          fontWeight={600}
          color={'#000'}
          textAlign={'center'}
        >
          {networkName}
        </Text>
      </Flex>
    </BaseModal>
  );
};

export default TopupModal;
