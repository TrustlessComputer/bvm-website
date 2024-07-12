import React, { useState } from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
import Item from '@/modules/blockchains/Buy/TemplateModal/Item';
import Link from 'next/link';
import { FAKE_DATA_PACKAGE } from '@/modules/blockchains/Buy/TemplateModal/data';
import { useSearchParams } from 'next/navigation';


interface IProps {
  show: boolean;
  onClose: (() => void) | any;
}

const TemplateModal = (props: IProps) => {
  const { show, onClose } = props;

  return (
    <BaseModal
      isShow={show}
      onHide={onClose}
      className={s.modalContent}
      size="custom"
      icCloseUrl="/icons/ic_close_v2.svg"
    >
      <p className={s.title}>Choose a pre-built template</p>
      <div className={s.wrapperItem}>
        {
          FAKE_DATA_PACKAGE.map(item => {
            return (
              <div onClick={onClose}>
                <Item heading={item.template} price={item.price} content={item.content}
                      iconCheck={item.check} color={item.color} link={item.link} option={item.options} />
              </div>
            )
          })
        }
      </div>
      <Link href={'#'}>
        <p className={s.optionCustom}>Contact us for custom hardware options</p>
      </Link>

    </BaseModal>
  );
};

export default TemplateModal;
