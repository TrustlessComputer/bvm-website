import BaseModal from '@/components/BaseModal';
import { Flex, ModalOverlay, Spinner, Text } from '@chakra-ui/react';
import s from './styles.module.scss';

interface IProps {
  show: boolean;
  onClose: () => void;
  message?: string;
}

const ModalLoading = (props: IProps) => {
  const { show, onClose, message = 'Please wait...' } = props;
  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
  );
  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
    >
      <Flex
        height={'400px'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'20px'}
      >
        <Spinner color="#000" size="xl" />
        {message && (
          <Text
            fontSize={'20px'}
            fontWeight={500}
            color={'#000'}
            lineHeight={'24px'}
          >
            {message}
          </Text>
        )}
      </Flex>
    </BaseModal>
  );
};

export default ModalLoading;
