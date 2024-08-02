import SvgInset from '@/components/SvgInset';
import s from './styles.module.scss';
import { showError, showSuccess } from '@/components/toast';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/stores/states/modal/reducer';
import { useEffect, useState } from 'react';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import copy from 'copy-to-clipboard';
import sleep from '@/utils/sleep';
import { HACKATHON_NETWORK } from '../constants';
export const EXPORT_PRIVATE_KEY_MODAL_ID = 'EXPORT_PRIVATE_KEY_MODAL_ID';

export default function ExportPrivateKey() {
  const { wallet } = useWeb3Auth();
  const dispatch = useDispatch();
  return (
    <div className={s.exportPrivateKey}>
      <div className={s.container}>
        <div className={s.title}>Wallet</div>
        <div className={s.wallets}>
          <div className={s.box}>
            <div className={s.box__label}>
              Address
              <span
                className={s.copyIcon}
                onClick={async () => {
                  window.open(
                    `${HACKATHON_NETWORK.blockExplorerUrls[0]}/address/${wallet?.address}`,
                    '_blank',
                  );
                }}
              >
                <SvgInset size={16} svgUrl="/hackathon/ic-link-gray.svg" />
              </span>
            </div>
            <div
              className={s.box__value}
              onClick={() => {
                window.open(
                  `${HACKATHON_NETWORK.blockExplorerUrls[0]}/address/${wallet?.address}`,
                  '_blank',
                );
              }}
            >
              {wallet?.address}
            </div>
          </div>

          <div className={s.box}>
            <div className={s.box__label}>
              Private key
              <span
                className={s.copyIcon}
                onClick={async () => {
                  copy(wallet?.privateKey || '');
                  showSuccess({
                    message: 'Copied',
                  });
                  await sleep(1);
                  dispatch(
                    closeModal({
                      id: EXPORT_PRIVATE_KEY_MODAL_ID,
                    }),
                  );
                }}
              >
                <SvgInset size={16} svgUrl="/icons/ic-copy.svg" />
              </span>
            </div>
            <div className={s.box__value}>{wallet?.privateKey}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
