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

type BlockCardItem = Omit<TDappCardProps, 'idx'> & {
  logo: string;
  logoUrl?: string;
  id?: string;
};

type BlockChainItem = Omit<TChainCard, 'idx'> & {
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

  const getLogo = (logo: string) => {
    const tmp = LOGOS.filter((itemLogo) => {
      return itemLogo.id === logo;
    });
    return tmp.length ? tmp[0].img : '';
  };

  const renderNewsLogo = (logo: string, logoUrl?: string) => {
    if (logoUrl) {
      return (
        <div className={s.cardLogo}>
          <ChakraImage
            src={logoUrl}
            alt="thumb image"
            width={'100%'}
            height={28}
            objectFit={'contain'}
          />
        </div>
      );
    }

    if (getLogo(logo)) {
      return (
        <div className={s.cardLogo}>
          <ChakraImage
            src={logoUrl ? logoUrl : getLogo(logo)}
            alt="thumb image"
            width={'100%'}
            height={28}
            objectFit={'contain'}
          />
        </div>
      );
    }

    return <Box height={'28px'} marginBottom={'16px'} />;
  };

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
          <div className={s.items_wrapper} ref={itemsWrapperRef}>
            {item.map((item: BlockCardItem | BlockChainItem, index: number) => (
              <Link
                key={index}
                className={cn(s.item, {
                  ['pointer-none']:
                    props.id !== 'rollups' &&
                    !(item as BlockCardItem).link?.url,
                })}
                href={
                  props.id !== 'rollups'
                    ? (item as BlockCardItem).link?.url || ''
                    : (item as BlockChainItem).social[1].link
                }
                target={(item as BlockCardItem).link?.target || '_blank'}
                id={`${props.id}-${index}`}
              >
                {props.id === 'news' &&
                  renderNewsLogo(
                    (item as BlockCardItem).logo,
                    (item as BlockCardItem).logoUrl,
                  )}
                <Box
                  position="relative"
                  aspectRatio={'118 / 75'}
                  mb="16px"
                  borderRadius={'8px'}
                  overflow={'hidden'}
                  className={s.thumbnail_wrapper}
                >
                  <Image
                    src={item.homeImage}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Flex
                  flexDirection={'column'}
                  gap="8px"
                  className={s.item_content}
                >
                  <div className={s.item_tags}>
                    {!!item.tags &&
                      item.tags.map((tag, index) => {
                        if (!tag) return null;

                        return (
                          <div key={`${tag}-${index}`}>
                            {index === 0 &&
                              (props.id === 'apps' || props.id === 'games') && (
                                <img src="/landing-v4/ic-chain.svg" />
                              )}
                            {tag}
                          </div>
                        );
                      })}
                  </div>
                  <Flex
                    alignItems={'center'}
                    gap="12px"
                    mb={props.id === 'news' ? ' 24px' : '0'}
                  >
                    <p className={s.title}>{item.title}</p>
                    {!!(item as Omit<TChainCard, 'idx'>).social &&
                      (item as Omit<TChainCard, 'idx'>).social.map(
                        (social, index) => (
                          <a
                            key={index}
                            href={social.link}
                            target={'_blank'}
                            className={s.social_link}
                          >
                            <Image
                              src={social.icon}
                              alt={'icon'}
                              width={20}
                              height={20}
                            />
                          </a>
                        ),
                      )}
                  </Flex>
                  <p
                    className={s.description}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </Flex>
              </Link>
            ))}
          </div>

          {!!showControls.prev && (
            <Box
              className={s.prev_btn}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              onClick={() => handleChangeDirection('prev')}
            >
              <img src="\landing-v4\ic-arrow-control.svg"></img>
            </Box>
          )}

          {!!showControls.next && (
            <Box
              className={s.next_btn}
              top={props.id === 'news' ? 'calc(50% - 44px)' : '50%'}
              onClick={() => handleChangeDirection('next')}
            >
              <img src="\landing-v4\ic-arrow-control.svg"></img>
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SectionBlock;
