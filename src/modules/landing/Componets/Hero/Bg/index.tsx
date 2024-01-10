import s from './styles.module.scss';
import Image from 'next/image';

export default function BgHero() {

  return <div className={s.bgHero}>
    <video src='landing/banner-compress.mp4' muted playsInline autoPlay width={1920} height={1080} preload={'auto'}></video>
  </div>;
}
