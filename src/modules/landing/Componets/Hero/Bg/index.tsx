import s from './styles.module.scss';
import useAnimationStore from '@/stores/useAnimationStore';
import { useEffect, useRef } from 'react';
import { CDN_URL_VIDEOS } from '@/config';

export default function BgHero() {
  const { play } = useAnimationStore();
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) refVideo.current?.play();
  }, [play]);
  return <div className={s.bgHero}>
    <video ref={refVideo} src={`${CDN_URL_VIDEOS}/banner_night_v2_compress.mp4`} muted playsInline width={1920} height={1080}
           preload={'auto'}></video>
  </div>;
}
