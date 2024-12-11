import BaseModal from '@/components/BaseModal';
import s from './styles.module.scss';
import { Flex, Text, Image } from '@chakra-ui/react';

export interface IFormValues {
  totalSupply: string;
  receivingAddress: string;
}

interface IProps {
  show: boolean;
  onClose?: (() => void) | any;
  onSuccess?: () => Promise<void>;
  data?: any;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, onClose, data } = props;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="extra"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        textAlign={'center'}
        color={'#000'}
        gap={'15px'}
      >
        <Image
          src={'/blockchains/customize/ic-check-green.svg'}
          w={'80px'}
          h={'auto'}
          objectFit={'contain'}
        />

        <Text fontSize={'26px'} fontWeight={600}>
          Thank you for your submission
        </Text>
        <Text fontSize={'18px'} fontWeight={400}>
          We are currently receiving a large amount of submissions.
          <br />
          Our team will review and contact you shortly to get your Bitcoin L2
          blockchain started.
        </Text>

        <Text fontSize={'18px'} fontWeight={400}>
          Reach out to our team member if you have any question:
        </Text>

        <Flex flexDir={'row'} align={'center'} gap={'20px'}>
          <Image
            src={'/blockchains/customize/ic-x.svg'}
            w={'50px'}
            h={'auto'}
            objectFit={'contain'}
            onClick={() => {
              window.open('https://twitter.com/bird_2836', '_blank');
            }}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
          />

          <Image
            src={'/blockchains/customize/ic-telegram.svg'}
            w={'50px'}
            h={'auto'}
            objectFit={'contain'}
            onClick={() => {
              window.open('https://t.me/bird2836', '_blank');
            }}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
          />
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
