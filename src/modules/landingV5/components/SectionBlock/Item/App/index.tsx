import React, { useMemo } from 'react';
import { BlockCardItem } from '../..';
import s from './SectionItemApp.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ETERNAL_TITLE, ETERNAL_URL } from '@/constants/home-content';

type Props = {
  item: BlockCardItem;
  sectionId: string;
  idx: number;
};

const SectionItemApp = ({ item, sectionId, idx }: Props) => {
  // if (!!item.popular) {
  //   return (
  //     <Link
  //       className={cn(s.wrapper, s.popular, {
  //         ['pointer-none']: !item.link?.url,
  //       })}
  //       href={item.link?.url}
  //       target="_blank"
  //     >
  //       <div className={s.popular_tag}>Most popular</div>
  //       <Flex
  //         style={{
  //           backgroundImage: item.bgColor,
  //         }}
  //         flex="1"
  //         alignItems={'center'}
  //         flexDir={'column'}
  //         justifyContent={'space-between'}
  //         pt="20px"
  //       >
  //         <div className={s.info}>
  //           <p className={s.title}>{item.title}</p>
  //           <Text
  //             className={s.desc}
  //             fontSize={sectionId === 'step-1' ? '22px !important' : ''}
  //           >
  //             {item.description}
  //           </Text>
  //           <div className={s.tags}>
  //             {item.tags.map((tag, index) => {
  //               if (!tag) return null;
  //               return <p key={index}>{tag}</p>;
  //             })}
  //           </div>
  //         </div>
  //         <div className={s.thumbnail}>
  //           <img src={item.homeImage} alt={item.title} />
  //         </div>
  //       </Flex>
  //     </Link>
  //   );
  // }
  // const gameUnavailable = useMemo(() => {
  //   return sectionId === 'games' && idx !== 0;
  // }, [sectionId, idx]);

  return (
    <Link
      className={cn(
        s.wrapper,
        {
          ['pointer-none']: !item.link?.url,
        },
        { [s.eternal]: item.link?.url === ETERNAL_URL },
        { [s.games]: sectionId === 'games' },
      )}
      href={item.link?.url}
      target="_blank"
      // style={{
      //   backgroundImage: item.bgColor,
      // }}
    >
      <div className={s.info}>
        <p className={s.title}>{item.title}</p>
        <Text
          className={cn(
            s.desc,
            //   {
            //   [s.game_desc]: gameUnavailable,
            // }
          )}
        >
          {item.description}
        </Text>
        {!!item.tags && (
          <div className={s.tags}>
            {item.tags.map((tag, index) => {
              if (!tag) return null;
              return <p key={index}>{tag}</p>;
            })}
          </div>
        )}
      </div>
      <div
        className={cn(
          s.thumbnail,
          //   {
          //   [s.game_thumbnail]: gameUnavailable,
          // }
        )}
      >
        <img src={item.homeImage} alt={item.title} />
      </div>
    </Link>
  );
};

export default SectionItemApp;
