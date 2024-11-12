import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from './AppCard.module.scss';
import { Box } from '@chakra-ui/react';

type Props = {
  item: any;
  idx: number;
};

const AppCard = ({ item, idx }: Props) => {
  if (idx === 0) {
    return (
      <Link
        className={cn(s.wrapper, s.firstItem, {
          ['pointer-none']: !item.link?.url,
        })}
        href={item.link?.url}
        target="_blank"
        style={{ position: 'relative' }}
      >
        <Box className={s.thumbnail} aspectRatio={'360  / 173'}>
          <img src={item.image} alt={item.title} />
        </Box>
        <Box pos={'absolute'} left="40px" bottom="40px" className={s.info}>
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
        </Box>
      </Link>
    );
  }

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
