import HeroV2 from '@/modules/landingV2/Componets/Hero';
import { useEffect } from 'react';
import Learning from './Componets/Learning';
import Modules from './Componets/Modules';
import Section_7 from './Componets/Section_7';
import Solutions from './Componets/Solutions';
import s from './styles.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import Section7Mobile from './Componets/Section_7/Section_7_Mobile';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import RetroCard from '@components/Retro/RetroCard';
import RetroHero from '@components/Retro/RetroHero';
import RetroCaseStudy from '@components/Retro/RetroCaseStudy';

export default function Landing() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  useWhiteBackground();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV2 />
      <Learning />
      <Solutions />
      <Modules />
      {mobileScreen || tabletScreen ? <Section7Mobile /> : <Section_7 />}
    </div>
  );
}
