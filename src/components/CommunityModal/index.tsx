import BaseModal from '../BaseModal';
import s from './styles.module.scss';
import { useState } from 'react';
import { isEmpty } from 'lodash';

import { submitContact } from '@/services/api/l2services';
import { SubmitFormParams } from '@/services/api/l2services/types';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import cs from 'classnames';

const CommunityModal = ({ isShow, onHide, onSuccesCB }: any) => {
  const [yourXAcc, setYourXAcc] = useState('');
  const [yourXAccErrMsg, setYourXAccErrMsg] = useState<string | undefined>(
    undefined,
  );

  const [yourTelegramAcc, setYourTelegramAcc] = useState('');
  const [yourTelegramAccErrMgs, setYourTelegramAccErrMgs] = useState<
    string | undefined
  >(undefined);

  const [yourPlan, setYouPlan] = useState('');
  const [yourPlanErrMgs, setYourPlanErrMgs] = useState<string | undefined>(
    undefined,
  );

  const valideYourXAcc = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourXAccErrMsg('Your X is required.');
      return false;
    } else {
      setYourXAccErrMsg(undefined);
      return true;
    }
  };

  const valideYourTelegramAcc = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourTelegramAccErrMgs('Your telegram is required.');
      return false;
    } else {
      setYourTelegramAccErrMgs(undefined);
      return true;
    }
  };

  const valideYourPlan = (text: string) => {
    if (!text || isEmpty(text)) {
      setYourPlanErrMgs('Your plan is required.');
      return false;
    } else {
      setYourPlanErrMgs(undefined);
      return true;
    }
  };

  const submitHandler = async () => {
    try {
      let valid = true;
      if (!valideYourXAcc(yourXAcc)) {
        valid = false;
      }
      // if (!valideYourTelegramAcc(yourTelegramAcc)) {
      //   valid = false;
      // }
      // if (!valideYourPlan(yourPlan)) {
      //   valid = false;
      // }

      console.log('valid ', valid);
      if (valid) {
        const params: SubmitFormParams = {
          bitcoinL2Name: '',
          bitcoinL2Description: yourPlan,
          network: '',
          dataAvailability: '',
          blockTime: '',
          rollupProtocol: '',
          withdrawPeriod: '',
          twName: yourXAcc,
          telegram: yourTelegramAcc,
          isContractUs: true,
        };
        const result = await submitContact(params);
        console.log('[submitHandler] result: ', result);
        if (result) {
          onSuccesCB && onSuccesCB();
        }
      }
    } catch (error) {
      console.log('[submitHandler] ERROR: ', error);
      const { message } = getError(error);
      toast.error(message);
    }
  };

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
          <div className={s.colLeft}>
            <div className={s.title}>
              Join the Bitcoin Virtual Machine circle on Alpha to connect with
              the team and fellow members!
            </div>
            <div className={s.wrapImg}>
              <img src="/images/alpha-big.svg" alt="" />
            </div>
            <div className={s.list}>
              <div className={s.item}>
                <img src="/icons/check-done.svg" alt="" />
                <div className={s.txt}>
                  Alpha is the first social app on Bitcoin, powered by BVM.
                </div>
              </div>
              <div className={s.item}>
                <img src="/icons/check-done.svg" alt="" />
                <div className={s.txt}>
                  Connect, engage, and earn through personalized social
                  experiences <br /> and community activities.
                </div>
              </div>
              <div className={s.item}>
                <img src="/icons/check-done.svg" alt="" />
                <div className={s.txt}>Receive airdrop points.</div>
              </div>
            </div>
          </div>
          <div className={s.colRight}>
            <div className={s.title}>
              Open the link in a phone browser to <br /> install the Alpha app.
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
