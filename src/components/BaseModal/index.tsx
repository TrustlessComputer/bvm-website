import s from './styles.module.scss';
import React, { PropsWithChildren } from 'react';
import cs from 'classnames';
import { CDN_URL_ICONS } from '@/config';
import { Modal, ModalHeader, ModalBody, ModalOverlay, ModalContent } from '@chakra-ui/modal';
import { Flex } from '@chakra-ui/react';
import { size } from 'valibot';

export interface IBaseModalProps {
  isShow: boolean;
  onHide: () => void;
  title: string;
  className?: string;
  size?: 'small' | 'normal' | 'extra';
  description?: string;
  headerClassName?: string;
}

const BaseModal = (props: PropsWithChildren<IBaseModalProps>): React.ReactNode => {
  const {
    isShow,
    onHide,
    title,
    className,
    children,
    description,
    headerClassName,
    size = "normal"
  } = props;

  return (
      <Modal
        isOpen={isShow}
        onClose={onHide}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent className={cs(s.modalContent, s[size], className)}>
          <ModalHeader className={cs(s.modalHeader, headerClassName)}>
            <Flex justifyContent="space-between" alignItems="center">
              <button
                onClick={onHide}
                className={s.modalHeader_closeBtn}
              >
                <img
                  alt="ic-close"
                  className={s.closeIcon}
                  src={`${CDN_URL_ICONS}/ic-close-border.svg`}
                />
              </button>
              <p className={s.modalHeader_title}>
                {title}
              </p>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {!!description && (
              <p className={s.modalHeader_description} >
                {description}
              </p>
            )}
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default BaseModal;
