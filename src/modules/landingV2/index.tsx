import HeroV1 from '@/modules/landingV2/Componets/HeroV1';
import { useEffect } from 'react';
import Learning from './Componets/Learning';
import Modules from './Componets/Modules';
import Section_7 from './Componets/Section_7';
import Solutions from './Componets/Solutions';
import s from './styles.module.scss';
import useWindowSize from '@/hooks/useWindowSize';
import Section7Mobile from './Componets/Section_7/Section_7_Mobile';
import useWhiteBackground from '@/hooks/useWhiteBackground';
import PreLoader from '@/modules/landing/Componets/PreLoader';
import Loader from '@/modules/builder-landing/Loader';
import Hero from '../landing/Componets/Hero';

export default function Landing() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  useWhiteBackground();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Loader />
      <div className={s.landing}>
        {/* <HeroV1 /> */}
        <Hero />
        <Learning />
        <Solutions />
        <Modules />
        {mobileScreen || tabletScreen ? <Section7Mobile /> : <Section_7 />}
      </div>
    </>
  );
}
