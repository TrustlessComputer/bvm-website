import s from './styles.module.scss';
import Image from 'next/image';
import useAnimationStore from '@/stores/useAnimationStore';
import { useEffect, useRef } from 'react';

export default function BgHero() {
  const { play } = useAnimationStore();
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) refVideo.current?.play();
  }, [play]);
  return <div className={s.bgHero}>
    <video ref={refVideo} src='landing/banner-compress.mp4' muted playsInline width={1920} height={1080}
           preload={'auto'}></video>
  </div>;
}
