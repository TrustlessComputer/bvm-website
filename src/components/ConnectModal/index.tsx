import React, { useContext } from 'react';
import BaseModal from '@/components/BaseModal';
import { CDN_URL_ICONS } from '@/config';
import { WalletType } from '@/interfaces/wallet';
import styles from './styles.module.scss';
import Image from 'next/image';
import { XVerseContext } from '@/Providers/xverse-context';
import useConnect from '@/hooks/useConnect';
import throttle from 'lodash/throttle'
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import AppLoading from '@/components/AppLoading';
import cs from 'classnames';

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
  const { signMessage } = useConnect();
  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState(false)

  const onSignMessage = async (type: WalletType) => {
    try {
      if (loading) return;
      setLoading(true)
      await signMessage(type);
      dispatch(requestReload())
      onHide()
    } catch (error) {
      const { message } = getError(error);
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const throttleSignMessage = React.useCallback(throttle(onSignMessage, 300), [xverseCtx.capabilityMessage, xverseCtx.capabilityState, loading])

  const renderItem = React.useCallback(
    (item: ModalItem) => {
      return (
        <div
          className={styles.modalItem}
          key={item.text}
          onClick={() => throttleSignMessage(item.type)}
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
    [xverseCtx.capabilityMessage, xverseCtx.capabilityState, loading]
  );

  return (
    <BaseModal isShow={isShow} onHide={onHide} title="Choose wallet">
      <div className={cs(styles.modalContent, loading && styles.modalContent__loading)}>
        {ITEMS.map(renderItem)}
      </div>
      {
        loading && (
          <AppLoading className={styles.loading}/>
        )
      }
    </BaseModal>
  );
})

ConnectModal.displayName = 'ConnectModal';

export default ConnectModal;
