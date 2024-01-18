import { Flex } from '@chakra-ui/react';
import ItemStep, { IItemCommunity, MultiplierStep } from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink, shareBTCOG, shareReferralURL } from '@/utils/helpers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { requestClaimBTCPoint, setBearerToken } from '@/services/whitelist';
import ConnectModal from '@/components/ConnectModal';
import useToggle from '@/hooks/useToggle';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { userSelector } from '@/stores/states/user/selector';
import copy from 'copy-to-clipboard';
import VerifyTwModal from '@/modules/Whitelist/steps/VerifyTwModal';
import ConnectModalEVM from '@/components/ConnectModal/modal.evm';
import useFormatAllowBTC from '@/modules/Whitelist/AllowBTCMessage/useFormatAllowBTC';
import { formatCurrency } from '@/utils/format';

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
  const { toggle: isShowConnectEVM, onToggle: onToggleConnectEVM } = useToggle();
  const { amount, isUnclaimed, isProcessing, status } = useFormatAllowBTC()

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
    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;

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

    content = `Welcome to the future of Bitcoin with bvm.network\n\nLaunch your Bitcoin L2 blockchain easily with @BVMnetwork - first modular blockchain meta-protocol.\n\n$BVM public sale starting soon.\n\nJoin the allowlist:`;

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
    const btcOGMessage = amount.txsCount ?
        <p>You’re a true Bitcoiner. You’ve spent {<span>{formatCurrency(amount.fee, 0, 6, 'BTC')}</span>} BTC on transaction fees. Your total reward is {<span>{formatCurrency(amount.point, 0)}</span>} pts.</p>:
        'The more sats you have spent on Bitcoin, the more points you’ll get. Connect your Unisat or Xverse wallet to prove the account ownership.';
    const isNeedClaim = isUnclaimed && amount.unClaimedPoint && !!amount.txsCount && !isProcessing;
    return (
      [
        {
          title: 'Tweet about BVM',
          desc: 'Tweet as often as you like & tag @BVMnetwork to rank up.',
          actionText: 'Post',
          image: "ic-x.svg",
          actionHandle: handleShareTw,
          isActive: true,
          step: MultiplierStep.authen,
          right: {
            title: !token ? '+1000 PTS' : '+1 PTS',
            desc: !token ? 'first post' : 'per view'
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
          desc: btcOGMessage,
          actionText: isNeedClaim ? `Tweet to claim ${amount.unClaimedPoint} pts` : 'How much have I spent on sats?',
          actionHandle: isNeedClaim ? async () => {
            try {
              shareBTCOG({ fee: amount.fee, feeUSD: amount.feeUSD });
              await requestClaimBTCPoint(status)
              dispatch(requestReload())
            } catch (error) {
              
            }
          } : onToggleConnect,
          actionTextSecondary: isNeedClaim ? "Verify another wallet" : undefined,
          actionHandleSecondary: isNeedClaim ? onToggleConnect : undefined,
          isActive: !!token,
          isDone: !!AllowListStorage.getStorage() && !!token,
          step: MultiplierStep.signMessage,
          image: "ic-btc.svg",
          right: {
            title: '+10 PTS',
            desc: 'per 1000 sats'
          }
        },
        // {
        //   title: 'Are you a Modular Blockchain OG?',
        //   desc: 'You’re a visionary. You’re a pioneer. Holding at least XXX tokens of the following modular blockchains will give you more points: Optimism, Celestia, and Polygon.',
        //   actionText: 'How modular are you?',
        //   actionHandle: onToggleConnectEVM,
        //   isActive: !!token,
        //   isDone: !!AllowListStorage.getStorage() && !!token,
        //   step: MultiplierStep.signMessage,
        //   image: "ic-modular-blockchain.svg",
        //   right: {
        //     title: '+10 PTS',
        //     desc: 'per project'
        //   }
        // },
        // {
        //   title: 'Want to upgrade your multiplier faster? Complete the two tasks above to find out how!',
        // },
      ]
    )
  }, [token, needReload, user?.referral_code, isCopied, amount, isUnclaimed, isProcessing]);

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
      <ConnectModalEVM isShow={isShowConnectEVM} onHide={onToggleConnectEVM}/>
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
