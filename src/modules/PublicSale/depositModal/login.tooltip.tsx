import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import { useAppSelector } from '@/stores/hooks';
import AuthenStorage from '@/utils/storage/authen.storage';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getPublicSaleSummary } from '@/services/public-sale';
import { setBearerToken } from '@/services/whitelist';
import { requestReload } from '@/stores/states/common/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { getLink } from '@/utils/helpers';
import { useDispatch } from 'react-redux';
import { formatCurrency } from '@/utils/format';
import InfoTooltip from '@/components/InfoTooltip';
import VerifyTwModal from '@/modules/Whitelist/steps/VerifyTwModal';

const LoginTooltip = ({ onClose }: { onClose: any }) => {
  const user = useAppSelector(userSelector);
  const token = AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [showManualCheck, setShowManualCheck] = useState(false);
  const [showManualCheckModal, setShowManualCheckModal] = useState(false);

  useEffect(() => {
    if (authenCode?.public_code) {
      setSubmitting(true);
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 5000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [authenCode?.public_code]);

  useEffect(() => {
    if(token) {
      setShowManualCheckModal(false);
    }
  }, [token]);

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      const result = await generateTokenWithTwPost(
        authenCode?.secret_code as string,
      );
      onVerifyTwSuccess(result);
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    }
  };

  const onVerifyTwSuccess = (result: any) => {
    if (result) {
      clearInterval(timer.current);
      const twitterToken = AuthenStorage.getAuthenKey();
      if (!twitterToken || twitterToken !== result?.token) {
        AuthenStorage.setAuthenKey(result?.token);
        setBearerToken(result?.token);
      }
      setSubmitting(false);
      dispatch(requestReload());
      onClose();
    }
  };

  const generateLinkTweet = async () => {
    let code = '';
    if (!token) {
      const res: any = await requestAuthenByShareCode();
      setAuthenCode(res);
      code = `\n\n#${res?.public_code}`;
    }

    const shareUrl = !user?.referral_code ? 'bvm.network/public-sale' : getLink(user?.referral_code || '');

    const saleSummary = await getPublicSaleSummary();
    const content = `Welcome to the future of Bitcoin!\n\n@BVMnetwork is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain in a few clicks.\n\nJoin the ${formatCurrency(
      saleSummary.total_user || '0',
      0,
      0,
      'BTC',
      false,
    )} early contributors backing us with ${formatCurrency(
      saleSummary.total_usdt_value || '0',
      0,
      0,
      'BTC',
      false,
    )} to build the future of Bitcoin.${code}`;
    return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;
    //
    // if (token) {
    //
    // } else {
    //   const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;
    //   return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
    //     content,
    //   )}`;
    // }

  };

  const handleShareTw = async () => {
    const content = await generateLinkTweet();
    window.open(content, '_blank');

    setTimeout(() => {
      setShowManualCheck(true);
    }, 10000);
  };

  return (
    <>
      {
        !token && <InfoTooltip
          isStyleConfig={true}
          label={
          <Flex cursor={"pointer"} direction={"column"}
                fontSize={'14px !important'}
                fontWeight={400}
                color={'#000000'}
                gap={1}
          >
            <Text onClick={handleShareTw} fontSize={'14px !important'}><Text as={"span"} textDecoration={"underline"} fontSize={'14px !important'}>Sign in to X</Text> and claim your boost!</Text>
            {showManualCheck && (
              <Text
                cursor={'pointer'}
                textDecoration={'underline'}
                onClick={() => setShowManualCheckModal(true)}
                mt={1}
                fontSize={'14px !important'}
              >
                Can't link account?
              </Text>
            )}
          </Flex>
        }
          className={s.loginTooltip}
          bodyClassName={s.toolTipModal}
        />
      }
      <VerifyTwModal
        isShow={showManualCheckModal}
        onHide={() => {
          setShowManualCheckModal(false);
        }}
        secretCode={authenCode?.secret_code}
        onSuccess={onVerifyTwSuccess}
        title={`Can't link account?`}
      />
    </>
  );
};

export default LoginTooltip;
