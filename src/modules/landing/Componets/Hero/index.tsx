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
import HeadingText from '@/modules/landing/Componets/HeadingText';
import HeadingTextV2 from '@/modules/landing/Componets/HeadingTextV2';
import Fade from '@/interactive/Fade';
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
