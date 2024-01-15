import { Flex } from '@chakra-ui/react';
import ItemStep from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink } from '@/utils/helpers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { setBearerToken } from '@/services/whitelist';
import ConnectModal from '@/components/ConnectModal';
import useToggle from '@/hooks/useToggle';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';

interface IAuthenCode {
  public_code: string;
  secret_code: string;
}

interface IItem {
  title: string,
  desc: string,
  actionText: string,
  actionHandle: any,
  isActive?: boolean,
  isDone?: boolean,
}

const Steps = () => {
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = AuthenStorage.getAuthenKey();
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();
  const needReload = useAppSelector(commonSelector).needReload

  const handleShareTw = async () => {
    const res: any = await requestAuthenByShareCode();
    setAuthenCode(res);

    const shareUrl = getLink('');
    let content = '';

    content = `Welcome to the future of Bitcoin with @bvmnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon\n\n#${res?.public_code}\n\nJoin the allowlist`;

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

    content = `Welcome to the future of Bitcoin with @bvmnetwork.\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks.\n\n$BVM public sale starting soon.\n\nJoin the allowlist:`;

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


  const DATA_COMMUNITY = useMemo<IItem[]>(() => {
    return (
      [
        {
          title: 'Get your initial multiplier',
          desc: 'Post anything on X and tag @bvmnetwork',
          actionText: 'Post',
          actionHandle: handleShareTw,
          isActive: !token,
          isDone: !!token
        },
        {
          title: 'Level up your multiplier',
          desc: 'The more you post, the bigger multiplier you’ll get.',
          actionText: 'Post',
          actionHandle: handleShareTwMore,
          isActive: !!token,
        },
        {
          title: 'Verify your Bitcoin wallet',
          desc: 'The more gas you paid on Bitcoin, the higher the multiplier you receive!',
          actionText: 'Connect wallet',
          actionHandle: onToggleConnect,
          isActive: !!token,
          isDone: !!AllowListStorage.getStorage() && !!token,
        },
        // {
        //   title: 'Want to upgrade your multiplier faster? Complete the two tasks above to find out how!',
        // },
      ]
    )
  }, [token, needReload]);

  return (
    <Flex className={s.container} direction={"column"} gap={5} mt={4}>
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={index}
            index={index}
            content={item}
            isLoading={index === 0 && submitting}
            isActive={!!item.isActive}
          />
        );
      })}
      <ConnectModal isShow={isShowConnect} onHide={onToggleConnect}/>
    </Flex>
  );
};

export default Steps;
