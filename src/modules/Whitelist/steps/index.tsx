import { Flex } from '@chakra-ui/react';
import ItemStep, { IItemCommunity, MultiplierStep, StepTagType } from './Step';
import s from './styles.module.scss';
import { generateTokenWithTwPost, requestAuthenByShareCode } from '@/services/player-share';
import { getLink, shareBTCOG, shareReferralURL } from '@/utils/helpers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthenStorage from '@/utils/storage/authen.storage';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import {
  requestClaimBTCPoint,
  requestClaimCelestiaPoint,
  requestClaimEVMPoint,
  setBearerToken,
  verifyEVMSignature,
} from '@/services/whitelist';
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
import useFormatAllowCelestia from '@/modules/Whitelist/AllowCelestiaMessage/useFormatAllowCelestia';
import BigNumber from 'bignumber.js';
import ConnectModalModular from '@/components/ConnectModal/modal.modular';
import { getError } from '@/utils/error';
import toast from 'react-hot-toast';
import { getEVMNetworkByFieldType } from '@/modules/Whitelist/utils';
import useFormatAllowEVM from '@/modules/Whitelist/AllowEVMMessage/useFormatAllowEVM';
import { signMessage as signEVMMessage } from '@/utils/metamask-helper';
import { EVMFieldType } from '@/stores/states/user/types';

export interface IAuthenCode {
  public_code: string;
  secret_code: string;
}

export const STEP_ID = 'STEP_ID'

const Steps = () => {
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = AuthenStorage.getAuthenKey();
  const { toggle: isShowConnect, onToggle: onToggleConnect } = useToggle();
  const { toggle: isShowConnectEVM, onToggle: onToggleConnectEVM } = useToggle();
  const { toggle: isShowConnectModular, onToggle: onToggleConnectModular } = useToggle();
  const allowBTC = useFormatAllowBTC()
  const allowCelestia = useFormatAllowCelestia()
  const allowOptimism = useFormatAllowEVM({ type: "allowOptimism" })

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

    const shareUrl = getLink(user?.referral_code || '');
    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    }, 200)

  }

  const onShareModular = () => {
    const shareUrl = getLink(user?.referral_code || '');
    const minAmount = 0.0001;

    let tiaAmount = '';
    let maticAmount = '';
    let mantaAmount = '';
    let ethAmount = '';

    if (new BigNumber(allowCelestia.amount.celestiaAmount || 0).gt(minAmount)) {
      tiaAmount = `\n • ${formatCurrency(allowCelestia.amount.celestiaAmount, 0, 4)} TIA`;
    }

    if (new BigNumber(allowCelestia.amount.polygonAmount || 0).gt(minAmount)) {
      maticAmount = `\n • ${formatCurrency(allowCelestia.amount.polygonAmount, 0, 4)} MATIC`;
    }

    if (new BigNumber(allowCelestia.amount.mantaAmount || 0).gt(minAmount)) {
      mantaAmount = `\n • ${formatCurrency(allowCelestia.amount.mantaAmount, 0, 4)} MANTA`;
    }

    if (new BigNumber(allowCelestia.amount.eigenlayerAmount || 0).gt(minAmount)) {
      ethAmount = `\n • ${formatCurrency(allowCelestia.amount.eigenlayerAmount, 0, 4)} ETH`;
    }

    const content = `BUILD WHATEVER ON BITCOIN.\n\nI'm holding and staking:\n${tiaAmount}${maticAmount}${mantaAmount}${ethAmount}\n\nAs a modular maxi, I’m excited to see Modular Blockchains arrive on Bitcoin powered by @BVMnetwork\n\nLet's build!\n`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    }, 200)
  }

  const onShareOptimism = () => {
    const shareUrl = getLink(user?.referral_code || '');

    let op = '';
    let arb = '';
    let base = '';

    const MIN = 0.0001

    if (new BigNumber(allowOptimism.amount.fee || 0).gt(MIN)) {
      op = `\n • ${formatCurrency(new BigNumber(allowOptimism.amount.fee || 0).toFixed(), 0, 6)} $OP`
    }

    if (new BigNumber(allowOptimism.amount.arbAmount || 0).gt(MIN)) {
      arb = `\n • ${formatCurrency(new BigNumber(allowOptimism.amount.arbAmount || 0).toFixed(), 0, 6)} $ARB`
    }

    if (new BigNumber(allowOptimism.amount.blastAmount || 0).plus(allowOptimism.amount.baseAmount || 0).gt(MIN)) {
      base = `\n • ${formatCurrency(new BigNumber(allowOptimism.amount.blastAmount || 0).plus(allowOptimism.amount.baseAmount || 0).toFixed(), 0, 6)} $ETH bridged to @Blast_L2 & @base`
    }

    const content = `Here is my Ethereum L2 bag:\n${op}${arb}${base}\n\nAnd I can’t wait to stack my Bitcoin L2 bag.\n\nThousands of Bitcoin L2s are arriving, thanks to @BVMnetwork.\n`;

    setTimeout(() => {
      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );
    }, 200)
  }

  const onSignModular = async () => {
    onToggleConnectModular();
  }

  const onSignEVM = async (type: EVMFieldType) => {
    try {
      const { message, signature, address } = await signEVMMessage('Are you an L2 maxi?');
      await verifyEVMSignature({
        message,
        signature,
        address,
        network: getEVMNetworkByFieldType(type)
      });
      dispatch(requestReload());
      toast.success('Successfully.')
    } catch (error) {
      const { message } = getError(error);
      toast.error(message);
    }
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
    const btcOGMessage = allowBTC.amount.txsCount ?
      <p>You’re a true Bitcoiner. You’ve spent {<span>{formatCurrency(allowBTC.amount.fee, 0, 6, 'BTC')}</span>} BTC on transaction fees. Your total reward is {<span>{formatCurrency(allowBTC.amount.point, 0)}</span>} pts.</p>:
      'The more sats you have spent on Bitcoin, the more points you’ll get. Connect your Unisat or Xverse wallet to prove the account ownership.';
    const isNeedClaimBTCPoint = allowBTC.isUnclaimed;
    const isNeedClaimCelestiaPoint = allowCelestia.isUnclaimed;
    const isNeedClaimOptimismPoint = allowOptimism.isUnclaimed;
    const authenTask =  {
      title: 'Tweet about BVM',
      desc: 'Tweet as often as you like & tag @BVMnetwork to rank up.',
      actionText: 'Post',
      image: "ic-x.svg",
      actionHandle: handleShareTw,
      isActive: true,
      step: MultiplierStep.authen,
      right: {
        title: !token ? '+1000 PTS' : '+1000 PTS',
        desc: !token ? 'first post' : 'per 1000 view'
      },
      handleShowManualPopup: handleShowManualPopup,
    };
    const tasks = [
      {
        title: 'Are you an L2 maxi?',
        desc: 'The more Optimism (OP) or Arbitrum (ARB) tokens you hold, the more ETH you stake on Blast or Base, the more points you’ll earn. Connect your MetaMask wallet to prove account ownership.',
        actionText: isNeedClaimOptimismPoint ? `Tweet to claim ${formatCurrency(allowOptimism.amount.unClaimedPoint, 0, 0)} pts` : 'How L2 maxi are you?',
        actionHandle: isNeedClaimOptimismPoint ? async () => {
          onShareOptimism();
          await requestClaimEVMPoint({
            status: allowOptimism.status,
            network: getEVMNetworkByFieldType('allowOptimism')
          })
          dispatch(requestReload())
        } : () => {
          onSignEVM('allowOptimism')
        },
        actionTextSecondary: isNeedClaimOptimismPoint ? "Verify another wallet" : undefined,
        actionHandleSecondary: isNeedClaimOptimismPoint ? () => {
          onSignEVM('allowOptimism')
        } : undefined,
        isActive: !!token,
        isDone: !!token,
        step: MultiplierStep.evm,
        image: "ic-l2.svg",
        tag: StepTagType.NEW,
        right: {
          title: '+100 PTS',
          desc: 'per Ξ 0.005 or 4 OP or 8 ARB'
        }
      },
      {
        title: 'Are you a Modular pioneer?',
        desc: 'You’ll earn more points if you hold TIA, MANTA, or MATIC or you stake ETH on Eigen. Connect your Keplr, Leap, or MetaMask wallet to prove the account ownership.',
        actionText: isNeedClaimCelestiaPoint ? `Tweet to claim ${formatCurrency(allowCelestia.amount.unClaimedPoint, 0, 0)} pts` : 'How modular are you?',
        actionHandle: isNeedClaimCelestiaPoint ? async () => {
          onShareModular();
          await requestClaimCelestiaPoint(allowCelestia.status)
          dispatch(requestReload())
        } : onSignModular,
        actionTextSecondary: isNeedClaimCelestiaPoint ? "Verify another wallet" : undefined,
        actionHandleSecondary: isNeedClaimCelestiaPoint ? onSignModular : undefined,
        isActive: !!token,
        isDone: !!token,
        step: MultiplierStep.modular,
        image: "ic-modular2.svg",
        right: {
          title: '+100 PTS',
          desc: 'per 1 TIA\nor Ξ 0.005\nor 20 MATIC\nor 6 MANTA'
        },
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
        actionText: isNeedClaimBTCPoint ? `Tweet to claim ${formatCurrency(allowBTC.amount.unClaimedPoint, 0, 0)} pts` : 'How much have I spent on sats?',
        actionHandle: isNeedClaimBTCPoint ? async () => {
          try {
            shareBTCOG({ fee: allowBTC.amount.fee, feeUSD: allowBTC.amount.feeUSD, refCode: user?.referral_code || '' });
            await requestClaimBTCPoint(allowBTC.status)
            dispatch(requestReload())
          } catch (error) {

          }
        } : onToggleConnect,
        actionTextSecondary: isNeedClaimBTCPoint ? "Verify another wallet" : undefined,
        actionHandleSecondary: isNeedClaimBTCPoint ? onToggleConnect : undefined,
        isActive: !!token,
        isDone: !!AllowListStorage.getStorage() && !!token,
        step: MultiplierStep.signMessage,
        image: "ic-btc-2.svg",
        right: {
          title: '+10 PTS',
          desc: 'per 1000 sats'
        }
      },
    ];
    if (token) {
      tasks.push(authenTask)
    } else {
      tasks.unshift(authenTask)
    }
    return tasks
  }, [
    token,
    needReload,
    user?.referral_code,
    isCopied,
    JSON.stringify(allowBTC.status || {}),
    allowBTC.amount,
    allowBTC.isUnclaimed,
    allowBTC.isProcessing,
    allowCelestia.amount,
    allowCelestia.isUnclaimed,
    allowCelestia.isProcessing,
    JSON.stringify(allowCelestia.status || {}),

    allowOptimism.amount,
    allowOptimism.isUnclaimed,
    allowOptimism.isProcessing,
    JSON.stringify(allowOptimism.status || {}),
  ]);

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied()
      }, 1500)
    }
  }, [isCopied])

  return (
    <Flex
      className={s.container}
      direction={"column"}
      gap={{ base: "20px", md: "40px" }}
      id={STEP_ID}
    >
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={item.step}
            index={index}
            content={item}
            isLoading={item.step === MultiplierStep.authen && submitting}
          />
        );
      })}
      <ConnectModal isShow={isShowConnect} onHide={onToggleConnect}/>
      <ConnectModalEVM isShow={isShowConnectEVM} onHide={onToggleConnectEVM}/>
      <ConnectModalModular isShow={isShowConnectModular} onHide={onToggleConnectModular}/>
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
