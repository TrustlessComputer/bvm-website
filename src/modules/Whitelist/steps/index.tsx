import { Flex } from '@chakra-ui/react';
import ItemStep from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink } from '@/utils/helpers';
import { useEffect, useMemo, useRef, useState } from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { setBearerToken } from '@/services/leaderboard';

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

    content = `I’ve joined @bvmnetwork, and I’m having a blast!\n\nThe features are top-notch and interface is simply intuitive. Plus, there are countless cool tools to build your community.\n\nI’m happy to hook you up right here:\n\n#${res?.public_code}\n\n`;

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

  const handleConnectWallet = () => {
  }

  const DATA_COMMUNITY = useMemo(() => {
    return (
      [
        {
          title: 'Share posts on X',
          desc: 'Follow @bvmnetwork, share valuable content, and tag @bvmnetwork on X to upgrade your multiplier.',
          actionText: currentStep > 0 ? 'Share More' : 'Share',
          actionHandle: handleShareTw,
        },
        // {
        //   title: 'Verify your Bitcoin wallet',
        //   desc: 'The more gas you paid on Bitcoin, the higher the multiplier you receive!',
        //   actionText: 'Connect Wallet',
        //   actionHandle: handleConnectWallet,
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
    </Flex>
  );
};

export default Steps;
