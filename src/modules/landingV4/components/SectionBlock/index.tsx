import React from 'react';
import { SectionBlockProps } from '../../interface';
import s from './SectionBlock.module.scss';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { TDappCardProps } from '@/modules/ExploreModule/components/DappCard';
import { useRouter } from 'next/navigation';
import { TChainCard } from '@/modules/ExploreModule/components/ChainCard';

const SectionBlock = (props: any) => {
  const { tag, title, item } = props;

  return (
    <Box className="containerV3" pr="0 !important">
      <div className={s.wrapper}>
        <p className={s.heading}>
          <span className={s.tag}>{tag}</span>
          <span>{title}</span>
        </p>
        <div className={s.items_wrapper}>
          {item.map(
            (
              item: Omit<TDappCardProps, 'idx'> | Omit<TChainCard, 'idx'>,
              index: number,
            ) => (
              <div
                key={index}
                className={s.item}
                onClick={() => {
                  window.open(
                    (item as Omit<TDappCardProps, 'idx'>).link.url,
                    (item as Omit<TDappCardProps, 'idx'>).link.target,
                  );
                }}
              >
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
                  <Flex alignItems={'center'} gap="12px">
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
            ),
          )}
        </div>
      </div>
    </Box>
  );
};

export default SectionBlock;
