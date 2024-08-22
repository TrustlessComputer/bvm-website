import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import s from './SectionItemGeneral.module.scss';
import { BlockCardItem, BlockChainItem } from '../..';
import { Box, Flex, Image as ChakraImage } from '@chakra-ui/react';
import Image from 'next/image';
import { LOGOS } from '@/modules/landingV3/Componets/Section_7/constant';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';

type Props = {
  id: string;
  item: BlockCardItem | BlockChainItem;
};

const SectionItemGeneral = ({ id, item }: Props) => {
  const getLogo = (logo: string) => {
    const tmp = LOGOS.filter((itemLogo) => {
      return itemLogo.id === logo;
    });
    return tmp.length ? tmp[0].whiteLogo : '';
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
    <Link
      className={cn(s.item, {
        ['pointer-none']:
          id !== 'rollups' && !(item as BlockCardItem).link?.url,
      })}
      href={
        id !== 'rollups'
          ? (item as BlockCardItem).link?.url || ''
          : (item as BlockChainItem).social[1].link
      }
      target={(item as BlockCardItem).link?.target || '_blank'}
    >
      {id === 'news' &&
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
      <Flex flexDirection={'column'} gap="8px" className={s.item_content}>
        <div className={s.item_tags}>
          {!!item.tags &&
            item.tags.map((tag, index) => {
              if (!tag) return null;

              return (
                <div key={`${tag}-${index}`}>
                  {index === 0 && (id === 'apps' || id === 'games') && (
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
          mb={id === 'news' ? ' 24px' : '0'}
        >
          <p className={s.title}>{item.title}</p>
          {!!(item as BlockChainItem).social &&
            (item as BlockChainItem).social.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target={'_blank'}
                className={s.social_link}
              >
                <Image src={social.icon} alt={'icon'} width={20} height={20} />
              </a>
            ))}
          {!!(item as BlockCardItem).date && (
            <p className={s.date}>{(item as BlockCardItem).date}</p>
          )}
        </Flex>
        <p
          className={s.description}
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></p>
      </Flex>
    </Link>
  );
};

export default SectionItemGeneral;
