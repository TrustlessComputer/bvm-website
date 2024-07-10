import React from 'react';
import s from './styles.module.scss';
import BaseModal from '@components/BaseModal';
import Item from '@/modules/blockchains/Buy/TemplateModal/Item';
import Link from 'next/link';


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
        <Item heading={'Hacker'} price={'$999'} content={'The easiest way to launch your blockchain'}
              iconCheck={true} color={'GREEN'}/>
        <Item heading={'Growth'} price={'$9,999'} content={'Scale your blockchain as you go'}
              iconCheck={false} color={'BLUE'}/>
        <Item heading={'Secure'} price={'$99,999'} content={'Fully secure your blockchain with a cryptographic prover'}
              iconCheck={false} color={'ORANGE'}/>
      </div>
      <Link href={'#'}>
        <p className={s.optionCustom}>Contact us for custom hardware options</p>
      </Link>

    </BaseModal>
  );
};

export default TemplateModal;
