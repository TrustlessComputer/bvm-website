import s from './styles.module.scss';
import Intro from '@/modules/landing/Componets/Intro';
import BgHero from '@/modules/landing/Componets/Hero/Bg';
import HeroLabel from '@/modules/landing/Componets/Hero/HeroLabel';
import HeroContent from '@/modules/landing/Componets/Hero/Content';
import cn from 'classnames';
import RandomText from '@/interactive/RandomText';
import Chars from '@/interactive/Chars';
import BorderLine from '@/interactive/BorderLine';
import { Box } from '@chakra-ui/react';


export default function Hero() {
  return (
    <div className={s.hero}>
      <BgHero />
      <div className={s.hero_inner}>
        <div className={cn(s.hero_inner_container, 'container')}>
          <Chars delay={.1}>
            <h1 className={s.hero_heading}>
              Bitcoin Virtual Machine
            </h1>
          </Chars>
          <BorderLine delay={.1} />
          <Box mt={20} />
          <div className={s.hero_inner_rows}>
            <HeroContent />
            <HeroLabel />
          </div>
        </div>
      </div>
      <Intro />
    </div>
  );
}
