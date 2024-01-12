import s from './styles.module.scss';
import Intro from '@/modules/landing/Componets/Intro';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import cn from 'classnames';
import Chars from '@/interactive/Chars';
import BorderLine from '@/interactive/BorderLine';
import { Box } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import useAnimationStore from '@/stores/useAnimationStore';

export default function Hero() {
  const { played } = useAnimationStore();
  const { mobileScreen, tabletScreen } = useWindowSize();
  return (
    <div className={s.hero}>
      <BgHero />
      <div className={s.hero_inner}>
        <div className={cn(s.hero_inner_container, 'container')}>
          <h1 className={s.hero_heading}>
            <Chars delay={0.1}>$BVM</Chars>
          </h1>
          <h6 className={s.hero_headingSub}>
            Welcome to <span>the future of Bitcoin.</span>
          </h6>
          {!mobileScreen && <BorderLine delay={0.1} />}
          <Box mt={'20px'} />
          <div className={s.hero_inner_rows}>
            <HeroContent />
            {!mobileScreen && !tabletScreen && <HeroLabel />}
          </div>
        </div>
      </div>
      <Intro />
    </div>
  );
}
