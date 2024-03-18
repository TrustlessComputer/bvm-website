'use client';

import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useDebounce } from '@/hooks/useDebounce';
import useFade from '@/interactive/Signal/Fade/useFade';
import { useEffect, useRef } from 'react';
import { useStoreSimple } from '../../useStoreSimple';
import s from '../style.module.scss';

export default function ImagesItem({ src, id }: { src: string; id: number }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { idSimple } = useStoreSimple();
  // const idDebounceSimple = useDebounce(idSimple, 2000);

  const { initAnimation: imgOut, playAnimation: imgIn } = useFade({
    refContent: imgRef,
    duration: 0,
    delayTrigger: 0,
  });
  useEffect(() => {
    imgOut();
  }, []);
  useEffect(() => {
    if (id === idSimple) {
      imgIn(0);
    } else {
      imgOut();
    }
  }, [idSimple]);
  return (
    <div ref={imgRef} className={s.simpleContent_image_inner}>
      <ImagePlaceholder src={src} alt={'simple'} width={400} height={400} />
    </div>
  );
}
