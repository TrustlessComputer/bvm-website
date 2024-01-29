import { useAppSelector } from '@/stores/hooks';
import { userSelector } from '@/stores/states/user/selector';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { compareString } from '@/utils/string';

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

  const modalSize = useMemo(() => {
    if (user?.guest_code || user?.twitter_id) {
      return 'custom';
    }
    return 'small';
  }, [user, isBuyGuest]);

  if (Boolean(user?.twitter_id)) {
    return children;
  }

  return (
    <>
      <Grid className={s.btnWrapper}>
        <GridItem>
          <Button
            onClick={() => {
              setIsBuyGuest(false);
              onOpen();
            }}
            type="button"
            className={s.btnContainer}
          >
            <SvgInset svgUrl="/icons/ic_twitter.svg" />
            Tweet to Sign
          </Button>
        </GridItem>
        <GridItem>
          <Button
            onClick={() => {
              setIsBuyGuest(true);
              onOpen();
            }}
            type="button"
            className={cs(s.btnContainer, s.btnBuyAsGuest)}
          >
            <SvgInset svgUrl="/icons/ic_guest.svg" />
            Buy as Guest
          </Button>
        </GridItem>
      </Grid>
      <BaseModal
        isShow={isOpen}
        onHide={onClose}
        title={isBuyGuest ? 'Buy as guest' : 'Tweet to Sign'}
        headerClassName={s.modalHeader}
        className={cs(
          s.modalContent,
          compareString(modalSize, 'custom') && s.deposit,
        )}
        size={modalSize}
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
              gap={'16px'}
            >
              <Button
                isDisabled={submitting && !isCopy}
                isLoading={submitting && !isCopy}
                loadingText={'Processing'}
                type="button"
                onClick={handleShareTw}
                className={cs(s.btnTweetToSign, s.btnPrimary)}
              >
                <SvgInset svgUrl="/icons/ic_twitter_square.svg" />
                Post to Sign in
              </Button>
              <Button
                isDisabled={submitting && !isCopy}
                isLoading={submitting && !isCopy}
                loadingText={'Processing'}
                type="button"
                onClick={onCopy}
                className={s.btnTweetToSign}
              >
                <Center className={s.boxIcon}>
                  <SvgInset size={16} svgUrl="/icons/ic-copy.svg" />
                </Center>
                {isCopy ? 'Copied' : 'Copy link to Sign in'}
              </Button>
              <Box />
              {/* <Flex onClick={onCopy} className={s.copyLinkContainer}>
                <Text>{isCopy ? 'Copied' : 'Copy link to Sign in'}</Text>
                <SvgInset svgUrl="/icons/ic-copy.svg" />
              </Flex> */}
            </Flex>
          </>
        )}
      </BaseModal>
    </>
  );
};

export default AuthForBuy;
