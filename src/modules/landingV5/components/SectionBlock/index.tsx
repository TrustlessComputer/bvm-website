import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';
import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import SectionItemApp from './Item/App';
import SectionItemGeneral from './Item/General';
import s from './SectionBlock.module.scss';

export type BlockCardItem = Omit<TDappCardProps, 'idx'> & {
  logo: string;
  logoUrl?: string;
  id?: string;
  date?: string;
};

export type BlockChainItem = Omit<TChainCard, 'idx'> & {
  id?: string;
};

const SectionBlock = (props: any) => {
  const { tag, title, item, desc, spacing = '99px' } = props;

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
    <Box>
      <div className={s.wrapper}>
        <p className={s.heading}>
          <span className={s.tag}>{tag}</span>
          {!!title && <p className={s.title}>{title}</p>}
          <p className={s.desc}>{desc}</p>
        </p>
        <div className={s.scroll_wrapper} ref={scrollWrapperRef}>
          <Box
            className={cn(s.items_wrapper, {
              [s.items_wrapper__apps]: props.id === 'apps',
            })}
            ref={itemsWrapperRef}
            mb={spacing}
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
          </Box>

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
