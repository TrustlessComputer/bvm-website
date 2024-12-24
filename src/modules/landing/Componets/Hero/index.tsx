import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import useAnimationStore from '@/stores/useAnimationStore';
import s from './styles.module.scss';

export default function Hero() {
  const { isPlaying } = useAnimationStore();

  return (
    <>
      <div className={s.hero}>
        <div className={s.hero_wrap}>
          <BgHero />
          {/* <Banner /> */}
        </div>
        {isPlaying && <HeroContent />}
      </div>
      <HeroLabel />
    </>
  );
}
