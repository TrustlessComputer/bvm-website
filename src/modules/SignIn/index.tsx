import ToastOverlay from '@/components/ToastOverlay';
import { PERP_API_URL, TWITTER_CLIENT_ID } from '@/config';
import { INITIAL } from '@/constants/route-path';
import { BACKUP_PRV_KEY, KEY_TWITTER_TOKEN } from '@/constants/storage-key';
import { generateToken } from '@/services/player-share';
import CookieUtil from '@/utils/cookie';
import { getUuid } from '@/utils/helpers';
import localStorage from '@/utils/localstorage';
import { useEffect, useRef, useState } from 'react';
import CreateOrImportWallet from './CreateOrImportWallet';
import LogInWebOnAndroid from './LogInWebOnAndroid';
import s from './SignInView.module.scss';
import SignInForm from './Form';
import { Box } from '@chakra-ui/react';

export const SIGN_IN_MODAL = 'SIGN_IN_MODAL';

const SignInView = ({isLinkedTw = false}: {isLinkedTw: boolean}) => {
  const uuid = getUuid();

  const [_, setShowTrouble] = useState(false);
  const [hasLinkTwitter, setHasLinkTwitter] = useState<boolean>(isLinkedTw);
  const [showAuthorizeMethod, setShowAuthorizeMethod] = useState(true);
  const [isClickLinkTwitter, setIsClickLinkTwitter] = useState<boolean>(false);

  useEffect(() => {}, [showAuthorizeMethod]);

  const timer = useRef<any>();

  const URL = `${window.location.origin}${INITIAL}`;

  const getTwitterOauthUrl = () => {
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${PERP_API_URL}/twitter-api/oauth/twitter?callbackURL=${URL}&uuid=${uuid}`,
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
    return `${rootUrl}?${qs}`;
  };

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      const result = await generateToken(uuid);
      if (result) {
        clearInterval(timer.current);
        const twitterToken = localStorage.get(KEY_TWITTER_TOKEN);
        if (!twitterToken || twitterToken !== result?.token) {
          localStorage.set(KEY_TWITTER_TOKEN, result?.token);
          CookieUtil.set(KEY_TWITTER_TOKEN, result?.token);
        }
        setHasLinkTwitter(true);
      }
    } catch (e) {
      console.log('handleVerifyTwitter TwitterSignIn', e);
    }
  };

  useEffect(() => {
    if (
      (isClickLinkTwitter /*&& !wallet*/) ||
      (isClickLinkTwitter /*&& !profile?.twitterId*/)
    ) {
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [isClickLinkTwitter, /*wallet, profile*/]);

  useEffect(() => {
    window.localStorage.setItem(BACKUP_PRV_KEY, 'false');
  }, []);
  return (
    <div className={s.Wrapper}>
      <div className={s.SignInView_Wrapper}>
        {!hasLinkTwitter ? (
          <div>
            <SignInForm setShowTrouble={setShowTrouble} />
            {showAuthorizeMethod ? (
              <div>
                <LogInWebOnAndroid
                  link={getTwitterOauthUrl()}
                  setIsClickLinkTwitter={setIsClickLinkTwitter}
                  setShowAuthorizeMethod={setShowAuthorizeMethod}
                />
              </div>
            ) : (
              <div
                className={s.troubleText}
                onClick={() => setShowAuthorizeMethod((pre) => !pre)}
              >
                Have trouble...?
              </div>
            )}
          </div>
        ) :
        null}
        {hasLinkTwitter ? <CreateOrImportWallet showTitle={true} /> : null}
      </div>
    </div>
  );
};

const SignInWrapper = ({isLinkedTw}: any) => {
  return (
    <Box>
      <SignInView isLinkedTw={isLinkedTw}/>
      <ToastOverlay />
    </Box>
  );
};

export default SignInWrapper;
