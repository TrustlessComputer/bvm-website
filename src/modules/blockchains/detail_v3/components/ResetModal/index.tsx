import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import { getDAListSelector } from '@/stores/states/l2services/selector';

interface IProps {
  isOpen: boolean;
  onClose(): void;
  onResetClick?: () => void;
}

export const ResetModal = (props: IProps) => {
  const { isOpen, onClose, onResetClick } = props;

  const dappsList = useAppSelector(getDAListSelector);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className={s.modalContent} gap={['28px']}>
        <ModalHeader className={s.modalHeader}>
          <Text
            w="100%"
            fontSize={['20px', '22px', '24px']}
            fontWeight={600}
            color={'#000'}
            textAlign={'center'}
          >
            Module Reset
          </Text>
        </ModalHeader>
        <ModalBody className={s.modalBody}>
          <Text
            w="100%"
            fontSize={['14px', '15px', '16px']}
            fontWeight={400}
            color={'#000'}
            textAlign={'center'}
          >
            Remove all selected modules and start again.
          </Text>
          <Flex flexDir={'row'} align="center" mt={['28px']} gap={['12px']}>
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
              Cancel
            </Button>
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
              onClick={onResetClick}
              _hover={{
                opacity: 0.8,
              }}
            >
              Reset
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
