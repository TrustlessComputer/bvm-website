import React from 'react';

import styles from './styles.module.scss';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  title: string;
  children: React.ReactNode;
  closeText?: string;
  show: boolean;
  onHide: () => void;
};

const ErrorModal = ({
  title,
  show,
  onHide,
  children,
  closeText = '',
}: Props) => {
  return (
    <Modal isOpen={show} onClose={onHide} isCentered>
      <ModalOverlay />
      <ModalContent
        className={styles.modal}
        style={{
          backgroundColor: '#f4f4f4',
        }}
      >
        <ModalHeader className={styles.modal__title}>{title}</ModalHeader>

        <ModalBody className={styles.modal__body}>
          {children}

          <button
            onClick={() => onHide()}
            className={styles.modal__closeButton}
          >
            {closeText || 'Close'}
          </button>
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

export default ErrorModal;
