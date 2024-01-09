import s from './styles.module.scss';
import Image from 'next/image';

export default function BgHero() {

  return <div className={s.bgHero}>
    <Image src={'/landing/hero-bg.jpg?v=12'} width={1920} height={1080} />
  </div>;
}
