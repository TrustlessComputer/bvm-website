import ImagePlaceholder from '@/components/ImagePlaceholder';
import { useDebounce } from '@/hooks/useDebounce';
import useFade from '@/interactive/Signal/Fade/useFade';
import { useEffect, useRef } from 'react';
import { useStorePrimitive } from '../../useStorePrimitive';
import s from '../styles.module.scss';

export default function ImagePrimitive({
  src,
  id,
}: {
  src: string;
  id: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { idPrimitive } = useStorePrimitive();
  const idDebounceSimple = useDebounce(idPrimitive, 300);

  const { initAnimation: imgOut, playAnimation: imgIn } = useFade({
    refContent: imgRef,
    duration: 1.2,
    delayTrigger: 0.3,
  });
  useEffect(() => {
    imgOut();
  }, []);
  useEffect(() => {
    if (id === idDebounceSimple) {
      imgIn(0.1);
    } else {
      imgOut();
    }
  }, [idDebounceSimple]);
  return (
    <div ref={imgRef} className={s.wrapperImage_inner}>
      <ImagePlaceholder src={src} alt={'objective'} width={1019} height={465} />
    </div>
  );
}
