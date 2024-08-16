import React from 'react';
import { BlockCardItem } from '../..';
import s from './SectionItemApp.module.scss';
import Link from 'next/link';
import cn from 'classnames';

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

  const appThumbnail = {
    runedex: '/landing-v4/home-runedex-1.png',
    heartbeats: '/landing-v4/home-heartbeat-2.png',
    nakaFuture: ' /landing-v4/home-naka-1.png',
    alpha: '/explore/alpha.png',
    eternalAI: '/explore/dapp-eai.png',
    neuron: '/landing-v4/home-neuron.png',
    capsule: '/landing-v4/home-capsule-1.png',
  };

  return (
    <Link
      className={cn(s.wrapper, {
        ['pointer-none']: !item.link?.url,
      })}
      href={item.link?.url}
      target="_blank"
      style={{ backgroundImage: item.bgColor }}
    >
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
        <img
          src={appThumbnail[item.id as keyof typeof appThumbnail]}
          alt={item.title}
        />
      </div>
    </Link>
  );
};

export default SectionItemApp;
