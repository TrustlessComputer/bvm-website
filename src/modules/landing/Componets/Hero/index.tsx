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
import JoinAllowList from '@/modules/home/JoinAllowList';

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
          <Fade delay={0.2}>
            <HeadingTextV2
              className={s.hero_headingSub}
              headings={['the future of Bitcoin.',
                'Bitcoin L2s for DeFi.',
                'Bitcoin L2s for NFTs.',
                'Bitcoin L2s for GameFi.',
                'Bitcoin L2s for SocialFi.',
              ]}
            >
              Welcome to
            </HeadingTextV2>
          </Fade>
          {!mobileScreen && <BorderLine delay={0.2} />}
          <Box mt={'20px'} />
          <div className={s.hero_inner_rows}>
            <HeroContent />
            {!mobileScreen && !tabletScreen && <HeroLabel />}
          </div>
        </div>
        <JoinAllowList />
      </div>
      <Intro />
    </div>
  );
}
