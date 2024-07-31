import { openModal } from '@/stores/states/modal/reducer';
import { useDispatch } from 'react-redux';
import SupportedWallets, {
  SUPPORTED_WALLETS_MODAL_ID,
} from './SupportedWallets';

import modalStyle from './SupportedWallets/styles.module.scss';
import SvgInset from '@/components/SvgInset';

export default function ConnectedWallets() {
  const dispatch = useDispatch();
  const addNetworkHandler = () => {
    dispatch(
      openModal({
        id: SUPPORTED_WALLETS_MODAL_ID,
        modalProps: {
          size: 'md',
        },
        className: modalStyle.modalBody,
        // theme: 'light',
        render: () => <SupportedWallets />,
      }),
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px',
      }}
    >
      <button
        style={{
          border: '1px solid #FFFFFF26',
          background: '#FFFFFF12',
          padding: '8px 16px',
          paddingRight: '7px',
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
      </button>
    </div>
  );
}
