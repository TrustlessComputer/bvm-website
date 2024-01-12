'use client';

import cx from 'clsx';
import { BigNumber } from 'ethers';
import Image from 'next/image';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getAvatarName } from '@/utils/helpers';
import { Box, Center, Text } from '@chakra-ui/react';

import { CDN_URL_IMAGES } from '@/config';
import { compareString } from '@/utils/string';
import { last } from 'lodash';
import SvgInset from '../SvgInset';
import styles from './styles.module.scss';

interface IAvatarProps {
  className?: string;
  url?: any;
  address?: string;
  name?: string;
  width?: number;
  onClick?: any;
  fontSize?: number;
  imgStyles?: React.CSSProperties;
  circle?: boolean;
  onLoaded?: () => void;
}

const gradientColor = [
  '#FF7084',
  '#FF4B5A',
  '#65CDA0',
  '#359E67',
  '#FFD17E',
  '#FF9427',
  '#CD6AF2',
  '#9B20EE',
  '#4DADFF',
  '#236EAF',
];

const DefaultAvatar = ({
  name,
  address,
  placeHolderStyles,
  fontSize,
}: {
  name?: string;
  address?: string;
  placeHolderStyles: any;
  width: any;
  fontSize?: number;
}) => {
  if (name) {
    let numColor = 0;

    if (address) {
      numColor =
        parseFloat(
          BigNumber.from(address).toBigInt().toString(10).slice(0, 4),
        ) % 10;
    }

    const colors = gradientColor[numColor > 9 ? 0 : numColor];
    return (
      <Box
        style={{
          ...placeHolderStyles,
          backgroundColor: colors,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
        className={'imgError'}
      >
        <Text
          style={{
            fontWeight: '700',
            fontSize: `${fontSize ? fontSize : 16}px`,
          }}
        >
          {getAvatarName(name).toUpperCase()}
        </Text>
      </Box>
    );
  }

  return (
    <Box style={placeHolderStyles} className={'imgError'}>
      <Image
        src={`${CDN_URL_IMAGES}/icDefaultAvatar.svg`}
        alt="default avatar"
        width="44"
        height="44"
      />
      {/* <IcDefaultAvatar /> */}
    </Box>
  );
};

const Avatar: React.FC<IAvatarProps> = ({
  className,
  url,
  address = '',
  width = 44,
  onClick,
  name,
  fontSize,
  imgStyles,
  circle = false,
  onLoaded = () => {},
}: IAvatarProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const imgSrc = useMemo(() => url, [url]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      onLoaded();
    }
  }, [url]);

  const loader = useCallback(({ src }: any) => {
    return src;
  }, []);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  const onLoadStart = useCallback(() => {
    setError(false);
  }, []);

  const handleOnClick = useCallback(
    (event: any) => {
      onClick?.(event);
    },
    [onClick],
  );

  const centerStyles = useMemo((): any => {
    return {
      height: `${width}px`,
      width: `${width}px`,
      minWidth: `${width}px`,
      borderRadius: '50%',
      overflow: 'hidden',
    };
  }, [width]);

  const placeHolderStyles = useMemo((): any => {
    return {
      position: 'absolute',
      zIndex: 1,
      height: `${width}px`,
      width: `${width}px`,
      minWidth: `${width}px`,
    };
  }, [width]);

  const isSVG = useMemo(() => {
    if (imgSrc) {
      if (compareString(last(imgSrc?.split('.')), 'svg')) {
        return true;
      }
      return false;
    }
    return undefined;
  }, [imgSrc]);

  if (!imgSrc) {
    return (
      <Center
        onClick={handleOnClick}
        className={cx(styles.container, className, {
          [styles.container__circle || '']: circle,
        })}
        style={centerStyles}
      >
        <DefaultAvatar
          placeHolderStyles={placeHolderStyles}
          name={name}
          address={address}
          width={width}
          fontSize={fontSize}
        />
      </Center>
    );
  }

  return (
    <Center
      onClick={handleOnClick}
      className={cx(styles.container, className)}
      style={centerStyles}
      ref={targetRef}
    >
      <>
        {isSVG ? (
          <SvgInset
            style={imgStyles}
            size={imgStyles?.width as any}
            svgUrl={imgSrc}
          />
        ) : (
          <Image
            loader={loader}
            loading="lazy"
            blurDataURL="https://storage.googleapis.com/tc-cdn-prod/images/alpha_avatar_default.png"
            placeholder="blur"
            src={url}
            alt="icon"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            onError={onError}
            onLoadStart={onLoadStart}
            style={imgStyles}
            onLoad={onLoaded}
          />
        )}

        {error && (
          <DefaultAvatar
            placeHolderStyles={placeHolderStyles}
            name={name}
            address={address}
            width={width}
            fontSize={fontSize}
          />
        )}
      </>
    </Center>
  );
};

export default Avatar;
