import BaseModal from '@/components/BaseModal';
import { Button, Flex, Text } from '@chakra-ui/react';
import s from './styles.module.scss';
import { OrderItem } from '@/stores/states/l2services/types';

interface IProps {
  show: boolean;
  item?: OrderItem;
  onClose?: (() => void) | any;
  onSuccess?: () => void;
}

const CancelOrderModal = (props: IProps) => {
  const { show, onClose, item, onSuccess } = props;
  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      <Flex
        mt={['15px', '18px', '20px']}
        flexDir={'column'}
        bgColor={'#fff'}
        borderRadius={'10px'}
        p={'20px'}
        gap={['15px', '18px', '20px']}
      >
        <Text
          fontSize={['18px', '20px', '24px']}
          fontWeight={600}
          color={'#000'}
          alignSelf={'flex-start'}
        >
          {`Cancel your rollup?`}
        </Text>

        <Flex
          mt={['15px', '18px', '20px']}
          flexDir={'row'}
          align={'center'}
          justify={'space-between'}
          width={'100%'}
          gap={['18px', '20px', '30px']}
          fontSize={['15px', '16px', '18px']}
          fontWeight={500}
        >
          <Button
            width={'100%'}
            bgColor={'#fff'}
            color={'#FA4E0E'}
            borderColor={'#FA4E0E'}
            borderWidth={'1px'}
            borderRadius={'100px'}
            h={['40px', '45px', '50px']}
            minW={'140px'}
            className={s.fontType3}
            onClick={() => {
              onSuccess && onSuccess();
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Yes
          </Button>

          <Button
            width={'100%'}
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={'100px'}
            h={['40px', '45px', '50px']}
            minW={'140px'}
            className={s.fontType3}
            fontWeight={500}
            onClick={onClose}
            _hover={{
              opacity: 0.8,
            }}
          >
            No
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default CancelOrderModal;
