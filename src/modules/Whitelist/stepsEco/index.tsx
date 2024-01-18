import { useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { Flex } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemStep, { IItemCommunity } from './Step';
import s from './styles.module.scss';

const StepsEco = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = AuthenStorage.getAuthenKey();
  const needReload = useAppSelector(commonSelector).needReload;

  const DATA_COMMUNITY = useMemo<IItemCommunity[]>(() => {
    return [
      {
        title: 'Tweet about NakaChain',
        desc: 'Tweet as often as you like & tag @Naka_Chain to rank up.',
        actionText: 'Post',
        image: 'ic-naka.svg',
        actionHandle: () => {},
        isActive: !!token,
        right: {
          title: !token ? '+1000 PTS' : '+1 PTS',
          desc: !token ? 'first post' : 'per view',
        },
      },
      {
        title: 'Swap on Naka Genesis',
        desc: 'Tweet as often as you like & tag @Naka_Chain to rank up.',
        actionText: 'Swap',
        image: 'ic-naka.svg',
        actionHandle: () => {
          window.open('https://nakachain.xyz/swap');
        },
        isActive: !!token,
        right: {
          title: !token ? '+1000 PTS' : '+1 PTS',
          desc: !token ? 'first post' : 'per view',
        },
      },
      {
        title: 'Add Liquidity on Naka Genesis',
        desc: 'Tweet as often as you like & tag @Naka_Chain to rank up.',
        actionText: 'Swap',
        image: 'ic-naka.svg',
        actionHandle: () => {
          window.open('https://nakachain.xyz/swap');
        },
        isActive: !!token,
        right: {
          title: !token ? '+1000 PTS' : '+1 PTS',
          desc: !token ? 'first post' : 'per view',
        },
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
            isLoading={submitting}
          />
        );
      })}
    </Flex>
  );
};

export default StepsEco;
