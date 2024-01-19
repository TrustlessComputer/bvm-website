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
    const shareUrl = 'https://nakachain.xyz';
    const content = ``;
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
        content,
      )}`,
      '_blank',
    );
  };

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'New: Timechain',
        desc: `Tweet about BVM to enter a raffle for Timechain - one of the first generative art on Ordinals.
        `,
        actionText: 'Tweet join enter raffle',
        image: "time-chain.svg",
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: '+10 Raffle',
          desc: 'per friend',
        },
        expiredTime: '2024-01-26',
      },
      {
        title: 'Retrospective: GM holders',
        desc: `Tweet about BVM to enter a raffle for Timechain - one of the first generative art on Ordinals.
        `,
        actionText: 'Claim BVM',
        image: "time-chain.svg",
        actionHandle: handleShareTw,
        isActive: !!token,
        right: {
          title: '+100 BVM',
          desc: 'per GM',
        },
        expiredTime: '2024-01-26',
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
