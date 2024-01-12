import React, { useContext } from 'react';
import BaseModal from '@/components/BaseModal';
import { CDN_URL_ICONS } from '@/config';
import { WalletType } from '@/interfaces/wallet';
import styles from './styles.module.scss';
import Image from 'next/image';
import { XVerseContext } from '@/Providers/xverse-context';
import useConnect from '@/hooks/useConnect';

interface IProps {
  isShow: boolean;
  onHide: () => void;
}

interface ModalItem {
  image: string;
  text: string;
  type: WalletType;
  description?: string;
}
const ITEMS: ModalItem[] = [
  {
    image: `${CDN_URL_ICONS}/ic-unisat.svg`,
    text: 'UNISAT',
    type: WalletType.unisat,
  },
  {
    image: `${CDN_URL_ICONS}/ic-xverse.svg`,
    text: 'XVERSE',
    type: WalletType.xverse,
  },
];

const ConnectModal = React.memo(({ isShow, onHide }: IProps)=> {
  const xverseCtx = useContext(XVerseContext);
  const { signMessage } = useConnect()

  const renderItem = React.useCallback(
    (item: ModalItem) => {
      return (
        <div
          className={styles.modalItem}
          key={item.text}
          onClick={() => signMessage(item.type)}
        >
          <Image width={36} height={36} src={item.image} alt="ic_wallet" />
          <div className={styles.modalItem_content}>
            <p >
              {item.text}
            </p>
            {item.description ? (
              <p
                className={styles.modalItem_description}
              >
                {item.description}
              </p>
            ) : (
              item.type === WalletType.xverse && (
                <p
                  className={styles.modalItem_warning}
                >
                  {xverseCtx.capabilityMessage}
                </p>
              )
            )}
          </div>
        </div>
      );
    },
    [xverseCtx]
  );

  return (
    <BaseModal isShow={isShow} onHide={onHide} title="Choose wallet">
      <div className={styles.modalContent}>
        {ITEMS.map(renderItem)}
      </div>
    </BaseModal>
  );
})

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
