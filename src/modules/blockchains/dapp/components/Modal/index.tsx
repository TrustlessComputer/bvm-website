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
  children: React.ReactNode;
  closeText?: string;
  show: boolean;
  onHide: () => void;
};

const MModal = ({
  title,
  show,
  onHide,
  className = '',
  children,
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

          {closeText && (
            <button
              onClick={() => onHide()}
              className={styles.modal__closeButton}
            >
              {closeText}
            </button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
    // <div className={styles.modal}>
    //   <div className={styles.modal__overlay} />

    //   <h3 className={styles.modal__title}>
    //   Missing Required Modules
    //   </h3>

    //   <p className={styles.modal__subTitle}>
    //   Your blockchain setup lacks the following necessary modules:
    //   </p>

    //   <ul className={styles.modal__fields}>
    //     {missingFields.map((field, index) => (
    //       <li key={field} className={styles.modal__fields__field}>
    //         {field}
    //       </li>
    //     ))}
    //   </ul>

    //   <button onClick={() => onHide()}>
    //     Retry
    //   </button>
    // </div>
  );
};

export default MModal;
