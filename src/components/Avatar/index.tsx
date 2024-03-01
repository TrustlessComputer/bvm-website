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

import { Box, Center, Text } from '@chakra-ui/react';

import styles from './styles.module.scss';
import last from 'lodash/last';
import SvgInset from '../SvgInset';
import { compareString, getAvatarName } from '@/utils/string';

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
  square?: boolean;
  onLoaded?: () => void;
  hideDefault?: boolean;
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
  hideDefault,
}: {
  name?: string | undefined;
  address?: string | undefined;
  placeHolderStyles: any;
  width: any;
  fontSize?: number | undefined;
  hideDefault?: boolean | undefined;
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
    <Box
      style={{
        ...placeHolderStyles,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
      className={'imgError'}
    >
      {!hideDefault && (
        <Image
          src="https://storage.googleapis.com/tc-cdn-prod/images/alpha_avatar_default.png"
          alt="default avatar"
          width="44"
          height="44"
        />
      )}
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
  circle = true,
  hideDefault,
  square = false,
  onLoaded = () => {},
}: IAvatarProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const imgSrc = useMemo(() => url, [url]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url && onLoaded) {
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
      return compareString(last(imgSrc?.split('.')), 'svg');
    }
    return undefined;
  }, [imgSrc]);

  if (!imgSrc) {
    return (
      <Center
        onClick={handleOnClick}
        className={cx(styles.container, className, {
          [styles.container__circle || '']: circle,
          [styles.container__square || '']: square,
        })}
        style={centerStyles}
      >
        <DefaultAvatar
          placeHolderStyles={placeHolderStyles}
          name={name}
          address={address}
          width={width}
          fontSize={fontSize}
          hideDefault={hideDefault}
        />
      </Center>
    );
  }

  return (
    <Center
      onClick={handleOnClick}
      className={cx(styles.container, className, {
        [styles.container__circle || '']: circle,
        [styles.container__square || '']: square,
      })}
      style={centerStyles}
      ref={targetRef}
    >
      <>
        {isSVG ? (
          <SvgInset size={imgStyles?.width as any} svgUrl={imgSrc} />
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
            onLoadingComplete={onLoaded}
          />
        )}

        {error && (
          <DefaultAvatar
            placeHolderStyles={placeHolderStyles}
            name={name}
            address={address}
            width={width}
            fontSize={fontSize}
            hideDefault={hideDefault}
          />
        )}
      </>
    </Center>
  );
};

export default Avatar;
