import React from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';


export default function PreviewMapModal({...props}): React.JSX.Element {
  const { show, onClose } = props;
  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="extra"
      title={'Blockchain preview map'}
      icCloseUrl="/icons/ic-close-grey.svg"
    >
      helllo
    </BaseModal>
  );
}
