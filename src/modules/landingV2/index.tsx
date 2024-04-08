import HeroV2 from '@/modules/landingV2/Componets/Hero';
import { useEffect } from 'react';
import Learning from './Componets/Learning';
import Modules from './Componets/Modules';
import Section_7 from './Componets/Section_7';
import Solutions from './Componets/Solutions';
import s from './styles.module.scss';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={s.landing}>
      <HeroV2 />
      <Learning />
      <Solutions />
      <Modules />
      {/* <Section_7 /> */}
    </div>
  );
}
