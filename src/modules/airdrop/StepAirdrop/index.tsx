import ConnectModal from '@/components/ConnectModal';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';
import { IAuthenCode } from '@/modules/Whitelist/steps';
import {
  generateTokenWithTwPost,
  getBVMAirdrop,
  getGenerativeProfile,
  getRaffleJoin,
  requestAuthenByShareCode,
} from '@/services/player-share';
import { setBearerToken } from '@/services/whitelist';
import { useAppSelector } from '@/stores/hooks';
import { requestReload } from '@/stores/states/common/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import { setAirdropAlphaUsers } from '@/stores/states/user/reducer';
import { userSelector } from '@/stores/states/user/selector';
import { getLink } from '@/utils/helpers';
import { signMessage } from '@/utils/metamask-helper';
import AirdropStorage from '@/utils/storage/airdrop.storage';
import AllowListStorage from '@/utils/storage/allowlist.storage';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemStep, { AirdropStep, AirdropType, IItemCommunity } from './Step';
import s from './styles.module.scss';

export const getMessageEVM = (address: string) => {
  return `Verify you are the owner of the wallet ${address}`;
};

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-24 08:00:00';

interface IProps {
  setIndex: (_: number) => void;
}

const StepsAirdrop = (props: IProps) => {
  const { setIndex } = props;
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
    if (token) {
      getRaffleJoinInfo();
    }
  }, [token, needReload]);

  useEffect(() => {
    if (user?.twitter_id) {
      getAlphaUsersAirdrop();
    }
  }, [user?.twitter_id]);

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoin();
    setRaffleCode(res);
  };

  const getAlphaUsersAirdrop = async () => {
    const res = await getBVMAirdrop({ address: user?.twitter_id });
    dispatch(setAirdropAlphaUsers(res));
  };

  const handleShareTwToSignIn = async () => {
    let code = '';
    const res: any = await requestAuthenByShareCode();
    setAuthenCode(res);
    code = `\n\n#${res?.public_code}`;

    const shareUrl = getLink('');
    const content = `Welcome to the future of Bitcoin with @BVMnetwork\n\nBitcoin Virtual Machine is the first modular blockchain metaprotocol that lets you launch your Bitcoin L2 blockchain protocol in a few clicks\n\n$BVM public sale starting soon${code}\n\nJoin the allowlist`;

    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

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
      setShowManualCheck(false);
    }
  };

  const handleVerifyWallet = async () => {
    const { address } = await signMessage(getMessageEVM);

    const resGMHolders = await getBVMAirdrop({ address: address });
    AirdropStorage.setIsConnectMetaMask(true);
    AirdropStorage.setAirdropGMHolders(resGMHolders);

    const generativeProfile = await getGenerativeProfile(address);

    if (generativeProfile?.walletAddressBtcTaproot) {
      const resGenerativeUsers = await getBVMAirdrop({
        address: generativeProfile?.walletAddressBtcTaproot,
      });
      AirdropStorage.setAirdropGenerativeUsers(resGenerativeUsers);
    }
  };

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'Generative users',
        desc: `Proportional to key holding.<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Connect your Metamask',
        image: '/airdrop/generative.png',
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
        image: '/airdrop/percep.png',
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
        image: '/airdrop/gm.png',
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
        image: '/airdrop/alpha.png',
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
      <ConnectModal
        isShow={showConnectModal}
        needVerifyBTCAddress={false}
        onHide={async () => {
          setShowConnectModal(false);
          const data = AllowListStorage.getStorage();
          if (data) {
            const address = data.address;
            const resPerceptronsHolders = await getBVMAirdrop({
              address: address,
            });
            AirdropStorage.setIsConnectBitcoinWallet(true);
            AirdropStorage.setAirdropPerceptronsHolders(resPerceptronsHolders);
          }
        }}
      />
    </Flex>
  );
};

export default StepsAirdrop;
