import SvgInset from '@/components/SvgInset';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Flex } from '@chakra-ui/react';
import cs from 'classnames';
import React, { PropsWithChildren } from 'react';
import s from './styles.module.scss';

export interface Props {
  isShow: boolean;
  onHide: () => void;
  title?: string;
  className?: string;
  size?: 'small' | 'normal' | 'extra' | 'custom';
  description?: string;
  headerClassName?: string;
  icCloseUrl?: string;
  theme?: 'dark' | 'light';
}

const BaseModal = (props: PropsWithChildren<Props>): any => {
  const {
    isShow,
    onHide,
    title,
    className,
    children,
    description,
    headerClassName,
    size = 'normal',
    icCloseUrl = '/icons/ic_close_modal.svg',
    theme,
  } = props;

  return (
    <Modal isOpen={isShow} onClose={onHide} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        className={cs(s.modalContent, s[size], className)}
        style={{
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#f4f4f4',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <ModalHeader className={cs(s.modalHeader, headerClassName)}>
          <Flex justifyContent="space-between" alignItems="center">
            <button onClick={onHide} className={s.modalHeader_closeBtn}>
              <SvgInset className={s.closeIcon} svgUrl={icCloseUrl} />
            </button>
            <p
              className={`${s.modalHeader_title} ${
                theme === 'dark'
                  ? s.modalHeader_title_dark
                  : s.modalHeader_title_light
              }`}
            >
              {title || ''}
            </p>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {!!description && (
            <p className={s.modalHeader_description}>{description}</p>
          )}
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
