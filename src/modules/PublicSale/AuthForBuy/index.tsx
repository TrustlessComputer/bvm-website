import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import AuthenStorage from '@/utils/storage/authen.storage';
import {
  generateTokenWithTwPost,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { getLink } from '@/utils/helpers';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { setBearerToken } from '@/services/whitelist';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import SvgInset from '@/components/SvgInset';
import copy from 'copy-to-clipboard';
import cs from 'classnames';
import BuyAsGuest from './buyAsGuest';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import BaseModal from '@/components/BaseModal';

interface IAuthForBuy extends PropsWithChildren {}

const AuthForBuy: React.FC<IAuthForBuy> = ({ children }) => {
  const user = useAppSelector(userSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = AuthenStorage.getAuthenKey();
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [isCopy, setIsCopy] = useState(false);
  const [isBuyGuest, setIsBuyGuest] = useState(false);

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

    const shareUrl = getLink(user?.referral_code || '');
    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;
    return `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
      content,
    )}`;
  };

  const handleShareTw = async () => {
    setIsCopy(false);
    const content = await generateLinkTweet();
    window.open(content, '_blank');
  };

  const onCopy = async () => {
    const content = await generateLinkTweet();
    setIsCopy(true);
    copy(content);
  };

  if (Boolean(user?.twitter_id)) {
    return children;
  }

  return (
    <>
      <Flex className={s.btnWrapper}>
        <Button
          onClick={() => {
            setIsBuyGuest(false);
            onOpen();
          }}
          type="button"
          className={s.btnContainer}
        >
          Tweet to Buy
        </Button>
        <Text>Or</Text>
        <Button
          onClick={() => {
            setIsBuyGuest(true);
            onOpen();
          }}
          type="button"
          className={cs(s.btnContainer, s.btnBuyAsGuest)}
        >
          Buy as guest
        </Button>
      </Flex>
      <BaseModal
        isShow={isOpen}
        onHide={onClose}
        title={isBuyGuest ? 'Buy as guest' : 'Tweet to Buy'}
        className={s.modalContent}
        headerClassName={s.modalHeader}
        size="small"
      >
        {isBuyGuest ? (
          <GoogleReCaptchaProvider
            reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
            scriptProps={{
              async: false,
              defer: false,
              appendTo: 'head',
              nonce: undefined,
            }}
          >
            <BuyAsGuest />
          </GoogleReCaptchaProvider>
        ) : (
          <>
            <Flex
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'20px'}
            >
              <Button
                isDisabled={submitting && !isCopy}
                isLoading={submitting && !isCopy}
                loadingText={'Processing'}
                type="button"
                onClick={handleShareTw}
              >
                Post to Sign in
              </Button>
              <Text>or</Text>
              <Flex onClick={onCopy} className={s.copyLinkContainer}>
                <Text>{isCopy ? 'Copied' : 'Copy link to Sign in'}</Text>
                <SvgInset svgUrl="/icons/ic-copy.svg" />
              </Flex>
            </Flex>
          </>
        )}
      </BaseModal>
    </>
  );
};

export default AuthForBuy;
