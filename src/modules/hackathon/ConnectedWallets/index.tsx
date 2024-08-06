import { openModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';
import SupportedWallets, {
  SUPPORTED_WALLETS_MODAL_ID,
} from './SupportedWallets';

import s from './styles.module.scss';
import SvgInset from '@/components/SvgInset';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import ExportPrivateKey, {
  EXPORT_PRIVATE_KEY_MODAL_ID,
} from './ExportPrivateKey';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';

export default function ConnectedWallets() {
  const { login, wallet } = useWeb3Auth();

  const { tracking } = useL2ServiceTracking();

  const dispatch = useDispatch();
  const addNetworkHandler = () => {
    dispatch(
      openModal({
        id: SUPPORTED_WALLETS_MODAL_ID,
        modalProps: {
          size: 'md',
        },
        className: s.modalBody,
        render: () => <SupportedWallets />,
      }),
    );
  };

  const exportPrivateKeyHandler = () => {
    if (wallet?.privateKey) {
      dispatch(
        openModal({
          id: EXPORT_PRIVATE_KEY_MODAL_ID,
          modalProps: {
            size: 'md',
          },
          className: s.modalBody,
          render: () => <ExportPrivateKey />,
        }),
      );
    } else {
      login();
    }
    tracking('POC_EXPORT_PRIVATE_KEY');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '4px',
      }}
    >
      {/* Export private key */}
      <button className={s.export_btn} onClick={exportPrivateKeyHandler}>
        {/* <span
          style={{
            // background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            width: '20px',
            height: '20px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgInset
            size={14}
            svgUrl="/images/poc/wallets/export-private-key-ic.svg"
          />
        </span> */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#fff',
            fontFamily: 'Space Mono',
          }}
        >
          Export private key
        </span>
      </button>

      {/* Add network */}
      {/* <button
        style={{
          border: '1px solid #FFFFFF26',
          background: '#FFFFFF12',
          padding: '8px 16px',
          paddingRight: '8px',
          borderRadius: '100px',

          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={addNetworkHandler}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '0px',
            color: '#fff',
          }}
        >
          + Add Network
        </span>
        <span
          style={{
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            width: '20px',
            height: '20px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgInset
            size={14}
            svgUrl="/images/poc/wallets/logos--metamask-icon.svg"
          />
        </span>
      </button> */}
    </div>
  );
}
