import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SectionBlockProps } from '../../interface';
import s from './SectionBlock.module.scss';
import { Box, Flex, Image as ChakraImage } from '@chakra-ui/react';
import Image from 'next/image';
import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { useRouter } from 'next/navigation';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';
import { LOGOS } from '@/modules/landingV3/Componets/Section_7/constant';
import IcChain from '@/public/landing-v4/ic-chain.svg';
import cn from 'classnames';
import Link from 'next/link';
import SectionItemGeneral from './Item/General';
import SectionItemApp from './Item/App';

export type BlockCardItem = Omit<TDappCardProps, 'idx'> & {
  logo: string;
  logoUrl?: string;
  id?: string;
};

export type BlockChainItem = Omit<TChainCard, 'idx'> & {
  id?: string;
};

const SectionBlock = (props: any) => {
  const { tag, title, item } = props;

  const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
  const itemsWrapperRef = React.useRef<HTMLDivElement>(null);

  const [showControls, setShowControls] = useState({
    prev: false,
    next: true,
  });

  const handleChangeDirection = useCallback(
    (direction: 'next' | 'prev') => {
      if (!scrollWrapperRef.current || !itemsWrapperRef.current) return;

      if (direction === 'prev') {
        scrollWrapperRef.current.scrollTo({
          left: scrollWrapperRef.current.scrollLeft - 800,
          behavior: 'smooth',
        });

        // check first item of itemsWrapperRef is fully visible
      }

      if (direction === 'next') {
        scrollWrapperRef.current.scrollTo({
          left: scrollWrapperRef.current.scrollLeft + 800,
          behavior: 'smooth',
        });
      }
    },
    [
      scrollWrapperRef.current,
      itemsWrapperRef.current,
      showControls.prev,
      showControls.next,
    ],
  );

  useEffect(() => {
    if (scrollWrapperRef.current && itemsWrapperRef.current) {
      const scrollWrapper = scrollWrapperRef.current;
      const itemsWrapper = itemsWrapperRef.current;

      if (itemsWrapper.offsetWidth > scrollWrapper.offsetWidth) {
        setShowControls({
          prev: false,
          next: true,
        });
      } else {
        setShowControls({
          prev: false,
          next: false,
        });
      }
    }
  }, [scrollWrapperRef.current, itemsWrapperRef.current]);

  useEffect(() => {
    // check `${props.id}-0` is fully visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowControls((prev) => ({
          ...prev,
          prev: !entry.isIntersecting,
        }));
      },
      { root: scrollWrapperRef.current, threshold: 1 },
    );

    if (itemsWrapperRef.current) {
      observer.observe(itemsWrapperRef.current.children[0]);
    }
  }, []);

  useEffect(() => {
    // check `${props.id}-${item.length - 1}` is fully visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowControls((prev) => ({
          ...prev,
          next: !entry.isIntersecting,
        }));
      },
      { root: scrollWrapperRef.current, threshold: 1 },
    );

    if (itemsWrapperRef.current) {
      observer.observe(
        itemsWrapperRef.current.children[item.length - 1] as HTMLElement,
      );
    }
  }, []);

  return (
    <Box
      // ml="calc((100vw - 1480px) / 2)"
      ml={{ base: '20px', md: '40px', lg: '120px' }}
    >
      <div className={s.wrapper}>
        <p className={s.heading}>
          <span className={s.tag}>{tag}</span>
          <span>{title}</span>
        </p>
        <div className={s.scroll_wrapper} ref={scrollWrapperRef}>
          <div
            className={cn(s.items_wrapper, {
              [s.items_wrapper__apps]: props.id === 'apps',
            })}
            ref={itemsWrapperRef}
          >
            {item.map((item: BlockCardItem | BlockChainItem, index: number) => {
              if (props.id === 'apps') {
                return (
                  <SectionItemApp
                    key={`${props.id}-${index}`}
                    item={item as BlockCardItem}
                  />
                );
              }

              return (
                <SectionItemGeneral
                  key={`${props.id}-${index}`}
                  id={props.id}
                  item={item}
                />
              );
            })}
          </div>

          {!!showControls.prev && (
            <Box
              className={cn(s.prev_btn, s.control_btn)}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              onClick={() => handleChangeDirection('prev')}
            >
              <img src="\landing-v4\ic-angle-right.svg"></img>
            </Box>
          )}

          {!!showControls.next && (
            <Box
              className={cn(s.next_btn, s.control_btn)}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              onClick={() => handleChangeDirection('next')}
            >
              <img src="\landing-v4\ic-angle-right.svg"></img>
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SectionBlock;
