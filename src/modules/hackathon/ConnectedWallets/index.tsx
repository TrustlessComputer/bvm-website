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

export default function ConnectedWallets() {
  const { login, wallet } = useWeb3Auth();

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
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px',
        gap: '12px',
      }}
    >
      {/* Export private key */}
      <button
        style={{
          border: '1px solid #FFFFFF26',
          background: '#FFFFFF12',
          padding: '8px 16px',
          borderRadius: '100px',
          paddingLeft: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={exportPrivateKeyHandler}
      >
        <span
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
        </span>
        <span
          style={{
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '0px',
            color: '#fff',
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
