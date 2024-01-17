import { Flex } from '@chakra-ui/react';
import ItemStep, { IItemCommunity, MultiplierStep } from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink, shareReferralURL } from '@/utils/helpers';
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
import { userSelector } from '@/stores/states/user/selector';
import copy from 'copy-to-clipboard';
import VerifyTwModal from '@/modules/Whitelist/steps/VerifyTwModal';

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
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();
  const needReload = useAppSelector(commonSelector).needReload
  const user = useAppSelector(userSelector);
  const [showManualCheck, setShowManualCheck] = useState(false);
  const { toggle: isCopied, onToggle: setIsCopied } = useToggle({ init: false })

  const handleShareTw = async () => {
    let code = '';
    if (!token) {
      const res: any = await requestAuthenByShareCode();
      setAuthenCode(res);
      code = `\n\n#${res?.public_code}`
    }

    const shareUrl = getLink('');
    const content = `Welcome to the future of Bitcoin with @bvmnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;

    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }

  const handleShareTwMore = async () => {
    const shareUrl = getLink(user?.referral_code);
    let content = '';

    content = `Welcome to the future of Bitcoin with bvm.network\n\nLaunch your Bitcoin L2 blockchain easily with @bvmnetwork - first modular blockchain meta-protocol.\n\n$BVM public sale starting soon.\n\nJoin the allowlist:`;

    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  }

  const handleShareRefferal = () => {
    if (!user?.referral_code) return;
    copy(shareReferralURL(user?.referral_code || ''));
    setIsCopied();
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
      setShowManualCheck(false);
    }
  }

  const handleShowManualPopup = () => {
    setShowManualCheck(true);
  }

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    const isActiveRefer = !!token && !!user?.referral_code;
    return (
      [
        {
          title: 'Tweet about BVM',
          desc: 'Tweet as often as you like & tag @bvmnetwork to rank up.',
          actionText: 'Post',
          image: "ic-x.svg",
          actionHandle: handleShareTw,
          isActive: true,
          step: MultiplierStep.authen,
          right: {
            title: '+1 PTS',
            desc: 'per view'
          },
          handleShowManualPopup: handleShowManualPopup,
        },
        {
          title: 'Refer a fren to BVM',
          desc: 'Spread the love to your frens, team, and communities.',
          actionText: isCopied ? 'Copied' : 'Copy your referral link',
          actionHandle: handleShareRefferal,
          isActive: isActiveRefer,
          step: MultiplierStep.post,
          image: "ic-heart.svg",
          right: {
            title: '+1000 PTS',
            desc: 'per friend'
          }
        },
        {
          title: 'Are you a Bitcoin OG?',
          desc: 'The more sats you have spent on Bitcoin, the more points you’ll get. Connect your Unisat or Xverse wallet to prove the account ownership.',
          actionText: 'How much have I spent on sats?',
          actionHandle: onToggleConnect,
          isActive: !!token,
          isDone: !!AllowListStorage.getStorage() && !!token,
          step: MultiplierStep.signMessage,
          image: "ic-btc.svg",
          right: {
            title: '+1 PTS',
            desc: 'per 1000 sats'
          }
        },
        // {
        //   title: 'Want to upgrade your multiplier faster? Complete the two tasks above to find out how!',
        // },
      ]
    )
  }, [token, needReload, user?.referral_code, isCopied]);

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied()
      }, 1500)
    }
  }, [isCopied])

  return (
    <Flex className={s.container} direction={"column"} gap={{
      base: "20px",
      md: "40px"
    }}>
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={index}
            index={index}
            content={item}
            isLoading={item.step === MultiplierStep.authen && submitting}
          />
        );
      })}
      <ConnectModal isShow={isShowConnect} onHide={onToggleConnect}/>
      <VerifyTwModal
        isShow={showManualCheck}
        onHide={() => {
          setShowManualCheck(false);
        }}
        secretCode={authenCode?.secret_code}
        onSuccess={onVerifyTwSuccess}
      />
    </Flex>
  );
};

export default Steps;
