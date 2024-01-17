import s from './styles.module.scss';
import Intro from '@/modules/landing/Componets/Intro';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import JoinAllowList from './JoinAllowList';

export default function Hero() {
  return (
    <div className={s.hero}>
      <div className={s.hero_wrap}>
        <BgHero />
        <div className={s.hero_inner}>
          <HeroLabel />
        </div>
      </div>
      <JoinAllowList />
      <Intro />
    </div>
  );
}
