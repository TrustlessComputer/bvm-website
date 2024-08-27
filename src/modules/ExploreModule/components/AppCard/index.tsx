import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './AppCard.module.scss';

type Props = {
  item: any;
};

const AppCard = ({ item }: Props) => {
  return (
    <Link
      className={cn(s.wrapper, {
        ['pointer-none']: !item.link?.url,
      })}
      href={item.link?.url}
      target="_blank"
      style={{
        backgroundImage: item.bgColor,
      }}
    >
      <div className={s.info}>
        <p className={s.title}>{item.title}</p>
        <p className={s.desc}>{item.description}</p>
        <div className={s.tags}>
          {item.tags.map((tag: string, index: number) => {
            if (!tag) return null;
            return (
              <p key={`${item.title}-${index}`} className={s.tag}>
                {index === 0 && <img src="/landing-v4/ic-chain.svg" />}
                {tag}
              </p>
            );
          })}
        </div>
      </div>
      <div className={s.thumbnail}>
        <img src={item.image} alt={item.title} />
      </div>
    </Link>
  );
};

export default AppCard;
