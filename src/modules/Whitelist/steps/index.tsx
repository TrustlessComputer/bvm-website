import { Flex } from '@chakra-ui/react';
import ItemStep from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink } from '@/utils/helpers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { setBearerToken } from '@/services/leaderboard';
import ConnectModal from '@/components/ConnectModal';
import useToggle from '@/hooks/useToggle';

interface IAuthenCode {
  public_code: string;
  secret_code: string;
}

const Steps = () => {
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = AuthenStorage.getAuthenKey();
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle()

  const currentStep = useMemo(() => {
    if(!!token) {
      return 1;
    }
    return 0;
  }, [token]);

  const handleShareTw = async () => {
    const res: any = await requestAuthenByShareCode();
    setAuthenCode(res);

    const shareUrl = getLink('');
    let content = '';

    content = `I've discover the future of Bitcoin: @bvmnetwork\n\nBVM is the 1st modular blockchain meta protocol. And its public sale is starting soon.\n\nJoin the allowlist today!\n\n#${res?.public_code}\n\n`;

    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }

  const handleShareTwMore = async () => {
    const shareUrl = getLink('');
    let content = '';

    content = `I've discover the future of Bitcoin: @bvmnetwork\n\nBVM is the 1st modular blockchain meta protocol. And its public sale is starting soon.\n\nJoin the allowlist today!\n\n`;

    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }

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
      const result = await generateTokenWithTwPost(authenCode?.secret_code as string);
      if (result) {
        clearInterval(timer.current);
        const twitterToken = AuthenStorage.getAuthenKey();
        if (!twitterToken || twitterToken !== result?.token) {
          AuthenStorage.setAuthenKey(result?.token);
          setBearerToken(result?.token);
        }
        setSubmitting(false);
        dispatch(requestReload());
        // setHasLinkTwitter(true);
        // setShowTrouble && setShowTrouble(false);

        // if (twProfile?.issued) {
        //   gaEventTracker(
        //     AlphaActions.PostTweetSignInSuccessTw,
        //     JSON.stringify({
        //       info: {
        //         twitter_username: twProfile?.twitter_username,
        //       },
        //     }),
        //   );
        // } else {
        //   gaEventTracker(
        //     AlphaActions.PostTweetSignUpSuccessTw,
        //     JSON.stringify({
        //       info: {
        //         twitter_username: twProfile?.twitter_username,
        //       },
        //     }),
        //   );
        // }

        // try {
        //   getReferralCode();
        // } catch (e) {
        //   console.log('getReferralCode', e);
        // }
      }
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    }
  };


  const DATA_COMMUNITY = useMemo(() => {
    return (
      [
        {
          title: 'Share posts on X',
          desc: 'Follow @bvmnetwork, share valuable content, and tag @bvmnetwork on X to unlock your starting multiplier.',
          actionText: 'Share',
          actionHandle: handleShareTw,
        },
        {
          title: 'The more you post, the more points you earn.',
          desc: 'The number of posts is unlimited. All you need to do is create a post on X, tag @bvmnetwork, earn more points with higher post engagement to upgrade your multiplier.',
          actionText: 'Share More',
          actionHandle: handleShareTwMore,
        },
        // {
        //   title: 'Verify your Bitcoin wallet',
        //   desc: 'The more gas you paid on Bitcoin, the higher the multiplier you receive!',
        //   actionText: 'Connect Wallet',
        //   actionHandle: onToggleConnect,
        // },
        // {
        //   title: 'Want to upgrade your multiplier faster? Complete the two tasks above to find out how!',
        // },
      ]
    )
  }, [currentStep]);

  console.log('currentStep', currentStep);

  return (
    <Flex className={s.container} direction={"column"} gap={5} mt={4}>
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={index}
            index={index}
            delay={0.4 + index / 10}
            content={item}
            isLoading={index === 0 && submitting}
            currentStep={currentStep}
          />
        );
      })}
      <ConnectModal isShow={isShowConnect} onHide={onToggleConnect}/>
    </Flex>
  );
};

export default Steps;
