import React from 'react';
import s from './styles.module.scss';
import Fade from '@interactive/Fade';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Link from 'next/link';
import cn from 'classnames';
import { Box, Text } from '@chakra-ui/react';

export type TDappCardProps = {
  id?: string;
  idx: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  tags: string[];
  link: {
    url: string;
    target: string;
  };
  homeImage: string;
};

export default function DappCard({
  idx,
  ...props
}: TDappCardProps): React.JSX.Element {
  const { link } = props;

  if (idx === 0) {
    return (
      <Fade delayEnter={0.5 + idx / 10}>
        <Link
          href={link.url}
          target={link.target}
          className={cn(s.wrapperDappCard, {
            ['pointer-none']: !link.url,
          })}
          style={{ background: props.bgColor, position: 'relative' }}
        >
          <Box
            className={cn(
              s.wrapperDappCard_image,
              s.wrapperDappCard_image__first,
            )}
            aspectRatio={'360  / 173'}
          >
            <ImagePlaceholder
              src={props.image}
              alt={'dapp1'}
              width={300}
              height={300}
            />
          </Box>
          <Box
            position="absolute"
            className={s.wrapperDappCardContent}
            bottom="40px"
            left="40px"
          >
            <Text color="#fff" className={s.wrapperDappCard_heading}>
              {props.title}
            </Text>
            <Text
              color="#fff"
              className={s.wrapperDappCard_decs}
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
            <div className={s.tags}>
              {props.tags.map((tag, index) => {
                if (!tag) return null;
                return (
                  <Text
                    color="#fff !important"
                    key={index}
                    bg="rgba(255, 255, 255, 0.30) !important"
                  >
                    {tag}
                  </Text>
                );
              })}
            </div>
          </Box>
        </Link>
      </Fade>
    );
  }

  return (
    <Fade delayEnter={0.5 + idx / 10}>
      <Link
        href={link.url}
        target={link.target}
        className={cn(s.wrapperDappCard, {
          ['pointer-none']: !link.url,
        })}
      >
        <Box
          className={cn(s.wrapperDappCard_image)}
          aspectRatio={'7 / 4'}
          bg={props.bgColor}
          overflow={'hidden'}
          borderRadius={'12px'}
        >
          <ImagePlaceholder
            src={props.image}
            alt={'dapp1'}
            width={300}
            height={300}
          />
        </Box>
        <Box className={s.wrapperDappCardContent}>
          <p className={s.wrapperDappCard_heading}>{props.title}</p>
          <p
            className={s.wrapperDappCard_decs}
            dangerouslySetInnerHTML={{ __html: props.description }}
          />
          <div className={s.tags}>
            {props.tags.map((tag, index) => {
              if (!tag) return null;
              return <p key={index}>{tag}</p>;
            })}
          </div>
        </Box>
      </Link>
    </Fade>
  );
}
