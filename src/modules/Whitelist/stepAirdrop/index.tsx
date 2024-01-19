import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import ItemStep, { IItemCommunity } from './Step';
import s from './styles.module.scss';
import { getRaffleJoin, getRaffleUsers, joinRaffle } from '@/services/player-share';

export enum AirdropTask {
  timeChain,
}

const StepsAirdrop = () => {
  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;
  const [raffleJoinInfo, setRaffleJoin] = useState();
  const [totalJoin, setTotalJoin] = useState(0);

  useEffect(() => {
    getTotalJoinRaffleInfo();
    const interval = setInterval(() => {
      getTotalJoinRaffleInfo();
    }, 10000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if(token) {
      getRaffleJoinInfo();
    }
  }, [token, needReload]);

  const getRaffleJoinInfo = async () => {
    const res = await getRaffleJoin();
    setRaffleJoin(res);
    console.log('getRaffleJoinInfo', res);
  };

  const handleShareTw = async () => {
    const shareUrl = 'https://nakachain.xyz';
    const content = ``;
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );

    joinRaffle();
  };

  const getTotalJoinRaffleInfo = async () => {
    const res = await getRaffleUsers({page: 1, limit: 0});
    setTotalJoin(res);
  }

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'New: Timechain',
        desc: `Tweet about BVM to enter a raffle for Timechain - one of the first generative art on Ordinals.
        <a href='https://nakachain.xyz' style='color: #00d9f5'>Learn more ></a>
        `,
        actionText: 'Tweet join enter raffle',
        image: "ic-x.svg",
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: '+10 Raffle',
          desc: 'per friend',
        },
        expiredTime: '2024-01-26',
        task: AirdropTask.timeChain,
        totalJoin: totalJoin
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
