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
import { signMessage } from '@/utils/metamask-helper';

interface IProps {
  isShow: boolean;
  onHide: () => void;
}

interface ModalItem {
  image: string;
  text: string;
  rpc: string;
  chainID: number;
}
const ITEMS: ModalItem[] = [
  {
    image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg',
    text: 'Optimism',
    rpc: 'https://optimism.llamarpc.com',
    chainID: 10
  },
  {
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
    text: 'Polygon',
    rpc: 'https://polygon.llamarpc.com',
    chainID: 137
  },
];

export const MESSAGE_EVM = 'Are you a Modular Blockchain OG?'

const ConnectModalEVM = React.memo(({ isShow, onHide }: IProps)=> {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState(false)

  const onSignMessage = async (item: ModalItem) => {
    try {
      if (loading) return;
      setLoading(true)
      const { address, signature } = await signMessage(MESSAGE_EVM);
      console.log('SANG TEST: ', {
        address, signature
      });

      dispatch(requestReload())
      onHide()
    } catch (error) {
      const { message } = getError(error);
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const throttleSignMessage = React.useCallback(throttle(onSignMessage, 300), [loading])

  const renderItem = React.useCallback(
    (item: ModalItem) => {
      return (
        <div
          className={styles.modalItem}
          key={item.text}
          onClick={() => throttleSignMessage(item)}
        >
          <Image width={48} height={48} src={item.image} alt="ic_wallet" />
          <div className={styles.modalItem_content}>
            <p className={styles.modalItem_title}>
              {item.text}
            </p>
          </div>
        </div>
      );
    },
    [loading]
  );

  return (
    <BaseModal isShow={isShow} onHide={onHide} title="Choose network" size="small">
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

ConnectModalEVM.displayName = 'ConnectModalEVM';

export default ConnectModalEVM;
