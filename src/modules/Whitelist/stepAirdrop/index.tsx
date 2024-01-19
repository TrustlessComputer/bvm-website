import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import ItemStep, { IItemCommunity } from './Step';
import s from './styles.module.scss';

const StepsAirdrop = () => {
  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;

  const handleShareTw = async () => {
    window.open(
      `https://twitter.com/BVMnetwork`,
      '_blank',
    );
  };

  const handleClaimRetrospective = () => {

  }

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'New: Timechain',
        desc: `Like and repost to enter a raffle for a Timechain (Inscription ID: 102269) - the first long-form generative art collection on Ordinals.
        `,
        actionText: 'Like and repost',
        image: "time-chain.svg",
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: '+1 raffle ticket',
          desc: '',
        },
        expiredTime: '2024-01-22 08:00:00',
      },
      {
        title: 'Retrospective: 2023 users',
        desc: `Thanks for supporting our 2023 'testnet'. In 2024 mainnet, an airdrop awaits users of BVM products like Generative, Perceptrons, GM, Alpha, and all TC users.<br/>
          Snapshot on Jan 16, 2023. Claimable on Jan 24, 2024.
       `,
        actionText: 'Claim',
        image: "gm.svg",
        actionHandle: handleClaimRetrospective,
        isActive: false,
        right: {
          title: '',
          desc: '',
        },
        expiredTime: '2024-01-24 00:00:00',
      },
    ];
  }, [token, needReload]);

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
            isLoading={false}
          />
        );
      })}
    </Flex>
  );
};

export default StepsAirdrop;
