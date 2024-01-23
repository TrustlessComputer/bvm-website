import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import ItemStep, { AirdropType, IItemCommunity } from './Step';
import s from './styles.module.scss';
import { getRaffleJoin, joinRaffle } from '@/services/player-share';
import styles from '@/modules/Whitelist/leaderBoard/styles.module.scss';
import { CDN_URL_ICONS } from '@/config';
import { LearnMore } from '@/modules/Whitelist/stepsEco';
import { PUBLIC_SALE_START } from '@/modules/Whitelist';

export const TIME_CHAIN_EXPIRED_TIME = '2024-01-24 08:00:00';

const StepsAirdrop = () => {
  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;
  const [raffleCode, setRaffleCode] = useState();

  useEffect(() => {
    if(token) {
      getRaffleJoinInfo();
    }
  }, [token, needReload]);

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoin();
    setRaffleCode(res);
  };

  const handleShareTw = async () => {
    window.open(
      `https://twitter.com/BVMnetwork/status/1748299995898691711`,
      '_blank',
    );

    joinRaffle();
    setTimeout(() => {
      getRaffleJoinInfo();
    }, 1000);
  };

  const handleClaimRetrospective = () => {

  }

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'Timechain',
        desc: `Like and repost to enter a raffle for a Timechain (Inscription ID: 39554) - the first long-form generative art collection on Ordinals.
          ${LearnMore('https://twitter.com/punk3700/status/1623708934107430913')}
        `,
        actionText: 'Like and repost',
        image: "time-chain2.svg",
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: raffleCode ? `Your raffle code: ${raffleCode}` : '+1 raffle ticket',
          desc: '',
          tooltip: (
            <Tooltip
              minW="220px"
              bg="white"
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"
              borderRadius="4px"
              padding="8px"
              label={
                <Flex direction="column" color="black" opacity={0.7}>
                  <p>
                    At the end of the events, the list of qualified users (those who liked and reposted) will be collected, and a winner will be chosen at random using the raffle code.
                  </p>
                </Flex>
              }
            >
              <img
                className={styles.tooltipIcon}
                src={`${CDN_URL_ICONS}/info-circle.svg`}
              />
            </Tooltip>
          )
        },
        expiredTime: TIME_CHAIN_EXPIRED_TIME,
        showExpireTime: true,
        airdropType: AirdropType.NEW
      },
      {
        title: 'Generative users',
        desc: `Proportional to key holding.<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Claim',
        image: "time-chain2.svg",
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
        title: 'Perceptrons holders',
        desc: `Proportional to the number of Perceptrons you hold.<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Claim',
        image: "perceptron_thumb_03.jpg",
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
        title: 'GM holders',
        desc: `Proportionally based on GM balance - min holding: 1 $GM<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Claim',
        image: "gm.svg",
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
        title: 'Alpha users',
        desc: `Proportionally based on Airdrop Points - min Airdrop Points: 100,000<br/>
          Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
       `,
        actionText: 'Claim',
        image: "alpha.svg",
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
            isLoading={false}
          />
        );
      })}
    </Flex>
  );
};

export default StepsAirdrop;
