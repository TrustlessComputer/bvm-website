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
import celestiaHelper, { ModularType } from '@/utils/celestia';
import { verifyCelestiaSignature, verifyEigenlayerSignature } from '@/services/whitelist';

interface IProps {
  isShow: boolean;
  onHide: () => void;
}

interface ModalItem {
  image: string;
  text: string;
  type: ModularType
}
const ITEMS: ModalItem[] = [
  {
    image: `${CDN_URL_ICONS}/kelpr.png`,
    text: 'Kelpr (Celestia)',
    type: ModularType.kelpr
  },
  {
    image: `${CDN_URL_ICONS}/leap.jpeg`,
    text: 'Leap (Celestia)',
    type: ModularType.leap
  },
  {
    image: `${CDN_URL_ICONS}/ic-metamask.svg`,
    text: 'Metamask (Eigenlayer)',
    type: ModularType.metamask
  },
];


const ConnectModalModular = React.memo(({ isShow, onHide }: IProps)=> {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState(false)

  const onSignMessage = async (item: ModalItem) => {
    try {
      if (loading) return;
      switch (item.type) {
        case ModularType.kelpr:
        case ModularType.leap: {
          const { signature, address } = await celestiaHelper.signCelestiaMessage(item.type);
          await verifyCelestiaSignature({ address, signature })
          break
        }
        case ModularType.metamask: {
          const { signature, address, message } = await signMessage(celestiaHelper.CelestiaConfig.messageForSign);
          await verifyEigenlayerSignature({ signature, address, message })
        }
      }
      //


      setLoading(true)
      dispatch(requestReload());
      toast.success("Successfully.")
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
          <Image width={48} height={48} src={item.image} style={{ borderRadius: 120 }} alt="ic_wallet" />
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
    <BaseModal isShow={isShow} onHide={onHide} title="Choose wallet" size="small">
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

ConnectModalModular.displayName = 'ConnectModalModular';

export default ConnectModalModular;
