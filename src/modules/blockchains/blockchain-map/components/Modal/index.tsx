import React from 'react';
import cn from 'classnames';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import styles from './styles.module.scss';

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
  closeText?: string;
  okText?: string;
  show: boolean;
  onHide: () => void;
  onOk: () => void;
};

const MModal = ({
  title,
  show,
  onOk,
  onHide,
  className = '',
  children,
  okText = 'OK',
  closeText = '',
}: Props) => {
  return (
    <Modal isOpen={show} onClose={onHide} isCentered>
      <ModalOverlay />
      <ModalContent
        className={`${styles.modal} ${className}`}
        style={{
          backgroundColor: '#f4f4f4',
        }}
      >
        <ModalHeader className={cn(styles.modal__title)}>{title}</ModalHeader>

        <ModalBody className={styles.modal__body}>
          {children}

          <div className={styles.modal__actions}>
            {okText && (
              <button
                onClick={() => onOk()}
                className={cn(
                  styles.modal__actions__button,
                  styles.modal__actions__button__ok,
                )}
              >
                {okText}
              </button>
            )}

            {closeText && (
              <button
                onClick={() => onHide()}
                className={cn(
                  styles.modal__actions__button,
                  styles.modal__actions__button__close,
                )}
              >
                {closeText}
              </button>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MModal;
