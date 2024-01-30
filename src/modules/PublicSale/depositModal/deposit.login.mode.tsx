import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import cs from 'classnames';
import { useAppSelector } from '@/stores/hooks';
import AuthenStorage from '@/utils/storage/authen.storage';
import { BVM_API, TWITTER_CLIENT_ID } from '@/config';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import {
  generateTokenWithTwPost,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { generateTokenWithOauth } from '@/services/public-sale';
import { setBearerToken } from '@/services/whitelist';
import { requestReload } from '@/stores/states/common/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { getUuid, getLink } from '@/utils/helpers';
import { useDispatch } from 'react-redux';

const DepositLoginMode = ({ onClose }: { onClose: any }) => {
  const user = useAppSelector(userSelector);
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
      onClose();
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

  return (
    <Flex mt={5} gap={'12px'}>
      <Button
        onClick={handleShareTw}
        className={cs(s.btnTweetToSign, s.btnPrimary)}
      >
        <Text>Post to sign-in</Text>
      </Button>
      <Button onClick={getTwitterOauthUrl} className={cs(s.btnTweetToSign)}>
        <Text>Authorize to sign-in</Text>
      </Button>
    </Flex>
  );
};

export default DepositLoginMode;
