'use client';

import Image, { ImageProps } from 'next/image';
import React, { forwardRef, useState } from 'react';

import s from './style.module.scss';

const ImagePlaceholder = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className={`${s.imagePreload} ${isLoaded && s.isLoaded}`}>
      <Image
        className={`${props.className} ${s.imagePreload_origin}`}
        onLoad={(): void => {
          setIsLoaded(true);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
        alt={props.alt}
      />
      <Image
        className={`${props.className} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={50}
        height={50}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePlaceholder.displayName = 'ImagePlaceholder';
export default ImagePlaceholder;
