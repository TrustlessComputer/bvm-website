import React from 'react';
import { BlockCardItem } from '../..';
import s from './SectionItemApp.module.scss';
import { Box } from '@chakra-ui/react';

type Props = {
  item: BlockCardItem;
};

const SectionItemApp = ({ item }: Props) => {
  const appDescription = {
    runedex: 'Buy Bitcoin permisionlessly.',
    heartbeats: 'Insights into Bitcoin rollups.',
    nakaFuture: 'Trade futures on Bitcoin.',
    alpha: 'The first social app on Bitcoin. ',
    eternalAI: 'The truly open AI for everyone.',
    neuron: 'Power decentralized networks & earn',
    capsule: 'Preserve the Internet’s history.',
  };

  return (
    <Box className={s.wrapper} bg={item.bgColor}>
      <div className={s.info}>
        <p className={s.title}>{item.title}</p>
        <p className={s.desc}>
          {appDescription[item.id as keyof typeof appDescription]}
        </p>
        <div className={s.tags}>
          {item.tags.map((tag, index) => {
            if (!tag) return null;
            return <p key={index}>{tag}</p>;
          })}
        </div>
      </div>
      <div className={s.thumbnail}>
        <img src={item.image} alt={item.title} />
      </div>
    </Box>
  );
};

export default SectionItemApp;
