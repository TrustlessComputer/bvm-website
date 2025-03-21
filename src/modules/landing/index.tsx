'use client';
import useWindowSize from '@/hooks/useWindowSize';
import Chain from './Componets/Chain';
import ScaleableMobile from './Componets/ScaleableMobile';
import s from './styles.module.scss';
import Section_7 from '@/modules/landing/Componets/Section_7';
import { useEffect } from 'react';
import ScalableSlide from '@/modules/landing/Componets/ScalableSlide';
import Section7Mobile from './Componets/Section_7/Section_7_Mobile';
import BitEth from '@/modules/landing/Componets/BitEth';
import Ecosystem from './Componets/Ecosystem';
import LegoV2 from '@/modules/landing/Componets/LegoV2';
import JoinAllowList from '@/modules/landing/Componets/Hero/JoinAllowList';
import Hero from '@/modules/landing/Componets/Hero';
import PreLoader from '@/modules/landing/Componets/PreLoader';

export default function Landing() {
  const { mobileScreen, tabletScreen } = useWindowSize();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <PreLoader />
      <Hero />
      <Chain />
      <LegoV2 />
      <BitEth />
      <Ecosystem />
      {mobileScreen || tabletScreen ? <ScaleableMobile /> : <ScalableSlide />}
      {mobileScreen || tabletScreen ? <Section7Mobile /> : <Section_7 />}
      <JoinAllowList isFooter={true} />
    </div>
  );
}
