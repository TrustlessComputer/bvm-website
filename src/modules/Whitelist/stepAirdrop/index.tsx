import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ItemStep, { AirdropStep, AirdropType, IItemCommunity } from './Step';
import s from './styles.module.scss';
import {
  generateTokenWithTwPost,
  getBVMAirdrop,
  getGenerativeProfile,
  getRaffleJoin,
  joinRaffle,
  requestAuthenByShareCode,
} from '@/services/player-share';
import styles from '@/modules/Whitelist/leaderBoard/styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import { LearnMore } from '@/modules/Whitelist/stepsEco';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { userSelector } from '@/stores/states/user/selector';
import { getLink } from '@/utils/helpers';
import { setBearerToken } from '@/services/whitelist';
import { requestReload } from '@/stores/states/common/reducer';
import { useDispatch } from 'react-redux';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import { setAirdropAlphaUsers } from '@/stores/states/user/reducer';
import { signMessage } from '@/utils/metamask-helper';
import ConnectModal from '@/components/ConnectModal';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import AirdropStorage from '@/utils/storage/airdrop.storage';

export const getMessageEVM = (address: string) => {
  return `Verify you are the owner of the wallet ${address}`;
}

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-24 08:00:00';

interface IProps {
  setIndex: (_: number) => void
}

const StepsAirdrop = (props: IProps) => {
  const {setIndex} = props;
  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;
  const [raffleCode, setRaffleCode] = useState();
  const user = useAppSelector(userSelector);
  const timer = useRef<any>();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [authenCode, setAuthenCode] = useState<IAuthenCode>();
  const [showManualCheck, setShowManualCheck] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    if(token) {
      getRaffleJoinInfo();
    }
  }, [token, needReload]);

  useEffect(() => {
    if(user?.twitter_id) {
      getAlphaUsersAirdrop();
    }
  }, [user?.twitter_id]);

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoin();
    setRaffleCode(res);
  };

  const handleShareTw = async () => {
    if(token) {
      window.open(
        `https://twitter.com/BVMnetwork/status/1748299995898691711`,
        '_blank',
      );

      joinRaffle();
      setTimeout(() => {
        getRaffleJoinInfo();
      }, 1000);
    } else {
      setIndex(0);
    }
  };

  const handleClaimRetrospective = () => {

  }

  const getAlphaUsersAirdrop = async () => {
    const res = await getBVMAirdrop({address: user?.twitter_id});
    dispatch(setAirdropAlphaUsers(res));
  }

  const handleShareTwToSignIn = async () => {
    let code = '';
    const res: any = await requestAuthenByShareCode();
    setAuthenCode(res);
    code = `\n\n#${res?.public_code}`

    const shareUrl = getLink( '');
    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;

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

  const handleVerifyWallet = async () => {
    const {address, signature, message} = await signMessage(getMessageEVM);

    const resGMHolders = await getBVMAirdrop({address: address});
    AirdropStorage.setIsConnectMetaMask(true);
    AirdropStorage.setAirdropGMHolders(resGMHolders);

    const generativeProfile = await getGenerativeProfile(address);

    if (generativeProfile?.walletAddressBtcTaproot) {
      const resGenerativeUsers = await getBVMAirdrop({address: generativeProfile?.walletAddressBtcTaproot});
      AirdropStorage.setAirdropGenerativeUsers(resGenerativeUsers);
    }
  }

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      // {
      //   title: 'Generative users',
      //   desc: `Proportional to key holding.<br/>
      //     Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
      //  `,
      //   actionText: 'Claim',
      //   image: "time-chain2.svg",
      //   actionHandle: handleClaimRetrospective,
      //   isActive: true,
      //   isDisable: true,
      //   right: {
      //     title: '',
      //     desc: '',
      //   },
      //   expiredTime: PUBLIC_SALE_START,
      //   showExpireTime: false,
      //   airdropType: AirdropType.RETROSPECTIVE
      // },
      // {
      //   title: 'Perceptrons holders',
      //   desc: `Proportional to the number of Perceptrons you hold.<br/>
      //     Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
      //  `,
      //   actionText: 'Claim',
      //   image: "perceptron_thumb_03.jpg",
      //   actionHandle: handleClaimRetrospective,
      //   isActive: true,
      //   isDisable: true,
      //   right: {
      //     title: '',
      //     desc: '',
      //   },
      //   expiredTime: PUBLIC_SALE_START,
      //   showExpireTime: false,
      //   airdropType: AirdropType.RETROSPECTIVE
      // },
      // {
      //   title: 'GM holders',
      //   desc: `Proportionally based on GM balance - min holding: 0.01 $GM<br/>
      //     Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
      //  `,
      //   actionText: 'Claim',
      //   image: "gm.svg",
      //   actionHandle: handleClaimRetrospective,
      //   isActive: true,
      //   isDisable: true,
      //   right: {
      //     title: '',
      //     desc: '',
      //   },
      //   expiredTime: PUBLIC_SALE_START,
      //   showExpireTime: false,
      //   airdropType: AirdropType.RETROSPECTIVE
      // },
      {
        title: 'Modular',
        desc: `Playing with Lego at BVM network.
          ${LearnMore('https://playmodular.com/')}
        `,
        actionText: 'Coming soon',
        image: "ic-lego.svg",
        actionHandle: () => undefined,
        isDisableButton: true,
        isActive: true,
        right: {
          title: '',
          desc: '',
        },
        airdropType: AirdropType.NONE
      },
      {
        title: 'Airdrop',
        desc: `Thanks for supporting our 2023 'testnet'. In 2024 mainnet, an airdrop awaits users of BVM products like Generative, Perceptrons, GM, Alpha, and all TC users.<br/>Snapshot on Jan 16, 2024.<br/>Claimable on Jan 30, 2024.`,
        actionText: 'Claim',
        image: "ic-airdrop1.svg",
        actionHandle: handleClaimRetrospective,
        isActive: true,
        isDisable: true,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: PUBLIC_SALE_START,
        showExpireTime: false,
        airdropType: AirdropType.RETROSPECTIVE
      },
      {
        title: 'Timechain',
        desc: `Like and repost to enter a raffle for a Timechain (Inscription ID: 39554) - the first long-form generative art collection on Ordinals.
          ${LearnMore('https://twitter.com/punk3700/status/1623708934107430913')}
        `,
        actionText: 'View result',
        actionTextEnd: 'View result',
        image: "time-chain2.svg",
        actionHandle: handleShareTw,
        isActive: true,
        right: {
          title: '',
          // title: (
          //   <Flex alignItems={"center"} gap={"4px"} fontSize={"16px"}>
          //     Winner:
          //     <a href={"https://twitter.com/nftsupply/"} target={"_blank"} style={{textDecoration: 'underline'}}>
          //       NFTSupply
          //     </a>
          //   </Flex>
          // ),
          desc: '',
          // tooltip: (
          //   <Tooltip
          //     minW="220px"
          //     bg="white"
          //     boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
          //     borderRadius="4px"
          //     padding="8px"
          //     label={
          //       <Flex direction="column" color="black" opacity={0.7}>
          //         <p>
          //           At the end of the events, the list of qualified users (those who liked and reposted) will be collected, and a winner will be chosen at random using the raffle code.
          //         </p>
          //       </Flex>
          //     }
          //   >
          //     <img
          //       className={styles.tooltipIcon}
          //       src={`${CDN_URL_ICONS}/info-circle.svg`}
          //     />
          //   </Tooltip>
          // )
        },
        // result: (
        //   <Flex alignItems={"center"} gap={"4px"} fontSize={"16px"} color={"#000000"}>
        //     <img src='/icons/winner.png' alt='drag' />
        //     Winner:
        //     <img src='https://pbs.twimg.com/profile_images/1745826527650971648/joB2i1fN_200x200.jpg' alt='drag' />
        //     <a href={"https://twitter.com/nftsupply/"} target={"_blank"} style={{textDecoration: 'underline', fontWeight: 700}}>
        //       NFTSupply
        //     </a>
        //   </Flex>
        // ),
        // expiredTime: TIME_CHAIN_EXPIRED_TIME,
        // showExpireTime: true,
        airdropType: AirdropType.NONE,
        step: AirdropStep.timeChain,
      },
      {
        title: 'Generative users',
        desc: `Proportional to key holding.<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Connect your Metamask',
        image: "time-chain2.svg",
        actionHandle: handleVerifyWallet,
        isActive: true,
        isDisable: true,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: PUBLIC_SALE_START,
        showExpireTime: false,
        airdropType: AirdropType.RETROSPECTIVE,
        step: AirdropStep.generativeUsers,
      },
      {
        title: 'Perceptrons holders',
        desc: `Proportional to the number of Perceptrons you hold.<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Connect your Metamask',
        image: "perceptron_thumb_03.jpg",
        actionHandle: handleVerifyWallet,
        isActive: true,
        isDisable: true,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: PUBLIC_SALE_START,
        showExpireTime: false,
        airdropType: AirdropType.RETROSPECTIVE,
        step: AirdropStep.perceptronsHolders,
        actionHandleSecondary: () => {
          setShowConnectModal(true);
        },
        actionTextSecondary: 'Verify another wallet',
      },
      {
        title: 'GM holders',
        desc: `Proportionally based on GM balance - min holding: 0.01 $GM<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Connect your Metamask',
        image: "gm.svg",
        actionHandle: handleVerifyWallet,
        isActive: true,
        isDisable: true,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: PUBLIC_SALE_START,
        showExpireTime: false,
        airdropType: AirdropType.RETROSPECTIVE,
        step: AirdropStep.gmHolders,
      },
      {
        title: 'Alpha users',
        desc: `Proportionally based on Airdrop Points - min Airdrop Points: 50,000<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: !token ? 'Link account' : undefined,
        image: "alpha.svg",
        actionHandle: handleShareTwToSignIn,
        isActive: true,
        isDisable: true,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: PUBLIC_SALE_START,
        showExpireTime: false,
        airdropType: AirdropType.RETROSPECTIVE,
        // actionHandleSecondary: () => {
        //   handleShareTwToSignIn();
        // },
        // actionTextSecondary: 'Switch account',
        step: AirdropStep.alphaUsers,
      },
    ];
  }, [token, needReload, raffleCode]);

  return (
    <Flex
      className={s.container}
      direction={'column'}
      gap={{
        base: '20px',
        md: '40px',
      }}
    >
      {DATA_COMMUNITY.map((item, index) => {
        return (
          <ItemStep
            key={index}
            index={index}
            content={item}
            isLoading={item.step === AirdropStep.alphaUsers && submitting}
          />
        );
      })}
      <ConnectModal isShow={showConnectModal} needVerifyBTCAddress={false} onHide={async () => {
        setShowConnectModal(false);
        const data = AllowListStorage.getStorage();
        if(data) {
          const address = data.address;
          const resPerceptronsHolders = await getBVMAirdrop({address: address});
          AirdropStorage.setIsConnectBitcoinWallet(true);
          AirdropStorage.setAirdropPerceptronsHolders(resPerceptronsHolders);
        }
      }}/>
    </Flex>
  );
};

export default StepsAirdrop;
