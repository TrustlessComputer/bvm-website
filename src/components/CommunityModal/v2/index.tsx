import BaseModal from '../../BaseModal';
import s from './styles.module.scss';
import { useState } from 'react';
import { isEmpty } from 'lodash';

import { submitContact } from '@/services/api/l2services';
import { SubmitFormParams } from '@/services/api/l2services/types';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import cs from 'classnames';

const CommunityModal = ({ isShow, onHide, onSuccesCB }: any) => {
  return (
    <>
      <BaseModal
        isShow={isShow}
        onHide={onHide}
        headerClassName={s.modalManualHeader}
        className={cs(s.modalContent, s.wrapperCommnunity)}
        size="custom"
        icCloseUrl="/icons/ic-close-grey.svg"
      >
        <div className={s.row}>
          <div className={s.telegram}>
            <p className={s.title}>
              For quick chats, join our Telegram community.
            </p>
            <a href="https://t.me/BVMofficialcommunity" target="_blank">
              <img src="/icons/tele-ic.svg" alt="" className={s.imgTele} />
            </a>
          </div>
          <div className={s.colRight}>
            <div className={s.title}>
              For deeper conversations and a wider range of activities <br />{' '}
              like gaming and gifting, join our Alpha community.
            </div>
            <button
              className={s.joinBtn}
              onClick={() => {
                navigator.clipboard.writeText('https://app.alpha.wtf/');
                toast.success('Copied successully!');
              }}
            >
              <div className={s.inline}>
                <span className={s.text}>https://app.alpha.wtf/</span>
                <span>
                  <img src="/icons/copy-join.svg" alt="" />
                </span>
              </div>
            </button>

            <div className={s.wrapQr}>
              <p className={s.text}>Or simply scan the QR code.</p>
              <div className={s.imgQr}>
                <img src="/qr-alpha.svg" alt="alpha" />
              </div>
            </div>
            <div className={s.available}>
              Available on both{' '}
              <span>
                <img src="/icons/apple.svg" /> iOS
              </span>{' '}
              and{' '}
              <span>
                <img src="/icons/android.svg" />
                Android
              </span>
            </div>
            <div className={s.noted}>
              Alpha uses progressive web app (PWA) technology that combines the{' '}
              <br />
              best features of traditional websites and platform-specific apps.
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default CommunityModal;
