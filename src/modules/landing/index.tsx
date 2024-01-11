import useWindowSize from '@/hooks/useWindowSize';
import Chain from './Componets/Chain';
import Comunity from './Componets/Comunity';
import Hero from './Componets/Hero';
import ScaleableMobile from './Componets/Scalable/ScaleableMobile';
import Tool from './Componets/Tool';
import s from './styles.module.scss';
import Section_7 from '@/modules/landing/Componets/Section_7';
import { useEffect } from 'react';
import ScalableSlide from '@/modules/landing/Componets/ScalableSlide';
import Section7Mobile from './Componets/Section_7/Section_7_Mobile';
import Scalable from './Componets/Scalable';

export default function Landing() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={s.landing}>
      <Hero />
      <Chain />
      <Tool />
      <Comunity />
      {mobileScreen ? <ScaleableMobile /> : <ScalableSlide />}
      {mobileScreen || tabletScreen ? <Section7Mobile /> : <Section_7 />}
    </div>
  );
}
