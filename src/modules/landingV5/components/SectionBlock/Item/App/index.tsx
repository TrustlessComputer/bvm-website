import React from 'react';
import { BlockCardItem } from '../..';
import s from './SectionItemApp.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import { Box, Flex, Text } from '@chakra-ui/react';

type Props = {
  item: BlockCardItem;
  sectionId: string;
};

const SectionItemApp = ({ item, sectionId }: Props) => {
  if (!!item.popular) {
    return (
      <Link
        className={cn(s.wrapper, s.popular, {
          ['pointer-none']: !item.link?.url,
        })}
        href={item.link?.url}
        target="_blank"
      >
        <div className={s.popular_tag}>Most popular</div>
        <Flex
          style={{
            backgroundImage: item.bgColor,
          }}
          flex="1"
          alignItems={'center'}
          flexDir={'column'}
          justifyContent={'space-between'}
          pt="20px"
        >
          <div className={s.info}>
            <p className={s.title}>{item.title}</p>
            <Text
              className={s.desc}
              fontSize={sectionId === 'step-1' ? '22px !important' : ''}
            >
              {item.description}
            </Text>
            <div className={s.tags}>
              {item.tags.map((tag, index) => {
                if (!tag) return null;
                return <p key={index}>{tag}</p>;
              })}
            </div>
          </div>
          <div className={s.thumbnail}>
            <img src={item.homeImage} alt={item.title} />
          </div>
        </Flex>
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        s.wrapper,
        {
          ['pointer-none']: !item.link?.url,
        },
        { [s.popular]: item.popular },
      )}
      href={item.link?.url}
      target="_blank"
      style={{
        backgroundImage: item.bgColor,
      }}
    >
      <div className={s.info}>
        <p className={s.title}>{item.title}</p>
        <Text
          className={s.desc}
          fontSize={sectionId === 'step-1' ? '22px !important' : ''}
        >
          {item.description}
        </Text>
        <div className={s.tags}>
          {item.tags.map((tag, index) => {
            if (!tag) return null;
            return <p key={index}>{tag}</p>;
          })}
        </div>
      </div>
      <div className={s.thumbnail}>
        <img src={item.homeImage} alt={item.title} />
      </div>
    </Link>
  );
};

export default SectionItemApp;
