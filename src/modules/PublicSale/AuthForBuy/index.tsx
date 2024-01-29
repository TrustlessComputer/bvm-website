import BaseModal from '@/components/BaseModal';
import SvgInset from '@/components/SvgInset';
import { BVM_API, PERP_NAKA_API_URL, TWITTER_CLIENT_ID } from '@/config';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import {
  generateTokenWithTwPost,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { generateTokenWithOauth } from '@/services/public-sale';
import { setBearerToken } from '@/services/whitelist';
import { useAppSelector } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { getLink, getUuid } from '@/utils/helpers';
import AuthenStorage from '@/utils/storage/authen.storage';
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import cs from 'classnames';
import copy from 'copy-to-clipboard';
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import BuyAsGuest from './buyAsGuest';
import s from './styles.module.scss';
import DepositContent from '../depositModal/deposit.content';
import BtnCreateGuest from './btnCreateGuest';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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

  const uuid = getUuid();

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
      // onClose();
    }
  };

  useEffect(() => {
    if (!user?.twitter_id) {
      timer.current = setInterval(async () => {
        handleVerifyTwitterWithUUID();
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [user]);

  const handleVerifyTwitterWithUUID = async (): Promise<void> => {
    try {
      const result = await generateTokenWithOauth(uuid);
      if (result) {
        clearInterval(timer.current);
        if (!token || token !== result?.token) {
          onVerifyTwSuccess(result);
          setTimeout(() => {
            onOpen();
          }, 1000);
        }
      }
    } catch (e) {
      console.log('handleVerifyTwitter TwitterSignIn', e);
    }
  };

  const getTwitterOauthUrl = () => {
    const URL = `${window.location.origin}/public-sale`;
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${BVM_API}/twitter-api/oauth/twitter-bvm?callbackURL=${URL}&uuid=${uuid}`,
      client_id: TWITTER_CLIENT_ID,
      state: 'state',
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: [
        'users.read',
        'tweet.read',
        'follows.read',
        'offline.access',
      ].join(' '),
    };
    const qs = new URLSearchParams(options).toString();
    window.open(`${rootUrl}?${qs}`, '_self');
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

  const isSigned = useMemo(() => {
    if (user?.guest_code || user?.twitter_id) {
      return true;
    }
    return false;
  }, [user]);

  // if (user?.twitter_id || user?.guest_code) {
  //   return children;
  // }

  return (
    <>
      <Flex className={s.btnWrapper}>
        <Button
          onClick={() => {
            onOpen();
          }}
          type="button"
          className={s.btnContainer}
        >
          <SvgInset svgUrl="/icons/ic_twitter.svg" />
          Back $BVM
        </Button>
      </Flex>
      <BaseModal
        isShow={isOpen}
        onHide={onClose}
        title={isSigned ? 'Back $BVM' : 'Back $BVM'}
        headerClassName={s.modalHeader}
        className={cs(s.modalContent, isSigned ? s.deposit : s.notSignModal)}
        // size={modalSize}
      >
        {isSigned ? (
          <>
            <DepositContent />
          </>
        ) : (
          <>
            {isBuyGuest ? (
              <BuyAsGuest onBack={() => setIsBuyGuest(false)} />
            ) : (
              <>
                <Flex
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'16px'}
                >
                  <GoogleReCaptchaProvider
                    reCaptchaKey="6LdrclkpAAAAAD1Xu6EVj_QB3e7SFtMVCKBuHb24"
                    scriptProps={{
                      async: false,
                      defer: false,
                      appendTo: 'head',
                      nonce: undefined,
                    }}
                  >
                    <BtnCreateGuest />
                  </GoogleReCaptchaProvider>
                  <Flex
                    alignItems={'center'}
                    gap={'12px'}
                    justifyContent={'center'}
                    width={'100%'}
                    mt={'5px'}
                  >
                    <Text onClick={handleShareTw} className={s.link}>
                      Post to sign-in
                    </Text>
                    <Text fontSize={'12px'} opacity={0.7}>
                      Or
                    </Text>
                    <Text onClick={getTwitterOauthUrl} className={s.link}>
                      Authorize to sign-in
                    </Text>
                  </Flex>
                  {/* <Button
                    isDisabled={submitting && !isCopy}
                    loadingText={'Processing'}
                    type="button"
                    onClick={handleShareTw}
                    className={cs(s.btnTweetToSign, s.btnPrimary)}
                  >
                    <Center className={cs(s.boxIcon, s.boxIconWhite)}>
                      {submitting ? (
                        <Spinner
                          color="#fa4e0e"
                          width={'16px'}
                          height={'16px'}
                        />
                      ) : (
                        <SvgInset svgUrl="/icons/ic_twitter_square.svg" />
                      )}
                    </Center>
                    <Text>Post to Sign in</Text>
                  </Button>
                  <Button
                    loadingText={'Processing'}
                    type="button"
                    onClick={getTwitterOauthUrl}
                    className={cs(s.btnTweetToSign)}
                  >
                    <Center className={s.boxIcon}>
                      <SvgInset
                        className={s.iconWhite}
                        svgUrl="/icons/ic-copy.svg"
                        size={16}
                      />
                    </Center>
                    <Text>Auth to sign</Text>
                  </Button> */}

                  <Box />
                </Flex>
              </>
            )}
          </>
        )}
      </BaseModal>
    </>
  );
};

export default AuthForBuy;
