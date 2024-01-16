import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/stores/states/modal/reducer';

export interface ModalComponentProps {
  id: string;
  render: Function;
  title?: string | ReactNode;
  className?: string;
  actions?: object;
  modalProps?: ModalProps;
  onClose?: Function;
  theme?: 'light' | 'dark';
  contentPadding?: number;
  hideCloseButton?: boolean;
  size?: string;
  disableBgClose?: boolean;
}

const ModalComponent = (props: ModalComponentProps) => {
  const {
    id,
    render,
    title,
    className,
    actions,
    modalProps,
    onClose,
    contentPadding,
    hideCloseButton = false,
    disableBgClose = false,
  } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal({ id }));
    if (onClose) onClose(props);
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      isCentered
      closeOnOverlayClick={!disableBgClose}
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent
        className={className}
        minW={{ base: '90%', sm: '440px' }}
        padding={contentPadding}
        // height={'90%'}
      >
        <Flex
          className="modal-header-wrap"
          justifyContent={'space-between'}
          alignItems="center"
          mb={[3]}
        >
          {!!title && (
            <Box flex={1}>
              <ModalHeader
                style={{
                  fontFamily: 'var(--chakra-fonts-body)',
                  fontSize: 24,
                  textTransform:
                    typeof title === 'string' ? 'capitalize' : 'none',
                  fontWeight: 600,
                }}
              >
                {title}
              </ModalHeader>
            </Box>
          )}
          <Box
            display={hideCloseButton ? 'none' : 'block'}
            style={
              contentPadding
                ? {
                    paddingTop: 20,
                    paddingRight: 20,
                  }
                : {}
            }
          >
            <ModalCloseButton
              size={'sm'}
              className={cx(styles.modalButtonClose)}
            />
          </Box>
        </Flex>

        <ModalBody className={cx(styles.modalBody)}>
          {render && render(actions)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
