import React, { useMemo } from 'react';
import { SectionBlockProps } from '../../interface';
import s from './SectionBlock.module.scss';
import { Box, Flex, Image as ChakraImage } from '@chakra-ui/react';
import Image from 'next/image';
import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { useRouter } from 'next/navigation';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';
import { LOGOS } from '@/modules/landingV3/Componets/Section_7/constant';

type BlockCardItem = Omit<TDappCardProps, 'idx'> & {
  logo: string;
  logoUrl?: string;
};

type BlockChainItem = Omit<TChainCard, 'idx'>;

const SectionBlock = (props: any) => {
  const { tag, title, item } = props;

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

  return (
    <Box ml="calc((100vw - 1480px) / 2)">
      <div className={s.wrapper}>
        <p className={s.heading}>
          <span className={s.tag}>{tag}</span>
          <span>{title}</span>
        </p>
        <div className={s.scroll_wrapper}>
          <div className={s.items_wrapper}>
            {item.map((item: BlockCardItem | BlockChainItem, index: number) => (
              <div
                key={index}
                className={s.item}
                onClick={() => {
                  window.open(
                    (item as BlockCardItem).link.url,
                    (item as BlockCardItem).link.target,
                  );
                }}
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
                  <div className={s.item_tags}>
                    {!!item.tags &&
                      item.tags.map((tag, index) => (
                        <span key={`${tag}-${index}`}>{tag}</span>
                      ))}
                  </div>
                </Flex>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SectionBlock;
