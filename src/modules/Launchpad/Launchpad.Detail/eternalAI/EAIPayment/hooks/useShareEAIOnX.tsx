
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerifyTwModal, { VerifyTwModalID } from '../WhatEAI/verifyTwModal';
import { isMobile } from 'react-device-detect';
import { hasSpreadTheLoveSelector, userContributeSelector } from '@/modules/Launchpad/store/lpEAIPayment/selector';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { showSuccess } from '@/components/toast';
import { openModal } from '@/stores/states/modal/reducer';
import { setHasSpreadTheLove } from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { requestReload } from '@/stores/states/common/reducer';

const useShareEAIOnX = () => {
  const userContributeInfo = useSelector(userContributeSelector);
  const hasSpreadTheLove = useSelector(hasSpreadTheLoveSelector);
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const [verifying, setVerifying] = useState(false);
  const [showManualCheck, setShowManualCheck] = useState(false);
  const timer = useRef<any>();
  const dispatch = useDispatch();

  const isVerify = useRef(false);

  const paymentEAIApi = useRef(new CPaymentEAIAPI()).current;

  const isDone = useMemo(
    () => hasSpreadTheLove && Boolean(userContributeInfo?.twitter_username),
    [userContributeInfo?.twitter_username, hasSpreadTheLove],
  );

  const requestShareCode = async () => {
    try {
      const rs = await paymentEAIApi.requestShareCode();
      setAuthenCode(rs);
      return rs;
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (authenCode?.public_code) {
      setVerifying(true);
      setShowManualCheck(true);
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 6000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [authenCode?.public_code]);

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      if (isVerify.current) {
        return;
      }
      isVerify.current = true;
      const result = await paymentEAIApi.updateTwitterInfo({
        secret_code: authenCode?.secret_code as string,
      });
      onVerifyTwSuccess(result);
      showSuccess({ message: `Verify successfully` });
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    } finally {
      isVerify.current = false;
    }
  };

  const onClickManualCheck = () => {
    dispatch(
      openModal({
        id: VerifyTwModalID,
        title: '',
        // className: s.modalContent,
        modalProps: {
          size: 'lg',
        },
        render: (
          <VerifyTwModal
            secretCode={authenCode?.secret_code}
            onSuccess={onVerifyTwSuccess}
          />
        ),
      }),
    );
  };

  const onVerifyTwSuccess = async (result: any) => {
    if (result) {
      clearInterval(timer.current);
      dispatch(setHasSpreadTheLove(true));
      setVerifying(false);
      dispatch(requestReload());
    }
  };

  const onShare = async (e: any) => {
    e.preventDefault();
    const rs = await requestShareCode();
    const content = `Proud to be an early backer for $EAI @CryptoEternalAI\n\nEternal AI is the first Bitcoin L2 designed for on-chain AI, a truly open AI infrastructure allowing anyone to train and deploy AI models on #Bitcoin\n\nJoin $EAI public sale now:\nnakachain.xyz/public-sale/eai\n\n#EternalAI #${rs?.public_code}`;

    const _url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      content,
    )}`;

    if (isMobile) {
      return window.location.assign(_url);
    }

    return window.open(_url, '_blank');
  };

  return {
    onShareEAIOnX: onShare,
    verifying,
    onClickManualCheck,
    showManualCheck,
    isDone,
  };
};

export default useShareEAIOnX;
