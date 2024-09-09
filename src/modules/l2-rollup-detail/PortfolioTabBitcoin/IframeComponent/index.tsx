import { Flex, Skeleton } from '@chakra-ui/react';
import { ArcElement, Chart, Tooltip } from 'chart.js';
import React, { useMemo, useRef } from 'react';
Chart.register([ArcElement, Tooltip]);

const IframeComponent = (props: any) => {
  const { src, style, type } = props;
  const imgRef = useRef<any>(null);

  const [isLoaded, serIsLoaded] = React.useState(false);

  const isImgType = useMemo(() => {
    switch (type) {
      case 'image/apng':
      case 'image/avif':
      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
      case 'image/webp':
      case 'image/svg+xml':
        return true;
      default:
        return false;
    }
  }, [type]);

  const onError = () => {
    serIsLoaded(true);
  };

  const onLoaded = () => {
    serIsLoaded(true);
  };

  return (
    <Flex position={'relative'}>
      {isImgType || !src ? (
        <img
          ref={imgRef}
          src={src || '/images/default_nft.png'}
          style={style}
          onLoad={onLoaded}
          onError={onError}
        />
      ) : (
        <iframe
          ref={imgRef}
          src={src}
          style={style}
          loading="lazy"
          sandbox={'allow-scripts allow-pointer-lock allow-same-origin'}
          onLoad={onLoaded}
          onError={onError}
        />
      )}
      {!isLoaded && (
        <Skeleton
          borderTopRadius={'12px'}
          position={'absolute'}
          speed={1.2}
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
      )}
    </Flex>
  );
};

export default IframeComponent;
